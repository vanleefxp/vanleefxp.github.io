// require: JQuery

const $html = $ ( document.documentElement );
const $head = $ ( document.head );
const $body = $ ( document.body );

const addExternalCSS = ( ...urls ) => {
    urls.forEach ( ( url ) => {
        if ( $head.find ( `link[rel=stylesheet][href="${url}"]` ).length === 0 ) {
            // Add only if the specified stylesheet is not present
            $ ( `<link rel="stylesheet" href="${url}"/>` ).appendTo ( $head );
        }
    } );
}

const addExternalScript = ( ...urls ) => {
    urls.forEach ( ( url ) => {
        if ( $head.find ( `script[src="${url}"]` ).length == 0 ) {
            $ ( `<script src="${url}"></script>` ).appendTo ( $head );
        }
    } )
}
