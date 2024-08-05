import ImageCheckbox from "./ImageCheckbox.js";

export default {
    template: /* html */ `
    <div class="gallery">
        <image-checkbox v-for="image in images"></image-checkbox>
    </div>
    `,
    components: {
        "image-checkbox": ImageCheckbox,
    },
    data ( ) {
        return {
            images: [ ],
        }
    },
}