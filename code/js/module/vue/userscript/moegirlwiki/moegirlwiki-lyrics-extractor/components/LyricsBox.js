import { Icon } from "../../../../components/assembly.js";

export default {
    template: /* html */ `
    <div class="lyrics-box">
        <div class="header">
            <div class="content">
                <slot></slot>
            </div>
            <button class="copy" @click="copyLyrics">
                <icon name="ri-clipboard-line"></icon>
            </button>
        </div>
        <textarea readonly="">{{ content }}</textarea>
    </div>
    `,

    components: {
        "icon": Icon,
    },

    methods: {
        copyLyrics ( ) {
            navigator.clipboard.writeText ( this.$props.content );
            this.$emit ( "lyricsCopy" );
        },
    },

    props: {
        content: String,
    }
}