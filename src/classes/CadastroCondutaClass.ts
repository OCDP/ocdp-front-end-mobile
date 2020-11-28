import React, { constructor } from 'react'


export default class CadastroCondutaClass{

    constructor (idNovoAcomp, nomesLocaisAtendido, nomesLocaisEncaminhado, dataSugeridaAcompanhamento, dataSugeridaTratamento) {
        this.idNovoAcomp = idNovoAcomp;
        this.nomesLocaisAtendido = nomesLocaisAtendido;
        this.nomesLocaisEncaminhado = nomesLocaisEncaminhado;
        this.dataSugeridaAcompanhamento = dataSugeridaAcompanhamento;
        this.dataSugeridaTratamento = dataSugeridaTratamento;
    }

    retornaValidacao(){
        let status = "sucesso"
        console.log(this.idNovoAcomp);
        if((this.idNovoAcomp == 2 &&
            this.nomesLocaisAtendido.length == undefined ||
            this.nomesLocaisEncaminhado.length == undefined) ||
            (this.idNovoAcomp == 1 && this.nomesLocaisEncaminhado.length == undefined)){
            status = "erro";
        }
        return status;
    }


}