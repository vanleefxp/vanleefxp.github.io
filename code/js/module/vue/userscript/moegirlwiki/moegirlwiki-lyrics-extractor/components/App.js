// require: jQuery

import { Icon, Popover, FXPDialog, FullPagePrompt } from "../../../../components/assembly.js";
import LyricsBox from "./LyricsBox.js";

const GITHUB_REPO_URL = "https://github.com/vanleefxp/MoegirlWikiLyricsExtractor";

export default {
    template: /*html*/ `
    <a id="t-lyrics-extractor" 
        title="一键提取 LyricsKai 模板歌词" 
        @click="openDialog">
        歌词提取助手
    </a>
    <fxp-dialog ref="dialog" class="mg-dialog" id="dialog_mg-lyrics">
        <!-- Dialog Header -->
        <template v-slot:header-content>
            萌娘百科歌词提取助手
        </template>
        <template v-slot:header-buttons>
            <button @click="openGitHubPage">
                <icon name="ri-github-fill"></icon>
            </button>
        </template>
        <!-- Dialog Main -->
        <template v-slot:main-content>
            <div class="description">
                轻松提取萌娘百科页面中使用 <code>LyricsKai</code> 模板书写的歌词，自动分离原文译文。若需复制歌词全文可点击歌词框右上角的 <icon name="ri-clipboard-line"></icon> 复制按钮；也可以只选取需要的段落进行复制。
            </div>
            <div class="tabs"></div>
            <div class="preview" v-if="foundLyrics.length > 0">
                <div class="lyrics-group" v-for="(lyricsGroup, i) in foundLyrics">
                    <lyrics-box v-for="(lyricsText, j) in lyricsGroup" 
                        :content="lyricsText"
                        @lyricsCopy="showCopiedPopover">
                        #{{ i + 1 }} {{ j > 0 ? "译文" : "原文" }}
                    </lyrics-box>
                </div>
            </div>
            <div class="preview" v-else>
                <full-page-prompt>
                    未发现歌词
                </full-page-prompt>
            </div>
        </template>
        <!-- Dialog Footer -->
        <template v-slot:footer-content>
            <div v-if="lyricsCount > 0">共发现 <data>{{ lyricsCount }}</data> 段歌词</full-page-prompt>
            <div v-else>当前页面未发现可提取歌词</div>
        </template>
        <!-- Popovers -->
        <template v-slot:popovers>
            <popover ref="copiedPopover" :display-time="1500">
                <icon name="ri-checkbox-circle-fill" class="text-success"></icon>
                复制成功
            </popover>
            <popover ref="copyFailedPopover" :display-time="1500">
                <icon name="ri-close-circle-fill" class="text-error"></icon>
                复制失败
            </popover>
        </template>
    </fxp-dialog>
    `,

    components: {
        "icon": Icon,
        "popover": Popover,
        "full-page-prompt": FullPagePrompt,
        "lyrics-box": LyricsBox,
        "fxp-dialog": FXPDialog,
    },

    data ( ) {
        return {
            initialized: false,
            foundLyrics: [ ],
        };
    },

    computed: {
        lyricsCount ( ) { return this.foundLyrics.length; },
    },

    methods: {
        getPureLyricsText ( node ) {
            if ( node instanceof Text ) {
                return node.textContent;
            } else if ( node instanceof HTMLElement ) {
                if ( node.matches ( `:not(
                        style, rt,
                        span.template-ruby-hidden,
                        span.Utawari-lyric-tab,
                        sup.reference
                )` ) ) {
                    let output = "";
                    node.childNodes.forEach ( childNode => {
                        output += getPureLyricsText ( childNode );
                    } );
                    return output;
                }
            }
            return "";
        },

        extractLyrics ( $lyricsBlock ) {
            const output = [ ];
            $lyricsBlock.find ( ".Lyrics-line" ).each (
                ( _, $lyricsLine ) => {
                    let i = 0; // TODO
                    $lyricsLine.children( ).each ( ( _, $lyricsTextBlock ) => {
                        if ( !$lyricsTextBlock.is ( ".Lyrics-column-wrapped" ) ) {
                            if ( output [ i ] == null ) { output.push ( "" ); }
                            output [ i ] += getPureLyricsText ( $lyricsTextBlock.get ( 0 ) ) + "\n";
                            i++;
                        }
                    } );
                }
            );
            return output;
        },

        getPageLyrics ( ) {
            $ ( ".Lyrics" ).each ( ( _, $lyricsBlock ) => {
                this.foundLyrics.push ( extractLyrics ( $lyricsBlock ) );
            } );
        },

        openDialog ( ) {
            if ( !this.initialized ) { 
                getPageLyrics (  );
                this.initialized = true;
            }
            this.$refs.dialog.show ( );
        },

        openGitHubPage ( ) {
            window.open ( GITHUB_REPO_URL );
        },
        
        showCopiedPopover ( ) {
            this.$refs.copiedPopover.show ( );
        }
    }
};