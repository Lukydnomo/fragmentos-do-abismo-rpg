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

    if (darkState == 0) {
        darkStateIMG.src = '../images/toggleOn.svg';
        darkState = 1;
        darkStateIMG.style.filter = 'none';
        main.style.backgroundColor = '#292929';
        nav.style.backgroundColor = '#292929';
        footer.style.backgroundColor = 'rgba(14, 14, 14, 0.959)';
        changelog.style.backgroundColor = '#292929';

        main.style.color = '#FFFFFF';
        nav.style.color = '#FFFFFF';
        footer.style.color = '#FFFFFF';
        changelog.style.color = '#FFFFFF';
    } else {
        darkStateIMG.src = '../images/toggleOff.svg';
        darkState = 0;
        darkStateIMG.style.filter = 'invert()';
        main.style.backgroundColor = '#FFFFFF';
        nav.style.backgroundColor = '#FFFFFF';
        footer.style.backgroundColor = 'rgba(241, 241, 241, 0.959)';
        changelog.style.backgroundColor = '#FFFFFF';

        main.style.color = '#000000';
        nav.style.color = '#000000';
        footer.style.color = '#000000';
        changelog.style.color = '#000000';
    }
}