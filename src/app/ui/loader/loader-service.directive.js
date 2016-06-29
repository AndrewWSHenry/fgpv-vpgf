(() => {
    'use strict';

    /**
     * @ngdoc directive
     * @name rv-loader-service
     * @module app.ui.loader
     * @restrict A
     * @description
     *
     * The `rv-loader-service` directive creates a stepper interface for importing map services and online-based geo files and turning them into layers.
     *
     */
    angular
        .module('app.ui.loader')
        .directive('rvLoaderService', rvLoaderService);

    function rvLoaderService() {
        const directive = {
            restrict: 'E',
            templateUrl: 'app/ui/loader/loader-service.html',
            scope: {},
            controller: Controller,
            controllerAs: 'self',
            bindToController: true
        };

        return directive;
    }

    function Controller($timeout, stateManager, geoService, Geo, Stepper, LayerBlueprint) {
        'ngInject';
        const self = this;

        self.closeLoaderService = closeLoaderService;

        self.serviceTypes = [
            Geo.Service.Types.FeatureLayer,
            Geo.Service.Types.DynamicService,
            Geo.Service.Types.TileService,
            Geo.Service.Types.ImageService,
            Geo.Service.Types.WMS
        ];

        // TODO: turn into a proper class
        self.connect = {
            step: {
                titleValue: 'import.service.connect.title',
                stepNumber: 1,
                isActive: false,
                isCompleted: false,
                onContinue: connectOnContinue,
                onCancel: () => onCancel(self.connect.step),
                reset: connectReset
            },
            form: null,
            serviceUrl: null,
            serviceUrlResetValidation
        };

        self.select = {
            step: {
                titleValue: 'import.service.select.title',
                stepNumber: 2,
                isActive: false,
                isCompleted: false,
                onContinue: selectOnContinue,
                onCancel: () => onCancel(self.select.step),
                reset: selectReset
            },
            serviceTypeResetValidation,
            form: null,
            serviceType: null
        };

        self.configure = {
            step: {
                titleValue: 'import.service.configure.title',
                stepNumber: 3,
                isActive: false,
                isCompleted: false,
                onContinue: configureOnContinue,
                onCancel: () => onCancel(self.configure.step),
                reset: configureReset
            },
            form: null,
            defaultOptions: {}
        };

        self.layerBlueprint = null;

        const stepper = new Stepper();
        stepper
            .addSteps(self.connect.step)
            .addSteps(self.select.step)
            .addSteps(self.configure.step)
            .start(); // activate stepper on the first step

        console.log(stepper);

        /***/

        /**
         * Tiny helper function to set/reset error messages on fields
         * TODO: need to abstract - loader-file has the same function
         * @param  {Object} form      form object
         * @param  {String} fieldName field name to set the error on
         * @param  {String} errorName name of the error message
         * @param  {Boolean} state     =             false; false - show error, true - hide error
         */
        function toggleErrorMessage(form, fieldName, errorName, state = false) {
            // when showing errors, dirty and touch the fields
            // this is needed when a preselected field causes validation to fail; since user hasn't interacted with the field, it's untouched and pristine and error messages are not shown for untouched fields;
            if (!state) {
                form[fieldName].$setDirty();
                form[fieldName].$setTouched();
            }

            form[fieldName].$setValidity(errorName, state);
        }

        /**
         * Cancels any stepper movements if the step is processing data; resets input and moves to the previous step if not.
         */
        function onCancel(step) {
            if (step.isThinking) {
                stepper.cancelMove();
            } else {
                stepper.previousStep(); // going to the previous step will auto-reset the current one (even if there is no previous step to go to)
            }
        }

        /**
         * Tries to create a service LayerBlueprint from the url provided. If creation is successful, proceeds to the next step.
         * If creation fails, display a "broken service url" error message. This can happen because the provided url is not a service endpoint or if the service endpoint doesn't respond.
         */
        function connectOnContinue() {
            const connect = self.connect;

            // creating new service blueprint with the provided url
            // since there is no layer type provided, blueprint will try to get service data
            self.layerBlueprint = new LayerBlueprint.service({
                url: connect.serviceUrl
            }, geoService.epsgLookup);

            self.layerBlueprint.ready.catch(() => {
                console.log('self.connect.form.serviceUrl');

                toggleErrorMessage(connect.form, 'serviceUrl', 'broken', false); // , connect.step);
            });

            stepper.nextStep(self.layerBlueprint.ready);
        }

        /**
         * Clears service url field and all error displayed; sets the form to pristine, untouched state (so no default validation errors (like "required" or "not a proper url") will show)
         */
        function connectReset() {
            const connect = self.connect;

            connect.serviceUrl = '';
            connect.form.$setPristine();
            connect.form.$setUntouched();

            // TODO: generalize resetting custom form validation
            connect.serviceUrlResetValidation();
        }

        /**
         * Resets service URL field validation.
         */
        function serviceUrlResetValidation() {
            // reset broken endpoint error message when user modifies service url
            toggleErrorMessage(self.connect.form, 'serviceUrl', 'broken', true);
        }

        /**
         * Validates created service Layer Blueprint against selected service type.
         * TODO: do the validation if at all possible;
         */
        function selectOnContinue() {
            const validationPromise = self.layerBlueprint.validate();

            // TODO: move reseting options to defaults into blueprint; this can be done upon successful validation
            self.configure.defaultOptions = angular.copy(self.layerBlueprint.config);
            stepper.nextStep(validationPromise);

            // console.log('User selected', self.layerBlueprint.fileType);
            validationPromise.catch(error => {
                console.error('Service type is wrong', error);
                toggleErrorMessage(self.select.form, 'serviceType', 'wrong', false);
            });
        }

        function selectReset() {
            const select = self.select;

            select.form.$setPristine();
            select.form.$setUntouched();

            // TODO: generalize resetting custom form validation
            select.serviceTypeResetValidation();
        }

        function serviceTypeResetValidation() {
            // reset wrong service type error message
            toggleErrorMessage(self.select.form, 'serviceType', 'wrong', true);
        }
        /**
         * Builds layer with the specified options and adds it to the map; displays error message if something is not right.
         */
        function configureOnContinue() {
            // TODO: display error message if something breaks
            // TODO: close import wizard if build is successful
            geoService.constructLayers([self.layerBlueprint]);
            closeLoaderService();
        }

        /**
         * Restores default configuration options (layer name, etc.) and resets the form to pristine state to hide default error messages.
         */
        function configureReset() {
            const configure = self.configure;

            configure.form.$setPristine();
            configure.form.$setUntouched();
            self.layerBlueprint.config = self.configure.defaultOptions;
        }

        /**
         * Closes loader pane and switches to toc.
         */
        function closeLoaderService() {
            stateManager.setActive({ mainLoaderService: false });
        }
    }
})();
