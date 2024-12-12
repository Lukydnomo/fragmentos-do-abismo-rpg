// Função para carregar o arquivo changelog.md
async function loadChangelog() {
    try {
        const response = await fetch('../changelog.md'); // Carrega o arquivo
        const text = await response.text();
        renderMarkdown(text);
    } catch (error) {
        document.getElementById('changelog').innerHTML = `<p>Erro ao carregar changelog.</p>`;
        console.error('Erro ao carregar o changelog:', error);
    }
}

// Função para converter Markdown em HTML simples
function renderMarkdown(markdown) {
    const container = document.getElementById('changelog');

    // Conversão básica de Markdown para HTML
    const html = markdown
        .replace(/^# (.*$)/gim, '<h1 class="changeH1">$1</h1>')
        .replace(/^## (.*$)/gim, '<h2 class="changeH2">$1</h2>')
        .replace(/^### (.*$)/gim, '<h3 class="changeH3">$1</h3>')
        .replace(/^\- (.*$)/gim, '<li class="changeLI">$1</li>')
        .replace(/^'(.*)'$/gim, '<br><details><summary>Log detalhado</summary>$1</details>')

    container.innerHTML = html;
}

// Chama a função ao carregar a página
loadChangelog();
