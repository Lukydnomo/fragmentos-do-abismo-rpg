function nextPage(page) {
    window.location.href = page;
}

let darkState = 0;

function darkMode() {
    var darkStateIMG = document.getElementById('darkStateIMG')
    var main = document.getElementById('main');
    var header = document.getElementById('header');
    var nav = document.getElementById('nav');
    var footer = document.getElementById('footer');
    var changelog = document.getElementById('changelog');
    const h1 = document.querySelectorAll('h1');
    const h2 = document.querySelectorAll('h2');
    const h3 = document.querySelectorAll('h3');
    const li = document.querySelectorAll('li');
    var strokes = document.getElementById('strokes');
    var strokeOptions = document.getElementById('strokeOptions');
    var prof = document.getElementById('prof');
    const body = document.querySelectorAll('body');
    const summary = document.querySelectorAll('summary');
    const details = document.querySelectorAll('details');
    const a = document.querySelectorAll("a");
    var botaoComecar = document.getElementById("comecar");

    if (darkState == 0) {
        darkStateIMG.src = '../images/toggleOn.svg';
        darkState = 1;
        darkStateIMG.style.filter = 'none';
        main.style.backgroundColor = '#292929';
        nav.style.backgroundColor = '#292929';
        footer.style.backgroundColor = 'rgba(14, 14, 14, 0.959)';
        changelog.style.backgroundColor = '#292929';
        h1.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
        h2.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
        h3.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
        li.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
        strokeOptions.style.backgroundColor = '#292929';
        body.forEach(elemeto => {
            elemeto.style.backgroundImage = 'linear-gradient(to right, #24064B, #110342)';
        });
        summary.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
        details.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
        a.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
        botaoComecar.style.background = '#24064B';
        botaoComecar.addEventListener('mouseenter', () => {
            botaoComecar.style.background = '#120325';
        });
        botaoComecar.addEventListener('mouseleave', () => {
            botaoComecar.style.backgroundColor = '#24064B';
        });
        

        main.style.color = '#FFFFFF';
        nav.style.color = '#FFFFFF';
        footer.style.color = '#FFFFFF';
        changelog.style.color = '#FFFFFF';

        strokes.style.filter = 'none';
        prof.style.filter = 'none';
    } else {
        darkStateIMG.src = '../images/toggleOff.svg';
        darkState = 0;
        darkStateIMG.style.filter = 'invert()';
        main.style.backgroundColor = '#FFFFFF';
        nav.style.backgroundColor = '#FFFFFF';
        footer.style.backgroundColor = 'rgba(241, 241, 241, 0.959)';
        changelog.style.backgroundColor = '#FFFFFF';
    
        h1.forEach(elemento => {
            elemento.style.color = '#333';
        });
        h2.forEach(elemento => {
            elemento.style.color = '#333';
        });
        h3.forEach(elemento => {
            elemento.style.color = '#333';
        });
        li.forEach(elemento => {
            elemento.style.color = '#333';
        });
        strokeOptions.style.backgroundColor = '#FFFFFF';
        body.forEach(elemeto => {
            elemeto.style.backgroundImage = 'linear-gradient(to right, #B496DB, #564787)';
        });
        summary.forEach(elemento => {
            elemento.style.color = '#333';
        });
        a.forEach(elemento => {
            elemento.style.color = '#333';
        });
        botaoComecar.style.background = '#D6A5E8';
        botaoComecar.addEventListener('mouseenter', () => {
            botaoComecar.style.background = '#916d9e';
        });
        botaoComecar.addEventListener('mouseleave', () => {
            botaoComecar.style.backgroundColor = '#D6A5E8';
        });

        main.style.color = '#000000';
        nav.style.color = '#000000';
        footer.style.color = '#000000';
        changelog.style.color = '#000000';

        strokes.style.filter = 'invert()';
        prof.style.filter = 'invert()';
    }
}