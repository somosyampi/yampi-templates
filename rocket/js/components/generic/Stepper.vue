<template>
    <div class="stepper-container">
        <ul class="progressbar">
            <li
                v-for="(item, i) in items"
                :key="calculateKey(item)"
                :class="stepClass(item)"
                @click="handleClick(i)"
            >
                <p>{{ i + 1 }}</p>
            </li>
        </ul>
    </div>
</template>

<script>
import { uuidv4 } from '@/mixins/helpers';

export default {
    name: 'Stepper',

    props: {
        active: {
            type: Number,
            required: true,
        },

        items: {
            type: Array,
            required: true,
        },
    },

    methods: {
        uuidv4,

        calculateKey(item) {
            return item.id || this.uuidv4();
        },

        stepClass(itemActive) {
            return this.items.indexOf(itemActive) <= this.active ? 'active' : '';
        },

        handleClick(stepNum) {
            this.$emit('click', stepNum);
        },
    },
};
</script>
