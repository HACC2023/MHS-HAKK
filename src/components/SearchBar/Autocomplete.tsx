import React from "react"; // import useEffect from react if needed
import Autocomplete from './Searchbar'
import { api } from '~/utils/api'

const SearchBarAutocomplete = (props: { input: string, setInput: React.Dispatch<React.SetStateAction<string>> }) => {
    const { data, isLoading } = api.healthcare.getByPlan.useQuery({ query: props.input, forAutocomplete: true });
    return <Autocomplete items={data} value={props.input} onChange={props.setInput} isLoading={isLoading} />;
}

export default SearchBarAutocomplete;