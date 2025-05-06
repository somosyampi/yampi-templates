<template>
    <div class="masonry-container">
        <div class="header">
            <slot name="header" />
        </div>
        <slot />
    </div>
</template>

<script>
export default {
    name: 'MansonryLayout',
};
</script>

<style lang="scss" scoped>
.masonry-container {
    display: grid;
    max-width: 740px;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 32px;
    margin: 0 auto;
    grid-auto-rows: 0px;

    @media screen and (max-width: 1220px) {
        max-width: 538px;
        display: flex;
        flex-flow: column nowrap;
        grid-gap: 0;

        .holder-review {
            max-width: 100%;
            margin-top: 32px;
        }
    }

    @media screen and (max-width: 700px) {
        grid-gap: 0;
        max-width: unset;

        .holder-review {
            margin-top: 0;
        }
    }

    .header {
        grid-area: 1 / 1 / 4 / 3;
        border: none;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
        grid-row-end: span 2;

        @media screen and (max-width: 700px) {
            display: block;
        }

        .select-order {
            @media screen and (max-width: 700px) {
                display: flex;
                justify-content: space-between;
                margin-top: 51px;
            }

            .custom-select {
                @media screen and (max-width: 700px) {
                    flex-grow: 2;
                }
            }

            .-title {
                color: var(--black-medium-color-contrast);
                font-size: var(--font-12);
            }
        }
    }
}
</style>
