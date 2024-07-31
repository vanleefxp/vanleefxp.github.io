class FXPDialog extends HTMLDialogElement {
    
    static #template =  $ele ( "template" );
    static #colorMediaQuery = matchMedia ( "(prefers-color-scheme: dark)" );

    static {
        // Init dialog template
        this.#template.innerHTML = /* html */ `
        <link rel="stylesheet" href="https://vanleefxp.github.io/utils/css/web-component/fxp-dialog/fxp-dialog.css"/>
        <slot name="style"></slot>
        <div class="dialog-window">
            <header>
                <div class="content">
                    <strong>
                        <slot name="title">Dialog</slot>
                    </strong>
                </div>
                <div class="buttons">
                    <slot name="header-buttons"></slot>
                    <button class="close">
                        <i class="ri-close-line"></i>
                    </button>
                </div>
            </header>
            <div class="content">
                <div class="content-internal">
                    <slot name="main"></slot>
                </div>
            </div>
            <footer>
                <div class="content">
                    <slot name="prompt"></slot>
                </div>
                <div class="buttons">
                    <slot name="footer-buttons"></slot>
                </div>
            </footer>
        </div>
        <slot name="popovers"></slot>
        `;
    }

    #header; #main; #footer;

    constructor ( ) { super ( ); }

    connectedCallback ( ) {
        const setColorMode = ( ) => {
            this.dataset.colorMode = FXPDialog.#colorMediaQuery.matches ? "dark" : "light";
        }; // Switch color mode according to system settings
        FXPDialog.#colorMediaQuery.addEventListener ( "change", setColorMode );
        setColorMode ( );

        const shadow = this.attachShadow ( { mode: "open" } );
        shadow.appendChild ( template.content.cloneNode ( true ) );

        this.header.querySelector ( "button.close" ).addEventListener ( "click", ( ) => {
            this.close ( );
        } );
    }

    get header ( ) {
        if ( this.#header == null ) {
            this.#header = this.shadowRoot.querySelector ( ".dialog-window > header" );
        }
        return this.#header;
    }

    get footer ( ) {
        if ( this.#footer == null ) {
            this.#footer = this.shadowRoot.querySelector ( ".dialog-window > footer" );
        }
        return this.#footer;
    }

    get main ( ) {
        if ( this.#main == null ) {
            this.#main = this.shadowRoot.querySelector ( ".dialog-window > .content" );
        }
        return this.#main;
    }
}

customElements.define ( "fxp-dialog", FXPDialog, { extends: "dialog" } );