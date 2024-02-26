async function getDishesTypes() {
  let response = await fetch('js/dishType.json');
  let dishesTypes = await response.json();
  let responseDishes = await fetch('js/dishes.json');
  let dishesList = await responseDishes.json();

  let dishContent = document.querySelector('.dishes');

  for (const dishType in dishesTypes) {
    let dishHeader = document.createElement("h2");
    dishHeader.innerText = dishesTypes[dishType];
    dishHeader.classList.add("content__header");
    dishHeader.id = dishesTypes[dishType];
    dishContent.appendChild(dishHeader);

    let dishesBody = document.createElement("div");
    dishesBody.classList.add("content__body");
    dishContent.appendChild(dishesBody);


    for (const dish in dishesList) {
      if (dishesTypes[dishType] === dishesList[dish].dishType) {
        let dishBox = document.createElement("div");
        dishBox.classList.add("content__card");
        dishBox.innerHTML += `
            <div class="card">
              <h5 class="card__title">${dishesList[dish].name}</h5>
              <span class="card__descr">${dishesList[dish].ingridients}</span>
              <div class="card__spec">${dishesList[dish].weight}</div>
              <div class="card__price">${dishesList[dish].price}</div>
            </div>
        `
        console.log(dishesList[dish].name)
        dishesBody.appendChild(dishBox);
      }

    }


  }
}
getDishesTypes();


function findDish() {
  window.find(aString, aShowDialog);
    var res= document.body.innerText.indexOf(s);
    return (res==-1)?false:true;
    
}