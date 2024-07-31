import rocket from '@/modules/axios/rocket';

export default {
    methods: {
        async handleTrackApi(event, params = {}) {
            try {
                await rocket.post('api/track', {
                    event,
                    params,
                });
            } catch (e) {
                console.error(e);
                throw e;
            }
        },
    },
};
