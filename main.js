//speech 
const { speechSynthesis } = window;
const voices = document.getElementById('voices');
const rate = document.getElementById('rate');
const pitch = document.getElementById('pitch');
const textElem = document.getElementById('text');
const rusLang = 'ru-RU';
let rateVal = document.querySelector('.rate-value');
let pitchVal = document.querySelector('.pitch-value');
let voicesArr = [];
//Generation of voice
const generateVoices = () => {
    voicesArr = speechSynthesis.getVoices();
    const voicesList = voicesArr
        .map((voice, index) => voice.lang === rusLang && `<option value=${index}>${voice.name}(${voice.lang})</option>`)
        .join('');
    voices.innerHTML = voicesList;

};

const speak = () => {
    if (speechSynthesis.speaking) {
        console.log('Error speechSynthesis.speaking ');
        return;
    }
    if (text.value != '') {
        const ssUtterance = new SpeechSynthesisUtterance(text.value);
        ssUtterance.addEventListener('end', (event) => console.warn('ssUtterance.end'));
        ssUtterance.addEventListener('error', (event) => console.warn('ssUtterance.error'))
        ssUtterance.voice = voicesArr[voices.value];
        ssUtterance.pitch = pitch.value;
        ssUtterance.rate = rate.value;
        speechSynthesis.speak(ssUtterance);
    }
};
document.getElementById('btn-start').addEventListener('click', speak);
document.getElementById('btn-stop').addEventListener('click', () => speechSynthesis.cancel());
rate.addEventListener('change', () => {
    rateVal.innerHTML = rate.value;
});
pitch.addEventListener('change', () => {
    pitchVal.innerHTML = pitch.value;
});

voices.addEventListener('change', speak());
generateVoices();
speechSynthesis.addEventListener('voiceschanged', generateVoices);