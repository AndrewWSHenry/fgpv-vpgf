/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

export type SideMenuButtons = (
  | "layers"
  | "basemap"
  | "geoSearch"
  | "about"
  | "fullscreen"
  | "export"
  | "share"
  | "touch"
  | "help"
  | "language"
  | "plugins")[];
export type SpatialReferenceNode = {
  [k: string]: any;
};
/**
 * A list of all controls to be enabled on the specified layer
 */
export type LegendEntryControls = (
  | "opacity"
  | "visibility"
  | "boundingBox"
  | "query"
  | "snapshot"
  | "metadata"
  | "boundaryZoom"
  | "refresh"
  | "reload"
  | "remove"
  | "settings"
  | "data"
  | "styles")[];
export type LayerNode = BasicLayerNode | FeatureLayerNode | WmsLayerNode | DynamicLayerNode;
export type SymbologyStack = {
  image: string;
  text: string;
}[];
export type InfoSection =
  | {
      infoType?: "title";
      content?: string;
    }
  | {
      infoType?: "image";
      content?: string;
    }
  | {
      infoType?: "unboundLayer";
      /**
       * Name to display in legend
       */
      layerName?: string;
      /**
       * Optional description displayed above the symbology stack.
       */
      description?: string;
      symbologyStack?: SymbologyStack;
      /**
       * An optional style, describes how the symbology stack should be rendered
       */
      symbologyRenderStyle?: "icons" | "images";
    }
  | {
      infoType?: "text";
      content?: string;
    };
/**
 * A list of all controls to be enabled on the specified group
 */
export type LegendGroupControls = (
  | "opacity"
  | "visibility"
  | "symbology"
  | "query"
  | "reload"
  | "remove"
  | "settings")[];

