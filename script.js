$(function(){
    const words = [
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
    const wordsDisplayElement = document.getElementById('wordsDisplayText');
    const wordsInputElement = document.getElementById('wordsInputText');
    const timerElement = document.getElementById('timer');
    var displayedChars;
    var Arr_words = new Array();
    var seconds = 60;
    var wordCount = 100;
    var correctChars = 0;
    var cursorIndex = 0;
    var shownWordsIndex = 0;
    var wpm = 0;

    function displayWords(){
        for(let i = 0; i < wordCount; i++){
			let randomWord = Math.floor(Math.random() * words.length);
			Arr_words.push(words[randomWord] + " ");
			words.splice(randomWord, 1);
        }
        displayedChars = Arr_words.join('').toString().split('');
        console.log(displayedChars);
    }

    function createWordDiv(item, index) {
        $(wordsDisplayElement).append("<span class='shownWords' id='shownWord" + index + "'>" + item + "</span>");
    }

    function countdown(minutes){
        let mins = minutes;
        function tick() {
            let timer = timerElement;
            let currentMinutes = mins-1
            seconds--;
            timer.innerHTML = "<p class='display-3'>" + currentMinutes.toString() + ":" + (seconds < 10 ? "0" : "") + String(seconds) + "</p>";
            if(seconds > 0) {
                setTimeout(tick, 1000);
            } else if(seconds == 0){
                $(timerElement).empty().append("<p class='display-3 id='wordsDisplayText'>WPM: " + wpm + "</p>");
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
    displayedChars.forEach(createWordDiv);
    
    $(wordsInputElement).bind('keydown', function(event) {
        currentKey = event.key;
        let cursorChar = displayedChars[cursorIndex];
        
        if (currentKey == cursorChar){
            $(wordsInputElement).css('background-color','#91ffa2'); //good key
            $("#shownWord" + shownWordsIndex).addClass('correct').removeClass('incorrect');
            cursorIndex++;
            shownWordsIndex++;
            correctChars++;
        } else if ((event.keyCode == 32) && (cursorChar != " ")){ //if space is pressed and not expected, move to next word
            $("#shownWord" + shownWordsIndex).removeClass('correct').addClass('incorrect');
            $(wordsInputElement).css('background-color','#ff9191');
            cursorIndex++;
            shownWordsIndex++;
        } else if(event.keyCode == 8){ //if backspace is pressed
            if(cursorIndex > 0){
                cursorIndex--;
                shownWordsIndex--;
                $("#shownWord" + shownWordsIndex).removeClass('correct').removeClass('incorrect');
            }else{ //do not allow index to go negative
                return false;
            }
        } else{
            $(wordsInputElement).css('background-color','#ff9191'); //bad key
            $("#shownWord" + shownWordsIndex).addClass('incorrect');
            cursorIndex++;
            shownWordsIndex++;
        }
        wpm = correctChars / 5;
    });

    $("#redoButton").click(function(){
        location.reload();
        return false;
    });
    
    $("#origBackgroundButton").click(function(){
        $(".background-image").css("background-image","none");
    });

    $("#spaceBackgroundButton").click(function(){
        $(".background-image").css("background-image","url('/images/space.png')");
    });

    $(".background-image").click(function(){
        $("#wordsInputText").focus();
    });

    const bg = document.querySelector('.background-image');
    const windowWidth = window.innerWidth / 2;
    const windowHeight = window.innerHeight / 2;

    bg.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / windowWidth;
        const mouseY = e.clientY / windowHeight;

        bg.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
    });
});