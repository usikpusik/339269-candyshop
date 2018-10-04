'use strict';

// util.js

(function () {
  var NAMES_OF_SWEETS = ['Чесночные сливки', 'Огуречный педант', 'Молочная хрюша', 'Грибной шейк', 'Баклажановое безумие', 'Паприколу итальяно', 'Нинзя-удар васаби', 'Хитрый баклажан', 'Горчичный вызов', 'Кедровая липучка', 'Корманный портвейн', 'Чилийский задира', 'Беконовый взрыв', 'Арахис vs виноград', 'Сельдерейная душа', 'Початок в бутылке', 'Чернющий мистер чеснок', 'Раша федераша', 'Кислая мина', 'Кукурузное утро', 'Икорный фуршет', 'Новогоднее настроение', 'С пивком потянет', 'Мисс креветка', 'Бесконечный взрыв', 'Невинные винные', 'Бельгийское пенное', 'Острый язычок'];
  var PICTURES_OF_SWEETS = ['img/cards/gum-cedar.jpg', 'img/cards/gum-chile.jpg', 'img/cards/gum-eggplant.jpg', 'img/cards/gum-mustard.jpg', 'img/cards/gum-portwine.jpg', 'img/cards/gum-wasabi.jpg', 'img/cards/ice-cucumber.jpg', 'img/cards/ice-eggplant.jpg', 'img/cards/ice-garlic.jpg', 'img/cards/ice-italian.jpg', 'img/cards/ice-mushroom.jpg', 'img/cards/ice-pig.jpg', 'img/cards/marmalade-beer.jpg', 'img/cards/marmalade-caviar.jpg', 'img/cards/marmalade-corn.jpg', 'img/cards/marmalade-new-year.jpg', 'img/cards/marmalade-sour.jpg', 'img/cards/marshmallow-bacon.jpg', 'img/cards/marshmallow-beer.jpg', 'img/cards/marshmallow-shrimp.jpg', 'img/cards/marshmallow-spicy.jpg', 'img/cards/marshmallow-wine.jpg', 'img/cards/soda-bacon.jpg', 'img/cards/soda-celery.jpg', 'img/cards/soda-cob.jpg', 'img/cards/soda-garlic.jpg', 'img/cards/soda-peanut-grapes.jpg', 'img/cards/soda-russian.jpg'];
  var CONTENT_OF_SWEETS = ['молоко', 'сливки', 'вода', 'пищевой краситель', 'патока', 'ароматизатор бекона', 'ароматизатор свинца', 'ароматизатор дуба, идентичный натуральному', 'ароматизатор картофеля', 'лимонная кислота', 'загуститель', 'эмульгатор', 'консервант: сорбат калия', 'посолочная смесь: соль, нитрит натрия', 'ксилит', 'карбамид', 'вилларибо', 'виллабаджо'];
  var CARDS_OF_SWEETS_LENGTH = 26;
  var GOODS_IN_BASKET_LENGTH = 3;

  window.util = {
    NAMES_OF_SWEETS: NAMES_OF_SWEETS,
    PICTURES_OF_SWEETS: PICTURES_OF_SWEETS,
    CONTENT_OF_SWEETS: CONTENT_OF_SWEETS,
    CARDS_OF_SWEETS_LENGTH: CARDS_OF_SWEETS_LENGTH,
    GOODS_IN_BASKET_LENGTH: GOODS_IN_BASKET_LENGTH
  };
}());

// data.js

(function () {
  var getRandomMinMax = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  var getRandomArray = function (arr) {
    return Math.floor(Math.random() * arr.length);
  };
  var getRandomBoolean = function () {
    return Boolean(Math.round(Math.random()));
  };
  var findUnique = function (arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
      var str = arr[i];
      obj[str] = true;
    }
    return Object.keys(obj);
  };
  var getDescription = function (names, pictures, content, length) {
    var cards = [];
    for (var i = 0; i < length; i++) {
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
    return cards;
  };

  var cardsOfSweets = getDescription(window.util.NAMES_OF_SWEETS, window.util.PICTURES_OF_SWEETS, window.util.CONTENT_OF_SWEETS, window.util.CARDS_OF_SWEETS_LENGTH);
  // var goodsInBasket = getDescription(window.util.NAMES_OF_SWEETS, window.util.PICTURES_OF_SWEETS, window.util.CONTENT_OF_SWEETS, window.util.GOODS_IN_BASKET_LENGTH);

  window.data = {
    cardsOfSweets: cardsOfSweets,
  };
}());

