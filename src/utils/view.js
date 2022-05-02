import * as API from './fetchDog.js';

const spanError = document.getElementById('error');
let randomDogSection ; 
let favouriteDogList ;
let formUploadElement;
const containerElement = document.getElementById('container');
const pageAllElement = document.getElementById('page-all');
const pageFavouritesElement = document.getElementById('page-favourites');
const pageUploadElement = document.getElementById('page-upload');

pageAllElement.addEventListener('click',(e)=>{
    containerElement.innerHTML = '';
    pageAllElement.classList.add('page-focused');
    pageAllElement.classList.remove('page-blurred');

    pageFavouritesElement.classList.add('page-blurred');
    pageFavouritesElement.classList.remove('page-focused');

    pageUploadElement.classList.add('page-blurred');
    pageUploadElement.classList.remove('page-focused');
    createAllPage();
    API.loadImgRandom();
});
pageFavouritesElement.addEventListener('click',(e)=>{
    containerElement.innerHTML = '';
    pageFavouritesElement.classList.add('page-focused');
    pageFavouritesElement.classList.remove('page-blurred');

    pageAllElement.classList.add('page-blurred');
    pageAllElement.classList.remove('page-focused');
    
    pageUploadElement.classList.add('page-blurred');
    pageUploadElement.classList.remove('page-focused');
    createfavouritePage();
    API.loadFavourites();
});
pageUploadElement.addEventListener('click',(e)=>{
    containerElement.innerHTML = '';
    pageUploadElement.classList.add('page-focused');
    pageUploadElement.classList.remove('page-blurred');

    pageFavouritesElement.classList.add('page-blurred');
    pageFavouritesElement.classList.remove('page-focused');

    pageAllElement.classList.add('page-blurred');
    pageAllElement.classList.remove('page-focused');
    
    createuploadPage()
});

function createuploadPage(){
    const div = document.createElement('div');
    
    let section = document.createElement('section');
    section.classList.add('uploadingDog');
    let h2 = document.createElement('h2');
    h2.innerHTML = "Sube la foto de tu Perrito"
    formUploadElement = document.createElement('form');
    formUploadElement.id = 'uploadingForm';
    let inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.id = 'file';
    inputFile.name = 'file';
    let button = document.createElement('button');
    button.innerHTML = 'Subir foto de tu perro';
    button.addEventListener('click',API.uploadDogPhoto)
    formUploadElement.appendChild(inputFile);
    formUploadElement.appendChild(button);
    section.appendChild(h2);
    section.appendChild(formUploadElement);

    div.appendChild(section);
    containerElement.appendChild(div)
}

function createfavouritePage(){
    const div = document.createElement('div');
    div.classList.add('favouritesGallery');
    let h2 = document.createElement('h2');
    h2.innerText = 'Favoritos';
    //h2.classList.add('m-5')
    let section = document.createElement('section');
    section.id ='favouritesDogs';
    section.classList.add('flex', 'justify-center');
    favouriteDogList = document.createElement('div');
    favouriteDogList.id = 'favouriteDogList';
    favouriteDogList.classList.add('container-dogs');
    section.appendChild(favouriteDogList);

    div.appendChild(h2);
    div.appendChild(section);
    
    containerElement.appendChild(div);
}

function createAllPage(){
    const div = document.createElement('div');
    div.classList.add('flex','justify-center');
    div.innerHTML = getFilterImageElement()
    

    containerElement.appendChild(div);
    containerElement.appendChild(getGalleryRandomElement())
}

function getGalleryRandomElement(){
    const div = document.createElement('div');
    div.classList.add('flex','justify-center');
    randomDogSection = document.createElement('section');
    randomDogSection.id = 'randomDog';
    randomDogSection.classList.add('container-dogs');
    div.appendChild(randomDogSection)
    return div;
}

function getFilterImageElement(){
    return `
        <div class="w-11/12 my-3 flex items-center ">
            <label class="flex items-center gap-4">
            <span class="text-gray-700 font-semibold">Tipo</span>
            <select id="select-type-dog"
                class="bg-transparent block w-28 mt-0 px-1.5 border-0 border-b-2 border-gray-300 text-gray-500  focus:ring-0 focus:border-black">
                <option value="all">Todo</option>
                <option value="static">Est&aacute;tico</option>
                <option value="animated">Animado</option>
            </select>
            </label>
            <div class="h-full px-4 flex items-center flex-nowrap gap-6 overflow-x-scroll scrollbar-none">
            <span class="item-breeds">GUILLERMO</span>
            </div>
        </div>
    `
}

function getFromUpload(){
    return new FormData(formUploadElement);
}

function errorMessage(error, message){
    spanError.innerHTML = 'vales pipi ' + error +' '+message
}

function drawFavourites(dogList){
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
    let div = document.createElement('div');
    let img = document.createElement('img');
    let button = document.createElement('button');
    if(dog.url !== undefined){
        img.src = dog.url;    
    }else{
        img.src = dog.image.url;
    }
    button.classList.add('btn-favourites');
    div.classList.add('dog-item');
    //img.classList.add('h-48' ,'w-full' ,'object-cover')
    button.innerHTML = buttonName;
    button.addEventListener('click',()=>{
        callback(dog.id)
    });
    div.appendChild(img);
    div.appendChild(button);
    return div
}

createAllPage()
export{drawFavourites, drawImgRandom, errorMessage, getFromUpload}