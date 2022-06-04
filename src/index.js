import './css/styles.css';
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';
import  {fetchCountries} from './fetchCountries';
// import countryList from './renderList.hbs'
const DEBOUNCE_DELAY = 300;

const refs = {
    input: document.querySelector('input#search-box'),
    countryList: document.querySelector('.country-list'),
    countryInfo: document.querySelector('.country-info'),
}

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(evt) {
    evt.preventDefault();
    let inputValue = evt.target.value.trim();
    if (inputValue.length <=1) {
        refs.countryInfo.innerHTML = '';
        refs.countryList.innerHTML = '';   
     }
    fetchCountries(inputValue)
        .then(r => {
            console.log(r);
            if (r.length > 10) {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
            else if (r.length >= 2 && r.length <= 10) {
                refs.countryList.innerHTML = renderCountriesList(r);
                 refs.countryInfo.innerHTML ='';
            } else {
                refs.countryInfo.innerHTML = renderCountriesCard(r);
                 refs.countryList.innerHTML = '';
            }
        })
        .catch(error => {
            if (inputValue.length > 0) {
                return onFetchError(error);
            }
        });
}
function renderCountriesList(countries) {
   return countries.map(country => 
             `<li class='country-list__item'>
        <img class='country-list__img' src="${country.flags.svg}" alt="${country.name.official}" width='30px' height='20px'>
        <span>${country.name.official}</span>
        </li>`
    ).join('')
}
    
function renderCountriesCard(countries) {
    return countries.map(country => 
       `<div class="country-info__flex">
         <img class='country-info__img' src="${country.flags.svg}" alt="${country.name.official}" width='30px' height='20px'>
         <p class='country-info__name'>${country.name.official}</p>
         </div>
        <ul class='country-info__list'>
        <li class='country-info__item'><span class='country-info--bold'>Capital:</span> ${country.capital}</li>
        <li class='country-info__item'><span class='country-info--bold'>Population:</span> ${country.population}</li>
        <li class='country-info__item'> <span class='country-info--bold'>Languages:</span> ${Object.values(country.languages).join(', ')}</ul>
        `
).join('')
}
function onFetchError() {
    Notiflix.Notify.failure("Oops, there is no country with that name");
}








