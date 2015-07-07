/*
 * Copyright 2015 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

Ext.namespace('Portal.details');

Ext.define('Portal.details.SubsetItemsWrapperPanel', { extend: 'Ext.Panel',

    constructor: function(cfg) {

        var tabPanelForLayer = new Portal.details.SubsetItemsTabPanel({
            map: cfg.map,
            layer: cfg.layer,
            listeners: {
                beforeTabChange: this._doTracking
            }
        });

        this.createTools();

        var config = Ext.apply({
            id: cfg.layerItemId,
            cls: 'subsetPanelAccordionItem',
            title: '<h4>' + cfg.layer.name + '</h4>',
            autoHeight: true,
            defaults: {
                style: {padding: '10px'},
                autoHeight: true
            },
            items: [tabPanelForLayer],
            toolTemplate: new Ext.Template('<div class="x-tool-awesome fa fa-fw {styles}" title="{title}"></div>'),
            tools: [
                this.errorToolItem,
                this.spinnerToolItem,
                this.deleteToolItem
            ]
        }, cfg);

        Ext.MsgBus.subscribe(PORTAL_EVENTS.LAYER_LOADING_END, function(e, openLayer) {
            this.handleLayerLoadingEnd(openLayer);
        }, this);


        Portal.details.SubsetItemsWrapperPanel.superclass.constructor.call(this, config);
    },

    handleLayerLoadingEnd: function(openLayer) {
        if (openLayer == this.layer) {
            this.tools.spinnerToolItem.hide();
            if (openLayer.hasImgLoadErrors()) {
                this.showError();
            }
        }
    },

    showError: function() {
        this.tools.errorToolItem.show();
    },

    createTools: function() {

        this.errorToolItem = {
            id: 'errorToolItem',
            styles: 'error fa-exclamation-triangle',
            hidden: true,
            title: OpenLayers.i18n('layerProblem')
        };
        this.spinnerToolItem = {
            id: 'spinnerToolItem',
            styles: 'fa-spin fa-spinner',
            title: OpenLayers.i18n('loadingMessage')
        };
        this.deleteToolItem = {
            id: 'deleteToolItem',
            styles: 'fa-close',
            handler: this._layerDelete,
            title: OpenLayers.i18n('removeDataCollection'),
            scope: this
        };
    },

    _layerDelete: function(event, toolEl, panel) {

        var collectionId = this.layer.parentGeoNetworkRecord.data.uuid;
        var record = Portal.data.ActiveGeoNetworkRecordStore.instance().getRecordFromUuid(collectionId);
        Portal.data.ActiveGeoNetworkRecordStore.instance().remove(record);
    },

    _doTracking: function(panel, newTab, currentTab) {

        if (currentTab) {
            trackUsage(OpenLayers.i18n('subsetItemsTrackingCategory'),
                OpenLayers.i18n('subsetItemsTabsTrackingAction'),
                newTab.title,
                this.layer.name
            );
            return true;
        }
    }
});
