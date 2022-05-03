import * as VIEW from "./view.js"

const API_URL_random = 'https://api.thedogapi.com/v1/images/search?limit=100'
const API_URL_favourites = 'https://api.thedogapi.com/v1/favourites'
const API_URL_delete = (id) => `https://api.thedogapi.com/v1/favourites/${id}`
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload'
const API_URL_BREEDS = 'https://api.thedogapi.com/v1/breeds';
const spanError = document.getElementById('error');

async function loadBreeds(){
    let breeds = await getBreedsApi();
    console.log(breeds);
    VIEW.drawBreedsItem(breeds)
}

async function loadImgRandom(){
    let dogs = await APIDogs(API_URL_random); 
    loadBreeds();
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

async function getBreedsApi(){
    try {
        let response = await fetch(API_URL_BREEDS);
        let  data = await response.json();

        if(response.ok){
            console.log(data,'raza')
            return data;
        }else{
            VIEW.errorMessage(response.status,data.message);
        }
        
    } catch (error) {
        VIEW.errorMessage(error,'Carga de Razas');
    }
}

async function APIDogs(api_url, param = {}){
    
    try{
        let response = await fetch(api_url,param);
        let data = await response.json();

        if(response.ok){
            console.log(data,'cono')

            return data;
        }else{
            VIEW.errorMessage(response.status,data.message);
        }

    } catch(err) {
        VIEW.errorMessage(err,'error api');
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
        VIEW.errorMessage(err,'gola');
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
        VIEW.errorMessage(err,'PURO');
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
            console.log({data});
            spanError.innerHTML = 'foto subida';
            saveFavouritesDogs(data.id)
            loadFavourites()
        }else{
            VIEW.errorMessage(response.status,data.message);
        }

    } catch(err) {
        VIEW.errorMessage(err,'error api');
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
    getBreedsApi
    };