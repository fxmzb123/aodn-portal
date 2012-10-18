Ext.namespace('Portal.filter');

Portal.filter.FilterPanel = Ext.extend(Ext.Panel, {
    constructor: function(cfg) {
    	var config = Ext.apply({
	    	id: 'filterPanel',
	        title: 'Filters',
	        layout:'table',
	        bodyStyle:'padding:5px',
			layoutConfig: {
				// The total column count must be specified here
				columns: 3,
				tableAttrs: {
					cellspacing: '10px',
					style: {
						width: '100%',
						font: '11 px'
					}
				}
			},
	        autoDestroy: true
    	}, cfg);

    	this.GET_FILTER = "layer/getFiltersAsJSON";
    	this.activeFilters = {};


        Portal.filter.FilterPanel.superclass.constructor.call(this, config);
    },

    initComponent: function(cfg) {
    	this.AND_QUERY = " AND ";
    	this.on('addFilter', this._handleAddFilter);

    	Portal.filter.FilterPanel.superclass.initComponent.call(this);
    },

    setLayer: function(layer){
    	this.layer = layer;
    	this.update();
    },

    createFilter: function(layer, filter){
    	var newFilter = undefined;
    	if(filter.type === "String"){
    		newFilter = new  Portal.filter.FilterCombo({
    			fieldLabel: filter.label
    		});

    	}
    	else if(filter.type == "Date"){
    		newFilter = new Portal.filter.TimeFilter({
				fieldLabel: filter.label
			});
    	}
    	else if(filter.type === "Boolean"){
    		newFilter = new Portal.filter.BooleanFilter({
    		   fieldLabel: filter.label
    		});
    	}
    	else if (filter.type === "BoundingBox"){
            newFilter = new Portal.filter.BoundingBoxFilter({
            	fieldLabel: filter.label
            })
    	}
    	else{
    		//Filter hasn't been defined
    	}

    	if(newFilter != undefined){
    		newFilter.setLayerAndFilter(layer, filter);
			this.relayEvents(newFilter, ['addFilter']);
			this._addLabel(filter);
    		this.add(newFilter);
    		this._addRemoveFieldButton(newFilter);
    	}
    },

	_addLabel: function(filter){
		var label = new Ext.form.Label({
			text: filter.label + ": ",
			style: 'font-size: 11px; text-align: top;'
		});
		this.add(label);
	},

    _addRemoveFieldButton: function(field){
    	var removeButton = new Ext.Button({
			width: 14,
			iconCls: 'p-remove-filter',
			field: field,
			listeners:{
				scope: this,
				'click': function(button, event){
					this._handleRemoveFilter(button.field);
					button.field.handleRemoveFilter();
				}
			}
		});

		this.add(removeButton);
    },

    update: function(layer, show, hide, target){
		this.layer = layer;

		if(layer.grailsLayerId != undefined){

			Ext.Ajax.request({
				url: this.GET_FILTER,
				params: {
					layerId: layer.grailsLayerId
				},
				scope: this,
				failure: function(resp) {
					this.setVisible(false);
					hide.call(target, this);
				},
				success: function(resp, opts) {
					var filters = Ext.util.JSON.decode(resp.responseText);
					if(filters.length > 0){
						this.setVisible(true);
						Ext.each(filters,
							function(filter, index, all) {
								this.createFilter(layer, filter);
							},
							this
						);

						this.addButton = new Ext.Button({
							cls: "x-btn-text-icon",
							icon: "images/basket_add.png",
							anchor: 'right',
							text: 'Add Data to Cart',
							listeners: {
								scope: this,
								click: this._addToCart
							}
						});

						this.add(this.addButton);

						this.doLayout();
						show.call(target, this);
					}
					else{
						hide.call(target, this);
					}
				}
			});
		}
		else{
			//probably some other layer added in through getfeatureinfo, or user added WMS
		}
	},

    _updateFilter: function(){
    	var combinedCQL = "";
    	var count = 0;
		for(var key in this.activeFilters){
			count++;
		}

		if(count > 0){
			for(var name in this.activeFilters){
				if(this.activeFilters[name].hasValue()){
					combinedCQL += this.activeFilters[name].getCQL() + this.AND_QUERY
				}
			}

			if(combinedCQL.length > 0){
				combinedCQL = combinedCQL.substr(0, combinedCQL.length - this.AND_QUERY.length);

				this.layer.mergeNewParams({
					CQL_FILTER: combinedCQL
				});
			}
		}
		else{
         	delete this.layer.params["CQL_FILTER"];
         	this.layer.redraw();
		}
    },

    _handleAddFilter: function(aFilter){
    	this.activeFilters[aFilter.getFilterName()] = aFilter;
		this._updateFilter();
    },

    _handleRemoveFilter: function(aFilter){
    	delete this.activeFilters[aFilter.getFilterName()];
    	this._updateFilter();
    },

    _makeWFSURL: function(){

    	var query = Ext.urlEncode({
			typeName: this.layer.params.LAYERS,
			SERVICE: "WFS",
			outputFormat: "csv",
			REQUEST: "GetFeature",
			VERSION: "1.0.0",  	//This version has BBOX the same as WMS. It's flipped in 1.1.0
			CQL_FILTER: this.layer.params.CQL_FILTER      //Geonetwork only works with URL encoded filters
		});

    	var wfsURL =  this.layer.server.uri + "/../wfs?" + query;

		return wfsURL;
    },

    _addToCart: function(){
		var tup = new Object();
		tup.record = new Object();
		tup.record.data = new Object();
		tup.link = new Object();

		//pretending to be a geonetwork metadata record
		tup.record.data["rec_uuid"] = this.layer.getMetadataUrl();
		tup.record.data["rec_title"] =  this.layer.title;
		tup.record.data["title"] =  this.layer.title;
		tup.link["type"] =  "application/x-msexcel";
		tup.link["href"] =  this._makeWFSURL();
		tup.link["protocol"] =  "WWW:DOWNLOAD-1.0-http--downloaddata";
		tup.link["preferredFname"] = this.layer.params.LAYERS + ".csv";

        addToDownloadCart(tup);
    }
});