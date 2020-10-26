import React, { constructor } from 'react'


export default class DadosAcompanhamentoClass{

    constructor (nomesLocaisAtendido, idNovoAcomp) {
        this.nomesLocaisAtendido = nomesLocaisAtendido;
        this.idNovoAcomp = idNovoAcomp;
    }

    retornaValidacao(){
        let status = "sucesso"
        if(!this.nomesLocaisAtendido || !this.idNovoAcomp){
            status = "erro";
        }
        return status;
    }


}