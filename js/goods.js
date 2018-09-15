'use strict';

var NAMES_OF_SWEETS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
var PICTURES_OF_SWEETS = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];
var CONTENT_OF_SWEETS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];

var getRandomMinMax = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var getRandomArray = function (arr) {
  return Math.floor(Math.random() * arr.length);
}
var getRandomBoolean = function () {
  return Boolean(Math.round(Math.random()));
}
var findUnique = function (arr) {
  var obj = {};
  for (var i = 0; i < arr.length; i++) {
    var str = arr[i];
    obj[str] = true;
  }
  return Object.keys(obj); 
}
var getDescription = function (cards, names, pictures, content) {
    for (var i = 0; i < cards.length; i++) {
        cards[i] = {};
        cards[i].name = names[getRandomArray(names)];
        cards[i].picture = pictures[getRandomArray(pictures)];
        cards[i].amount = getRandomMinMax(0, 20);
        cards[i].price = getRandomMinMax(100, 1500);
        cards[i].weight = getRandomMinMax(30, 300);
        cards[i].rating = {};
        cards[i].rating.value = getRandomMinMax(1, 5);
        cards[i].rating.number = getRandomMinMax(10, 900);
        cards[i].nutritionFacts = {}; 
        cards[i].nutritionFacts.sugar = getRandomBoolean();
        cards[i].nutritionFacts.energy = getRandomMinMax(70, 500);
        
        var contentPoint = [];
        contentPoint.length = getRandomMinMax(1, content.length);
        for (var j = 0; j < contentPoint.length; j++) {
          contentPoint[j] = content[getRandomArray(content)];
        }
        cards[i].nutritionFacts.contents = findUnique(contentPoint).join(', ');    
    }
}

var cardsOfSweets = [];
cardsOfSweets.length = 26;
getDescription(cardsOfSweets, NAMES_OF_SWEETS, PICTURES_OF_SWEETS, CONTENT_OF_SWEETS);

var goodsInBacket = [];
goodsInBacket.length = 3;
getDescription(goodsInBacket, NAMES_OF_SWEETS, PICTURES_OF_SWEETS, CONTENT_OF_SWEETS);

document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
document.querySelector('.catalog__load').classList.add('visually-hidden');

var cardList = document.querySelector('.catalog__cards');
var fragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

for (var i = 0; i < cardsOfSweets.length; i++) {
    var sweetElement = cardTemplate.cloneNode(true);
    if (cardsOfSweets[i].amount > 5) {
        sweetElement.classList.add('card--in-stock');
    } else if (cardsOfSweets[i].amount > 0) {
        sweetElement.classList.add('card--little');
    } else {
        sweetElement.classList.add('card--soon');
    }
    sweetElement.querySelector('.card__title').textContent = cardsOfSweets[i].name;
    sweetElement.querySelector('img').src = cardsOfSweets[i].picture;
    sweetElement.querySelector('.card__price').childNodes[0].textContent = cardsOfSweets[i].price + ' ';
    sweetElement.querySelector('.card__weight').textContent = '/ ' + cardsOfSweets[i].weight + ' Г';
    var elementRating = sweetElement.querySelector('.stars__rating');
    elementRating.classList.remove('stars__rating--five');
    elementRating.classList.add('stars__rating--one'); 
    if (cardsOfSweets[i].rating.value === 1) {
        elementRating.classList.add('stars__rating--one'); 
    } else if (cardsOfSweets[i].rating.value === 2) {
        elementRating.classList.add('stars__rating--two');
    } else if (cardsOfSweets[i].rating.value === 3) {
        elementRating.classList.add('stars__rating--three');
    } else if (cardsOfSweets[i].rating.value === 4) {
        elementRating.classList.add('stars__rating--four');
    } else {
        elementRating.classList.add('stars__rating--five');
    }
    sweetElement.querySelector('.star__count').textContent = cardsOfSweets[i].rating.number;
    if (cardsOfSweets[i].nutritionFacts.sugar) {
        sweetElement.querySelector('.card__characteristic').textContent = 'Содержит сахар. ' +  cardsOfSweets[i].nutritionFacts.energy + ' ккал'
    } else {
        sweetElement.querySelector('.card__characteristic').textContent = 'Без сахара. ' +  cardsOfSweets[i].nutritionFacts.energy + ' ккал'
    }
    sweetElement.querySelector('.card__composition-list').textContent = cardsOfSweets[i].nutritionFacts.contents;
    fragment.appendChild(sweetElement);
}
cardList.appendChild(fragment);

var backetList = document.querySelector('.goods__cards');
var fragment_1 = document.createDocumentFragment();
var backetTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
for (var i = 0; i < goodsInBacket.length; i++) {
    var goodInBacket = backetTemplate.cloneNode(true);
    goodInBacket.querySelector('.card-order__title').textContent = goodsInBacket[i].name;
    goodInBacket.querySelector('img').src = goodsInBacket[i].picture;
    goodInBacket.querySelector('.card-order__price').textContent = goodsInBacket[i].price + ' ₽';
    fragment_1.appendChild(goodInBacket);
}
backetList.appendChild(fragment_1);

document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
document.querySelector('.goods__card-empty').classList.add('visually-hidden');

