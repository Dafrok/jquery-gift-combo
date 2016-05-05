var $giftTrigger = $('#gift-trigger')

var $giftCombo = $('#gift-combo').giftCombo({
    oneGift: function () {
        console.log('One gift!')
    },
    oneCombo: function () {
        console.log('One combo!')
    },
    allCombo: function () {
        console.log('All combo!')
    }
})

$giftTrigger.on('click', function () {
    var count = 0 | Math.random() * 3 + 3
    $giftCombo.send(count)
})
