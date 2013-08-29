
/*
 * Copyright 2013 IMOS
 *
 * The AODN/IMOS Portal is distributed under the terms of the GNU General Public License
 *
 */

describe('Portal.ui.VisualisePanel', function() {

    var appConfig = {
        initialBbox: '130,-60,160,-20',
        autoZoom: false,
        hideLayerOptions: false
    };

    var panel = new Portal.ui.VisualisePanel({
        appConfig: appConfig,
        mapPanel: new Portal.ui.MapPanel({
            appConfig: appConfig
        })
    });

    it('listens for beforehide event', function() {

        spyOn(panel, 'onBeforeHide');

        panel.fireEvent('beforehide');

        expect(panel.onBeforeHide).toHaveBeenCalled();
    });

    it('tells the mappanel before it hides', function() {

        spyOn(panel.mapPanel, 'beforeParentHide');

        panel.onBeforeHide();

        expect(panel.mapPanel.beforeParentHide).toHaveBeenCalled();
    });
});
