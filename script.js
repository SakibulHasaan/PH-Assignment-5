var globalData;

document.getElementById("search-btn").addEventListener("click", function () {
  fetchData();
});

document.getElementById('details').addEventListener('click', function(e){
    e.preventDefault
})

function fetchData() {
  const inputValue = document.getElementById("search-content").value;
  url = `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputValue}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
        globalData = data;
        showData(data)
    });
  document.getElementById("search-content").value = "";
}

function showData(data) {
  let str = "";

  data.meals.map(function (meal) {
    str += `
    <div class="col-md-3 mt-4">
        <div style="cursor: pointer" onclick='detailsFunction(${meal.idMeal})'>
            <div class="card">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3>${meal.strMeal}</h3>
                </div>
            </div>
        </div>
    </div>
    `;
  });

  document.getElementById("Main").innerHTML = str;
}

function detailsFunction(id){
    let currentMeal = globalData.meals.filter((meal) => {
      return meal.idMeal == id
    })

    let ingredientsArr = []

    document.getElementById("d-img").setAttribute("src", currentMeal[0].strMealThumb);

    document.getElementById('d-title').innerHTML = currentMeal[0].strMeal;

    document.getElementsByClassName("ingred-item")[0].innerHTML = currentMeal[0].strIngredient1
    document.getElementsByClassName("ingred-item")[1].innerHTML = currentMeal[0].strIngredient2
    document.getElementsByClassName("ingred-item")[2].innerHTML = currentMeal[0].strIngredient3
    document.getElementsByClassName("ingred-item")[3].innerHTML = currentMeal[0].strIngredient4
    document.getElementsByClassName("ingred-item")[4].innerHTML = currentMeal[0].strIngredient5

    document.getElementById('details').classList.remove('d-none')
    document.getElementById('details').classList.add('d-block')

}