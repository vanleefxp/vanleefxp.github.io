import { Icon } from "./Icon";

const colorMediaQuery = matchMedia ( "(prefers-color-scheme: light)" );

export default {
    name: "fxp-dialog",
    template: /* html */ `
    <dialog ref="dialog" 
            class="fxp-dialog" 
            :data-color-mode="colorMode" 
            auto-focus="">
        <div class="window">
            <!-- Dialog Header -->
            <div class="header">
                <div class="content">
                    <slot name="header-content"></slot>
                </div>
                <div class="buttons">
                    <slot name="header-buttons"></slot>
                    <button class="close" @click="close">
                        <icon name="ri-close-fill"></icon>
                    </button>
                </div>
            </div>
            <!-- Dialog Main -->
            <div class="main">
                <div class="content">
                    <slot name="main-content"></slot>
                </div>
            </div>
            <!-- Dialog Footer -->
            <div class="footer">
                <div class="content">
                    <slot name="footer-content"></slot>
                </div>
            </div>
        </div>
        <!-- Popovers -->
        <slot name="popovers"></slot>
    </dialog>
    `,

    components: {
        "icon": Icon,
    },

    data: ( ) => ( {
        colorMode: "dark",
    } ),

    methods: {
        show ( ) {
            this.$refs.dialog.showModal ( );
            document.body.classList.add ( "prevent-scroll" );
        },

        close ( ) {
            this.$refs.dialog.close ( );
            document.body.classList.remove ( "prevent-scroll" );
        },

        __updateColorMode ( ) {
            this.colorMode = colorMediaQuery.matches ? "light" : "dark";
        }
    },

    mounted ( ) {
        // start tracking system color mode
        colorMediaQuery.addEventListener ( "change", this.__updateColorMode );
        this.__updateColorMode ( );
    },

    beforeUnmount ( ) {
        // stop tracking system color mode
        colorMediaQuery.removeEventListener ( "change", this.__updateColorMode );
    },
};

