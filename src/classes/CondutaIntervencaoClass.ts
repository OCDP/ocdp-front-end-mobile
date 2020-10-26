import React, { constructor } from 'react'

export default class CondutaIntervencaoClass{

    constructor (procedimento, dataSugeridaAcompanhamento, dataSugeridaTratamento) {
        this.procedimento = procedimento;
        this.dataSugeridaAcompanhamento = dataSugeridaAcompanhamento;
        this.dataSugeridaTratamento = dataSugeridaTratamento
    }

    retornaValidacao(){
        let status = "sucesso"
        if(!this.procedimento || !this.dataSugeridaAcompanhamento ||  this.dataSugeridaTratamento){
            status = "erro";
        }
        return status;
    }


}