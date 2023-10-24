// stores/counter.js
import {defineStore} from 'pinia'

export const useCommentStore = defineStore('comments', {
    state: () => {
        return {
            commentList: {},
            nbPage: "",
            activePage: 1

        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        increment() {

            this.count++
        },
        activePageIncrement() {
            this.activePage++
        },
        activePageDecrement() {
            this.activePage--
        },
        loadComment() {
            const runTimeConfigs = useRuntimeConfig()

            const {data: comments} = useAsyncData(`Comments`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/comments`, {
                            method: `GET`,
                            mode: "cors",
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`
                            },
                            key: `commentList-${this.activePage}`,
                            lazy: true,
                            suspense: false,
                            params: {
                                page: this.activePage,
                                limit: 4
                            },


                        },
                    )


                },
            )
            this.commentList = comments
            this.nbPage = this.commentList?.pages

        },
        addComment(nom, comment, note) {

            const body = {
                sender_name: nom,
                comment_text:comment,
                garage_note:note
            }

            const runTimeConfigs = useRuntimeConfig()

            const {data: commentAdded} = useAsyncData(`Comments`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/comment`, {
                            method: `POST`,
                            mode: "cors",
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`
                            },
                            key: `commentList-${this.activePage}`,
                            lazy: true,
                            suspense: false,
                           body:JSON.stringify(body)


                        },
                    )


                },
            )



        }
    },
})