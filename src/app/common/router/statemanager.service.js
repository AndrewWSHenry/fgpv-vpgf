(() => {
    'use strict';

    /**
     * @module stateManager
     * @memberof app.common
     * @description
     *
     * The `stateManager` factory is a service controlling states (true/false) of panels and their content.
     * State object corresponds to either a panel with mutually exclusive content panes, a content pane, or any other element with set content. For simplicity, a state object which is a parent, cannot be a child of another state object.
     *
     * When a parent state object is:
     * - activated: it activates a first (random) child as well; activating a parent state object should be avoided;
     * - deactivated: it deactivates its active child as well;
     *
     * When a child state object is:
     * - activated: it activates its parent and deactivates its active sibling if any;
     * - deactivated: it deactivates its parent as well;
     *
     * Only `active` and `morph` state properties are animated (animation can be skipped which is indicated by the `activeSkip` and `morphSkip` flags) and need to be set through `setActive` and `setMorph` functions accordingly; these properties can be bound and watched directly though. Everything else on the `state` object can be set, bound, and watched directly.
     */
    angular
        .module('app.common.router')
        .factory('stateManager', stateManager);

    // https://github.com/johnpapa/angular-styleguide#factory-and-service-names

    function stateManager($q, $rootScope, displayManager, initialState, initialDisplay, $rootElement, $timeout) {
        const service = {
            addState,
            setActive,
            setMorph,
            callback,
            setFocusElement,
            previousFocus,
            togglePanel,
            closePanelFromHistory,
            setPanelFocus,
            panelHistory: [],
            state: angular.copy(initialState),
            display: angular.copy(initialDisplay),
            onCloseCallback
        };

        const fulfillStore = {}; // keeping references to promise fulfill functions
        let lastFocusElement; // stores an element for dynamic focus changes
        const closeCallback = {};

        const displayService = displayManager(service); // init displayManager
        angular.extend(service, displayService); // merge displayManager service functions into stateManager

        return service;

        /*********/

        /**
         * Adds new items to the state collection with overrride;
         * @function addState
         * @param {Array} items an array of state items
         */
        function addState(items) {
            service.state = angular.merge(service.state, items);
        }

        /**
         * Sets items states. Items may be supplied as an array of strings or ojects of `{ [itemName]: [targetValue] }` where `itemName` is a String; `targetValue`, a boolean.
         * If the targetValue is not supplied, a negation of the current state is used.
         *
         * ```js
         * // sideMetadata panel will only be activated when state directive resolved mainToc callback runAfter its transition is complete
         * stateManager.setActive('mainToc', 'sideMetadata');
         *
         * // same effect as above but using object notation with explicit target values
         * stateManager.setActive({ mainToc: true }, { sideMetadata: true });
         * ```
         *
         * @function setActive
         * @param {Array} items state items to toggle
         * @return {Promise} returns a promise which is resolved when animation completes; if the child is supplies as the element to be manipulated and its transition is immediate, the return promise is resovled when its parent animation is complete;
         */
        function setActive(...items) {
            if (items.length > 0) {

                let one = items.shift(); // get first item
                let oneTargetValue;

                // infer name, target state and parent
                if (typeof one === 'string') {
                    one = getItem(one);
                    oneTargetValue = !one.item.active; // using negated current state as the target
                } else {
                    let oneName = Object.keys(one)[0];
                    oneTargetValue = one[oneName];
                    one = getItem(oneName);
                }

                if (oneTargetValue) {
                    return openPanel(one).then(() => setActive(...items));
                } else {
                    return closePanel(one).then(() => setActive(...items));
                }
            } else {
                return $q.resolve();
            }
        }

        /**
         * Changes the morph value of the item to the value specified
         * @function setMorph
         * @param  {String} itemName       name of the item to change
         * @param  {String} value      value to change the morph to
         * @return {Object}            the stateManager service to use for chaining
         */
        function setMorph(itemName, value) {
            setItemProperty(itemName, 'morph', value);

            return service;
        }

        /**
         * Resolves promise on the item waiting for its transition to complete.
         * @function callback
         * @param  {String} itemName name of the state to resolve
         */
        function callback(itemName, property) {
            const fulfillKey = `${property}${itemName}`;

            // console.log('Resolving state item lock:', itemName, property, fulfillStore[fulfillKey]); //, item.fulfill);
            // there is no memory leak since there is a finite (and small) number of fulfill keys
            if (fulfillStore[fulfillKey]) {
                fulfillStore[fulfillKey]();
            }
        }

        /**
         * Close the most recently opened panel.
         *
         * @function closePanelFromHistory
         * @return  {Promise}   resolves when a panel has finished its closing animation
         */
        function closePanelFromHistory() {
            return service.panelHistory.length > 0 ? closePanel(getItem(service.panelHistory.pop())) : $q.resolve();
        }

        /**
         * Toggles a child panel open or closed based on the negated active state. Entire panel
         * including parent is opened or closed. Therefore sibling panels are not swapped
         * from history.
         *
         * @function togglePanel
         * @param  {String}   panelName the name of a child panel
         */
        function togglePanel(panelName) {
            const parentPanel = getParent(panelName);
            return parentPanel.item.active ? closePanel(parentPanel) : openPanel(getItem(panelName));
        }

        /* PRIVATE HELPERS */

        /**
         * Sets specified item to the provided value; waits for transition to complete
         * @private
         * @function setItemProperty
         * @param {String} itemName  object name to modify
         * @param {String} property  property name to modify
         * @param {Boolean} value  target state value
         * @param {Boolean} skip skips animation, defaults to false
         */
        function setItemProperty(itemName, property, value, skip = false) {
            const item = service.state[itemName];

            return $q(fulfill => {
                const fulfillKey = `${property}${itemName}`; // key to store `fulfill` function
                const skipKey = `${property}Skip`; // key to store `skip` animation flag

                item[skipKey] = skip; // even if the item has proper state, set its skip value for sanity

                // console.log('settingItem', item, item.active, value);
                if (item[property] !== value) {

                    // check if fulfill function exists from before exist and resolve it
                    if (fulfillStore[fulfillKey]) {
                        fulfillStore[fulfillKey]();
                    }

                    // store a modified fulfill function which returns `false` to any following `then` to resolve on callback
                    fulfillStore[fulfillKey] = () => fulfill(false);

                    item[property] = value;

                    // emit event on the rootscope when change started
                    $rootScope.$broadcast('stateChangeStart', itemName, property, value, skip);

                    // waititing for items to animate and be resolved
                } else {
                    // resolve immediately skipping event broadcasting since nothing really changed
                    fulfill(true);
                }
            })
            .then(skipEvent => {
                if (!skipEvent) {
                    // console.log('EMIT EVENT for', itemName, property, value, skip);
                    // emit event on the rootscope when change is complete
                    $rootScope.$broadcast('stateChangeComplete', itemName, property, value, skip);

                    // record history of `active` changes only
                    if (property === 'morph') {
                        return;
                    }
                }
                return;
            });
        }

        /**
         * Registers a custom callback function to be run when the specified panel
         * is closed.
         *
         * @private
         * @function onCloseCallback
         * @param   {String}    panelName the name of the panel to register the closing callback
         * @param   {Function}  callback the callback function to run when the panel closes
         */
        function onCloseCallback(panelName, callback) {
            if (typeof panelName === 'string' && typeof callback === 'function') {
                closeCallback[panelName] = callback;
            }
        }

        /**
         * Executes the closing callback registered to panelName if it exists.
         *
         * @private
         * @function runCloseCallback
         * @param   {String}    panelName the name of the panel to run closing callback
         */
        function runCloseCallback(panelName) {
            if (panelName in closeCallback) {
                closeCallback[panelName]();
            }
        }

        /**
         * Adds or removes a panels name from panelHistory. If the provided panel is active the
         * default behaviour is to add the panel unless addFlag is set to false. An inactive
         * panel is removed unless addFlag is true.
         *
         * @private
         * @function modifyHistory
         * @param   {Object}    panel the panel to be added or removed from panelHistory.
         * @param   {Boolean}   addFlag optional set to true to add, false to remove
         */
        function modifyHistory(panel, addFlag = panel.item.active) {
            const indexInHistory = service.panelHistory.indexOf(panel.name);
            if (indexInHistory !== -1) {
                service.panelHistory.splice(indexInHistory, 1);
            }

            if (addFlag) {
                service.panelHistory.push(panel.name);
            }
        }

        /**
         * Opens a panel for display.
         *
         * If panelToOpen is a parent panel, a random child panel will be opened to avoid a blank panel. This should
         * be avoided since passing a child panel will also open its parent panel. All other sibling panels are
         * closed.
         *
         * @private
         * @function openPanel
         * @param  {Object}   panelToOpen the panel object to be opened
         * @param  {Boolean}  propagate optional allow parent/sibling panels to be modified
         * @return {Promise}  resolves when panel animation has completed
         */
        function openPanel(panelToOpen, propagate = true) {
            let animationPromise;

            // opening parent panel
            if (typeof panelToOpen.item.parent === 'undefined') {
                if (propagate) {
                    animationPromise = openPanel(getChildren(panelToOpen.name)[0], false)
                        .then(() => openPanel(panelToOpen, false));
                } else {
                    animationPromise = setItemProperty(panelToOpen.name, 'active', true);
                }

            // opening child panel
            } else {
                setItemProperty(panelToOpen.name, 'active', true, true);

                // go through history and close all sibling panels. remove any sibling opened after this one
                // from history
                for (let i = 0; i < service.panelHistory.length; i++) {
                    const panel = getItem(service.panelHistory[i]);
                    if (panel.name !== panelToOpen.name && panel.item.parent === panelToOpen.item.parent) {
                        setItemProperty(panel.name, 'active', false, true);
                        let indexInHistory = service.panelHistory.indexOf(panelToOpen.name);
                        if (indexInHistory !== -1 && i > indexInHistory) {
                            modifyHistory(panel);
                        }
                    }
                }
                modifyHistory(panelToOpen);
                animationPromise = propagate ? openPanel(getParent(panelToOpen.name), false) : $q.resolve();

                // set focus to opened panel
                animationPromise.then(() => setPanelFocus(panelToOpen.name));
            }
            return animationPromise;
        }

        /**
         * Closes a panel from display.
         *
         * @private
         * @function closePanel
         * @param   {Object}    panelToClose the panel object to be opened
         * @param   {Boolean}   propagate optional allow parent/sibling panels to be modified
         * @return  {Promise}   resolves when panel animation has completed
         */
        function closePanel(panelToClose, propagate = true) {
            let animationPromise;

            // closing parent panel
            if (typeof panelToClose.item.parent === 'undefined') {
                animationPromise = setItemProperty(panelToClose.name, 'active', false)
                    .then(() =>
                        propagate ? getChildren(panelToClose.name).forEach(child => closePanel(child, false))
                                  : true
                    );

            // closing child panel
            } else {
                if (propagate) {
                    closePanel(getParent(panelToClose.name));
                }
                modifyHistory(panelToClose, false);
                animationPromise = setItemProperty(panelToClose.name, 'active', false, true);
            }
            // set focus to last opened panel
            animationPromise.then(() => {
                setPanelFocus(service.panelHistory[service.panelHistory.length - 1]);
                runCloseCallback(panelToClose.name);
            });

            return animationPromise;
        }

        /**
         * Sets focus on the first visible button in panel named panelName
         * @private
         * @function setPanelFocus
         * @param  {String} panelName the name of the panel to set focus on
         */
        function setPanelFocus(panelName) {
            $timeout(() => {
                const firstButton =  $rootElement.find(`[rv-state="${panelName}"] button`).filter(':visible')[0];
                if (typeof firstButton !== 'undefined') {
                    firstButton.focus();
                }
            }, 10);
        }

        /**
         * Saves a focusable element
         * @private
         * @function setFocusElement
         * @param  {Object} element a focusable element
         */
        function setFocusElement(element) {
            lastFocusElement = element;
        }

        /**
         * Changes focus to the last saved focusable element
         * @private
         * @function previousFocus
         */
        function previousFocus() {
            lastFocusElement.focus();
        }

        /**
         * Returns item object from itemName specified
         * @private
         * @function getItem
         * @param  {String} itemName name of the item
         * @return {Object}          state object and its name
         */
        function getItem(itemName) {
            return {
                name: itemName,
                item: service.state[itemName]
            };
        }

        /**
         * Returns a parent of the itemName specified
         * @private
         * @function getParent
         * @param  {String} itemName name of the state object whose parent will be returned
         * @return {Object}          state object and its name
         */
        function getParent(itemName) {
            let parentName = service.state[itemName].parent;
            let parent = service.state[parentName];

            return {
                name: parentName,
                item: parent
            };
        }

        /**
         * Returns array of children of the itemName specified
         * @private
         * @function getChildren
         * @param  {String} parentName itemName whose children will be returned
         * @return {Object}            an array of state objects and their names
         */
        function getChildren(parentName) {
            return Object.keys(service.state)
                .filter((key) => {
                    return service.state[key].parent === parentName;
                })
                .map((key) => {
                    return {
                        name: key,
                        item: service.state[key]
                    };
                });
        }
    }
})();
