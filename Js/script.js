let searchText = document.querySelector('.searchbox');
// let mealContainer = document.querySelector('.meal-container');
let seachContainer = document.querySelector('.search-container');
let mainContainer = document.querySelector('.main-container');


// console.log("sa",searchText);
searchText.addEventListener('keyup',delay(searchMeal));

//delay the api fetch for some time
function delay(cb,delay = 350){
    let timeout;
    return (...args)=>{
        clearTimeout(timeout);
        timeout = setTimeout(()=>{
            cb(...args);
        },delay)
    }
}

//fetch meal from api
function searchMeal(){
    let url = `https://themealdb.com/api/json/v1/1/search.php?s=${searchText.value}`
    fetch(url)
    .then(response=>{
        return response.json();
    })
    .then(data=>{
        searchedItem(data.meals);
        // console.log("d",data.meals);
    })
}

function searchedItem(data){  
    removePrevious();
    if(data){
        let mealContainer = document.createElement('div');
        mealContainer.classList.add('meal-container');

        for(let i of data){
            const div = document.createElement("div");
            div.classList.add('item');
            div.setAttribute('meal-id',i.idMeal);
                
            div.innerHTML = `
            <div class="img">
                <img src=${i.strMealThumb} alt="meal-img" height="60px" width="60px"/>
            </div>
            <div class="mealDetails">
                <div><a meal-id=${i.idMeal} target="_blank" onclick=displayDetails(${i.idMeal}) href="meal_details.html">${i.strMeal}</a></div>
            </div>
            `
    
            const favButton = document.createElement("button");
            favButton.classList.add('fav-button');
            
            favButton.addEventListener('click',function(e,id=i.idMeal){
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
    
            if (isPresentInFav(i.idMeal)) {
                favButton.innerHTML = "<i class='far fa-heart'></i> Remove Favourite";
                favButton.classList.add("remove-btn");
            } else {
                favButton.innerHTML = "<i class='far fa-heart'></i> Add Favourite";
                favButton.classList.add("add-btn");
            }
            div.appendChild(favButton);
            mealContainer.appendChild(div);
        }
        mainContainer.appendChild(mealContainer);
    }
    if(searchText.value == ''){
        mainContainer.innerHTML = '';
    }
}

function displayDetails(data){
    localStorage.setItem("clickedId", data);
}

function isPresentInFav(id){
    // console.log(id);
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

function removePrevious(){
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild);
    }
}

