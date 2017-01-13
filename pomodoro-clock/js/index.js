var interval;
var paused = true;
var running;

var Clock = {
    Work: {
        start: function(deadline) {
            //little cheat to avoid the clock jumping
            deadline -= 100;
            $('#result').removeClass('green');
            $('#result').addClass('red');
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
                        running = true;
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
            $('#result').removeClass('red');
            $('#result').addClass('green');
            //little cheat to avoid the clock jumping
            deadline -= 100
            interval = setInterval(function() {
                if (deadline <= 100) {
                    Clock.Break.stop();
                    paused = false;
                    Clock.Work.start(Time.startingTime);
                } else if (!paused) {
                    running = true;
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
    if (!paused && running) {
        return
    } else if (paused) {
        Time.startingTime = Time.startingTime;
        showTime();
    }
}


function showTime() {
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
    $('#result').removeClass('red')
    $('#result').removeClass('green')
    resetTimer();
})

$('.incrementSession').on('click', function() {
    Time.startingTime += 60000;
    document.getElementById('desiredTime').innerHTML =
        Math.floor((Time.startingTime / 60) / 1000) + ':' + Math.floor((Time.startingTime / 1000) % 60) + 0;
    if (!running) {
        document.getElementById('result').innerHTML =
            Math.floor((Time.startingTime / 60) / 1000) + ':' + Math.floor((Time.startingTime / 1000) % 60) + 0;
    }
})

$('.decrementSession').on('click', function() {
    if (Time.startingTime > 60000) {
        Time.startingTime -= 60000;
        document.getElementById('desiredTime').innerHTML =
            Math.floor((Time.startingTime / 60) / 1000) + ':' + Math.floor((Time.startingTime / 1000) % 60) + 0;
        if (!running) {
            document.getElementById('result').innerHTML =
                Math.floor((Time.startingTime / 60) / 1000) + ':' + Math.floor((Time.startingTime / 1000) % 60) + 0;
        }
    }
})

$('.incrementBreak').on('click', function() {
    Time.breakTime += 60000;
    document.getElementById('desiredBreak').innerHTML =
        Math.floor((Time.breakTime / 60) / 1000) + ':' + Math.floor((Time.breakTime / 1000) % 60) + 0;
})

$('.decrementBreak').on('click', function() {
    if (Time.breakTime > 60000) {
        Time.breakTime -= 60000;
        document.getElementById('desiredBreak').innerHTML =
            Math.floor((Time.breakTime / 60) / 1000) + ':' + Math.floor((Time.breakTime / 1000) % 60) + 0;
    }
})
