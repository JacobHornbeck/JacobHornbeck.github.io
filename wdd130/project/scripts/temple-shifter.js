var shifter = [
    {
        'name': 'img-l4',
        'left': 9,
        'right': 1
    },
    {
        'name': 'img-l3',
        'left': 0,
        'right': 2
    },
    {
        'name': 'img-l2',
        'left': 1,
        'right': 3
    },
    {
        'name': 'img-l1',
        'left': 2,
        'right': 4
    },
    {
        'name': 'img-mc',
        'left': 3,
        'right': 5
    },
    {
        'name': 'img-r1',
        'left': 4,
        'right': 6
    },
    {
        'name': 'img-r2',
        'left': 5,
        'right': 7
    },
    {
        'name': 'img-r3',
        'left': 6,
        'right': 8
    },
    {
        'name': 'img-r4',
        'left': 7,
        'right': 9
    },
    {
        'name': 'img-r5',
        'left': 8,
        'right': 0
    }
]

var able = true
function Shift(dir) {
    if (!dir) {
        if (window.event.keyCode === 37) {
            dir = 'right'
        }
        else if (window.event.keyCode === 39)
            dir = 'left'
        else
            return
    }
    
    if (able) {
        able = false
        var button = document.getElementById('go-'+(dir==='left'?'right':'left'))
        button.disabled = true
        let imgs = document.getElementsByClassName('img-shift')
        if (imgs.length !== shifter.length)
            return alert('WARNING: Number of specified classes and number '+
                'of images doesn\'t match... Images can\'t shift correctly!')

            var saved = []
            if (dir === 'left') {
                saved = []
                for (let i = 0; i<imgs.length; i++) {
                    for (let s = 0; s<shifter.length; s++) {
                        if (imgs[i].classList[0] === shifter[s].name) {
                            if (shifter[s].left === 9) {
                                saved.push(i,shifter[shifter[s].left].name + ' img-shift')
                            }
                            else {
                                imgs[i].className = shifter[shifter[s].left].name + ' img-shift'
                            }
                        }
                    }
                }
                imgs[saved[0]].className = saved[1]
            }
            else if (dir === 'right') {
                saved = []
                for (let i = 0; i<imgs.length; i++) {
                    for (let s = shifter.length-1; s>-1; s--) {
                        if (imgs[i].classList[0] === shifter[s].name) {
                            if (shifter[s].right === 0) {
                                saved.push(i,shifter[shifter[s].right].name + ' img-shift')
                            }
                            else {
                                imgs[i].className = shifter[shifter[s].right].name + ' img-shift'
                            }
                        }
                    }
                }
                imgs[saved[0]].className = saved[1]
            }
            else
                { return alert('WARNING: No direction given! Images won\'t shift!') }
        setTimeout(() => {
            button.disabled = false
            able = true
        }, 600)
    }
}
