<template>
    <div class="tab-content">
        <div class="holder-questions">
            <div
                class="btn btn-secundary"
                @click="showModal"
            >
                Perguntar
            </div>

            <br>

            <div v-if="payload.length">
                <div>
                    <div
                        v-for="(question, key) in payload"
                        :key="key"
                        class="holder-question"
                    >
                        <div class="question">
                            <span
                                class="-name"
                                v-text="question.name"
                            />
                            <Timeago
                                v-if="showDates"
                                class="-time-ago"
                                :date="question.created_at.date"
                            />
                            <div
                                class="-text"
                                v-text="question.message"
                            />
                        </div>

                        <div
                            v-if="question.answer"
                            class="answer"
                        >
                            <div
                                class="-store-icon"
                                :style="getIconStyle()"
                            />
                            <span
                                class="-store-name"
                                v-text="question.answer.name"
                            />
                            <Timeago
                                v-if="showDates"
                                class="-time-ago"
                                :date="question.answer.created_at.date"
                            />
                            <div
                                class="-text"
                                v-html="question.answer.message"
                            />
                        </div>
                    </div>
                </div>

                <br>

                <div
                    v-if="showLoadMore"
                    class="load-more"
                    @click="loadData(true)"
                >
                    + Ver mais dúvidas
                </div>
            </div>

            <div
                v-else-if="!loading"
                class="alert -yellow"
            >
                Esse produto ainda não possui nenhuma dúvida.
                <b
                    class="link-alike"
                    @click="showModal"
                >Seja o primeiro a perguntar</b>
            </div>

            <div v-if="isLoading">
                <br>

                <i class="icon icon-loader-dark" />
            </div>
        </div>

        <modal-question
            ref="modal"
            @success="showModalSuccess"
        />
        <modal-question-success ref="modalSuccess" />
    </div>
</template>

<script>
import Timeago from '@/components/generic/Timeago';
import BaseContent from '@/components/reviews/BaseContent';
import ModalQuestion from '@/components/reviews/ModalQuestion';
import ModalQuestionSuccess from '@/components/reviews/ModalQuestionSuccess';

export default {
    name: 'QuestionContent',

    components: {
        ModalQuestion,
        ModalQuestionSuccess,
        Timeago,
    },

    extends: BaseContent,

    props: {
        icon: {
            type: String,
            default: null,
        },
    },

    data: () => ({
        route: 'comments',
    }),

    methods: {
        getIconStyle() {
            return {
                '--store-icon': this.icon ? `url('${this.icon}')` : false,
            };
        },
    },
};
</script>
