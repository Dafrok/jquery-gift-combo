$.fn.giftCombo = function (option) {
    option = option || {}
    var classActive = option.classActive || 'gift-combo-active'
    var oneGift =  option.oneGift || new Function
    var oneCombo = option.oneCombo || new Function
    var allCombo = option.allCombo || new Function
    var $this = $(this)
    var combo = 0
    var that = this
    this.giftQueue = []
    this.isGifting = false

    $this.on('animationend', function (e) {
        if ($this.hasClass(classActive)) {
            that.giftQueue[0]--
            $this.removeClass(classActive)
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
                $this.addClass(classActive)
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
        this.giftQueue.push(data)
        if (!this.isGifting) {
            this.isGifting = true
            gifting()
        }
    }
    return this
}

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
