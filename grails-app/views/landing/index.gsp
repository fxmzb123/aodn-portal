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
                  TPAC Data Portal
              </div>
              
              <div class="landingSubRight">
                  <a href="${resource(dir: 'home')}" id="landingBigButton" title="Get Data" onclick="trackUsage('Get Data Button', 'Clicked');return true;">Get Data</a>
              </div>

              <div>TPAC dataportal, combining the TPAC Digital Library with the 123 portal. TPAC hosts a distributed library of oceanographic and climate data that brings together the resources and data held by the Antarctic Climate and Ecosystems CRC, the Australian Government Antarctic Division, the Bureau of Meteorology Research Centre, CSIRO Marine & Atmospheric Research, and the University of Tasmania.</div>
              <div class="landingText">The library is built on the Open-source Project for a Network Data Access Protocol (OPeNDAP) framework, which allows self describing data (such as netCDF or HDF) to be interrogated and delivered seamlessly across the web. Users are able to directly access the data using any application that has been linked with the appropriate OPeNDAP libraries. Applications include web browsers, GrADS, Ferret, Excel and common programming languages such as Matlab, C, Java and Fortran.</div>
              <div>The TPAC Digital Library 123 Portal implements IMOS 123 portal software to make the TPAC Digital discoverable and accessible through this web portal. Over time the 123 portal will contain all TPAC digital Library collections.</div>
              
              <div class="clear"></div>
              
              <div class="landingText">The TPAC Data Portal is hosted and maintained by the Tasmanian Partnership for Advanced Computing at the University of Tasmania, Australia.</div>
              <div class="landingLogo">
                  <img src="${resource(dir:"images", file: "tpac_logo_large.png")}" alt="tpac_logo" id="tpac_logo" />
              </div>

              <div class="landingText">This project is supported by the Research Data Services (RDS). RDS is supported by the Australian Government through the National Collaborative Research Infrastructure Strategy Program.</div>
              <div class="landingLogo">
                  <img src="${resource(dir:"images", file: "rds_logo.png")}" alt="rds_logo" id="rds_logo" />
              </div>
              
              <div class="landingText">The TPAC Data Portal is also supported by the following organisations:</div>
              <div class="landingLogo">
                  <img src="${resource(dir:"images", file: "imos_logo_footer.png")}" alt="imas_logo" id="imas_logo" />
                  <img src="${resource(dir:"images", file: "nectar_logo.png")}" alt="nectar_logo" id="imas_logo" />
              </div>

    </body>
</html>
