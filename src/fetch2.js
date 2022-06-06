import axios from 'axios';


async function fetchGallery(searchQuery, currentPage) {
    const BASE_URL = 'https://pixabay.com/api/';
    const KEY = '27740516-006db8c520e637ee9ea683b0c';
    const options = `&q=${searchQuery}&per_page=40&page=${currentPage}&image_type=photo&orientation=horizontal&safesearch=true`;
    return await axios.get(`${BASE_URL}?key=${KEY}${options}`).then(console.log);
  
}
export default fetchGallery;