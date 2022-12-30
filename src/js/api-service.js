const axios = require('axios').default;
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { data } from "./data-files";
import { refs } from "../js/refs";

export default class PhotoApiService {
    constructor() {
        this.searchQuery = '';
        this.page = 1;
    }

    async searchPhoto() {
        try {
        const response = await axios.get(`${data.BASE_URL}?key=${data.KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`);
        // console.log(response);
        if (response.data.totalHits === 0) {
            Notify.success(
            'Sorry, there are no images matching your search query. Please try again.'
            );
        } else {
            Notify.success(`Hooray! We found ${response.data.totalHits} images.`);
            this.incrementPage();
            const photos = await response.data.hits;
            return photos;
        }
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