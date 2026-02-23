import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from './js/pixabay-api.js';
import {createGallery} from './js/render-functions.js';
import {clearGallery} from './js/render-functions.js';
import {showLoader} from './js/render-functions.js';
import {hideLoader} from './js/render-functions.js';

const form =document.querySelector('.form')
const input =document.querySelector('[name="search-text"]')

async function handleSubmit (event){
event.preventDefault();
const query = input.value.trim();
if (query.length === 0 ) {
  iziToast.show({
    title: 'Warning',
    message: 'Sorry, there are no images matching your search query. Please try again!'
});
return
}
clearGallery();
showLoader();
getImagesByQuery(query)
    .then(data => {
        if (data.length===0){
            iziToast.show({
    title: 'Warning',
    message: 'Sorry, there are no images matching your search query. Please try again!',
    backgroundColor: 'red',
});
return
        }
      createGallery(data);
    })
    .catch(error => {
      iziToast.error({
    title: 'Warning',
    message: 'Sorry, there are no images matching your search query. Please try again!'})
      console.error(error);
    })
    .finally(() => {
      hideLoader();
    });

  event.currentTarget.reset();
}


form.addEventListener('submit', handleSubmit);