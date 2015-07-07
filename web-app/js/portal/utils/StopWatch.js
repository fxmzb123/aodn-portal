/*
 * Copyright 2014 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

Ext.namespace('Portal.utils');

Ext.define('Portal.utils.StopWatch', { extend: 'Ext.util.Observable',

    start: function() {
        this.startTimestamp = this._now();
    },

    stop: function() {
        this.endTimestamp = this._now();
        this.fireEvent('stopped');
    },

    getElapsedMillis: function() {
        return this.endTimestamp.diff(this.startTimestamp);
    },

    _now: function() {
        return moment();
    }
});
