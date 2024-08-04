export default {
    name: "icon",
    template: /* html */ `<i :class="this.$props.name"></i>`,
    props: {
        name: String,
    }
};