// catalog.js

(function () {
  document.querySelector('.catalog__cards').classList.remove('catalog__cards--load');
  document.querySelector('.catalog__load').classList.add('visually-hidden');

  var cardList = document.querySelector('.catalog__cards');
  var cardFragment = document.createDocumentFragment();
  var cardTemplate = document.querySelector('#card').content.querySelector('.catalog__card');

  window.data.cardsOfSweets.forEach(function (sweet) {
    var sweetElement = cardTemplate.cloneNode(true);
    if (sweet.amount > 5) {
      sweetElement.classList.add('card--in-stock');
    } else if (sweet.amount > 0) {
      sweetElement.classList.add('card--little');
    } else {
      sweetElement.classList.add('card--soon');
    }
    sweetElement.querySelector('.card__title').textContent = sweet.name;
    sweetElement.querySelector('img').src = sweet.picture;
    sweetElement.querySelector('.card__price').childNodes[0].textContent = sweet.price + ' ';
    sweetElement.querySelector('.card__weight').textContent = '/ ' + sweet.weight + ' Г';
    var elementRating = sweetElement.querySelector('.stars__rating');
    elementRating.classList.remove('stars__rating--five');
    elementRating.classList.add('stars__rating--one');
    if (sweet.rating.value === 1) {
      elementRating.classList.add('stars__rating--one');
    } else if (sweet.rating.value === 2) {
      elementRating.classList.add('stars__rating--two');
    } else if (sweet.rating.value === 3) {
      elementRating.classList.add('stars__rating--three');
    } else if (sweet.rating.value === 4) {
      elementRating.classList.add('stars__rating--four');
    } else {
      elementRating.classList.add('stars__rating--five');
    }
    sweetElement.querySelector('.star__count').textContent = sweet.rating.number;
    if (sweet.nutritionFacts.sugar) {
      sweetElement.querySelector('.card__characteristic').textContent = 'Содержит сахар. ' + sweet.nutritionFacts.energy + ' ккал';
    } else {
      sweetElement.querySelector('.card__characteristic').textContent = 'Без сахара. ' + sweet.nutritionFacts.energy + ' ккал';
    }
    sweetElement.querySelector('.card__composition-list').textContent = sweet.nutritionFacts.contents;
    sweetElement.querySelector('.card__btn').dataset.indexNumber = window.data.cardsOfSweets.indexOf(sweet);
    cardFragment.appendChild(sweetElement);
  });
  cardList.appendChild(cardFragment);

  /* var basketList = document.querySelector('.goods__cards');
  var basketFragment = document.createDocumentFragment();
  var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');
  for (var j = 0; j < goodsInBasket.length; j++) {
    var goodInBasket = basketTemplate.cloneNode(true);
    goodInBasket.querySelector('.card-order__title').textContent = goodsInBasket[j].name;
    goodInBasket.querySelector('img').src = goodsInBasket[j].picture;
    goodInBasket.querySelector('.card-order__price').textContent = goodsInBasket[j].price + ' ₽';
    basketFragment.appendChild(goodInBasket);
  }
  basketList.appendChild(basketFragment);*/

  document.querySelector('.goods__cards').classList.remove('goods__cards--empty');
  document.querySelector('.goods__card-empty').classList.add('visually-hidden');

  document.querySelector('.catalog__load').classList.remove('visually-hidden');
  document.querySelector('.goods__card-empty').classList.remove('visually-hidden');

  cardList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('card__btn-favorite')) {
      evt.preventDefault();
      target.classList.toggle('card__btn-favorite--selected');
    }
  });

  var goodsInBasket = [];
  var basketList = document.querySelector('.goods__cards');
  var basketFragment = document.createDocumentFragment();
  var basketTemplate = document.querySelector('#card-order').content.querySelector('.goods_card');

  cardList.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('card__btn')) {
      evt.preventDefault();
      var indexOfGood = target.dataset.indexNumber;
      if (window.data.cardsOfSweets[indexOfGood].amount === 0) {
        var divEnd = document.createElement('div');
        divEnd.style.cssText = 'text-transform: uppercase; font-weight: bold; color: red; z-index: 10';
        divEnd.textContent = 'Все съели';
        target.parentNode.appendChild(divEnd);
        setTimeout(function () {
          target.parentNode.removeChild(divEnd);
        }, 3000);
      } else {
        var ind = goodsInBasket.findIndex(function (basketGood) {
          return basketGood.name === window.data.cardsOfSweets[indexOfGood].name;
        });
        if (ind === -1) {
          var newGoodIBasket = Object.assign({}, window.data.cardsOfSweets[indexOfGood]);
          newGoodIBasket.orderedAmount = 1;
          delete newGoodIBasket.amount;
          goodsInBasket.push(newGoodIBasket);
          var goodInBasket = basketTemplate.cloneNode(true);
          goodInBasket.querySelector('.card-order__title').textContent = newGoodIBasket.name;
          goodInBasket.querySelector('img').src = newGoodIBasket.picture;
          goodInBasket.querySelector('.card-order__price').textContent = newGoodIBasket.price + ' ₽';
          goodInBasket.querySelector('.card-order__count').value = newGoodIBasket.orderedAmount;
          basketFragment.appendChild(goodInBasket);
          basketList.appendChild(basketFragment);
        } else {
          goodsInBasket[ind].orderedAmount += 1;
          basketList.querySelectorAll('.card-order__count')[ind].value = goodsInBasket[ind].orderedAmount;
        }
        var orderedAmounts = [];
        goodsInBasket.forEach(function (el) {
          orderedAmounts.push(el.orderedAmount);
        });
        var totalAmount = orderedAmounts.reduce(function (result, num) {
          return result + num;
        }, 0);
        window.data.cardsOfSweets[indexOfGood].amount -= 1;
        document.querySelector('.main-header__basket').textContent = 'Сладостей в корзине: ' + totalAmount;
      }
    }
  });
}());

