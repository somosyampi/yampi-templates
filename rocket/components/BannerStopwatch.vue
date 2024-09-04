<template>
    <div class="banner-stopwatch-holder flex -vcenter">
        <i class="icon icon-stopwatch"></i>

        <Stopwatch class="banner-stopwatch"></Stopwatch>
    </div>
</template>

<script>
import Stopwatch from '@/components/generic/Stopwatch.vue';

export default {
    name: 'BannerStopwatch',

    components: {
        Stopwatch,
    },
};
</script>
