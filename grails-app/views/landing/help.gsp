<html>
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="Content-type" content="text/html;charset=UTF-8" />
        <meta http-equiv="content-script-type" content="text/javascript" />
        <meta http-equiv="X-UA-Compatible" content="IE=8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        
        <title>${portalBranding.siteHeader}</title>
 
        <buildInfo:comment />

       <g:render template="/js_includes"></g:render>
       <g:render template="/public_theme_includes"></g:render>

        <script type="text/javascript">
            // Supporting only Firefox and Chrome users
            Ext.onReady(Portal.app.browserCheck);

            <portal:motdPopup />
        </script>
    </head>

    <body>
        <g:render template="/header/mainPortalHeader" model="['showLinks': false, 'portalBranding': portalBranding]"></g:render>

         <div class="landingContainer">

              <div id="landingTitle">
                  TPAC Data Portal Help
              </div>
              
              <div class="landingText">The IMOS (Integrated Marine Observing System) <a href="https://help.aodn.org.au/" target="_blank" title="IMOS portal help" alt="IMOS portal help">Data Portal User Guide</a> provides a set of instructions for navigating the portal features. The screenshots in this guide are taken from the IMOS portal, but the instructions are also applicable to the TPAC Data Portal and provide a useful framework for discovering TPAC data</div>
              <div class="landingText">For questions about the TPAC Data Portal, please contact the TPAC help desk: <a href="mailto:helpdesk.tpac.org.au">helpdesk@tpac.org.au</a></div>
          </div>

    </body>
</html>
