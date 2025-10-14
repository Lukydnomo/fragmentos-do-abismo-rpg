const nextPage = (page) => window.location.href = page;

const THEMES = {
  dark: {
    toggleSrc: '../images/toggleOn.svg',
    filter: 'none',
    colors: {
      body: '#121212',
      elements: '#1e1e1e',
      text: '#ffffff',
      button: '#6200ea',
      buttonHover: '#3700b3'
    }
  },
  light: {
    toggleSrc: '../images/toggleOff.svg',
    filter: 'invert()',
    colors: {
      body: '#ffffff',
      elements: '#ffffff',
      text: '#333',
      button: '#D6A5E8',
      buttonHover: '#916d9e'
    }
  }
};

let isDarkMode = false;

function darkMode() {
  const elements = {
    toggle: document.getElementById('darkStateIMG'),
    main: document.getElementById('main'),
    nav: document.getElementById('nav'),
    footer: document.getElementById('footer'),
    changelog: document.getElementById('changelog'),
    textElements: document.querySelectorAll('h1, h2, h3, li, summary, details, a'),
    body: document.body,
    button: document.getElementById('comecar')
  };

  const theme = isDarkMode ? THEMES.light : THEMES.dark;
  isDarkMode = !isDarkMode;

  // Atualiza o toggle
  elements.toggle.src = theme.toggleSrc;
  elements.toggle.style.filter = theme.filter;

  // Atualiza cores do body
  Object.assign(elements.body.style, {
    backgroundColor: theme.colors.body,
    color: theme.colors.text,
    backgroundImage: 'none'
  });

  // Atualiza elementos principais
  [elements.main, elements.nav, elements.footer, elements.changelog]
    .filter(Boolean)
    .forEach(element => {
      element.style.background = theme.colors.elements;
      element.style.color = theme.colors.text;
    });

  // Atualiza elementos de texto
  elements.textElements.forEach(element => 
    element.style.color = theme.colors.text
  );

  // Atualiza botão se existir
  if (elements.button) {
    elements.button.style.background = theme.colors.button;
    elements.button.onmouseenter = () => 
      elements.button.style.background = theme.colors.buttonHover;
    elements.button.onmouseleave = () => 
      elements.button.style.background = theme.colors.button;
  }
}

const toggleMenu = () => {
  const menu = document.getElementById('strokeOptions');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
};
