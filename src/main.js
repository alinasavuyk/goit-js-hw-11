import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import {getImagesByQuery} from './js/pixabay-api'
import {createGallery, clearGallery, showLoader, hideLoader,} from './js/render-functions';

const form =document.querySelector('.form')
const input =document.querySelector('[name="search-text"]')
 function handleSubmit (event){
event.preventDefault();
const query = input.value.trim();
if (query === "") {
  iziToast.warning({
            title: 'Caution',
            message: 'Please enter a search query!',
            position: 'topRight',
        });
return
}
clearGallery();
showLoader();
getImagesByQuery(query)
        .then(data => {
            if (!data || data.length === 0) {
                iziToast.error({
                message: 'Sorry, there are no images matching your search query. Please try again!',
                position: 'topRight',
                });
                return;
            } 
                createGallery(data);            
        })
          .catch(error => {
            iziToast.error({
                message: 'Something went wrong. Try again later.',
                position: 'topRight',
            });
            console.error("Fetch error:", error);
        })
        .finally(() => {
            hideLoader();
            event.target.reset();
        });
            }


form.addEventListener('submit', handleSubmit);