import React, { constructor } from 'react'


export default class CadastroCondutaClass{

    constructor (nomesLocaisAtendido, nomesLocaisEncaminhado, dataSugeridaAcompanhamento, dataSugeridaTratamento) {
        this.nomesLocaisAtendido = nomesLocaisAtendido;
        this.nomesLocaisEncaminhado = nomesLocaisEncaminhado;
        this.dataSugeridaAcompanhamento = dataSugeridaAcompanhamento;
        this.dataSugeridaTratamento = dataSugeridaTratamento;
    }

    retornaValidacao(){
        let status = "sucesso"
        if((idNovoAcomp == 2 ||
            nomesLocaisAtendido.length == undefined ||
            nomesLocaisEncaminhado.length == undefined) ||
            (idNovoAcomp == 1 && nomesLocaisEncaminhado.length == undefined)){
            status = "erro";
        }
        return status;
    }


}