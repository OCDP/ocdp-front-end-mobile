import React, { constructor } from 'react'


export default class MapeamentoSintomasClass{

    constructor (postFatores, lesoesRegioes) {
        this.postFatores = postFatores;
        this.lesoesRegioes = lesoesRegioes;
    }

    retornaValidacao(){
        let status = "sucesso"
        if(!this.postFatores || !this.lesoesRegioes){
            status = "erro";
        }
        return status;
    }


}