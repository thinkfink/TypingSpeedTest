$(function(){
    var words = [
        "by","see","change","or","miss","you","though","away","those","got",
        "much","mountain","line","went","below","these","night","way","begin","feet",
        "as","most","might","every","life","into","such","write","people","off",
        "hard","many","if","each","sometimes","go","eat","know","carry","just",
        "button","bizarre","irate","detect","bead","naughty","examine","continue","unable","spray",
        "fish","coal","straw","foolish","used","dear","available","snake","shelf","silent",
        "tricky","blind","knot","zippy","dusty","men","women","fang","slip","fragile",
        "bright","hobbies","radiate","pour","poor","bake","drag","clear","crush","drop",
        "label","wink","wander","zoom","snore","mug","dry","announce","add","drain",
        "add","bump","trade","sail","wave","carve","whine","wine","move","plant",
        "by","see","change","or","miss","you","though","away","those","got",
        "much","mountain","line","went","below","these","night","way","begin","feet",
        "as","most","might","every","life","into","such","write","people","off",
        "hard","many","if","each","sometimes","go","eat","know","carry","just",
        "button","bizarre","irate","detect","bead","naughty","examine","continue","unable","spray",
        "fish","coal","straw","foolish","used","dear","available","snake","shelf","silent",
        "tricky","blind","knot","zippy","dusty","men","women","fang","slip","fragile",
        "bright","hobbies","radiate","pour","poor","bake","drag","clear","crush","drop",
        "label","wink","wander","zoom","snore","mug","dry","announce","add","drain",
        "add","bump","trade","sail","wave","carve","whine","wine","move","plant"
    ];
    var Arr_words = new Array();
    var wordsDisplayElement = document.getElementById('wordsDisplayText');
    var wordsInputElement = document.getElementById('wordsInputText');
    var timerElement = document.getElementById('timer');
    var seconds = 60;
    var wordCount = 100;
    var correctChars = 0;
    var cursorIndex = 0;
    var hiddenWordsIndex = 0;
    var wpm = 0;

    function displayWords(){
        for(var i = 0; i < wordCount; i++){
			var randomWord = Math.floor(Math.random() * words.length);
			Arr_words.push(words[randomWord] + " ");
			words.splice(randomWord, 1);
        }
        $(wordsDisplayElement).append(Arr_words);
    }

    function createWordDiv(item, index) {
        $("#wordsDisplay").append("<span class='hiddenWords' id='hiddenWord" + index + "'>" /*+ index*/ + item + "</span>");
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
            } else if(seconds == 0){
                $('#wordsDisplay').empty().append("<div id='wordsDisplayText'>WPM: " + wpm + "</div>");
                $('#wordsInput').empty();
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

    displayWords();
    var displayedChars = wordsDisplayElement.innerHTML.split('');
    $(wordsDisplayElement).empty().append(displayedChars).hide();
    displayedChars.forEach(createWordDiv);
    
    $(wordsInputElement).bind('keydown', function(event) {
        currentKey = event.key;
        var cursorChar = displayedChars[cursorIndex];
        
        if (currentKey == cursorChar){
            $(wordsInputElement).css('background-color','#91ffa2'); //good key
            $("#hiddenWord" + hiddenWordsIndex).addClass('correct').removeClass('incorrect');
            cursorIndex++;
            hiddenWordsIndex++;
            correctChars++;
        } else if ((event.keyCode == 32) && (cursorChar != " ")){ //if space is pressed an not expected, move to next word
            $("#hiddenWord" + hiddenWordsIndex).addClass('incorrect');
            cursorIndex++;
            hiddenWordsIndex++;
        } else if(event.keyCode == 8){ //if backspace is pressed
            $("#hiddenWord" + hiddenWordsIndex).removeClass('correct').removeClass('incorrect');
            if(cursorIndex > 0){
                cursorIndex--;
                hiddenWordsIndex--;
            }else{ //do not allow index to go negative
                return false;
            }
            
        } else{
            $(wordsInputElement).css('background-color','#ff9191'); //bad key
            $("#hiddenWord" + hiddenWordsIndex).addClass('incorrect');
            cursorIndex++;
            hiddenWordsIndex++;
        }
        wpm = correctChars / 5;
    });

    $("#redoButton").click(function(){
        location.reload();
        return false;
    });
    
    $("#origBackgroundButton").click(function(){
        $("body").css("background-image","none");
    });

    $("#spaceBackgroundButton").click(function(){
        $("body").css("background-image","url('/images/space.png')");
    });
});