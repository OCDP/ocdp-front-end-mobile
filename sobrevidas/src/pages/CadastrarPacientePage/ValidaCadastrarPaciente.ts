import { Alert } from "react-native";

export function ValidaCadastrarPaciente(newPaciente: Models.Paciente) {
    let msgErro = "";

    msgErro += ValidaCPF(newPaciente.cpf);
    msgErro += ValidaDataNascimento(newPaciente.dataNascimento);
    msgErro += ValidaEmail(newPaciente.email);
    msgErro += ValidaEndereco(newPaciente.enderecoCompleto);
    msgErro += ValidaBairro(newPaciente.idBairro);
    msgErro += ValidaNome(newPaciente.nome);
    msgErro += ValidaNomeMae(newPaciente.nomeDaMae);
    msgErro += ValidaSexo(newPaciente.sexo);
    msgErro += ValidaTelefone(newPaciente.telefoneCelular, "Telefone");
    msgErro += ValidaTelefone(newPaciente.telefoneResponsavel, "Telefone Responsável");

    if (msgErro.length > 0) {
        Alert.alert("Atenção", "Verifique os seguintes campos: " + msgErro)
        return false;
    } else return true;

}

function ValidaCPF(cpf: String): String {
    if (cpf && cpf.length == 14) return "";
    else if (!cpf || cpf == null || cpf == "" || cpf.length == 0) return "CPF não preenchido\n";
    else if (cpf.length > 0 && cpf.length < 14) return "CPF preenchido incorretamente\n";
    else return "Verifique CPF\n";
}

function ValidaDataNascimento(dtNascimento: String): String {

    const ValidaLength = dtNascimento && dtNascimento.length == 10;
    const ValidaBarras = ValidaLength ? dtNascimento[2] == "/" || dtNascimento[5] == "/" : false;
    const [dd, mm, aa] = ValidaLength && ValidaBarras ? dtNascimento.split("/") : [];
    const ValidaAno = aa ? +aa > 1900 && +aa < 2021 : false;
    const ValidaMes = ValidaAno && mm ? +mm >= 1 && +mm <= 12 : false;
    const ValidaDia = () => {
        if (ValidaMes) {
            if (+mm == 1 || +mm == 3 || +mm == 5 || +mm == 7 || +mm == 8 || +mm == 10 || +mm == 12) {
                if (+dd >= 1 && +dd <= 31) {
                    return true;
                } else return false;
            } else if (+mm == 4 || +mm == 6 || +mm == 9 || +mm == 11) {
                if (+dd >= 1 && +dd <= 30) {
                    return true;
                } else return false;
            } else if (+mm == 2) {
                if (+dd >= 1 && +dd <= 29) {
                    return true;
                } else return false;
            } else return false;
        } else return false;
    }

    return ValidaDia() ? "" : "Data de Nascimento inválida\n";

}

function ValidaEmail(email: String): String {
    return (!email || email.length == 0 || email.search("@")) == -1 ? "Email Inválido\n" : "";
}

function ValidaEndereco(enderecoCompleto: String): String {
    return !enderecoCompleto || enderecoCompleto.length < 4 ? "Endereço Inválido\n" : ""
}

function ValidaBairro(bairro: number): String {
    return bairro == null || bairro == 0 ? "Bairro Inválido\n" : "";
}

function ValidaNome(nome: String): String {
    return !nome || nome.length == 0 ? "Nome não preenchido\n" : ""
}

function ValidaNomeMae(mae: String): String {
    return !mae || mae.length == 0 ? "Nome da Mãe não preenchido\n" : ""
}

function ValidaSexo(sexo: string) {
    return (sexo == "MASCULINO" || sexo == "FEMININO") ? "" : "Sexo não escolhido\n";
}

function ValidaTelefone(telefone: string, label: string) {
    return telefone && telefone[0] == "(" && telefone[3] == ")" && telefone[10] == "-" && telefone.length == 15
        ? ""
        : `${label} inválido \n`;
}

