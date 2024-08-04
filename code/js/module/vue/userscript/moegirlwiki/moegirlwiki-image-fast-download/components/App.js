import { Icon, FXPDialog } from "../../../../components/assembly.js";

export default {
    template: /* html */ `
    <a id="t-image-downloader"
        title="快速打包下载页面图片"
        @click="openDialog">
    图片下载助手
    </a>
    <fxp-dialog ref="dialog" class="mg-dialog">
        <!-- Dialog Header -->
        <template v-slot:header-content>
            <div>萌娘百科图片下载助手</div>
        </template>
        <template v-slot:header-buttons>
            <button @click="openGitHubPage">
                <icon name="ri-github-fill"></icon>
            </button>
        </template>
        <!-- Dialog Main -->
        <template v-slot:main-content>
            <div class="description">
                快速提取萌娘百科当前词条中所出现的图片。可点击勾选需要的图片一键打包下载。
            </div>
        </template>
        <!-- Dialog Footer -->
        <template v-slot:footer-content>
            <div v-if="imageCount > 0">共发现 <data>{{ imageCount }}</data> 张图片</div>
            <div v-else>当前页面未发现可下载图片</div>
        </template>
    </fxp-dialog>
    `,
    components: {
        "icon": Icon,
        "fxp-dialog": FXPDialog,
    },
    data ( ) {
        return {
            images: [ ],
        }
    },
    computed: {
        imageCount ( ) {
            return this.images.length;
        }
    },
    methods: {
        openDialog ( ) {
            this.$refs.dialog.show ( );
        }
    }
};