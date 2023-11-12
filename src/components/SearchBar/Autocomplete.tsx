import React from "react"; // import useEffect from react if needed
import Autocomplete from './Searchbar'
import { api } from '~/utils/api'

const SearchBarAutocomplete = (props: { input: string, setInput: React.Dispatch<React.SetStateAction<string>> }) => {
    const { data } = api.healthcare.getDataByName.useQuery({ name: props.input ?? '' });
    return <Autocomplete items={data} value={props.input} onChange={props.setInput} />;
}

export default SearchBarAutocomplete;