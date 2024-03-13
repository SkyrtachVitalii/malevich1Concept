const dishesTypesLink = 'js/dishType.json';
const dishesListLink = 'js/dishes.json';

const barTypesLink = 'js/barTypes.json';
const barListLink = 'js/bar.json';

async function createDishesList(typesLink, listLink) {
  let response = await fetch(typesLink);
  let dishesTypes = await response.json();
  let responseDishes = await fetch(listLink);
  let dishesList = await responseDishes.json();
  createDishContent(dishesList, dishesTypes)
}

function createDishContent(dishesList, dishesTypes){
  let dishContent = document.querySelector('.dishes');
    createDishHeaderAndBody(dishContent, dishesList, dishesTypes);
}

function createDishHeaderAndBody(dishContent, dishesList, dishesTypes){
  for (const dishType in dishesTypes) {
    let dishHeader = document.createElement("h2");
    dishHeader.innerText = dishesTypes[dishType];
    dishHeader.classList.add("content__header");
    dishHeader.id = translite( dishesTypes[dishType]);
    dishContent.appendChild(dishHeader);
    let dishesContainer = document.createElement("div");
    dishesContainer.classList.add("content__body");
    dishContent.appendChild(dishesContainer);
    for (const dishIndex in dishesList) {
      let dish = dishesList[dishIndex];
      if (dishesTypes[dishType]=== dish.dishType) {
        dishesContainer.appendChild(createDishCard(dish));
      }
    }
  }
}

function createDishCard(dish){
  let card = document.createElement("div");
  card.classList.add("card");
  card.appendChild(createDishHeading(dish));
  card.appendChild(createCardContent(dish));
  return card;
}

function createDishHeading(dish){
  let title = document.createElement("h5");
  title.classList.add("card__title");
  title.innerText = dish.name;
  if(dish.descr && dish.descr.length > 0){
    let titleDescr = document.createElement("span");
    titleDescr.classList.add("card__title__descr");
    titleDescr.innerText = dish.descr;
    title.appendChild(titleDescr);
    if(dish.subDishType && dish.subDishType.length > 0){
      titleDescr.innerText += " - " + dish.subDishType
    }
  }
  
  return title;
}

function createCardContent(dish){
  let cardContent = document.createElement("div");
  cardContent.classList.add("card__content");
  cardContent.appendChild(createCardInfo(dish));
  cardContent.appendChild(createCardPrice(dish));
  return cardContent;
}

function createCardPrice(dish){
  const { volume, price_for_50ml, price_for_0_33l, price_for_0_5l, price , ...args} = dish;
  let cardPrice = document.createElement("div");
  cardPrice.classList.add("card__price");

  let cardPriceRow = document.createElement("div");
  cardPriceRow.classList.add("card__price__row");
  cardPrice.appendChild(cardPriceRow);
    if(price_for_50ml){
      const price50ml = "Ціна за 50 мл."
      cardPriceRow.appendChild(createCardPriceCol(price50ml, price_for_50ml));
    }
    if(price_for_0_33l){
      const price0_33l = "Ціна за 0,33 л."
      cardPriceRow.appendChild(createCardPriceCol(price0_33l, price_for_0_33l));
    }
    if(price_for_0_5l){
      const price0_35l = "Ціна за 0,5 л."
      cardPriceRow.appendChild(createCardPriceCol(price0_35l, price_for_0_5l));
    }
  if (price) {
    cardPrice.appendChild(createMainPrice(price));
  }
  
  return cardPrice;
}

function createCardPriceCol(priceHeader, priceValue){
  let cardPriceCol = document.createElement("div");
  cardPriceCol.classList.add("card__price__col");
  cardPriceCol.innerHTML = `
    <div class="card__price__col__head">${priceHeader}</div>
    <div class="card__price__col__value">${priceValue} грн.</div>
  `
  return cardPriceCol;
}

function createMainPrice(price){
  let mainPrice = document.createElement("div");
  mainPrice.classList.add("card__price__main");
  mainPrice.textContent = price + " грн."
  return mainPrice;
}

function createCardInfo(dish){
  let cardInfo = document.createElement("div");
  cardInfo.classList.add("card__info");

  const {ingridients, ...args} = dish;
  cardInfo.appendChild(createDishIngridients(ingridients));
  cardInfo.appendChild(createDishWeight(args));
  return cardInfo;
}

function createDishIngridients(ingridients){
  let dishIngridientsBox = document.createElement("span");
  dishIngridientsBox.classList.add("card__ingridients");
  dishIngridientsBox.textContent = ingridients;
  return dishIngridientsBox;
}

