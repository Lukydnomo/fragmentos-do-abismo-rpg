function nextPage(page) {
    window.location.href = page;
  }
  
  let darkState = 0;
  
  function darkMode() {
    const darkStateIMG = document.getElementById('darkStateIMG');
    const main = document.getElementById('main');
    const nav = document.getElementById('nav');
    const footer = document.getElementById('footer');
    const changelog = document.getElementById('changelog');
    const elementsToChange = document.querySelectorAll('h1, h2, h3, li, summary, details, a');
    const body = document.body;
    // Se houver algum botão específico para "começar", verifique se o id existe; caso contrário, remova essa parte.
    const botaoComecar = document.getElementById("comecar");
  
    if (darkState === 0) {
      darkStateIMG.src = '../images/toggleOn.svg';
      darkStateIMG.style.filter = 'none';
      darkState = 1;
      
      body.style.backgroundColor = '#121212';
      body.style.color = '#ffffff';
      body.style.backgroundImage = 'none';
      
      [main, nav, footer, changelog].forEach(element => {
        element.style.background = '#1e1e1e';
        element.style.color = '#ffffff';
      });
      
      elementsToChange.forEach(element => element.style.color = '#ffffff');
      
      if(botaoComecar){
        botaoComecar.style.background = '#6200ea';
        botaoComecar.onmouseenter = () => botaoComecar.style.background = '#3700b3';
        botaoComecar.onmouseleave = () => botaoComecar.style.background = '#6200ea';
      }
    } else {
      darkStateIMG.src = '../images/toggleOff.svg';
      darkStateIMG.style.filter = 'invert()';
      darkState = 0;
      
      body.style.backgroundColor = '#ffffff';
      body.style.color = '#000000';
      body.style.backgroundImage = 'none';
      
      [main, nav, footer, changelog].forEach(element => {
        element.style.background = '#ffffff';
        element.style.color = '#000000';
      });
      
      elementsToChange.forEach(element => element.style.color = '#333');
      
      if(botaoComecar){
        botaoComecar.style.background = '#D6A5E8';
        botaoComecar.onmouseenter = () => botaoComecar.style.background = '#916d9e';
        botaoComecar.onmouseleave = () => botaoComecar.style.background = '#D6A5E8';
      }
    }
  }
  
  function toggleMenu() {
    const menu = document.getElementById('strokeOptions');
    // Alterna a visibilidade do menu
    if (menu.style.display === 'block') {
      menu.style.display = 'none';
    } else {
      menu.style.display = 'block';
    }
  }
  