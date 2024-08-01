/*import { doc, $ele } from "../shortcuts/shortcuts";*/

/*export*/ class MoegirlWiki {
    static #isMoeSkin = doc.body.classList.contains ( "skin-moeskin" );
    static get isMoeSkin ( ) { return this.#isMoeSkin; }

    static addTool = ( id, name, tooltip = null ) => {
        if ( this.isMoeSkin ) {
            const toolbar = doc.querySelector ( "#moe-global-toolbar.desktop-only" );
            const p_tb = toolbar.querySelector ( "#p-tb" );
            this.addTool = ( id, name, tooltip = null ) => {
                const li = $ele ( "li", { 
                    cls: "toolbar-link",
                    data: { vF0c8232e: true },
                } );
                const a = $ele ( "a", { 
                    id: id, 
                    title: tooltip,
                    data: { vF0c8232e: true },
                } );
                a.innerHTML = name;
                li.append ( a );
                p_tb.append ( li );
                return a;
            }
        } else {
            // Vector
            const p_tb = doc.querySelector ( "#p-tb" );
            // move the "Tools" section forward
            doc.querySelector ( "#p-navigation" ).after ( p_tb );
            const ul = p_tb.querySelector ( ".body > ul" );
            this.addTool = ( id, name, tooltip = null ) => {
                const li = $ele ( "li" );
                const a = $ele ( "a", { id: id, title: tooltip } );
                a.innerHTML = name;
                li.append ( a );
                ul.append ( li );
                return a;
            }
        }
        return this.addTool ( id, name, tooltip );
    };

    static #toOriginalImageURL ( thumbURL ) {
        const path = thumbURL.pathname.split ( "/" );
        path.pop ( ); path.shift ( );
        const thumbIndex = path.findIndex ( item => item === "thumb" );
        if ( thumbIndex >= 0 ) {
            path.splice ( thumbIndex, 1 );
        }
        return new URL ( `${thumbURL.protocol}//${thumbURL.host}/${path.join ( "/" )}` );
    }

    static getPageImageURLs = ( ) => {
        if ( this.isMoeSkin ) {
            // MoeSkin uses lazy image loading
            this.getPageImageURLs = ( ) => {
                const imgSet = new Set ( );
                doc.querySelectorAll ( "a.image > img" ).forEach ( ele => {
                    if ( ele.src != null ) {
                        imgSet.add ( this.#toOriginalImageURL ( new URL ( ele.src ) ) );
                    } else if ( ele.dataset.lazySrc != null ) {
                        imgSet.add ( this.#toOriginalImageURL ( 
                            new URL (  ele.dataset.lazySrc ) ) );
                    }
                } );
                return imgSet;
            }
        } else {
            this.getPageImageURLs = ( ) => {
                const imgSet = new Set ( );
                doc.querySelectorAll ( "a.image > img" ).forEach ( ele => {
                    if ( ele.src != null ) { 
                        imgSet.add ( this.#toOriginalImageURL ( new URL ( ele.src ) ) ); 
                    }
                } );
                return imgSet;
            }
        }
        return this.getPageImageURLs ( );
    }
}
