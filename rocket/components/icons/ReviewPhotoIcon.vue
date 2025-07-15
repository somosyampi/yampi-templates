<template>
    <svg
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            x="0.5"
            y="0.5"
            width="95"
            height="95"
            rx="4.5"
            fill="#F5F5F5"
            stroke="#666666"
            stroke-dasharray="3 3"
        />
        <path
            d="M6.8586 4.22456L1.20577 11.8386C0.960834 12.1685 1.19632 12.6366
                        1.60723 12.6366H20.5186C20.8822 12.6366 21.1243 12.2608 20.9738
                        11.9297L16.028 1.04899C15.8655 0.691433 15.3731 0.652266 15.1561
                        0.979634L11.2821 6.82375C11.1108 7.0822 10.748 7.12401 10.5224
                        6.91129L7.60307 4.15882C7.38526 3.95346 7.03705 3.98421 6.8586 4.22456Z"
            fill="#666666"
            stroke="#666666"
            transform="translate(40,42)"
        />
        <circle
            cx="38"
            cy="40"
            r="2.60227"
            fill="#666666"
            stroke="#666666"
        />
        <rect
            x="30"
            y="30"
            width="37.23"
            height="33.09"
            rx="4.5"
            fill=""
            stroke="#666666"
            stroke-dasharray="3 3"
        />
    </svg>
</template>

<script>
import mobileMixin from '@/mixins/mobile';

export default {
    name: 'ReviewPhotoIcon',

    mixins: {
        mobileMixin,
    },
};
</script>
