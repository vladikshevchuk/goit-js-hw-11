import { Notify } from 'notiflix/build/notiflix-notify-aio';
import PhotoApiService from './js/api-service';
import templatePhoto from './template/photo-card.hbs';
import { refs } from "./js/refs";
import SimpleLightbox from "simplelightbox";

import "simplelightbox/dist/simple-lightbox.min.css";

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
    photoApiServis.searchPhoto().then(photos => {
        refs.gallery.insertAdjacentHTML('beforeend', templatePhoto(photos));
        const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: '250ms',
        });
    });

    refs.btnMore.classList.remove('is-hidden');
}

function onLoadMore() {
    photoApiServis.searchPhoto().then(photos => {
        refs.gallery.insertAdjacentHTML('beforeend', templatePhoto(photos));
        const lightbox = new SimpleLightbox('.gallery a', {
        captionDelay: '250ms',
        });
    });
    
    var test = $('.gallery a').simpleLightbox();
    test.refresh();
    
    if (photoApiServis.pageNum > 13) {
        refs.btnMore.classList.add('is-hidden');
        Notify.failure("We're sorry, but you've reached the end of search results.");
    }
}