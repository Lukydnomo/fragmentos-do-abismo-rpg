# Changelog

## [1.1.4v5] - 2024-12-13
### Added
- Scroll colorido

'scrollbar-width: thin;
scrollbar-color: #333 #B496DB;'

## [1.1.3v4] - 2024-12-13
### Fixed
- Display main se comportando como flex

'Era só ter tirado essa porra de **"display: flex;"**, eu sofro nesse merda viu'

## [1.1.3v3] - 2024-12-13
### Fixed
- Hyperlink pra "Re:Zero" não estava sendo compatível com o Dark Mode

'
a.forEach(elemento => {
            elemento.style.color = '#FFFFFF';
        });
<br><br>
a.forEach(elemento => {
            elemento.style.color = '#333';
        });'

## [1.1.3v2] - 2024-12-13
### Added
- Hyperlink pra "Re:Zero" no texto de boas-vindas

### Fixed
- Texto de boas vindas estava com pontuação irregular

'
**Texto de boas vindas estava com pontuação irregular:**
_Antes:_
Olá e bem vindo ser humano, muitos vão trocar de raça assim que fizerem a ficha, e outros vão continuar na mesma, mas bem,  caso esteja se perguntando oque é um RPG vou ser sincero, como mestre e como player, é um jogo com amigos que vai fazer você chorar em posição fetal durante semanas, então players sejam bons com o mestre, pra ele não surtar e matar vocês.<br><br>Esse RPG foi baseado no anime / mangá / novel de Re:Zero, pois eu amo, muitas coisas são de lá ainda, porém tem coisas o suficiente para eu chamar de plágio legal de coisas diversas e um pouco de criatividade, espero que gostem
<br><br>
_Depois:_
Olá e bem-vindo, ser humano! Muitos vão trocar de raça assim que fizerem a ficha, enquanto outros continuarão na mesma. Mas, bem, caso esteja se perguntando o que é um RPG, vou ser sincero: como mestre e como player, é um jogo com amigos que vai fazer você chorar em posição fetal durante semanas. Então, players, sejam bons com o mestre, para ele não surtar e acabar matando vocês.
<br><br>
Este RPG foi baseado no anime/mangá/novel Re:Zero, porque eu amo essa obra. Muitas coisas são de lá, mas também há o suficiente para eu chamar de um "plágio legal" de várias fontes, misturado com um pouco de criatividade. Espero que gostem!
<br><br>
**Hyperlink pra "Re:Zero" no texto de boas vindas:**
&lt;a href="https://pt.wikipedia.org/wiki/Re:Zero" style='color: #000000; font: italic normal 16px kanit;' target='_blank' rel='external'&gt;Re:Zero&lt;/a&gt;
'

## [1.1.3] - 2024-12-13
### Fixed
- Estilos agora estão dentro do arquivo global
- Logs detalhados estavam sendo disconsiderados no modo escuro

' **Estilos agora estão dentro do arquivo global:**
bemvindo.html -> style.css:
.changelog {
    background: #fff;
    padding: 15px 20px 15px 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin: 30px auto 0px auto;
    max-width: 600px;
    box-shadow: 5px 5px 15px rgba(15, 25, 54, 0.644);
    overflow-y: auto;
    height: 400px;
    font-family: Kanit;
}
.changelog h1, .changelog h2, .changelog h3, .changelog details, .changelog li, .changelog summary {
    color: #333;
    font-family: Kanit;
}
.changelog details {
    padding: 0px 0px 0px 5px;
}

**Logs detalhados estavam sendo disconsiderados no modo escuro:**
[...]
.changelog summary {
    color: #333;
    font-family: Kanit;
}
.changelog details {
    padding: 0px 0px 0px 5px;
}
[...]'

## [1.1.2] - 2024-12-12
### Added
- Um log detalhado pra nerdolas

'Código pra add o log detalhado: <code>.replace(/^'(.*)'$/gim, '&lt;br&gt;&lt;details&gt;&lt;summary&gt;Log detalhado&lt;/summary&gt;$1&lt;/details&gt;')</code>'

## [1.1.1] - 2024-12-12
### Fixed
- Strokes Menu com a coloração bugada ao usar o Dark Mode

### Suggestion
- O background no modo escuro foi mudado pra ver como vcs recebem a nova coloração. Melhorou? Ou devo manter o background normal no Dark Mode?

## [1.1.0] - 2024-12-11
### Added / Fixed
- Full Dark Mode

## [1.1.0beta] - 2024-12-11
### Added
- Beta Dark Mode

## [1.0.3v2] - 2024-12-11
### Fixed
- Padding e Font da área do changelog

## [1.0.3] - 2024-12-11
### Added
- Sistema de rolagem na área da changelog

## [1.0.2] - 2024-12-11
### Fixed
- Changelog mau posicionado na página

## [1.0.1] - 2024-12-11
### Added
- Sistema de changelog.

### Fixed
- Mau posicionamento do texto de copyright em dispositivos mobile.

## [1.0.0] - 2024-12-10
### Added
- Lançamento inicial do sistema.
