import React, { constructor } from 'react'


export default class DadosAcompanhamentoClass{

    constructor (nomesLocaisAtendido, idNovoAcomp) {
        this.nomesLocaisAtendido = nomesLocaisAtendido;
        this.idNovoAcomp = idNovoAcomp;
    }

    retornaValidacao(){
        let status = "sucesso"
        console.log(this.nomesLocaisAtendido + " " + this.idNovoAcomp)
        if(!this.nomesLocaisAtendido || this.nomesLocaisAtendido.length == 0 || this.idNovoAcomp == undefined){
            status = "erro";
        }
        return status;
    }


}