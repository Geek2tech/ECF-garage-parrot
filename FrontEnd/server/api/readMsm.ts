export default defineEventHandler(async (event) => {
    const runTimeConfigs = useRuntimeConfig()
    const msmUrl = runTimeConfigs.APP_MSM_URL
    const {id, password} = await readBody(event)
    const body = {
        id,
        password
    }

    try {
        const result = await $fetch( msmUrl+'/read/' + id,{
            method:'POST',

            body:JSON.stringify(body)

        })
        return {

            result: result
        }
    }
    catch(e) {
        return {
           error : "Ce lien n'est plus valide ou le mot de passe est incorrecte."
        }
    }






})
