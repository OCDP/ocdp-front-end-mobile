import React, { constructor } from 'react'


export default class DadosContatoClass{

    constructor (email, telCell, telResp, nmMae) {
        this.email = email;
        this.telCell = telCell;
        this.telResp = telResp;
        this.nmMae = nmMae;
    }

    retornaValidacao(){
        let status = "sucesso"
        if(!this.email || !this.telCell || !this.telResp || this.nmMae){
            status = "erro";
        }
        return status;
    }


}