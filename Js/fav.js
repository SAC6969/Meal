const favList = document.querySelector(".fav-list");

const favMealContainer = document.querySelector(".fav-meal-container");
(function fetchfromLocal(){
    let allItem = JSON.parse(localStorage.getItem('meals'));
    if(allItem.length == 0){
        checkFavHave();
    }else{
        allItem.forEach(item => {
            fetch(`https://themealdb.com/api/json/v1/1/lookup.php?i=${item}`)
            .then(response => {
                return response.json();
            })
            .then( data => {
                showDetailsOfMeal(data.meals[0]);
                // console.log(data);
            })
        })
    }
})();

function showDetailsOfMeal(i){
    if(i){
        const div = document.createElement("div");
        div.classList.add('item');
        div.setAttribute('meal-id',i.idMeal);
        
        div.innerHTML = `
        <div class="img">
            <img src=${i.strMealThumb} alt="meal-img" height="160px" width="160px"/>
        </div>
        <div class="mealDetails">
            <div>Name: ${i.strMeal}</div>
            <div>Category: ${i.strCategory}</div>
            <div>Cuisine: ${i.strArea}</div>
            <div>Instructions: ${i.strInstructions.slice(0,200)+'.........'}</div>
        </div>
        `

        const favButton = document.createElement("button");
        favButton.classList.add('fav-button');
        favButton.innerHTML = "<i class='far fa-heart'></i> Remove Favourite";
        favButton.classList.add("remove-btn");
        div.appendChild(favButton);

        favMealContainer.appendChild(div);
        favButton.addEventListener('click',function(e,id = i.idMeal){
            let meals = JSON.parse(localStorage.getItem('meals'));
            let idx = meals.findIndex(it=> it == id);
            meals.splice(idx,1);
            localStorage.setItem('meals',JSON.stringify(meals));
            favMealContainer.removeChild(div);
            let allItem = JSON.parse(localStorage.getItem('meals'));
            if(allItem.length == 0){
                checkFavHave();
            }
        })

    }
}


function checkFavHave(){
    const h1 = document.createElement("h1");
    h1.innerText = "Add Your Favourite Meal";
    favList.appendChild(h1);
}