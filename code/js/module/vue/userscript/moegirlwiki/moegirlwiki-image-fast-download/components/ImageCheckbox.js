export default {
    name: "image-checkbox",
    template: /* html */ `
    <div class="image-checkbox">
        <img :src="src"/>
        <input type="checkbox" v-model="checked"/>
    </div>
    `,
    data ( ) {
        return {
            checked: false,
        }
    },
    props: {
        src: String,
    },
};