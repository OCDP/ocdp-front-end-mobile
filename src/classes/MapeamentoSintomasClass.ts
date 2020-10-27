import React, { constructor } from 'react'


export default class MapeamentoSintomasClass{

    constructor (postFatores, lesoesRegioes) {
        this.postFatores = postFatores;
        this.lesoesRegioes = lesoesRegioes;
    }

    retornaValidacao(){
        let status = "sucesso"
        if(this.lesoesRegioes.length == 0 || this.postFatores == undefined){
            status = "erro";
        }
        return status;
    }


}