$(function(){
    var words = [
        "by","see","change","or","miss","you","though","away","those","got","much","mountain","line","went","below","these","night","way","begin","feet","as","most","might","every","life","into","such","write","people","off","hard","many","if","each","sometimes","go","eat","know","carry","just"
    ];
    var Arr_words = new Array();
    var wordsDisplayElement = document.getElementById('wordsDisplayText');
    var wordsInputElement = document.getElementById('wordsInput');
    var timerElement = document.getElementById('timer');
    var seconds = 60;
    var wordCount = 40;

    function displayWords(){
        for(var i = 0; i < wordCount; i++){
			var randomWord = Math.floor(Math.random() * words.length);
			Arr_words.push(words[randomWord] + " ");
			words.splice(randomWord, 1);
        }
        $(wordsDisplayElement).append(Arr_words);
    }

    function countdown(minutes){
        var mins = minutes;
        function tick() {
            var timer = timerElement;
            var currentMinutes = mins-1
            seconds--;
            timer.innerHTML = "<p class='display-3'>" + currentMinutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds) + "</p>";
            if(seconds > 0) {
                setTimeout(tick, 1000);
            } else {
                if(mins > 1){
                    countdown(mins-1);
                }
            }
        }
        tick();
     }

    displayWords();
    
    $(wordsInputElement).keydown(function startCountdown(){
        if(seconds == 60){
            countdown(1);
            return true;
        }else{
            return true;
        }
    });

    var displayedChars = wordsDisplayElement.innerHTML.split('');
    console.log(displayedChars);
    $(wordsDisplayElement).empty().append(displayedChars);

    var cursorIndex = 0;
    var cursorChar = displayedChars[cursorIndex];

    $(wordsInputElement).bind('keydown', function(event) {
        currentKey = event.key;
        cursorChar = displayedChars[cursorIndex];
        console.log("display: " + cursorChar + ", input: " + event.key);

        if (currentKey == cursorChar){
            $(wordsInputElement).css('background-color','#91ffa2');
            cursorIndex++;
        } else if(event.keyCode == 8){
            cursorIndex--;
        } else{
            $(wordsInputElement).css('background-color','#ff9191');
            cursorIndex++;
        }
    });

    /*change to only refresh wordInput and wordDisplay*/
    $("#redoButton").click(function(){
        location.reload();
        return false;
    });
});