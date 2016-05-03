$.fn.giftCombo = function (option) {
    option = option || {}
    var classIn = option.classIn || 'gift-combo-in'
    var classOut = option.classOut || 'gift-combo-out'
    // var oneGift =  option.oneGift || new Function
    // var oneCombo = option.oneCombo || new Function
    // var allCombo = option.allCombo || new Function
    var $this = $(this)
    var combo = 0
    var that = this
    this.giftQueue = []
    this.isGifting = false
    $this.on('transitionend', function () {
        if ($this.hasClass(classIn) && !$this.hasClass(classOut)) {
            $this.removeClass(classIn).addClass(classOut)
        } else if ($this.hasClass(classOut) && !$this.hasClass(classIn)) {
            that.giftQueue[0].count--
            $this.removeClass(classOut)
            gifting()
        }
    })
    function gifting () {
        if (that.giftQueue.length) {
            if (that.giftQueue[0].count) {
                combo++
                $this.text(combo)
                $this.addClass(classIn)
            } else {
                combo = 0
                that.giftQueue.shift()
                gifting()
            }
        } else {
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
    // oneGift: function (data) {
    //     console.log(data)
    // },
    // oneCombo: function (data) {
    //     console.log(data)
    // },
    // allCombo: function (data) {
    //     console.log(data)
    // }
})
$giftTrigger.on('click', function () {
    var data = {
        count: 0 | Math.random() * 5 + 1,
        // name: ['张三', '李四', '王五', '赵六'][0 | Math.random() * 4]
    }
    $giftCombo.send({
        count: data.count
    })
})