function createDishWeight(args){
  let {weight = "", volume = ""} = args;
  let dishSpecBox = document.createElement("div");
  dishSpecBox.classList.add("card__weight");
    if (weight.length > 0){
      weight = weight + " г."
      dishSpecBox.textContent = weight;
    }else if (volume.length > 0){
      volume = volume + " мл."
      dishSpecBox.textContent = volume;
    }else{
      // console.log("weight or volume parameters not found")
    }
  return dishSpecBox;
}

function translite(str) {
	let space = '-';
	str = str.toLowerCase();
		let transl = {
		'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ё': 'e', 'ж': 'zh',
		'з': 'z', 'и': 'i', 'й': 'j', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
		'о': 'o', 'п': 'p', 'р': 'r','с': 's', 'т': 't', 'у': 'u', 'ф': 'f', 'х': 'h',
		'ц': 'c', 'ч': 'ch', 'ш': 'sh', 'щ': 'sh','ъ': '~', 'ы': 'y', 'ь': '~', 'э': 'e', 'ю': 'yu', 'я': 'ya'
		}
	let link = '';
	for (let i = 0; i < str.length; i++) {
		if(/[а-яё]/.test(str.charAt(i))) {
		link += transl[str.charAt(i)];
			} else if (/[a-z0-9]/.test(str.charAt(i))) {
				link += str.charAt(i);
			} else {
		if (link.slice(-1) !== space) link += space;
		}
	}
	return(link.replace(/~/g,''));
}

createDishesList(dishesTypesLink, dishesListLink);
setTimeout(() => {
  createDishesList(barTypesLink, barListLink);
}, "300");


// =========== кнопка для переміщення вгору =============
const btnUp = {
  el: document.querySelector('.btn-up'),
  show() {
    // удалим у кнопки класс btn-up_hide
    this.el.classList.remove('btn-up__hide');
  },
  hide() {
    // добавим к кнопке класс btn-up_hide
    this.el.classList.add('btn-up__hide');
  },
  addEventListener() {
    // при прокрутке содержимого страницы
    window.addEventListener('scroll', () => {
      // определяем величину прокрутки
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      // если страница прокручена больше чем на 400px, то делаем кнопку видимой, иначе скрываем
      scrollY > 400 ? this.show() : this.hide();
    });
    // при нажатии на кнопку .btn-up
    document.querySelector('.btn-up').onclick = () => {
      // переместим в начало страницы
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
    }
  }
}

btnUp.addEventListener();
// =======================================================


let isMobile = {
  Android: function () {
      return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
      return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
      return (
              isMobile.Android()
              || isMobile.BlackBerry()
              || isMobile.iOS()
              || isMobile.Opera()
              || isMobile.Windows()
              );
  }
};


let body = document.querySelector('body');
if(isMobile.any()){
  body.classList.add('touch');
  let arrow = document.querySelectorAll(".arrow");
  for (let i = 0; i < arrow.length; i++){
    let thisLink = arrow[i].previousElementSibling;
    let dropdownMenu = arrow[i].nextElementSibling;
    let thisArrow = arrow[i];

    thisLink.classList.add('parent');

    arrow[i].addEventListener("click", function(){
      dropdownMenu.classList.toggle('open');
      thisArrow.classList.toggle('active');
    })
  }
}else{
  body.classList.add('mouse');
}

let dropdownItem = document.querySelectorAll(".dropdown-menu__item");
let indexPage = document.querySelector(".dishes");
for (let i = 0; i < dropdownItem.length; i++){
  dropdownItem[i].addEventListener("click", function(){
    let dropdown = document.querySelector(".dropdown-menu");
    if(body.classList.contains('touch') && dropdown.classList.contains("open")){
      dropdown.classList.remove("open");
    }
    if(!indexPage){
      const anchor = dropdownItem[i].firstChild.attributes[0].value
      console.log(anchor)
      window.location.href = `../index.html${anchor}`;
    }
  })
}


let closeMobileMenu = document.querySelector(".mobile__menu__close");
let burger = document.querySelector(".burger-menu");

let overlay = document.querySelector(".mobile__overlay");
if(closeMobileMenu){
  closeMobileMenu.addEventListener("click", function(){
    overlay.style.display = "none";
  })
}
if(burger){
  burger.addEventListener("click", function(){
    overlay.style.display = "block";
  })
}
























// function findDish() {
//   window.find(aString, aShowDialog);
//     var res= document.body.innerText.indexOf(s);
//     return (res==-1)?false:true;
    
// }