export interface FgpvConfigSchema {
  /**
   * The schema version used to validate the configuration file.  The schema should enumerate the list of versions accepted by this version of the viewer.
   */
  version: "2.0";
  /**
   * ISO 639-1 code indicating the language of strings in the schema file
   */
  language?: "en" | "fr" | "es";
  /**
   * A set of service endpoints used by the viewer
   */
  ui?: {
    /**
     * Indicates viewer takes up entire viewport
     */
    fullscreen?: boolean;
    /**
     * UI theme of the viewer
     */
    theme?: "default";
    /**
     * An optional image to be used in the place of the default viewer logo
     */
    logoUrl?: string;
    failureFeedback?: {
      [k: string]: any;
    };
    /**
     * An optional title to be used in the place of the default viewer title
     */
    title?: string;
    /**
     * Provides configuration to the main app toolbar. If not supplied, the all default appbar controls are displayed. To completely hide the toolbar, provide the following: { sideMenu: false, geoSearch: false, layers: false }.
     */
    appBar?: {
      /**
       * Shows the side menu button in the main app toolbar.
       */
      sideMenu?: boolean;
      /**
       * Shows the geosearch button in the main app toolbar. The button will be hidden if geosearch component is disabled or no search service URLs are provided.
       */
      geoSearch?: boolean;
      /**
       * Shows the basemap selector button in the main app toolbar.
       */
      basemap?: boolean;
      /**
       * Shows the layers button in the main app toolbar.
       */
      layers?: boolean;
    };
    navBar?: NavBarNode;
    sideMenu?: SideMenuNode;
    /**
     * Will restrict the user from panning beyond the maximum extent.
     */
    restrictNavigation?: boolean;
    /**
     * About properties from configuration file or Markdown folder
     */
    about?:
      | {
          content: string;
        }
      | {
          folderName: string;
        };
    /**
     * Help properties
     */
    help?: {
      /**
       * Help folder name who contain the help description and images
       */
      folderName: string;
    };
    legend?: {
      /**
       * Specifies if the items in the legend can be reordered; structured legend ignores this property.
       */
      reorderable?: boolean;
      /**
       * Specifies if the user-added layers are allowed.
       */
      allowImport?: boolean;
      /**
       * Specifies whether the legend is opened by default on initial loading of the map for small, medium, and large viewports
       */
      isOpen?: {
        /**
         * Whether the legend is opened by default on initial loading of the map for large viewports
         */
        large?: boolean;
        /**
         * Whether the legend is opened by default on initial loading of the map for medium viewports
         */
        medium?: boolean;
        /**
         * Whether the legend is opened by default on initial loading of the map for small viewports
         */
        small?: boolean;
      };
    };
    /**
     * Specifies whether the table panel is opened by default on initial loading of the map for small, medium, and large viewports
     */
    tableIsOpen?: {
      /**
       * The id of the layer for referencing within the viewer
       */
      id: string;
      /**
       * Whether the table panel is opened by default on initial loading of the map for large viewports
       */
      large?: boolean;
      /**
       * Whether the table panel is opened by default on initial loading of the map for medium viewports
       */
      medium?: boolean;
      /**
       * Whether the table panel is opened by default on initial loading of the map for small viewports
       */
      small?: boolean;
    };
    /**
     * FIXME
     */
    widgetsWidget?: {
      [k: string]: any;
    };
    [k: string]: any;
  };
  /**
   * A set of service endpoints used by the viewer
   */
  services?: {
    /**
     * An optional proxy to be used for dealing with same-origin issues.  URL must either be a relative path on the same server or an absolute path on a server which sets CORS headers.
     */
    proxyUrl?: string;
    /**
     * An ESRI service endpoint for generating map images.  Should point directly to an endpoint that can be consumed by ESRI PrintTask. NOTE: The PrintTask service has to be asynchronous
     */
    exportMapUrl?: string;
    /**
     * A URL to an ESRI ArcGIS geometry service REST endpoint.
     */
    geometryUrl?: string;
    /**
     * Google API key to enable geo location and share link shortening.
     */
    googleAPIKey?: string;
    /**
     * FIXME
     */
    geolocation?: {
      [k: string]: any;
    };
    /**
     * FIXME
     */
    coordInfo?: {
      [k: string]: any;
    };
    /**
     * FIXME
     */
    print?: {
      [k: string]: any;
    };
    /**
     * Search properties including ability to disable certain types of searches (NTS, FSA, and/or LAT/LNG) and to set service endpoint urls
     */
    search?: {
      /**
       * Disable specific types of searches including NTS, FSA, or LAT/LNG
       */
      disabledSearches?: ("NTS" | "FSA" | "LAT/LNG")[];
      /**
       * Service endpoint urls
       */
      serviceUrls: {
        /**
         * Endpoint url for geoNames service
         */
        geoNames: string;
        /**
         * Endpoint url for geoLocation service
         */
        geoLocation: string;
        /**
         * Endpoint url for geoSuggest service
         */
        geoSuggest: string;
        /**
         * Endpoint url for provinces service
         */
        provinces: string;
        /**
         * Endpoint url for types service
         */
        types: string;
      };
    };
    /**
     * Export properties
     */
    export?: {
      /**
       * Title of the export graphic.
       */
      title?: {
        /**
         * Indicates if the component is selected and included in the export graphic.
         */
        isSelected?: boolean;
        /**
         * Indicates if the component can be included or excluded from the export graphic by the user.
         */
        isSelectable?: boolean;
        /**
         * Value to be passed to the generation function of this export component.
         */
        value?: string;
      };
      /**
       * Map component.
       */
      map?: {
        /**
         * Indicates if the component is selected and included in the export graphic.
         */
        isSelected?: boolean;
        /**
         * Indicates if the component can be included or excluded from the export graphic by the user.
         */
        isSelectable?: boolean;
        /**
         * Value to be passed to the generation function of this export component.
         */
        value?: string;
      };
      /**
       * North arrow and scalebar component.
       */
      mapElements?: {
        /**
         * Indicates if the component is selected and included in the export graphic.
         */
        isSelected?: boolean;
        /**
         * Indicates if the component can be included or excluded from the export graphic by the user.
         */
        isSelectable?: boolean;
        /**
         * Value to be passed to the generation function of this export component.
         */
        value?: string;
      };
      /**
       * Legend component.
       */
      legend?: {
        /**
         * Indicates if the component is selected and included in the export graphic.
         */
        isSelected?: boolean;
        /**
         * Indicates if the component can be included or excluded from the export graphic by the user.
         */
        isSelectable?: boolean;
        /**
         * Value to be passed to the generation function of this export component.
         */
        value?: string;
        /**
         * Indicates whether symbology from info sections should be included in export legend
         */
        showInfoSymbology?: boolean;
        /**
         * Indicates whether symbology from controlled layers should be included in export legend
         */
        showControlledSymbology?: boolean;
      };
      /**
       * Foot notice to add to exported map
       */
      footnote?: {
        /**
         * Indicates if the component is selected and included in the export graphic.
         */
        isSelected?: boolean;
        /**
         * Indicates if the component can be included or excluded from the export graphic by the user.
         */
        isSelectable?: boolean;
        /**
         * Value to be passed to the generation function of this export component.
         */
        value?: string;
      };
      /**
       * Timestamp component.
       */
      timestamp?: {
        /**
         * Indicates if the component is selected and included in the export graphic.
         */
        isSelected?: boolean;
        /**
         * Indicates if the component can be included or excluded from the export graphic by the user.
         */
        isSelectable?: boolean;
        /**
         * Value to be passed to the generation function of this export component.
         */
        value?: string;
      };
    };
  };
  /**
   * Core map properties (extent sets, levels of detail)
   */
  map?: {
    /**
     * The default, full and maximum extents of the map
     */
    extentSets?: ExtentSetNode[];
    /**
     * The levels of detail (zoom scales) available for the map
     */
    lodSets?: LodSetNode[];
    /**
     * A unique combination of an LoD and an extent set (each basemap must fit into a tile schema)
     */
    tileSchemas: TileSchemaNode[];
    components?: {
      geoSearch?: {
        enabled?: boolean;
        showGraphic?: boolean;
        showInfo?: boolean;
        [k: string]: any;
      };
      mouseInfo?: {
        spatialReference?: SpatialReferenceNode;
        [k: string]: any;
      };
      northArrow?: {
        [k: string]: any;
      };
      overviewMap?: {
        enabled?: boolean;
        expandFactor?: number;
        [k: string]: any;
      };
      scaleBar?: {
        [k: string]: any;
      };
      basemap?: {
        [k: string]: any;
      };
    };
    /**
     * Initial basemap to load. If not supplied viewer will select any basemap.
     */
    initialBasemapId?: string;
    /**
     * A list of basemaps to be made available via the basemap selector.
     */
    baseMaps: BaseMapNode[];
    /**
     * Layer list in the order which they should be added to the map.  NOTE: ESRI JSAPI v3 cannot draw imagery layers over feature layers.
     */
    layers?: LayerNode[];
    /**
     * A structured or automatically generated legend
     */
    legend?: LegendAuto | LegendStructured;
    [k: string]: any;
  };
}
export interface NavBarNode {
  zoom: "all" | "buttons" | "slider";
  extra?: (
    | "geoLocator"
    | "marquee"
    | "home"
    | "history"
    | "basemap"
    | "help"
    | "fullscreen"
    | "geoSearch"
    | "sideMenu"
    | "layers")[];
}
/**
 * Specifies which options are available in the left side menu.
 */
