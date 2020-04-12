

 export interface locaisInterface{
     id: string,
     nome: string,
     distrito: distritoObj,
     tipoLocalAtendimento: tipoLocalObj,
     emailResponsavel: string | null,
     nomeResponsavel: string | null
 }

 interface distritoObj{
     id: string,
     nome: string
 }

 interface tipoLocalObj{
    id: string,
    nome: string
 }