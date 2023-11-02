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
        sendMail(subject,message){

            const body = {
                to: 'geek2tech@geek2tech.fr',
                subject:`${subject} `,
                message: message
            }

            const runTimeConfigs = useRuntimeConfig()

            const {data: MailSend} = useAsyncData(`SendMail`, () => {
                    return $fetch(`${runTimeConfigs.public.API_URL}/api/mail`, {
                            method: `POST`,
                            mode: "cors",
                            headers: {
                                "content-Type": "application/json",
                                "x-api-key": `${runTimeConfigs.public.API_KEY}`
                            },
                            key: `MailSend`,
                            lazy: true,
                            suspense: false,
                            body: JSON.stringify(body)


                        },
                    )


                },
            )



        }
    },
})