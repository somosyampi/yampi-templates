<template>
    <svg
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <rect
            opacity="0.3"
            x="0.5"
            y="0.5"
            width="94.4545"
            height="94.4545"
            rx="4.5"
            fill="#F5F5F5"
            stroke="#666666"
        />
        <circle
            cx="48"
            cy="48"
            fill="none"
            stroke="#666666"
            stroke-width="4"
            r="17"
            stroke-dasharray="80.11061266653974 28.703537555513243"
        >
            <animateTransform
                attributeName="transform"
                type="rotate"
                repeatCount="indefinite"
                dur="1s"
                values="0 48 48;360 48 48"
                keyTimes="0;1"
            />
        </circle>

    </svg>
</template>

<script>
export default {
    name: 'ReviewPhotoLoadingIcon',
};
</script>
