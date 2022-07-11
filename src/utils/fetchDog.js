import * as VIEW from "./view.js"

const API_URL_random = (type) => `https://api.thedogapi.com/v1/images/search?limit=30&page=1&order=DESC&${type}`
const API_URL_favourites = 'https://api.thedogapi.com/v1/favourites'
const API_URL_delete = (id) => `https://api.thedogapi.com/v1/favourites/${id}`
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload'
const spanError = document.getElementById('error');


async function loadImgRandom(type = ''){
    if(type !== ''){
        type = `mime_types=${type}`
    }
    let dogs = await APIDogs(API_URL_random(type)); 
    VIEW.drawImgRandom(dogs);
}

async function loadFavourites(){
    let fDogs = await APIDogs(API_URL_favourites,{
        method: 'GET',
        headers: {
            'X-API-KEY': 'de07e403-3775-4a02-baa4-1d0a1a2f33c9'
        }
    });

    VIEW.drawFavourites(fDogs);
}

async function APIDogs(api_url, param = {}){

    try{
        let response = await fetch(api_url,param);
        let data = await response.json();

        if(response.ok){
            return data;
        }else{
            VIEW.errorMessage(response.status,data.message);
        }

    } catch(err) {
        VIEW.errorMessage(err,'Al cargar la api');
    }
} 

async function saveFavouritesDogs(id){
    try{
        let response = await fetch(API_URL_favourites, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'de07e403-3775-4a02-baa4-1d0a1a2f33c9'
            },
            body: JSON.stringify({
                image_id: id
            })
        })

        let data = await response.json();
        
        if(response.ok){
            console.log("save");
            loadFavourites()
        }else{
            VIEW.errorMessage(response.status,data.message);
        }

    } catch(err) {
        VIEW.errorMessage(err,'Error de carga de favoritos');
    }
}

async function deleteFavouriteDog(id){
    try{
        let response = await fetch(API_URL_delete(id), {
            method: 'DELETE',
            headers:{
                'X-API-KEY': 'de07e403-3775-4a02-baa4-1d0a1a2f33c9'
            }
        });
        
        let data = await response.json();

        if(response.ok){
            console.log("Deleted");
            loadFavourites()
        }else{
            VIEW.errorMessage(response.status,data.message);
            
        }

    } catch(err) {
        VIEW.errorMessage(err,'Error al remover de favorito');
    }
}

async function uploadDogPhoto(){
    
    const formData = VIEW.getFromUpload();

    try{
        const response = await fetch(API_URL_UPLOAD,{
            method: 'POST',
            headers: {
                // 'Content-Type': 'multipart/form-data',
                'X-API-KEY': 'de07e403-3775-4a02-baa4-1d0a1a2f33c9'
            },
            body: formData,
        })
        const data = await response.json();
        
        if(response.ok){
            console.log("Upload");
            spanError.innerHTML = 'foto subida';
            saveFavouritesDogs(data.id)
            loadFavourites()
        }else{
            VIEW.errorMessage(response.status,data.message);
        }

    } catch(err) {
        VIEW.errorMessage(err,'Error al subir una imagen');
    }

}

export{API_URL_random, API_URL_favourites, API_URL_delete, API_URL_UPLOAD}
export {
    APIDogs,
    saveFavouritesDogs,
    deleteFavouriteDog,
    uploadDogPhoto,
    loadFavourites,
    loadImgRandom,
    };