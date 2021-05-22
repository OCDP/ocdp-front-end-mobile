export function ValidaCadastrarPaciente(newPaciente: Models.Paciente) {
    let msgErro = "";

    msgErro += ValidaCPF(newPaciente.cpf);
    msgErro += ValidaDataNascimento(newPaciente.dataNascimento);

}

function ValidaCPF(cpf: String): String {
    if (cpf.length == 14) return "";
    else if (cpf == null || cpf == "" || cpf.length == 0) return "CPF não preenchido\n";
    else if (cpf.length > 0 && cpf.length < 14) return "CPF preenchido incorretamente\n";
    else return "Verifique CPF\n";
}

function ValidaDataNascimento(dtNascimento: String): String {

    const ValidaLength = dtNascimento.length == 10;
    const ValidaBarras = ValidaLength ? dtNascimento[2] == "/" || dtNascimento[5] == "/" : ValidaLength;
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
        }
    }
    
    return ValidaDia() ? "" : "Data de Nascimento inválida\n";

}

