let parag = document.querySelector('.parag');
let xhr = new XMLHttpRequest();
let text, parser, xmlDoc;
let loader = document.querySelector('#loader'),
    textBlock = document.querySelector('.text-block'),
    btnChange = document.querySelectorAll('.btn-change'),
    btnNext = document.querySelector('.btn-next');
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

//next button content changes
btnNext.addEventListener('click', () => {
    xhr.open('GET', `https://shrouded-chamber-70760.herokuapp.com/http://rzhunemogu.ru/Rand.aspx?CType=${btnNext.dataset.num}`);
    xhr.send();
    xhr.responseType = "text";
    startLaughing();
});