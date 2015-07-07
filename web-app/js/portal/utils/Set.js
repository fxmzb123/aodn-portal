/*
 * Copyright 2013 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

Ext.namespace('Portal.utils');

// An inefficient and naive implementation for a set using an array
Ext.define('Portal.utils.Set', { extend: 'Object',
    _arr: null,

    constructor: function() {
        this._arr = [];
    },

    add: function(str) {
        if (!this.contains(str)) {
            this._arr.push(str);
        }
    },

    contains: function(str) {
        return this._arr.indexOf(str) >= 0;
    },

    remove: function(str) {
        if (this.contains(str)) {
            idx = this._arr.indexOf(str);
            this._arr.splice(idx, 1);
        }
    },

    size: function(str) {
        return this._arr.length;
    }
});
