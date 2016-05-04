$.fn.giftCombo = function (option) {
    option = option || {}
    var classIn = option.classIn || 'gift-combo-in'
    var classOut = option.classOut || 'gift-combo-out'
    // var oneGift =  option.oneGift || new Function
    // var oneCombo = option.oneCombo || new Function
    // var allCombo = option.allCombo || new Function
    var transitionEffects = null
    var $this = $(this)
    var combo = 0
    var that = this
    this.giftQueue = []
    this.isGifting = false

    function allTransitionEnd () {
        for (var key in transitionEffects) {
            if (transitionEffects.hasOwnProperty(key) && transitionEffects[key] === false) {
                return false;
            }
        }
        return true;
    }
    $this.on('transitionend', function (e) {
        // all transition end

        if (!transitionEffects) {
            transitionEffects = {}
            var style = window.getComputedStyle($this[0], null)
            var properties = style.getPropertyValue('transition-property').split(', ')
            $.each(properties, function (index, property) {
                transitionEffects[property] = false
            })
            if (transitionEffects[e.originalEvent.propertyName] !== undefined) {
                transitionEffects[e.originalEvent.propertyName] = true;
            }
        }

        console.log(transitionEffects)
        if (allTransitionEnd()) {
            transitionEffects = null
            if ($this.hasClass(classIn) && !$this.hasClass(classOut)) {
                $this.removeClass(classIn).addClass(classOut)
            } else if ($this.hasClass(classOut) && !$this.hasClass(classIn)) {
                that.giftQueue[0].count--
                $this.css('transition', 'none')
                $this.removeClass(classOut)
                $this[0].clientWidth
                $this.css('transition', '')
                gifting()
            }

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
        count: 0 | Math.random() * 5 + 3,
        // name: ['张三', '李四', '王五', '赵六'][0 | Math.random() * 4]
    }
    $giftCombo.send({
        count: data.count
    })
})
