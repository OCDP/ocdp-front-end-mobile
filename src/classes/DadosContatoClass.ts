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
        const regexTelResp = /(?:\()?[0-9]{2}(?:\))?\s?[0-9]{4,5}(?:-)?[0-9]{4}$/;
        const regexTelCell = /(?:\()?[0-9]{2}(?:\))?\s?[0-9]{5}(?:-)?[0-9]{4}$/;
        const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!this.email || !regexEmail.test(this.email) || !this.telCell || !regexTelCell.test(this.telCell) || !this.telResp || !regexTelResp.test(this.telResp) || !this.nmMae){
            status = "erro";
        }
        return status;
    }


}