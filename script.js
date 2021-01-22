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
        "by","see","change","or","miss","you","though","away","those","got"
    ];
    const wordsDisplayElement = document.getElementById('wordsDisplay');
    const wordsInputTextElement = document.getElementById('wordsInputText');
    const timerElement = document.getElementById('timer');
    const wordCount = 100;
    const background = document.querySelector('.background-image');
    const windowWidth = window.innerWidth / 2;
    const windowHeight = window.innerHeight / 2;
    var Arr_randomWords = new Array();
    var characters;
    var seconds = 60;
    var wpm = 0;
    var correctChars = 0;
    var cursorIndex = 0;
    var displayedCharIndex = 0;
    
    function generateWords(){
        for(let i = 0; i < wordCount; i++){
			let randomWord = Math.floor(Math.random() * words.length);
			Arr_randomWords.push(words[randomWord] + " ");
			words.splice(randomWord, 1);
        }
        characters = Arr_randomWords.join('').toString().split('');
    }

    function createCharSpan(item, index) {
        $(wordsDisplayElement).append("<span class='displayedChars' id='displayedChar" + index + "'>" + item + "</span>");
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
                $(timerElement).empty().append("<p class='display-3 id='wordsDisplayText'>WPM: " + Math.floor(wpm) + "</p>");
                $(wordsInputTextElement).remove();
            } else {
                if(mins > 1){
                    countdown(mins-1);
                }
            }
        }
        tick();
    }

    $(wordsInputTextElement).keydown(function startCountdown(){
        if(seconds == 60){
            countdown(1);
            return true;
        }else{
            return true;
        }
    });

    generateWords();
    characters.forEach(createCharSpan);
    
    $(wordsInputTextElement).bind('keydown', function(event) {
        currentKey = event.key;
        let cursorChar = characters[cursorIndex];
        
        if (currentKey == cursorChar){
            $(wordsInputTextElement).css('background-color','#91ffa2'); //good key
            $("#displayedChar" + displayedCharIndex).addClass('correct').removeClass('incorrect');
            cursorIndex++;
            displayedCharIndex++;
            correctChars++;
        } else if ((event.keyCode == 32) && (cursorChar != " ")){ //if space is pressed and not expected, move to next word
            $("#displayedChar" + displayedCharIndex).removeClass('correct').addClass('incorrect');
            $(wordsInputTextElement).css('background-color','#ff9191');
            cursorIndex++;
            displayedCharIndex++;
        } else if(event.keyCode == 8){ //if backspace is pressed
            if(cursorIndex > 0){
                cursorIndex--;
                displayedCharIndex--;
                $("#displayedChar" + displayedCharIndex).removeClass('correct').removeClass('incorrect');
            }else{ //do not allow index to go negative
                return false;
            }
        } else{
            $(wordsInputTextElement).css('background-color','#ff9191'); //bad key
            $("#displayedChar" + displayedCharIndex).addClass('incorrect');
            cursorIndex++;
            displayedCharIndex++;
        }
        wpm = correctChars / 5;
    });

    $("#redoButton").click(function(){
        location.reload();
        return false;
    });
    
    $("#originalBackgroundButton").click(function(){
        $(".background-image").css("background-image","none");
    });

    $("#spaceBackgroundButton").click(function(){
        $(".background-image").css("background-image","url('/images/space.png')");
    });

    $(".background-image").click(function(){
        $("#wordsInputText").focus();
    });

    background.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / windowWidth;
        const mouseY = e.clientY / windowHeight;

        background.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
    });
});