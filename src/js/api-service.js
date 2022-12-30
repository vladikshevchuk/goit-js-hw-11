const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { data } from "./data-files";
import templateFunction from '../template/photo-card.hbs';
import { refs } from "../js/refs";
import SimpleLightbox from "simplelightbox";
// Дополнительный импорт стилей
import "simplelightbox/dist/simple-lightbox.min.css";

export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async searchPhoto() {
        try {
            const response = await axios.get(`${data.BASE_URL}?key=${data.KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
            console.log(response);
            if (response.data.totalHits === 0) {
                Notify.success('Sorry, there are no images matching your search query. Please try again.');
            } else {
                Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
                refs.gallery.insertAdjacentHTML('beforeend', templateFunction(response.data.hits));
                const lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: '250ms' });
            }
            
            
            this.incrementPage();
        } catch (error) {
            console.error(error);  
        }
    }

    cleanHTML() {
        refs.gallery.innerHTML = '';
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }

    get query() {
        return this.searchQuery;
    }
    
    set query(newQuery) {
        this.searchQuery = newQuery;
    }

    get pageNum() {
        return this.page;
    }
}