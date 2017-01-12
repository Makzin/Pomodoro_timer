var interval;
var paused;

var Clock = {
    start: function(deadline) {
        if (paused) {
            paused = false;
            Clock.start(Time.startingTime);
        } else {
            interval = setInterval(function() {
                if (deadline <= 100) {
                    Clock.stop();
                    paused = false;
                    Break.start(Time.breakTime);
                } else if (!paused) {
                    var seconds = Math.floor((deadline / 1000) % 60);
                    var minutes = Math.floor((deadline / 60) / 1000);
                    deadline -= 100;
                    document.getElementById('result').innerHTML = 'work: ' + minutes + ":" + seconds;

                }
            }, 100);
        }
    },

    stop: function() {
        paused = true;
        clearInterval(interval);
    }

};


var Break = {
    start: function(deadline) {
        interval = setInterval(function() {
            if (deadline <= 100) {
                Break.stop();
                paused = false;
                Clock.start(Time.startingTime);
            } else if (!paused) {
                var seconds = Math.floor((deadline / 1000) % 60);
                var minutes = Math.floor((deadline / 60) / 1000);
                deadline -= 100;
                document.getElementById('result').innerHTML = 'break: ' + minutes + ":" + seconds;
            }
        }, 100);
    },
    stop: function() {
        paused = true;
        clearInterval(interval);
    }
};

var Time = {
    startingTime: 5000,
    breakTime: 5000
}

function resetTimer() {
    Time.startingTime = Time.startingTime;
    showTime();

}

function showTime() {
    document.getElementById('result').innerHTML =
        Math.floor((Time.startingTime / 60) / 1000) + ':' + Math.floor((Time.startingTime / 1000) % 60);
}


showTime();


$('.start').on('click', function() {
    Clock.start(Time.startingTime)
})

$('.stop').on('click', function() {
    Clock.stop();
})

$('.reset').on('click', function() {
    resetTimer();
})

$('.incrementSession').on('click', function() {
    Time.startingTime += 1000;
    showTime();
})

$('.decrementSession').on('click', function() {
    Time.startingTime -= 1000;
    showTime();
})
