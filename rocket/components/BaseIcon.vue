<template>
    <div>
        <div class="icon">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            iconName: {
                type: String,
                required: true
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>