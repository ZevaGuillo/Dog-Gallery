import * as API from './fetchDog.js';

const img = document.querySelectorAll('#randomDog img');
const spanError = document.getElementById('error');
const randomDogSection = document.getElementById('randomDog'); 

function getFromUpload(){
    const form = document.getElementById('uploadingForm');
    return new FormData(form);
}

function errorMessage(error, message){
    spanError.innerHTML = 'vales pipi ' + error +' '+message
}

function drawFavourites(dogList){
    let favouriteDogList = document.getElementById('favouriteDogList');
    favouriteDogList.innerHTML = '';
    const docFra = document.createDocumentFragment();
    dogList.forEach(dog =>{

        docFra.appendChild(getElementImage(dog,'Quitar de favoritos',API.deleteFavouriteDog));
        
    });
    favouriteDogList.appendChild(docFra);
}

function drawImgRandom(dogList){

    const docFra = document.createDocumentFragment();

    dogList.forEach(dog =>{
        console.log(dog,'random')
        docFra.appendChild(getElementImage(dog,'Favoritos', API.saveFavouritesDogs));
    })

    randomDogSection.appendChild(docFra)

}

function getElementImage(dog, buttonName, callback){
    let article = document.createElement('article');
    let img = document.createElement('img');
    let button = document.createElement('button');
    if(dog.url !== undefined){
        img.src = dog.url;    
    }else{
        img.src = dog.image.url;
    }
    article.classList.add('bg-slate-600');
    img.classList.add('h-48' ,'w-full' ,'object-cover')
    button.innerHTML = buttonName;
    button.addEventListener('click',()=>{
        callback(dog.id)
    });
    article.appendChild(img);
    article.appendChild(button);
    return article
}

export{drawFavourites, drawImgRandom, errorMessage, getFromUpload}