// stores/counter.js
import {defineStore} from 'pinia'

export const useCommentStore = defineStore('comments', {
    state: () => {
        return {
            commentList: {},
            comments: {}
        }
    },
    // could also be defined as
    // state: () => ({ count: 0 })
    actions: {
        increment() {

            this.count++
        },
        addComment(comments) {
            this.commentList = comments
        },
        loadComment(page) {
            const runTimeConfigs = useRuntimeConfig()
            console.log('page from store ', page)
            const {error, pending, refresh, status, data: comments} = useAsyncData(`Comments`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/comments`, {
                            method: `GET`,
                            mode: "cors",
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`
                            },
                            key: `commentList-${page}`,
                            lazy: true,
                            suspense: false,
                            params: {
                                page: page,
                                limit: 4
                            },


                        },
                    )


                },
            )
            this.commentList = comments

        }
    },
})