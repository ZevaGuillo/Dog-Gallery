import {loadFavourites, loadImgRandom, uploadDogPhoto} from './utils/fetchDog.js';

const btn_uploadDog = document.querySelector('#uploadingForm button')

btn_uploadDog.addEventListener('click',uploadDogPhoto)


loadImgRandom()
loadFavourites();