// stores/counter.js
import {defineStore} from 'pinia'
import {suppressSpecialChar} from "~/helpers/fieldControl.js";

export const useCommentStore = defineStore('comments', {
    state: () => {
        return {
            commentList: {},
            pendingCommentList:{},
            nbPage: "",
            activePage: 1,
            addModalActive: ref(false),
            lastInsertId:"",
            autoValidate : false


        }
    },
   getters:{


   },
    actions: {
        activePageDecrement() {
            this.activePage--
        },
        activePageIncrement() {
            this.activePage++
        },
        validePendingComment(id,token){
            const body = {
                "id":id
            }


            const runTimeConfigs = useRuntimeConfig()


            const {data: commentUpdate} = useAsyncData(`CommentUpdate`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/comment`, {
                            method: `PUT`,
                            mode: "cors",
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token
                            },
                            key: `CommentUpdate`,

                            body: JSON.stringify(body)


                        },
                    )


                },
            )




        },
        deletePendingComment(id,token){
          const body = {
              "id":id
          }
            const runTimeConfigs = useRuntimeConfig()


            const {data: commentremoved} = useAsyncData(`CommentRemoved`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/comment`, {
                            method: `DELETE`,
                            mode: "cors",
                        credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token
                            },
                            key: `CommentDeleted`,

                            body: JSON.stringify(body)


                        },
                    )


                },
            )




        },
        async addComment(nom, comment, note) {

            const body = {
                sender_name: nom,
                comment_text: comment,
                garage_note: note
            }

            const runTimeConfigs = useRuntimeConfig()

            const {data: commentAdded} =  await useAsyncData(`Comments`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/comment`, {
                            method: `POST`,
                            mode: "cors",
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`
                            },
                            key: `commentAdded`,

                            body: JSON.stringify(body)


                        },
                    )


                },

            )
            this.lastInsertId =  commentAdded
            if (this.autoValidate === true) {
                this.validePendingComment(this.lastInsertId,sessionStorage.getItem("xsrf"))
                this.autoValidate = false

            }


        },
        async getPendingComment(token){

            const runTimeConfigs = useRuntimeConfig()

            const {data: pendingComments} = await useAsyncData(`pendingComments`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/protected/commentsPending`, {
                            method: `GET`,
                            mode: "cors",
                        credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`,
                                "x-xsrf-token":token
                            },
                            key: `pendingCommentList`,




                        },
                    )


                },
            )

            this.pendingCommentList = await pendingComments?._rawValue.results

        },


        async loadComment() {
            const runTimeConfigs = useRuntimeConfig()

            const {data: comments} = await useAsyncData(`Comments`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/comments`, {
                            method: `GET`,
                            mode: "cors",
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`
                            },
                            key: `commentList-${this.activePage}`,

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


        toggleModal: function () {

            if (this.addModalActive === false) {
                this.addModalActive = true
            } else {
                this.addModalActive = false
            }
            //this.addModalActive = this.addModalActive.value === false

        }
    },
})