// order.js

(function () {
  document.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.id === 'deliver__store') {
      document.querySelector('.deliver__store').classList.remove('visually-hidden');
      document.querySelector('.deliver__courier').classList.add('visually-hidden');
    } else if (target.id === 'deliver__courier') {
      document.querySelector('.deliver__courier').classList.remove('visually-hidden');
      document.querySelector('.deliver__store').classList.add('visually-hidden');
    }
  });

  var cardForm = document.querySelectorAll('form')[1];
  var cardNumberInput = cardForm.querySelector('#payment__card-number');
  var cardDateInput = cardForm.querySelector('#payment__card-date');
  var cardCvcInput = cardForm.querySelector('#payment__card-cvc');
  var cardHolderInput = cardForm.querySelector('#payment__cardholder');
  var okPage = document.querySelectorAll('.modal')[1];
  var checkCardNumber = function (cardNumber) {
    var arr = cardNumber.split('').map(function (char, index) {
      var digit = parseInt(char, 10);
      if ((index + cardNumber.length) % 2 === 0) {
        var digitX2 = digit * 2;
        return digitX2 > 9 ? digitX2 - 9 : digitX2;
      }
      return digit;
    });
    return !(arr.reduce(function (a, b) {
      return a + b;
    }, 0) % 10);
  };
  cardNumberInput.addEventListener('invalid', function () {
    if (cardNumberInput.validity.patternMismatch) {
      cardNumberInput.setCustomValidity('Номер карты должен состоять из 16-ти цифр');
    } else if (!checkCardNumber(cardNumberInput.value)) {
      cardNumberInput.setCustomValidity('Вы ввели номер карты неверно');
    } else if (cardNumberInput.validity.valueMissing) {
      cardNumberInput.setCustomValidity('Обязательное поле');
    } else {
      cardNumberInput.setCustomValidity('');
    }
  });
  cardDateInput.addEventListener('invalid', function () {
    if (cardDateInput.validity.patternMismatch) {
      cardDateInput.setCustomValidity('Введите срок действия карты в формате мм/гг');
    } else if (cardDateInput.validity.valueMissing) {
      cardDateInput.setCustomValidity('Обязательное поле');
    } else {
      cardDateInput.setCustomValidity('');
    }
  });
  cardCvcInput.addEventListener('invalid', function () {
    if (cardCvcInput.validity.patternMismatch) {
      cardCvcInput.setCustomValidity('Введите 3-х значный CVC-код');
    } else if (cardCvcInput.validity.valueMissing) {
      cardCvcInput.setCustomValidity('Обязательное поле');
    } else {
      cardCvcInput.setCustomValidity('');
    }
  });
  cardHolderInput.addEventListener('invalid', function () {
    if (cardHolderInput.validity.valueMissing) {
      cardHolderInput.setCustomValidity('Обязательное поле');
    } else {
      cardHolderInput.setCustomValidity('');
    }
  });
  cardForm.addEventListener('input', function () {
    if (cardNumberInput.checkValidity() && cardDateInput.checkValidity() && cardCvcInput.checkValidity() && cardHolderInput.checkValidity()) {
      cardForm.querySelector('.payment__card-status').textContent = 'Одобрен';
    } else {
      cardForm.querySelector('.payment__card-status').textContent = 'Не определён';
    }
  });
  cardForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    okPage.classList.remove('modal--hidden');
  });
  okPage.addEventListener('click', function (evt) {
    var target = evt.target;
    if (target.classList.contains('modal__close')) {
      okPage.classList.add('modal--hidden');
    }
  });
}());

