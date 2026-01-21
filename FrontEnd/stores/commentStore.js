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
        validePendingComment(id, token) {
            const body = {
                "id": id
            }

            const {data: commentUpdate} = useAsyncData(`CommentUpdate`, () => {
                    return $fetch(`/api/proxy/api/protected/comment`, {
                            method: `PUT`,
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-xsrf-token": token
                            },
                            body: body
                        },
                    )
                },
            )
        },
        deletePendingComment(id, token) {
            const body = {
                "id": id
            }

            const {data: commentremoved} = useAsyncData(`CommentRemoved`, () => {
                    return $fetch(`/api/proxy/api/protected/comment`, {
                            method: `DELETE`,
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-xsrf-token": token
                            },
                            body: body
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

            const {data: commentAdded} = await useAsyncData(`Comments`, () => {
                    return $fetch(`/api/proxy/api/comment`, {
                            method: `POST`,
                            headers: {
                                "content-Type": "application/json",
                            },
                            body: body
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
        async getPendingComment(token) {

            const {data: pendingComments} = await useAsyncData(`pendingComments`, () => {
                    return $fetch(`/api/proxy/api/protected/commentsPending`, {
                            method: `GET`,
                            credentials: 'include',
                            headers: {
                                "content-Type": "application/json",
                                "x-xsrf-token": token
                            },
                        },
                    )
                },
            )

            this.pendingCommentList = await pendingComments?._rawValue.results

        },


        async loadComment() {

            const {data: comments} = await useAsyncData(`Comments`, () => {
                    return $fetch(`/api/proxy/api/comments`, {
                            method: `GET`,
                            headers: {
                                "content-Type": "application/json",
                            },
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
