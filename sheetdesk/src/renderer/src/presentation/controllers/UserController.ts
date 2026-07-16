

class UsuarioController{
    constructor() {}

    async authUser(){
        return await window.api.auth();
    }

    async LoginUser(email: string, senha: string){
        if(email.length <= 0 || senha.length <= 0) return

        return window.api.login(email, senha)
    }
}

export default UsuarioController