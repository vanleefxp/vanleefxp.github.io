export default {
    name: "popover",
    template: /* html */ `
    <div class="popover" v-show="open" @click="close">
        <slot></slot>
    </div>
    `,

    data ( ) {
        return {
            __timerId: null,
        };
    },

    computed: {
        open ( ) {
            return this.__timerId != null;
        },
    },

    props: {
        displayTime: Number,
    },

    methods: {
        show ( ) {
            clearTimeout ( this.__timerId );
            this.__timerId = setTimeout ( 
                ( ) => { this.__timerId = null; }, 
                this.$props.displayTime,
            );
        },

        close ( ) {
            clearTimeout ( this.__timerId );
            this.__timerId = null;
        },
    },
};
