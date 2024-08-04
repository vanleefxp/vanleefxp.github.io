/**
 * `AddResource` is independent from any external script, intended for TamperMonkey userscripts 
 * to add external stylesheets and scripts directly into the DOM structure.
 * 
 * TamperMonkey provides the `@require` property that allow developers to add external scripts
 * but not external CSS. The `GM_addStyle` function only allows for in-place style addition.
 * Also, sometimes using `@require` to add certain external scripts, such as Vue, will cause an
 * error. In this case you will need to add the script by manipulating the DOM structure.  
*/

class AddResource {
    // register all the existing stylesheets and scripts
    static #css = new Set ( Array.from ( 
        document.querySelectorAll ( "link[rel=stylesheet]" ) 
    ).map ( ele => ele.href ) );
    static #js = new Set ( Array.from ( 
        document.querySelectorAll ( "script[src]" ) 
    ).map ( ele => ele.href ) );

    static CSS ( ...urls ) {
        const doc = document;
        const head = doc.head;
        urls.forEach ( ( url ) => {
            if ( !this.#css.has ( url ) ) {
                this.#css.add ( url );
                const link = doc.createElement ( "link" );
                link.rel = "stylesheet";
                link.href = url;
                head.append ( link );
            }
        } );
        return this;
    }

    static #addScript ( urls, toBody = false, asModule = false ) {
        const doc = document;
        const target = toBody ? doc.body : doc.head;
        const scriptType = asModule ? "module" : "text/javascript";
        urls.forEach ( ( url ) => {
            const script = doc.createElement ( "script" );
            script.src = url;
            script.type = scriptType;
            target.append ( script );
        } );
        return this;
    }

    static JS ( ...urls ) {
        this.#addScript ( urls, false, false );
        return this;
    }

    static {
        this.JS.asModule = ( ...urls ) => {
            this.#addScript ( urls, false, true );
            return this;
        };
        this.JS.toBody = ( ...urls ) => {
            this.#addScript ( urls, true, false );
            return this;
        }

        this.JS.toBody.asModule = ( ...urls ) => {
            this.#addScript ( urls, true, true );
            return this;
        }
    }
}

