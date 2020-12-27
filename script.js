$(function(){
    var arrWords = new Array("by","see","change","or","miss","you","though","away","those","got","much","mountain","line","went","below","these","night","way","begin","feet","as","most","might","every","life","into","such","write","people","off","hard","many","if","each","sometimes","go","eat","know","carry","just",);
    var wordsDisplayElement = document.getElementById('wordsDisplay');
    var wordsInputElement = document.getElementById('wordsInput');
    var timerElement = document.getElementById('timer');
    var seconds = 60;

    function countdown(minutes){
        var mins = minutes;
        function tick() {
            var timer = document.getElementById("timer");
            var currentMinutes = mins-1
            seconds--;
            timer.innerHTML = "<p class='display-3'>" + currentMinutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds) + "</p>";
            if( seconds > 0 ) {
                setTimeout(tick, 1000);
            } else {
                if(mins > 1){
                    countdown(mins-1);           
                }
            }
        }
        tick();
     }

    $(wordsInputElement).keydown(function startCountdown(){
        if(seconds == 60){
            countdown(1);
            return true;
        }else{
            return true;
        }
    });

    /*change to only refresh wordInput and wordDisplay*/
    $("#redoButton").click(function(){
        location.reload();
        return false;
    });


});