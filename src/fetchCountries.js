const BASE_URL = 'https://restcountries.com/v3.1';
const options = '?fields=name,capital,population,flags,languages';

function fetchCountries(name) {
    return fetch(`${BASE_URL}/name/${name}${options}`).then(response =>
        response.json());
    
    }

export {fetchCountries}     