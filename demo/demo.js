import $ from 'jquery'
$.fn.giftCombo = function (option) {
    option = option || {}
    var activeClassName = option.activeClassName || 'gift-combo-active'
    var startCombo = option.startCombo || new Function
    var oneGift =  option.oneGift || new Function
    var oneCombo = option.oneCombo || new Function
    var allCombo = option.allCombo || new Function
    var $this = $(this)
    var combo = 0
    var that = this
    this.giftQueue = []
    this.isGifting = false

    $this.on('animationend', function (e) {
        if ($this.hasClass(activeClassName)) {
            that.giftQueue[0]--
            $this.removeClass(activeClassName)
            $this[0].clientWidth
            oneGift()
            gifting()
        }
    })
    function gifting () {
        if (that.giftQueue.length) {
            if (that.giftQueue[0]) {
                combo++
                $this.text(combo)
                $this.addClass(activeClassName)
            } else {
                combo = 0
                that.giftQueue.shift()
                oneCombo()
                gifting()
            }
        } else {
          	$this.text('')
            allCombo()
            that.isGifting = false
        }
    }

    this.send = function (data) {
        let count = parseInt(data, 10)
        count = count > 0 ? count : 1
        this.giftQueue.push(data)
        if (!this.isGifting) {
            this.isGifting = true
            startCombo()
            gifting()
        }
    }
    return this
}

// Demo code

var data = [
]

var $trigger = $('[data-trigger]')
var $name = $('[data-name]')
var $postfix = $('[data-postfix]')
var $combo = $('[data-combo]').giftCombo({
    startCombo: function () {
        $name.text(`${data[0].name}送了`)
        $postfix.text('份礼物')
    },
    oneGift: function () {
    },
    oneCombo: function () {
        data.shift()
        if (data.length) {
            $name.text(`${data[0].name}送了`)
        }
    },
    allCombo: function () {
        $name.text('')
        $postfix.text('')
        data.shift()
    }
})

var count = 0
$trigger.on('click', function () {
    count++
    data.push({name: `第${count}个人`, gift: count})
    $combo.send(data[data.length - 1].gift)
})
