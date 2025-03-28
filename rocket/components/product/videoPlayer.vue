<template>
    <div>
        <div
            v-if="!clicked"
            class="relative"
            @click="clicked = true;"
        >
            <CustomImage
                :src="imageUrl"
                :thumbor-enabled="false"
                :alt="'product video'"
                class="-loading"
            />
            <i class="icon icon-yt-play" />
        </div>

        <div
            v-else
            class="embed-container"
        >
            <iframe
                :src="videoUrl+'&muted=1'"
                frameborder="0"
                allowfullscreen
                allow="accelerometer;
                        autoplay;
                        clipboard-write;
                        encrypted-media;
                        gyroscope;
                        picture-in-picture"
            />
        </div>
    </div>
</template>

<script>

export default {
    name: 'VideoPlayer',

    props: {
        imgSrc: {
            type: String,
            required: true,
        },

        videoUrl: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            clicked: true,
        };
    },

    computed: {
        imageUrl() {
            return this.imgSrc || 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
        },
    },
};
</script>
