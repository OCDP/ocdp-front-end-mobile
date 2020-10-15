import React, { constructor } from 'react'


export default class DadosPessoaisClass{

    constructor (nomePaciente, dataNascimento, sexo, cpf, nomeMae) {
        this.nomePaciente = nomePaciente;
        this.dataNascimento = dataNascimento;
        this.sexo = sexo;
        this.cpf = cpf;
        this.nomeMae = nomeMae;
    }

    retornaValidacao(){
        let status = "sucesso"
        if(!this.nomePaciente || !this.dataNascimento || !this.sexo || !this.cpf || !this.nomeMae){
            status = "erro";
        }
        return status;
    }


}