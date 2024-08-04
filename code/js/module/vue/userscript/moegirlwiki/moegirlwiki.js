// require: jQuery

export default class MoegirlWiki {
    static #isMoeSkin = document.body.classList.contains ( "skin-moeskin" );
    static get isMoeSkin ( ) { return this.#isMoeSkin; }

    static $addTool = ( ) => {
        if ( this.isMoeSkin ) {
            const $toolbar = $ ( "#moe-global-toolbar.desktop-only" );
            const $p_tb = $toolbar.find ( "#p-tb" );
            this.$addTool = ( ) => {
                const $li = $ ( "<li>" )
                    .addClass ( "toolbar-link" )
                    .data ( { vF0c8232e: true } )
                    .appendTo ( $p_tb );
                return $li;
            }
        } else {
            // Vector
            const $p_tb = $ ( "#p-tb" );
            // move the "Tools" section forward
            $ ( "#p-navigation" ).after ( $p_tb );
            const $ul = $p_tb.find ( ".body > ul" );
            this.$addTool = ( ) => {
                const $li = $ ( "<li>" ).appendTo ( $ul );
                return $li;
            }
        }
        return this.$addTool ( );
    };

    static addTool ( ) {
        return this.$addTool ( ).get ( 0 );
    }

    static #toOriginalImageURL ( thumbSrc ) {
        const thumbURL = new URL ( thumbSrc )
        const path = thumbURL.pathname.split ( "/" );
        path.pop ( ); path.shift ( );
        const thumbIndex = path.findIndex ( item => item === "thumb" );
        if ( thumbIndex >= 0 ) {
            path.splice ( thumbIndex, 1 );
        }
        return `${thumbURL.protocol}//${thumbURL.host}/${path.join ( "/" )}`;
    }

    static getPageImageURLs = ( ) => {
        if ( this.isMoeSkin ) {
            // MoeSkin uses lazy image loading
            this.getPageImageURLs = ( ) => {
                const imgSet = new Set ( );
                $ ( "a > img" ).each ( ( _, ele ) => {
                    if ( ele.src != null && ele.src.length > 0 ) {
                        imgSet.add ( this.#toOriginalImageURL ( ele.src ) );
                    } else if ( 
                        ele.dataset.lazySrc != null && 
                        ele.dataset.lazySrc.length > 0 
                    ) {
                        imgSet.add ( this.#toOriginalImageURL ( ele.dataset.lazySrc ) );
                    }
                } );
                return imgSet;
            }
        } else {
            this.getPageImageURLs = ( ) => {
                const imgSet = new Set ( );
                $ ( "a > img" ).each ( ( _, ele ) => {
                    if ( ele.src != null && ele.src.length > 0 ) { 
                        imgSet.add ( this.#toOriginalImageURL ( ele.src ) ); 
                    }
                } );
                return imgSet;
            }
        }
        return this.getPageImageURLs ( );
    }
}
