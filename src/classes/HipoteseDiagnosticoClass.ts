
import React, { constructor } from 'react'


export default class HipoteseDiagnosticoClass{

    constructor (confirmaRastreamento, observacao, hipoteseDiagnostico) {
        this.confirmaRastreamento = confirmaRastreamento;
        this.observacao = observacao;
        this.hipoteseDiagnostico = hipoteseDiagnostico;
    }

    retornaValidacao(){
        let status = "sucesso"
        if(!this.confirmaRastreamento || !this.observacao || !this.hipoteseDiagnostico){
            status = "erro";
        }
        return status;
    }


}