export interface SideMenuNode {
  /**
   * Indicates if the logo should be shown in the left side menu.
   */
  logo?: boolean;
  items?: SideMenuButtons[];
}
export interface ExtentSetNode {
  id: string;
  /**
   * The projection for the given extents
   */
  spatialReference:
    | {
        [k: string]: any;
      }
    | {
        [k: string]: any;
      }
    | {
        [k: string]: any;
      }
    | {
        [k: string]: any;
      }
    | {
        [k: string]: any;
      };
  /**
   * The default (starting) extent.
   */
  default: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
  /**
   * The full extent (should give good view of the whole map, not necessarily the maximum extent); default will be used if not supplied.
   */
  full?: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
  /**
   * The maximum extent; full or default extents will be used if not supplied.
   */
  maximum?: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
  };
}
export interface LodSetNode {
  id: string;
  /**
   * Level of details for a specific tile schema
   */
  lods: {
    level: number;
    resolution: number;
    scale: number;
  }[];
}
export interface TileSchemaNode {
  /**
   * A unique id identifying a tile schema (combination of an extent set and a zoom scale)
   */
  id: string;
  /**
   * The name to display in the basemap selector for the set of basemaps referencing this schema
   */
  name: string;
  /**
   * The extent set to be used for this basemap (should reference map.extentSets.id)
   */
  extentSetId: string;
  /**
   * Optional.  The level of details set to be used for this basemap (should reference map.lod.id)
   */
  lodSetId: string;
  /**
   * Optional. If set, the overview map will use this layer instead of the active basemap
   */
  overviewUrl?: {
    /**
     * The id of the layer for referencing within the viewer (does not relate directly to any external service)
     */
    id: string;
    /**
     * The display name of the layer.  If it is not present the viewer will make an attempt to scrape this information.
     */
    name?: string;
    /**
     * The service endpoint of the layer.  It should match the type provided in layerType.
     */
    url: string;
    /**
     * The automatic refresh interval of the layer in minutes. Maximum interval is 100 minutes.
     */
    refreshInterval?: number;
    /**
     * The metadata url of the layer service
     */
    metadataUrl?: string;
    /**
     * The catalogue url of the layer service
     */
    catalogueUrl?: string;
    layerType: "esriImage" | "esriTile";
    extent?: ExtentWithReferenceNode;
    controls?: LegendEntryControls;
    /**
     * A list of controls which are blocked from modification either by the user or programmatically. These controls can be visible or not as defined in the `controls` array.
     */
    disabledControls?: (
      | "opacity"
      | "visibility"
      | "boundingBox"
      | "query"
      | "snapshot"
      | "metadata"
      | "boundaryZoom"
      | "refresh"
      | "reload"
      | "remove"
      | "settings"
      | "data"
      | "styles")[];
    state?: InitialLayerSettings;
  };
}
export interface ExtentWithReferenceNode {
  xmin: number;
  ymin: number;
  xmax: number;
  ymax: number;
  spatialReference?: SpatialReferenceNode;
}
export interface InitialLayerSettings {
  /**
   * Initial opacity
   */
  opacity?: number;
  /**
   * Initial visibility setting
   */
  visibility?: boolean;
  /**
   * Display bounding box
   */
  boundingBox?: boolean;
  /**
   * Allow querying
   */
  query?: boolean;
  /**
   * Retrieve all feature data immediately on load
   */
  snapshot?: boolean;
  /**
   * Disable hover tips
   */
  hovertips?: boolean;
}
export interface BaseMapNode {
  /**
   * A unique identifier for the basemap
   */
  id: string;
  /**
   * Name of the basemap used for labeling
   */
  name: string;
  /**
   * Description of the basemap. Will be visible when basemap selector is expanded.Description of the basemap. Will be visible when basemap selector is expanded.
   */
  description: string;
  /**
   * Optional base map type. This is descriptive only, and will be shown in the basemap selector.
   */
  typeSummary?: string;
  /**
   * Alt text for the basemap thumbnail image.Alt text for the basemap thumbnail image.
   */
  altText: string;
  /**
   * Path to image file to display in the basemap selector.
   */
  thumbnailUrl?: string;
  /**
   * The tile schema for this basemap (should reference map.tileSchemas.id)
   */
  tileSchemaId: string;
  /**
   * A set of URLs which should be composited to form a basemap entry
   */
  layers: {
    id: string;
    layerType: string;
    url: string;
  }[];
  attribution?: AttributionNode;
  zoomLevels?: {
    min?: number;
    max?: number;
  };
}
export interface AttributionNode {
  text: {
    enabled: boolean;
    /**
     * Optional. Contains the attribution value. If empty, it will use copyright text from the server.
     */
    value?: string;
  };
  logo: {
    enabled: boolean;
    /**
     * URL for the image.
     */
    value?: string;
    /**
     * URL to go to when clicked.
     */
    link?: string;
  };
}
export interface BasicLayerNode {
  /**
   * The id of the layer for referencing within the viewer (does not relate directly to any external service)
   */
  id: string;
  /**
   * The display name of the layer.  If it is not present the viewer will make an attempt to scrape this information.
   */
  name?: string;
  /**
   * The service endpoint of the layer.  It should match the type provided in layerType.
   */
  url: string;
  /**
   * The automatic refresh interval of the layer in minutes. Maximum interval is 100 minutes.
   */
  refreshInterval?: number;
  /**
   * The metadata url of the layer service
   */
  metadataUrl?: string;
  /**
   * The catalogue url of the layer service
   */
  catalogueUrl?: string;
  layerType: "esriImage" | "esriTile";
  extent?: ExtentWithReferenceNode;
  controls?: LegendEntryControls;
  /**
   * A list of controls which are blocked from modification either by the user or programmatically. These controls can be visible or not as defined in the `controls` array.
   */
  disabledControls?: (
    | "opacity"
    | "visibility"
    | "boundingBox"
    | "query"
    | "snapshot"
    | "metadata"
    | "boundaryZoom"
    | "refresh"
    | "reload"
    | "remove"
    | "settings"
    | "data"
    | "styles")[];
  state?: InitialLayerSettings;
}
export interface FeatureLayerNode {
  /**
   * The id of the layer for referencing within the viewer (does not relate directly to any external service)
   */
  id: string;
  /**
   * The display name of the layer.  If it is not present the viewer will make an attempt to scrape this information.
   */
  name?: string;
  /**
   * The display field of the layer.  If it is not present the viewer will make an attempt to scrape this information.
   */
  nameField?: string;
  /**
   * The service endpoint of the layer.  It should match the type provided in layerType.
   */
  url: string;
  /**
   * The automatic refresh interval of the layer in minutes. Maximum interval is 100 minutes.
   */
  refreshInterval?: number;
  /**
   * The metadata url of the layer service
   */
  metadataUrl?: string;
  /**
   * The catalogue url of the layer service
   */
  catalogueUrl?: string;
  layerType: "esriFeature";
  /**
   * Allows individual symbols to have visibility toggled on/off.
   */
  toggleSymbology?: boolean;
  /**
   * Specifies the tolerance in pixels when determining if a feature was clicked. Should be non-negative integer
   */
  tolerance?: number;
  extent?: ExtentWithReferenceNode;
  controls?: LegendEntryControls;
  /**
   * A list of controls which are visible, but disabled for user modification
   */
  disabledControls?: (
    | "opacity"
    | "visibility"
    | "boundingBox"
    | "query"
    | "snapshot"
    | "metadata"
    | "boundaryZoom"
    | "refresh"
    | "reload"
    | "remove"
    | "settings"
    | "data"
    | "styles")[];
  state?: InitialLayerSettings;
  /**
   * Settings for the table
   */
  table?: {
    /**
     * Specifies the table title to apply.
     */
    title?: string;
    /**
     * Specifies the additional information to display in the setting panel to give more information about a table.
     */
    description?: string;
    /**
     * Specifies the default table size when first open. True: maximize view; False: split view.
     */
    maximize?: boolean;
    search?: {
      [k: string]: any;
    };
    /**
     * Specifies if the default filters (from columns filter) are apply to the map (definition query). True: it is applied; False: it is not applied.
     */
    applyMap?: boolean;
    /**
     * Specifies the array of columns for the table. When there is an item in this array, it will be use to define wich and how column will be set for the table. If a column is not in the array it will be assume as disabled.
     */
    columns?: ColumnNode[];
  };
}
/**
 * Specifies option for each column. OID field must be present, if not data will not appear. The order they appears inside the table is the same as the order of this array.
 */
