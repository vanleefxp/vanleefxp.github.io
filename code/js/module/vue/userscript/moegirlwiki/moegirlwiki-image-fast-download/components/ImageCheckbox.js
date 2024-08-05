import { Icon } from "../../../../components/assembly.js";

export default {
    name: "image-checkbox",
    template: /* html */ `
    <div class="image-checkbox">
        <img :src="src"/>
        <div>
            <!-- checkbox for multiple image download -->
            <input type="checkbox" v-model="checked"/>
            <!-- image filename display -->
            <div class="content">
            </div>
            <!-- single image download -->
            <a ref="anchor" :href="src" download="" v-show="false"></a>
            <button @click="download">
                <icon name="ri-download-2-line"></icon>
            </button>
        </div>
    </div>
    `,
    components: {
        "icon": Icon,
    },
    data ( ) {
        return {
            checked: false,
        }
    },
    props: {
        src: String,
    },
    methods: {
        download ( ) {
            this.$refs.anchor.click ( );
        },
    }
};