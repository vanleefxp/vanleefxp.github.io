const doc = document;

const $ele = ( name = "div", options = null ) => {
    const ele = doc.createElement ( name, options );
    if ( options != null ) {
        delete options.is;
        if ( options.hasOwnProperty ( "cls" ) ) {
            const cls = options.cls;
            if ( Array.isArray ( cls ) ) {
                // classes passed as array
                ele.classList.add ( ...cls );
            }
            else {
                // classes passed as string
                ele.classList.add ( ...cls.split ( /\s+/g ) );
            }
            delete options.cls;
        }
        if ( options.hasOwnProperty ( "data" ) ) {
            // data set
            Object.assign ( ele.dataset, options.data );
            delete options.data;
        }
        Object.assign ( ele, options );
    }
    return ele;
}

const $text = doc.createTextNode.bind ( doc );
const $frag = doc.createDocumentFragment.bind ( doc );

const addExternalCSS = ( ...urls ) => {
    urls.forEach ( ( url ) => {
        if ( doc.head.querySelector ( `link[rel=stylesheet][href="${url}"]` ) == null ) {
            // Add only if the specified stylesheet is not present
            doc.head.append ( $ele ( "link", { href: url, rel: "stylesheet" } ) );
            console.log ( "CSS Added: ", url );
        }
    } );
}

