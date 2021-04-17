import {useState, useEffect, Dispatch, SetStateAction} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Hook customizado para buscar um valor na Storage do dispositivo.
 * @param key A chave a ser buscada na Storage
 *
 * @param defaultValue OPCIONAL O valor a ser usado caso não haja um valor na Storage para a `key` informada.
 */
export default function <T>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    async function getValue() {
      let localValue = await AsyncStorage.getItem(key);
      if (localValue) {
        setValue(JSON.parse(localValue));
      } else {
        setValue(defaultValue);
      }
    }
    getValue();
  }, [defaultValue, key]);

  useEffect(() => {
    async function save() {
      if (value && key) {
        return AsyncStorage.setItem(key, JSON.stringify(value));
      } else {
        return;
      }
    }
    save();
  }, [value, key]);

  return [value, setValue];
}
