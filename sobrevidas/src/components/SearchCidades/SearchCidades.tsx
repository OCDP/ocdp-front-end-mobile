import {Autocomplete, AutocompleteItem} from '@ui-kitten/components';
import React, {useCallback, useState} from 'react';
import {useGetCidades} from '../../hooks/networking/cidade';
import useMountEffect from '../../hooks/utils/useMountEffect';
import {pin} from '../icons';
import LoadingIndicator from '../LoadingIndicator/LoadingIndicator';

interface Props {
  onSelect: (cidade: Models.Cidade) => void;
}
const SearchCidades: React.FC<Props> = ({onSelect}) => {
  const getCidades = useGetCidades();
  const [result, setResult] = useState<Models.Cidade[]>([]);
  const [loading, setLoading] = useState(false);

  const _getCidades = useCallback(async () => {
    try {
      setLoading(true);
      const {data: citys} = await getCidades();
      setResult(citys);
      setCidades(citys);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }, [getCidades]);

  const [cidades, setCidades] = useState<Models.Cidade[]>(result);

  const [valueSearch, setValueSearch] = useState('');

  const filter = (item: Models.Cidade, query: string) =>
    item.nome.toLowerCase().includes(query.toLowerCase());

  const onChangeText = (query: string) => {
    setValueSearch(query);
    setCidades(result.filter(item => filter(item, query)));
  };

  useMountEffect(_getCidades);

  return (
    <>
      <Autocomplete
        accessoryRight={loading ? LoadingIndicator : undefined}
        label="Selecionar cidade"
        placeholder="Selecionar cidade"
        value={valueSearch}
        onChangeText={onChangeText}
        onSelect={value => {
          onSelect(cidades[value]);
          setValueSearch(cidades[value].nome);
        }}>
        {cidades.map(({nome}, index) => (
          <AutocompleteItem key={index} title={nome} accessoryLeft={pin} />
        ))}
      </Autocomplete>
    </>
  );
};

export default SearchCidades;
