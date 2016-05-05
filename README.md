# jquery-gift-combo

Gift combo in live.

## Install

```
$ npm i jquery jquery-gift-combo
```

## Usage

### JavaScript

```es6
import $ from 'jquery'
import 'jquery-gift-combo'
let $giftCombo = $('#foo').giftCombo()
let $button = $('#bar')

$button.on('click', function () {
  const gifts = 0 | Math.random() * 2 + 1 // create random amounts of gift
  $giftCombo.send(gifts)
})
```

### HTML

```html
<div id="foo"></div>
<button id="bar">Gift!</button>
```

### CSS

```css
#gift-combo {
    display: inline-block;
}
#gift-combo.gift-combo-active {
    -webkit-animation: gift-combo 0.7s 1;
    animation: gift-combo 0.7s 1;
}
@-webkit-keyframes gift-combo {
    0% {
        opacity: 0;
        -webkit-transform: scale(1) translateX(-100%);
        transform: scale(1) translateX(-100%);
    }
    50% {
        opacity: 1;
        -webkit-transform: scale(2) translateX(0);
        transform: scale(2) translateX(0);
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1) translateX(100%);
        transform: scale(1) translateX(100%);
    }
}
@keyframes gift-combo {
    0% {
        opacity: 0;
        -webkit-transform: scale(1) translateX(-100%);
        transform: scale(1) translateX(-100%);
    }
    50% {
        opacity: 1;
        -webkit-transform: scale(2) translateX(0);
        transform: scale(2) translateX(0);
    }
    100% {
        opacity: 0;
        -webkit-transform: scale(1) translateX(100%);
        transform: scale(1) translateX(100%);
    }
}
```

## Options
```es6
{
  // CSS hook
  activeClassName: 'active', // default: gift-combo-active
  
  // Life cycle
  startCombo: function () {},
  oneGift: function () {},
  oneCombo: function () {},
  allCombo: function () {}
}
```
