import { Icon } from "../../../../components/assembly.js";

export default {
    template: /* html */ `
    <div class="lyrics-box">
        <div class="lyrics-header">
            <div class="lyrics-header-text">
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