
// import axios from 'axios';

// export default class NewsApiService {
//   constructor() {
//     this.queryElements = '';
//     this.page = 1;
//   }

//   async fetchGallery() {
//     const BASE_URL = 'https://pixabay.com/api/';
//     const KEY = '27740516-006db8c520e637ee9ea683b0c';
//     const options = `&q=${this.queryElements}&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`;

//     try {
//       const response = axios.get(`${BASE_URL}?key=${KEY}${options}`);
//       this.page += 1;
//       return response.data;
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   resetPage() {
//     this.page = 1;
//   }

//   get query() {
//     return this.searchQuery;
//   }

//   set query(newQuery) {
//     this.searchQuery = newQuery;
//   }
// }


// // import axios from 'axios';

// // export default class NewsApiService {
   
// //     constructor() {
// //         this.queryElements = "";
// //         this.page = 1;
// //     }

// //      fetchGallery(queryElements) {
// //       const BASE_URL = 'https://pixabay.com/api/';
// //       const KEY = '27868120-ecbda89988110022223138572';
// //       const options = `&q=${this.queryElements}&per_page=40&page=${this.page}&image_type=photo&orientation=horizontal&safesearch=true`;

// //      const response = axios.get(`${BASE_URL}?key=${KEY}${options}`).then(data => (this.page += 1));
// //          return response;  
// //     }

// //      get query (){
// //         return this.queryElements;
// //     }

// //     set query(newQuery){
// //         this.queryElements = newQuery;
// //     }

// //     resetPage() {
// //         this.page = 1;
// //     }
// // } 
