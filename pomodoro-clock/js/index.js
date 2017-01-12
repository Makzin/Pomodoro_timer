var interval;
var paused;

var Clock = {
    start: function(deadline) {
        if (paused) {
            paused = false;
            Clock.start(Time.startingTime)
        } else {
            interval = setInterval(function() {
                if (!paused) {
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

};

var Break = {
    start: function() {

    },
    stop: function() {

    }
};

var Time = {
    startingTime: 5000
}



$('.start').on('click', function() {
    Clock.start(Time.startingTime)
})

$('.stop').on('click', function() {
    Clock.stop();
})
