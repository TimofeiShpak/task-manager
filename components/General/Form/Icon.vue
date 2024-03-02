<template>
    <svg :style="styles" class="ico">
        <use :xlink:href="xlinkHref" />
    </svg>
</template>

<script lang="ts">
export default {
    props: {
        icon: {
            type: String,
            required: true,
        },
        size: {
            type: String,
            default: "24px",
        },
        width: String,
        height: String,
    },
    data() {
        return {};
    },
    computed: {
        xlinkHref() {
            return `#${this.icon}`;
        },
        styles() {
            var width = this.width || this.size,
                height = this.height || this.size,
                style = {};

            if (width) {
                style.width = width;
            }

            if (height) {
                style.height = height;
            }

            return style;
        },
    },
};
</script>