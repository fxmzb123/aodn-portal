Ext.namespace('Portal.common.downloadCart');

Ext.EventManager.addListener( window, 'load', getInitialDownloadCartCount );

// Public methods
function addToDownloadCart( links ) {

    var condensedLinks = new Array();

    // Extract only the fields we need
    Ext.each( links,
        function( link ){

            condensedLinks.push( { title: link.title, type: link.type, href: link.href, protocol: link.protocol } );
        }
    );

    var linksAsJson = Ext.util.JSON.encode( condensedLinks );

    Ext.Ajax.request({
        url: 'downloadCart/add',
        params: { newEntries: linksAsJson },
        success: _handleSuccessAndShow,
        failure: _handleFailureAndShow
    });
}

function getInitialDownloadCartCount() {

    Ext.Ajax.request({
        url: 'downloadCart/getSize',
        success: function( resp ) {

            var count = resp.responseText;

            if ( !_isValidNumber( count ) ) {

                _handleFailureAndHide( resp );
            }
            else if ( count == "0" ) {

                _handleSuccessAndHide( resp );
            }
            else {

                _handleSuccessAndShow( resp );
            }
        },
        failure: _handleFailureAndHide
    });
}

function clearDownloadCart() {

    Ext.Ajax.request({
        url: 'downloadCart/clear',
        success: _handleSuccessAndHide,
        failure: _handleFailureAndShow
    });
}

// Internal methods
function _handleSuccessAndShow( resp ) {

    var response = resp.responseText;

    if ( !_isValidNumber( response ) ) {

        console.log( 'Invalid response from server: \'' + response + '\' (but with success code ' + resp.status + ')' );
        _updateCount( "?" );
    }
    else {

        _updateCount( response );
    }

    _showCartControl();
    _flashUI();
}

function _handleSuccessAndHide( resp ) {

    var response = resp.responseText;

    if ( !_isValidNumber( response ) ) {

        console.log( 'Invalid response from server: \'' + response + '\' (but with success code ' + resp.status + ')' );
        _updateCount( "?" );
    }
    else {

        _updateCount( response );
    }

    _hideCartControl();
    _flashUI();
}

function _handleFailureAndShow( resp ) {

    console.log( 'Server-side failure: \'' + resp.responseText + '\' (status: ' + resp.status + ')' );

    _updateCount( "?" );
    _showCartControl();
    _flashUI();
}

function _handleFailureAndHide( resp ) {

    console.log( 'Server-side failure: \'' + resp.responseText + '\' (status: ' + resp.status + ')' );

    _updateCount( "?" );
    _hideCartControl();
    _flashUI();
}

function _updateCount( count ) {

    var cartSizeEl = Ext.get( 'downloadCartSize' );

    cartSizeEl.update( count + '' );
}

function _showCartControl() {

    var cartEl = Ext.get( 'downloadCart' );

    cartEl.removeClass( 'hiddenCart' );
}

function _hideCartControl() {

    var cartEl = Ext.get( 'downloadCart' );

    cartEl.addClass( 'hiddenCart' );
}

function _flashUI() {
    
    var cartEl = Ext.get('downloadCart');
    
    // Animate UI
    cartEl.animate(
        // animation control object
        {
            backgroundColor: { from: '#FFFFCC',
                                 to: _getDownloadCartUIOriginalColor() }
        },
        0.7,          // animation duration
        null,         // callback
        'bounceBoth', // easing method
        'color'       // animation type ('run','color','motion','scroll')
    );
}

var _downloadCartOriginalColor;

function _getDownloadCartUIOriginalColor() {
    
    if ( _downloadCartOriginalColor == undefined ) {
        
        _downloadCartOriginalColor = Ext.get('downloadCart').getStyles('backgroundColor').backgroundColor;
    }
    
    return _downloadCartOriginalColor;
}

function _isValidNumber( s ) {

    return !isNaN( parseInt( s, 10 /* decimal */ ) );
}