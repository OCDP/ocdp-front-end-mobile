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
        if(!this.nomesLocaisAtendido || !this.nomesLocaisEncaminhado || !this.dataSugeridaAcompanhamento || !this.dataSugeridaTratamento){
            status = "erro";
        }
        return status;
    }


}