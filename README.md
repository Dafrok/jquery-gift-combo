# jquery-gift-combo

Gift combo in live.

## Install

```
$ npm i jquery jquery-gift-combo
```

## Usage

```es6
import $ from 'jquery'
import 'jquery-gift-combo'
const gifts = 5
let $giftCombo = $('#foo').giftCombo()
$giftCombo.send(gifts)
```

## Options
```es6
{
  // CSS hook
  activeClassName: 'active',
  
  // Life cycle
  startCombo: function () {},
  oneGift: function () {},
  oneCombo: function () {},
  allCombo: function () {}
}
```
