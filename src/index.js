import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PhotoApiService from './js/api-service';
import { refs } from "./js/refs";

const photoApiServis = new PhotoApiService();

refs.form.addEventListener('submit', onSerch);
refs.btnMore.addEventListener('click', onLoadMore);

function onSerch(evt) {
    evt.preventDefault();

    photoApiServis.query = evt.currentTarget.elements.searchQuery.value;
    if (photoApiServis.query === '') {
        return Notify.failure('Please, enter a query');
    }
    photoApiServis.cleanHTML();
    photoApiServis.resetPage();
    photoApiServis.searchPhoto();
    refs.btnMore.classList.remove('is-hidden');
}

function onLoadMore() {
    photoApiServis.searchPhoto();
    
    if (photoApiServis.pageNum > 13) {
        refs.btnMore.classList.add('is-hidden');
        Notify.failure("We're sorry, but you've reached the end of search results.");
    }
}