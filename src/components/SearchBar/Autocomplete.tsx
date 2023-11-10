import React, { useState } from "react"; // import useEffect from react if needed
import Autocomplete from './Searchbar'
import { api } from '~/utils/api'

const SearchBarAutocomplete: React.FC = () => {
    const [val, setVal] = useState<string | undefined>("");
    const data = api.healthcare.getDataByName.useQuery({ name: val ?? '' }).data;
    return <Autocomplete items={data} value={val} onChange={setVal} />;
}

export default SearchBarAutocomplete;