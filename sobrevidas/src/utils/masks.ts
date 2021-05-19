function maskData(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d{2})(\d{4})/, '$1/$2/$3');
  return value;
}

function maskCep(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{5})(\d)/, '$1-$2');
  return value;
}

function maskPhone(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{2})(\d{5})(\d{4})/g, '($1) $2-$3');
  return value;
}

function maskCpf(value: string) {
  value = value.replace(/\D/g, '');
  value = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  return value;
}

export {maskData, maskCep, maskPhone, maskCpf};
