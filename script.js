const { speechSynthesis } = window;
let parag = document.querySelector('.parag');
let xhr = new XMLHttpRequest();
let text, parser, xmlDoc;
let loader = document.querySelector('#loader'),
    textBlock = document.querySelector('.text-block'),
    btnChange = document.querySelectorAll('.btn-change'),
    btnNext = document.querySelector('.btn-next'),
    btnPlay = document.querySelector('.play-btn');
parag.innerHTML = 'Ну что начнем?';
//change the category of humor buttons
btnChange.forEach(elem => {
    elem.addEventListener('click', () => {
        xhr.open('GET', `https://shrouded-chamber-70760.herokuapp.com/http://rzhunemogu.ru/Rand.aspx?CType=${elem.dataset.num}`);
        xhr.send();
        xhr.responseType = "text";
        btnNext.dataset.num = elem.dataset.num;
        startLaughing();
    });

});

//Loader start
function showLoadingSpinner() {
    loader.hidden = false;
    parag.hidden = true;
    textBlock.style.cssText = "width:300px;";
}
//Loader end
function removeLoadingSpinner() {
    if (!loader.hidden) {
        parag.hidden = false;
        loader.hidden = true;
        textBlock.style.cssText = "width:100%;";

    }
}
// Show the laugh text
function startLaughing() {
    showLoadingSpinner();
    xhr.onload = function() {
        if (xhr.status != 200) {
            alert(`Ошибка ${xhr.status}: ${xhr.statusText}`);
        } else {
            text = xhr.response;
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(text, "text/xml");
            parag.innerHTML = xmlDoc.getElementsByTagName("content")[0].innerHTML;
            removeLoadingSpinner();
        }


    };
}

//Load the voices
let voicesArr = [];
const generateVoices = () => {
    voicesArr = speechSynthesis.getVoices();
    const voicesList = voicesArr
        .map((voice, index) => `<option value=${index}>${voice.name}(${voice.lang})</option>`)
        .join('');
};

//Speaking function
const speak = () => {
    if (speechSynthesis.speaking) {
        console.log('Error speechSynthesis.speaking ');
        return;
    }
    if (parag.innerHTML != '') {
        const ssUtterance = new SpeechSynthesisUtterance(parag.innerHTML);
        ssUtterance.addEventListener('end', (event) => console.warn('ssUtterance.end'));
        ssUtterance.addEventListener('error', (event) => console.warn('ssUtterance.error'));
        ssUtterance.voice = voicesArr[0];
        ssUtterance.pitch = 6;
        ssUtterance.rate = 3;
        speechSynthesis.speak(ssUtterance);
    }
};
//button playing the text
btnPlay.addEventListener('click', speak);
//next button content changes
btnNext.addEventListener('click', () => {
    xhr.open('GET', `https://shrouded-chamber-70760.herokuapp.com/http://rzhunemogu.ru/Rand.aspx?CType=${btnNext.dataset.num}`);
    xhr.send();
    xhr.responseType = "text";
    startLaughing();
});

generateVoices();