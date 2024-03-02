<template>
    <div class="avatar">
        {{ name }}
    </div>
</template>

<script lang="ts">
export default {
    props: {
        user: Object,
    },
    computed: {
        name() {
            const name = this.user && this.user.name;
            return (name || "").slice(0, 1).toUpperCase();
        },
    },
};
</script>

<style lang="scss" scoped>
.avatar {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background-color: #1c1c1c;
    color: #fff;
    text-align: center;
    line-height: 24px;
}
</style>
