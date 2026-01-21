// stores/counter.js
import {defineStore} from 'pinia'

export const useConstactStore = defineStore('contact', {
    state: () => {
        return {

            ModalActive: ref(false)

        }
    },
    getters:{


    },
    actions: {
        toggleModal() {

            if (this.ModalActive === false) {
                this.ModalActive = true
            } else {
                this.ModalActive = false
            }

        },
        sendMail(subject, message) {
            const runTimeConfigs = useRuntimeConfig()

            const body = {
                to: `${runTimeConfigs.public.APP_MAIL}`,
                subject: `${subject} `,
                message: message
            }

            const {data: MailSend} = useAsyncData(`SendMail`, () => {
                    return $fetch(`/api/proxy/api/mail`, {
                            method: `POST`,
                            headers: {
                                "content-Type": "application/json",
                            },
                            lazy: true,
                            suspense: false,
                            body: body
                        },
                    )
                },
            )
        }
    },
})