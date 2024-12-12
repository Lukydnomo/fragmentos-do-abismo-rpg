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
    const changeH1 = document.querySelectorAll('.changeH1');
    const changeH2 = document.querySelectorAll('.changeH2');
    const changeH3 = document.querySelectorAll('.changeH3');
    const changeLI = document.querySelectorAll('.changeLI');
    var strokes = document.getElementById('strokes');

    if (darkState == 0) {
        darkStateIMG.src = '../images/toggleOn.svg';
        darkState = 1;
        darkStateIMG.style.filter = 'none';
        main.style.backgroundColor = '#292929';
        nav.style.backgroundColor = '#292929';
        footer.style.backgroundColor = 'rgba(14, 14, 14, 0.959)';
        changelog.style.backgroundColor = '#292929';

        changeH1.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
        changeH2.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
        changeH3.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
        changeLI.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });

        main.style.color = '#FFFFFF';
        nav.style.color = '#FFFFFF';
        footer.style.color = '#FFFFFF';
        changelog.style.color = '#FFFFFF';

        strokes.style.filter = 'none';
    } else {
        darkStateIMG.src = '../images/toggleOff.svg';
        darkState = 0;
        darkStateIMG.style.filter = 'invert()';
        main.style.backgroundColor = '#FFFFFF';
        nav.style.backgroundColor = '#FFFFFF';
        footer.style.backgroundColor = 'rgba(241, 241, 241, 0.959)';
        changelog.style.backgroundColor = '#FFFFFF';

        changeH1.forEach(elemento => {
            elemento.style.color = '#333';
        });
        changeH2.forEach(elemento => {
            elemento.style.color = '#333';
        });
        changeH3.forEach(elemento => {
            elemento.style.color = '#333';
        });
        changeLI.forEach(elemento => {
            elemento.style.color = '#333';
        });

        main.style.color = '#000000';
        nav.style.color = '#000000';
        footer.style.color = '#000000';
        changelog.style.color = '#000000';

        strokes.style.filter = 'invert()';
    }
}