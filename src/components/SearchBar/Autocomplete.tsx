import React, { useEffect, useState } from "react";
import Autocomplete from './Searchbar'
import { api } from '~/utils/api'

const SearchBarAutocomplete: React.FC = () => {
    const [val, setVal] = useState<string | undefined>("");
    const [places, setPlaces] = useState<(string | undefined)[]>([]);
    const [items, setItems] = useState<(string | undefined)[]>([]);
    const data = api.healthcare.getData.useQuery();
    const placesArray: (string | undefined)[] = [];
    if (placesArray.length == 0) {
        data.data?.forEach(item => {
            item.forEach(item => {
                return places.push(item[0])
            })
        });
    }


    useEffect(() => {
        async function fetchData() {
            if (places.length == 0) {
                return setPlaces(placesArray)
            } else return
        }
        fetchData();
    }, []);

    useEffect(() => {
        if (!val) {
            setItems(places);
            return;
        }

        const newItems = places
            .filter((p) => p?.toLowerCase().includes(val.toLowerCase()))
            .sort()
            .filter((value, index, self) => {
                return self.indexOf(value) === index;
            });
        setItems(newItems)
    }, [places, val])

    return <Autocomplete items={items} value={val} onChange={setVal} />;
}

export default SearchBarAutocomplete;