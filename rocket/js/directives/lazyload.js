let observer;

const loadImage = el => {
    const imageElement = el.nodeName === 'IMG'
        ? el
        : Array.from(el.children).find(
            el => el.nodeName === 'IMG',
        );

    if (imageElement) {
        imageElement.addEventListener('load', () => {
            setTimeout(() => el.classList.add('loaded'), 100);
        });
        imageElement.addEventListener('error', () => console.log('error'));

        const img = new Image();
        const { src } = imageElement.dataset;

        img.onload = function () {
            if (imageElement.parent) {
                return imageElement.parent.replaceChild(img, imageElement);
            }

            imageElement.src = src;
        };

        img.src = src;
        // imageElement.src = imageElement.dataset.src;
    }
};

const handleIntersect = (entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) {
            return;
        }

        loadImage(entry.target);
        observer.unobserve(entry.target);
    });
};

const createObserver = el => {
    const options = {
        root: null,
        threshold: '0',
    };
    observer = observer || new IntersectionObserver(handleIntersect, options);
    observer.observe(el);
};

export default {
    inserted: (el, binding) => {
        if (binding.hasOwnProperty('value') && !binding.value) {
            return;
        }

        if (window.IntersectionObserver) {
            return createObserver(el);
        }

        return loadImage(el);
    },
};
