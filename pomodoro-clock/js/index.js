var interval;
var paused;

var Clock = {
    Work: {
        start: function(deadline) {

            //little cheat to avoid the clock jumping
            deadline -= 100;
            if (paused) {
                paused = false;
                Clock.Work.start(Time.startingTime);
            } else {
                interval = setInterval(function() {
                    if (deadline <= 100) {
                        Clock.Work.stop();
                        paused = false;
                        Clock.Break.start(Time.breakTime);
                    } else if (!paused) {
                        var seconds = Math.floor((deadline / 1000) % 60);
                        var minutes = Math.floor((deadline / 60) / 1000);
                        deadline -= 100;
                        document.getElementById('result').innerHTML = minutes + ":" + seconds;

                    }
                }, 100);
            }
        },

        stop: function() {
            paused = true;
            clearInterval(interval);
        }
    },
    Break: {
        start: function(deadline) {
            interval = setInterval(function() {
                //little cheat to avoid the clock jumping
                deadline -= 100
                if (deadline <= 100) {
                    Clock.Break.stop();
                    paused = false;
                    Clock.Work.start(Time.startingTime);
                } else if (!paused) {
                    var seconds = Math.floor((deadline / 1000) % 60);
                    var minutes = Math.floor((deadline / 60) / 1000);
                    deadline -= 100;
                    document.getElementById('result').innerHTML = minutes + ":" + seconds;
                }
            }, 100);
        },
        stop: function() {
            paused = true;
            clearInterval(interval);
        }
    }
};


var Time = {
    startingTime: 1500000,
    breakTime: 300000
}

function resetTimer() {
    if (!paused) {
        return
    } else {
        Time.startingTime = Time.startingTime;
        showTime();
    }
}


function showTime(input) {
    //adding a trailing 0 to these values, couldn't figure out how to display 2 digit seconds on just showing time.
    document.getElementById('result').innerHTML =
        Math.floor((Time.startingTime / 60) / 1000) + ':' + Math.floor((Time.startingTime / 1000) % 60) + 0;
    document.getElementById('desiredTime').innerHTML =
        Math.floor((Time.startingTime / 60) / 1000) + ':' + Math.floor((Time.startingTime / 1000) % 60) + 0;
    document.getElementById('desiredBreak').innerHTML =
        Math.floor((Time.breakTime / 60) / 1000) + ':' + Math.floor((Time.breakTime / 1000) % 60) + 0;
}


showTime();


$('.start').on('click', function() {
    Clock.Work.start(Time.startingTime)
})

$('.stop').on('click', function() {
    Clock.Work.stop();
})

$('.reset').on('click', function() {
    resetTimer();
})

$('.incrementSession').on('click', function() {
    Time.startingTime += 60000;
    showTime();
})

$('.decrementSession').on('click', function() {
    Time.startingTime -= 60000;
    showTime();
})

$('.incrementBreak').on('click', function() {
    Time.breakTime += 60000;
    showTime();
})

$('.decrementBreak').on('click', function() {
    Time.breakTime -= 60000;
    showTime();
})