export interface ColumnNode {
  /**
   * Specifies the field name (data) to use to link to the layer column. Must exist in the layer.
   */
  data: string;
  /**
   * Specifies the column title, uses the layer column name or alias if missing.
   */
  title?: string;
  /**
   * Specifies the additional information to display in the setting panel to give more information about a column. Do not add description if missing.
   */
  description?: string;
  /**
   * Specifies if column is visible by default. True: column is visible; False: column is hidden.
   */
  visible?: boolean;
  /**
   * Specifies the column width. If missing, calculated column width will be use.
   */
  width?: number;
  /**
   * Specifies if column is sort. If missing, no sort is applied.
   */
  sort?: "asc" | "desc";
  /**
   * Specifies if column can be filter. True: column can be filter; False: no filter can be applied from global search or filter. If this is false, do not set a filter because it will not be use.
   */
  searchable?: boolean;
  filter?: FilterNode;
}
/**
 * Specifies the filter information for a column.
 */
export interface FilterNode {
  /**
   * Specifies the filter type to use. If type is not specified, data field type will be use. String filter can be string or selector. Other filter must be the same type. If not, apply on map will fails.
   */
  type: "string" | "number" | "date" | "selector";
  /**
   * Specifies the filter value. For date and number values are split by ',' (e.g. 0,100). For selector it needs an array like ["Fire", "Fatality"]
   */
  value?: string;
  /**
   * Specifies if filter is modifiable. True: filter value can't be modified; False: filter value can be modified.
   */
  static?: boolean;
}
export interface WmsLayerNode {
  /**
   * The id of the layer for referencing within the viewer (does not relate directly to any external service)
   */
  id: string;
  /**
   * The display name of the layer.  If it is not present the viewer will make an attempt to scrape this information.
   */
  name?: string;
  /**
   * The service endpoint of the layer.  It should match the type provided in layerType.
   */
  url: string;
  /**
   * The automatic refresh interval of the layer in minutes. Maximum interval is 100 minutes.
   */
  refreshInterval?: number;
  /**
   * The metadata url of the layer service
   */
  metadataUrl?: string;
  /**
   * The catalogue url of the layer service
   */
  catalogueUrl?: string;
  layerEntries: WmsLayerEntryNode[];
  layerType: "ogcWms";
  /**
   * If specified indicates that GetFeatureInfo should be enabled for this WMS and indicates the format that should be requested.
   */
  featureInfoMimeType?: "text/html;fgpv=summary" | "text/html" | "text/plain" | "application/json";
  /**
   * If specified indicates that GetLegendGraphic should be enabled for this WMS and indicates the format that should be requested.  FIXME check legendUrl for additional requirements
   */
  legendMimeType?: "image/png" | "image/gif" | "image/jpeg" | "image/svg" | "image/svg+xml";
  extent?: ExtentWithReferenceNode;
  controls?: LegendEntryControls;
  /**
   * A list of controls which are visible, but disabled for user modification
   */
  disabledControls?: (
    | "opacity"
    | "visibility"
    | "boundingBox"
    | "query"
    | "snapshot"
    | "metadata"
    | "boundaryZoom"
    | "refresh"
    | "reload"
    | "remove"
    | "settings"
    | "data"
    | "styles")[];
  state?: InitialLayerSettings;
}
export interface WmsLayerEntryNode {
  /**
   * The id of the layer entry in the WMS
   */
  id: string;
  /**
   * A descriptive name for the layer.  To be used in the legend.
   */
  name?: string;
  /**
   * All the styles for the layer entry in the WMS
   */
  allStyles?: string[];
  /**
   * The current style for the layer entry in the WMS
   */
  currentStyle?: string;
  controls?: LegendEntryControls;
  state?: InitialLayerSettings;
}
export interface DynamicLayerNode {
  /**
   * The id of the layer for referencing within the viewer (does not relate directly to any external service)
   */
  id: string;
  /**
   * The display name of the layer.  If it is not present the viewer will make an attempt to scrape this information.
   */
  name?: string;
  /**
   * The service endpoint of the layer.  It should match the type provided in layerType.
   */
  url: string;
  /**
   * The automatic refresh interval of the layer in minutes. Maximum interval is 100 minutes.
   */
  refreshInterval?: number;
  /**
   * The metadata url of the layer service
   */
  metadataUrl?: string;
  /**
   * The catalogue url of the layer service
   */
  catalogueUrl?: string;
  layerType: "esriDynamic";
  /**
   * Allows individual symbols to have visibility toggled on/off.
   */
  toggleSymbology?: boolean;
  /**
   * Indicates that the dynamic layer with a single layer entry should be rendered without the root group.
   */
  singleEntryCollapse?: boolean;
  layerEntries: DynamicLayerEntryNode[];
  /**
   * Specifies the tolerance in pixels when determining if a feature was clicked. Should be non-negative integer
   */
  tolerance?: number;
  extent?: ExtentWithReferenceNode;
  controls?: LegendEntryControls;
  /**
   * A list of controls which are visible, but disabled for user modification
   */
  disabledControls?: (
    | "opacity"
    | "visibility"
    | "boundingBox"
    | "query"
    | "snapshot"
    | "metadata"
    | "boundaryZoom"
    | "refresh"
    | "reload"
    | "remove"
    | "settings"
    | "data"
    | "styles")[];
  state?: InitialLayerSettings;
}
export interface DynamicLayerEntryNode {
  /**
   * The index of the layer in the map service.
   */
  index: number;
  /**
   * A descriptive name for the layer, can override the name coming from the service.
   */
  name?: string;
  /**
   * A comma separated list of attribute names that should be requested on query.
   */
  outfields?: string;
  /**
   * Allows for overriding the bounding box supplied by the service.
   */
  extent?: {
    xmin: number;
    ymin: number;
    xmax: number;
    ymax: number;
    spatialReference?: SpatialReferenceNode;
  };
  controls?: LegendEntryControls;
  state?: InitialLayerSettings;
  /**
   * A flag indicating this entry is only for state tracking (i.e. it should not be displayed on the UI and all of the controls will be ignored, but the layer itself will be displayed on the map with the given state settings).
   */
  stateOnly?: boolean;
  /**
   * Settings for table panel
   */
  table?: {
    /**
     * Specifies the table title to apply.
     */
    title?: string;
    /**
     * Specifies the additional information to display in the setting panel to give more information about a table.
     */
    description?: string;
    /**
     * Specifies the default table size when first open. True: maximize view; False: split view.
     */
    maximize?: boolean;
    search?: {
      [k: string]: any;
    };
    /**
     * Specifies if the default filters (from columns filter) are apply to the map (definition query). True: it is applied; False: it is not applied.
     */
    applyMap?: boolean;
    /**
     * Specifies the array of columns for the table. When there is an item in this array, it will be use to define wich and how column will be set for the table. If a column is not in the array it will be assume as disabled.
     */
    columns?: ColumnNode[];
  };
}
export interface LegendAuto {
  type: "autopopulate";
}
export interface LegendStructured {
  type: "structured";
  root: EntryGroup;
}
export interface EntryGroup {
  /**
   * Title of the group
   */
  name: string;
  expanded?: boolean;
  children: (EntryGroup | VisibilitySet | Entry | InfoSection)[];
  controls?: LegendGroupControls;
  disabledControls?: LegendGroupControls;
}
export interface VisibilitySet {
  exclusiveVisibility: (EntryGroup | Entry)[];
}
export interface Entry {
  /**
   * Link to a layer defined in the layers section
   */
  layerId: string;
  /**
   * Indicates that the legend block will be hidden from the UI and all its controls will be inaccessible to the user.
   */
  hidden?: boolean;
  controlledIds?: string[];
  /**
   * Index of the 'sublayer' in the case of an ESRI dynamic layer.  This cannot point to an entry with stateOnly:true .
   */
  entryIndex?: number;
  /**
   * Id of the 'sublayer' in the case of an OGC WMS layer
   */
  entryId?: string;
  /**
   * An optional icon, if present it will be used to primarily represent the layer
   */
  coverIcon?: string;
  /**
   * Optional description displayed above the symbology stack.
   */
  description?: string;
  symbologyStack?: SymbologyStack;
  /**
   * An optional style, describes how the symbology stack should be rendered
   */
  symbologyRenderStyle?: "icons" | "images";
}
