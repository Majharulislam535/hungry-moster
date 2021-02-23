const searchBtn = document.getElementById('Search');
const maleList = document.getElementById('maleList');
searchBtn.addEventListener('click',getMaleList);
const mealSet = document.getElementById('mealDetails');

function getMaleList(){
     let searchInput = document.getElementById('input-value').value.trim();
      
     fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInput}`)
     .then(res=>res.json())
     .then(data => {
            let html = '';
             if(data.meals){
                  data.meals.forEach( male =>{
                       html +=`
                         <div id='second' class="row"
               <div class="col-md-3">
               <div  data-id=${male.idMeal} class="list">
                  <div class="img">
                      <img class='img-fluid' src=${male.strMealThumb} alt="">
                   </div>
                  <div class="name">
                       <h4>${male.strMeal}</h4>
                    </div> 
                  </div>
           </div>
             </div>
                        `      
                  })
             }  
             else{
                  html=` <h2> sorry we have not found </h2>` 
             } 
             
             maleList.innerHTML= html;
     })
}

maleList.addEventListener('click',detailsInfo);
function detailsInfo(e){
     e.preventDefault();
      if(e.target.classList){
           let mealItem = e.target.parentElement.parentElement;
           fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
           .then(res => res.json())
           .then(data => mealDetail(data.meals));    
      }
}

function mealDetail(meal){
     console.log(meal);
    meal = meal [0];
    let html = `
    <div class='mealDetails'>
    <div class='img-2'>
     <img src="${meal.strMealThumb}" alt="">
     </div> 
               <div class="name-2">
       <p> <strong> ${meal.strMeal} </strong></p>
               </div>
          <div class="ingredients">
               <h4>Ingredients</h4>
          </div>
     <div class="detils">
     <ul>
         <li> ${meal.strCategory} </li>
         <li> ${meal.strIngredient1}</li>
         <li> ${meal.strIngredient2} </li>
         <li> ${meal.strIngredient3} </li>
         <li> ${meal.strIngredient4}</li>
         <li> ${meal.strIngredient5}</li>
         <li> ${meal.strIngredient6}</li>
        
     </ul>
     </div>
     </div>
  `
  mealSet.innerHTML = html;
}

 

 
 