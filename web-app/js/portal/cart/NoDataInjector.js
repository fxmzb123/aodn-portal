/*
 * Copyright 2014 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

Ext.namespace('Portal.cart');

Ext.define('Portal.cart.NoDataInjector', { extend: 'Portal.cart.BaseInjector',

    constructor: function(config) {
        Portal.cart.NoDataInjector.superclass.constructor.call(this, Ext.apply(this, config));
    },

    _getDataFilterEntry: function() {
        return OpenLayers.i18n('noDataMessage');
    },

    _getDataMarkup: function() {
        return '';
    }
});
