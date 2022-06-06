   
import fetchGallery from './fetch2';
// import cardTemplate from '../templates/card-template.hbs';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
// import SimpleLightbox from 'simplelightbox';
// import 'simplelightbox/dist/simple-lightbox.min.css';
// import throttle from 'lodash.throttle';

const { searchForm, gallery, loadMoreBtn, endCollectionText } = {
  searchForm: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
  endCollectionText: document.querySelector('.end-collection-text'),
};

function renderCardImage(photos) {
  const markup =  photos.map(photo =>
        `<div class="photo-card">
  <img src="${photo.webformatURL}" alt="${photo.tags} loading="lazy"/>
  <div class="info">
    <p class="info-item"><b>Likes</b><span>${photo.likes}</span></p>
    <p class="info-item"><b>Views</b><span>${photo.views}</span></p>
    <p class="info-item"><b>Comments</b><span>${photo.comments}</span></p>
    <p class="info-item"><b>Downloads</b><span>${photo.downloads}</span></p>
  </div>
</div>`).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

// let lightbox = new SimpleLightbox('.photo-card a', {
//   captions: true,
//   captionsData: 'alt',
//   captionDelay: 250,
// });

let currentPage = 1;
let currentHits = 0;
let searchQuery = '';

searchForm.addEventListener('submit', onSubmitSearchForm);

async function onSubmitSearchForm(e) {
  e.preventDefault();
  searchQuery = e.currentTarget.searchQuery.value;
  currentPage = 1;

  if (searchQuery === '') {
    return;
  }

  const response = await fetchGallery(searchQuery, currentPage);
  currentHits = response.hits.length;

  if (response.totalHits > 40) {
    loadMoreBtn.classList.remove('is-hidden');
  } else {
    loadMoreBtn.classList.add('is-hidden');
  }

  try {
    if (response.totalHits > 0) {
      Notify.success(`Hooray! We found ${response.totalHits} images.`);
      gallery.innerHTML = '';
      renderCardImage(response.hits);
      endCollectionText.classList.add('is-hidden');

      const { height: cardHeight } = document
        .querySelector('.gallery')
        .firstElementChild.getBoundingClientRect();

      window.scrollBy({
        top: cardHeight * -100,
        behavior: 'smooth',
      });
    }

    if (response.totalHits === 0) {
      gallery.innerHTML = '';
      Notify.failure('Sorry, there are no images matching your search query. Please try again.');
      loadMoreBtn.classList.add('is-hidden');
      endCollectionText.classList.add('is-hidden');
    }
  } catch (error) {
    console.log(error);
  }
}

loadMoreBtn.addEventListener('click', onClickLoadMoreBtn);

async function onClickLoadMoreBtn() {
  currentPage += 1;
  const response = await fetchImages(searchQuery, currentPage);
  renderCardImage(response.hits);
//   lightbox.refresh();
  currentHits += response.hits.length;

  if (currentHits === response.totalHits) {
    loadMoreBtn.classList.add('is-hidden');
    endCollectionText.classList.remove('is-hidden');
  }
}



// import fetchGallery from "./fetch2";


// const refs = {
//     form: document.querySelector('.search-form'),
//     input: document.querySelector('[name="searchQuery"]'),
//     gallery: document.querySelector('.gallery'),
//     btnLoadMore: document.querySelector('.load-more'),
// }


// refs.form.addEventListener('submit', onSubmitForm);
// // refs.form.addEventListener("click", onLoadMore)

// refs.btnLoadMore.classList.add('is-hidden');

// async function onSubmitForm(evt) {
//     evt.preventDefault();
//     const form = evt.currentTarget;
//     const queryElements = form.elements.searchQuery.value.trim();
//      const response = await fetchGallery(queryElements);
//         //   console.log(response.hits);

//           refs.gallery.innerHTML = renderPhotoList(response);
          
//     //    catch (error) {
//     //     console.log("beda");
//     //     }
// }

// function renderPhotoList(photos) {
//     // const markup =
//     return photos.map(photo => 
//         `<div class="photo-card">
//   <img src="${photo.webformatURL}" alt="${photo.tags} loading="lazy"/>
//   <div class="info">
//     <p class="info-item"><b>Likes</b><span>${photo.likes}</span></p>
//     <p class="info-item"><b>Views</b><span>${photo.views}</span></p>
//     <p class="info-item"><b>Comments</b><span>${photo.comments}</span></p>
//     <p class="info-item"><b>Downloads</b><span>${photo.downloads}</span></p>
//   </div>
// </div>`
//     ).join('')
// //    return refs.gallery.insertAdjacentHTML('beforeend', markup);
    
// }
