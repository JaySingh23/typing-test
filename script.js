let quotes_array = [
    'The greatest test of courage on earth is to bear defeat without losing heart.',
    'Should we have background checks, waiting periods? To drive a car you have to pass a test that shows you know how to drive your car safely, you should have to do the same thing with guns.',
    "Anyway, no drug, not even alcohol, causes the fundamental ills of society. If we're looking for the source of our troubles, we shouldn't test people for drugs, we should test them for stupidity, ignorance, greed and love of power.",
    "The only thing I won't watch is darts. And I don't watch cricket. How can you like a game that requires you to take four days off work to follow a Test? And I don't really like golf.",
    'Everything I make as a producer, I visualize it as a DJ first. And all those beats, I test them as a DJ.',
    "I'm not the type of person to live in fear. I think positively.",
    'I want to party in space because I make alien music.'
]

let wpm_text = document.querySelector("#curr_wpm");
let quote_text = document.querySelector(".quote");
let input_area = document.querySelector(".input_area");
let time_limit = 30;
let timer_text = document.querySelector('.selected');
let timer_text1 = document.querySelector('#curr_time2');

let timeElapsed = 0;
let characterTyped = 0;
let currentQuote = "";
let quoteNo = 0;

function timeChosen() {
    document.querySelector('#curr_time').classList.toggle('selected')
    document.querySelector('#curr_time2').classList.toggle('selected')
    if(time_limit === 30)
        time_limit = 60;
    else 
        time_limit = 30;
}

function updateQuote() {
    quote_text.textContent = null;
    currentQuote = quotes_array[quoteNo];

    //we do this splitting so as to style them character-wise individually. We make each character a separate element.
    currentQuote.split('').forEach(char => {
        const charSpan = document.createElement('span')
        charSpan.innerText = char
        quote_text.appendChild(charSpan)
    })

    if(quoteNo< quotes_array.length - 1)
        quoteNo++;
    else 
        quoteNo = 0;
}

const processTyping = (e) => {
    if(e.key === 'Escape'){
        characterTyped = 0;
        resetValues();
    }
    
    let ch = document.getElementById("typing_area").value;
    let curr_input_array = ch.split('');
    let flag = true;
    characterTyped++;
    wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));
    wpm_text.textContent = wpm;

    quoteSpanArray = quote_text.querySelectorAll('span')
    quoteSpanArray.forEach((char, index) => {
        let typedChar = curr_input_array[index];

        if(typedChar == null) {
            char.classList.remove('correct_char');
            char.classList.remove('incorrect_char');
        }
        else if(typedChar == char.innerText) {
            char.classList.add('correct_char');
            char.classList.remove('incorrect_char');
            flag = true;
            
        }
        else {
            char.classList.remove('correct_char');
            char.classList.add('incorrect_char');
            flag = false;
        }
    });

    //if current text is completely typed irrespective of errors
    if ((curr_input_array.length == currentQuote.length) && (flag == true)) {
        updateQuote();
        input_area.value = "";
    }   
    wpm = Math.round((((characterTyped / 6) / timeElapsed) * 60));
    wpm_text.textContent = wpm;
    
}

function resetValues() {
    input_area.disabled = false;
    if(c === 0){
        time_limit = 30;
        timer_text.textContent = time_limit;
    }
    else if(c === 1){
        time_limit = 60;
        timer_text1.textContent = time_limit;
    }
    input_area.value = "";
    wpm_text.textContent = '0';
    timeElapsed = 0;
    characterTyped = 0;
    currentQuote = "";
    quoteNo = 0;
}

let c = 0;
function startGame() {
    updateQuote();
    input_area.addEventListener("keyup", (e) => processTyping(e))
    if(time_limit === 30) {
        timer = setInterval(() => updateTimer(document.querySelector("#curr_time")), 1000);
        c = 0;
    }
    else {
        timer = setInterval(() => updateTimer(document.querySelector("#curr_time2")), 1000);
        c = 1;
    }
}

function updateTimer(timer_text) {
    if(time_limit>0) {
        time_limit--;
        timeElapsed++;
        timer_text.textContent = time_limit;
    }
    else {
        finishGame();
    }
}

function finishGame() {
    clearInterval(timer);
    input_area.disabled = true;
}

