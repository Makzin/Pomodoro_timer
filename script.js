//use system time to grab current time

//figure out a way to add extra time to that

//connect button to increment time to be added

var deadline;
var paused = false;
var time;
var interval;

var Clock = {
  start: function() {
    if (!paused) {
     interval = setInterval(function() {
        time = deadline - Date.now();
        var seconds = Math.floor((time / 1000) % 60);
        var minutes = Math.floor((time / 60) / 1000);
        document.getElementById('result').innerHTML = "minutes: " + minutes + '<br/>' +
          "seconds: " + seconds + '<br/>' + 'total: ' + time;
       }, 100);
    };
  },
  stop: function(){
    clearInterval(interval);
    paused = true;
    console.log(interval)

},
  resume: function() {
    paused = false;
    Clock.start();
  }
}


$('.first').on('click', function() {
  deadline = Date.now() + 1500000;
  Clock.start(deadline);
})

$('.stop').on('click', function() {
  Clock.stop();
})

$('.resume').on('click', function() {
  Clock.resume();
})
