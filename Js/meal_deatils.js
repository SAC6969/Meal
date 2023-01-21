// get id of clicked meal
const id = localStorage.getItem("clickedId");

const names = document.querySelector('.meal-name');
const imgs = document.querySelector('.meal-img');
const category = document.querySelector('.meal-category');
const cuisine = document.querySelector('.meal-cuisine');
const instruction = document.querySelector('.meal-instruction');
const detailContainer = document.querySelector('.details_container');
const addFav = document.querySelector('.add-fav');



(function init(){
    fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then(response => {
        return response.json();
    })
    .then( data => {
        showDetailsOfMeal(data.meals[0]);
    })
})();

function showDetailsOfMeal(data){  
    names.innerHTML = '<b>Name:</b> '+data.strMeal;
    const img = document.createElement("img");
    img.src = data.strMealThumb;
    imgs.appendChild(img);

    category.innerHTML = '<b>Category:</b> ' + data.strCategory;
    cuisine.innerHTML = '<b>Cuisine: </b>' + data.strArea;
    instruction.innerHTML ='<b>Instruction:</b> ' + data.strInstructions;

    const favButton = document.createElement("button");
    favButton.classList.add('fav-button');

    favButton.addEventListener('click',function(e,id=data.idMeal){
        let meals;
        if(localStorage.getItem('meals') == null){
            meals = [];
            meals.push(id);
            favButton.innerHTML = "<i class='far fa-heart'></i> Remove Favourite";
            favButton.classList.add("remove-btn");
            favButton.classList.remove("add-btn");
        }else{
            meals = JSON.parse(localStorage.getItem('meals'));
            let idx = meals.findIndex(i=> i == id);
            if(idx == -1){
                meals.push(id);
                favButton.innerHTML = "<i class='far fa-heart'></i> Remove Favourite";
                favButton.classList.add("remove-btn");
                favButton.classList.remove("add-btn");
            }else{
                meals.splice(idx,1);
                favButton.innerHTML = "<i class='far fa-heart'></i> Add Favourite";
                favButton.classList.remove("remove-btn");
                favButton.classList.add("add-btn");
            }
        }
        localStorage.setItem('meals',JSON.stringify(meals));
    })

    if (isPresentInFav(data.idMeal)) {
        favButton.innerHTML = "<i class='far fa-heart'></i> Remove Favourite";
        favButton.classList.add("remove-btn");
    } else {
        favButton.innerHTML = "<i class='far fa-heart'></i> Add Favourite";
        favButton.classList.add("add-btn");
    }
    
    addFav.appendChild(favButton);
}

function isPresentInFav(id){
    let meals;
    if(localStorage.getItem('meals') == null){
        meals = []
        return false;
    }else{
        meals = JSON.parse(localStorage.getItem('meals'));
        let idx = meals.findIndex(i => i == id);
        return idx != -1 ? true : false;
    }
}