import React, { constructor } from 'react'


export default class DadosLocaisClass{

    constructor (cidade, bairro, endereco) {
        this.cidade = cidade;
        this.bairro = bairro;
        this.endereco = endereco;
    }

    retornaValidacao(){
        let status = "sucesso"
        if(!this.cidade || !this.bairro || !this.endereco){
            status = "erro";
        }
        return status;
    }


}