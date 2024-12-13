# Changelog

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
