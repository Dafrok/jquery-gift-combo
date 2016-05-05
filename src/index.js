$.fn.giftCombo = function (option) {
    option = option || {}
    var classActive = option.classActive || 'gift-combo-active'
    // var oneGift =  option.oneGift || new Function
    // var oneCombo = option.oneCombo || new Function
    // var allCombo = option.allCombo || new Function
    var $this = $(this)
    var combo = 0
    var that = this
    this.giftQueue = []
    this.isGifting = false

    $this.on('animationend', function (e) {
        if ($this.hasClass(classActive)) {
            that.giftQueue[0].count--
            $this.removeClass(classActive)
            $this[0].clientWidth
            gifting()
        }
    })
    function gifting () {
        if (that.giftQueue.length) {
            if (that.giftQueue[0].count) {
                combo++
                $this.text(combo)
                $this.addClass(classActive)
            } else {
                combo = 0
                that.giftQueue.shift()
                gifting()
            }
        } else {
          	$this.text('')
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
        count: 0 | Math.random() * 3 + 3,
        // name: ['张三', '李四', '王五', '赵六'][0 | Math.random() * 4]
    }
    $giftCombo.send({
        count: data.count
    })
})
