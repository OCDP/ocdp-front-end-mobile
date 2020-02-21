import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import * as SecureStore from 'expo-secure-store';

/**
 * Hook customizado para buscar um valor na Storage do dispositivo.
 * @param key A chave a ser buscada na Storage  
 * 
 * @param defaultValue OPCIONAL O valor a ser usado caso não haja um valor na Storage para a `key` informada.
 */
export default function <T>(key: string, defaultValue?: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    async function getValue() {
      let value: string = await SecureStore.getItemAsync(key);
      if (value?.length > 0) {
        setValue(JSON.parse(value));
      } else setValue(defaultValue);
    }
    getValue();
  }, []);

  useEffect(() => {
    async function save() {
      if (value && key) {
        return SecureStore.setItemAsync(key, JSON.stringify(value));
      } else return;
    }
    save();
  }, [value, key]);

  return [value, setValue];
}