// filter.js

(function () {
  document.addEventListener('mouseup', function (evt) {
    var target = evt.target;
    var catalogFilterBlock = getComputedStyle(document.querySelector('.catalog__filter'));
    var catalogFilterBlockWidth = parseInt(catalogFilterBlock.width, 10);
    var rangePrice = function () {
      return Math.round(target.offsetLeft / catalogFilterBlockWidth * 100);
    };
    if (target.classList.contains('range__btn')) {
      if (target.classList.contains('range__btn--right')) {
        document.querySelector('.range__price--max').textContent = rangePrice();
      } else if (target.classList.contains('range__btn--left')) {
        document.querySelector('.range__price--min').textContent = rangePrice();
      }
    }
  });
}());


// slider.js

var rangeFilter = document.querySelector('.range__filter');
var rangeFilterLine = rangeFilter.querySelector('.range__fill-line');
// var priceMin = document.querySelector('.range__price--min');
// var priceMax = document.querySelector('.range__price--max');
var priceHandleLeft = rangeFilter.querySelector('.range__btn--left');
var priceHandleRight = rangeFilter.querySelector('.range__btn--right');

var rangeFilterCoords = rangeFilter.getBoundingClientRect();

// var rangeFilterStyle = getComputedStyle(rangeFilter);
// var rangeButtonStyle = getComputedStyle(rangeFilter.querySelector('.range__btn'));
// var rangeFilterStyleWidth = parseInt(rangeFilterStyle.width, 10);
// var rangeButtonWidth = parseInt(rangeButtonStyle.width, 10);
// var priceHandleCenter = rangeButtonWidth / 2;
// var allPrices = cardsOfSweets.map(function (el) {
//   return el.price;
// });
// var maxPrice = Math.max.apply(null, allPrices);
// var minPrice = Math.min.apply(null, allPrices);
//
// var getPriceText = function (price, priceHandle) {
//   price.textContent = minPrice + Math.round(parseInt((priceHandle.offsetLeft + priceHandleCenter), 10) / rangeFilterStyleWidth * (maxPrice - minPrice));
// };
// getPriceText(priceMin, priceHandleLeft);
// getPriceText(priceMax, priceHandleRight);

priceHandleLeft.onmousedown = function (evt) {
  evt.preventDefault();

  var priceHandleLeftCoords = priceHandleLeft.getBoundingClientRect();
  var shiftX = event.clientX - priceHandleLeftCoords.left;
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);

  function onMouseMove(event) {
    var newLeft = event.clientX - shiftX - rangeFilterCoords.left;

    var priceHandleRightCoords = priceHandleRight.getBoundingClientRect();
    if (newLeft < 0) {
      newLeft = 0;
    }

    var rightEdge = rangeFilter.offsetWidth - priceHandleLeft.offsetWidth;
    if (newLeft > rightEdge) {
      newLeft = rightEdge;
    }

    if (newLeft > priceHandleRightCoords.left) {
      newLeft = priceHandleRightCoords.left - 16;
    }

    priceHandleLeft.style.left = newLeft + 'px';
    rangeFilterLine.style.left = priceHandleLeft.style.left;
  }

  function onMouseUp() {
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
  }
};

priceHandleLeft.ondragstart = function () {
  return false;
};

