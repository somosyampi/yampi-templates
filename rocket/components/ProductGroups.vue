<template>
    <div
        v-if="payload.length || loading"
        v-observe-visibility="{
            callback: visibilityChanged,
            once: true,
        }"
        class="main-product-group"
    >
        <div
            class="-title"
            :class="{ '-loading': loading }"
        >
            Outras opções
        </div>

        <ul class="inline">
            <li
                v-for="product in payload"
                :key="product.id"
            >
                <a :href="product.url_path">
                    <CustomImage
                        class="-loading"
                        :src="product.images.data[0].url"
                        :alt="product.name"
                        :thumbor="{ resize: '60x60' }"
                    />
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
import BaseProduct from '@/components/product/BaseProduct.vue';

export default {
    name: 'ProductGroups',

    extends: BaseProduct,

    data: () => ({
        route: 'groups',
    }),
};
</script>
