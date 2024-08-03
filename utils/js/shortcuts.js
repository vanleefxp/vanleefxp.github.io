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

