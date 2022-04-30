const API_URL_random = 'https://api.thedogapi.com/v1/images/search?limit=2&api_key=de07e403-3775-4a02-baa4-1d0a1a2f33c9'
const API_URL_favourites = 'https://api.thedogapi.com/v1/favourites'
const API_URL_delete = (id) => `https://api.thedogapi.com/v1/favourites/${id}`
const API_URL_UPLOAD = 'https://api.thedogapi.com/v1/images/upload'

const button = document.getElementById('btn-random');
const img = document.querySelectorAll('#randomDog img');
const spanError = document.getElementById('error');
const btn_uploadDog = document.querySelector('#uploadingForm button')

button.addEventListener('click', loadImgRandom)
btn_uploadDog.addEventListener('click',uploadDogPhoto)

async function loadFavourites(){
    let favouriteDogList = document.getElementById('favouriteDogList');
    favouriteDogList.innerHTML = '';
    
    let fDogs = await APIDogs(API_URL_favourites,{
        method: 'GET',
        headers: {
            'X-API-KEY': 'de07e403-3775-4a02-baa4-1d0a1a2f33c9'
        }
    });
    const docFra = document.createDocumentFragment();
    fDogs.forEach(dog =>{
        console.log(dog)
        let article = document.createElement('article');
        let img = document.createElement('img');
        let button = document.createElement('button');
        img.src = dog.image.url;
        button.innerHTML = 'Sacar perrito';
        button.addEventListener('click',()=>deleteFavouriteDog(dog.id));
        article.appendChild(img);
        article.appendChild(button);
        docFra.appendChild(article);
    });
    favouriteDogList.appendChild(docFra);

}

async function loadImgRandom(){
    let dogs = await APIDogs(API_URL_random);
    
    img.forEach((el, index)=>{
        el.src = dogs[index].url;
        el.nextElementSibling.addEventListener('click', ()=>saveFavouritesDogs(dogs[index].id))
    })
}

async function APIDogs(api_url, param = {}){
    
    try{
        let response = await fetch(api_url,param);
        let data = await response.json();

        if(response.ok){
            console.log(data,'cono')

            return data;
        }else{
            spanError.innerHTML = 'vales pipi '  + response.status
        }

    } catch(err) {
      console.log('puto ', err)
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

        
        if(response.ok){
            console.log("save");
            loadFavourites()
        }else{
            spanError.innerHTML = 'vales pipi '  + response.status
        }

    } catch(err) {
      console.log('puto ', err)
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
            
            spanError.innerHTML = 'vales pipi '  + response.status +' '+data.message
        }

    } catch(err) {
      console.log('puto ', err)
    }
}

async function uploadDogPhoto(){
    const form = document.getElementById('uploadingForm');
    const formData = new FormData(form);

    console.log(formData.get('file'));

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
    }else{
        spanError.innerHTML = 'vales pipi '  + response.status
    }
}

loadImgRandom()
loadFavourites();