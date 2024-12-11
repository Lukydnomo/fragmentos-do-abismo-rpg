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
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')
        .replace(/^### (.*$)/gim, '<h3>$1</h3>')
        .replace(/^\- (.*$)/gim, '<li>$1</li>')

    container.innerHTML = html;
}

// Chama a função ao carregar a página
loadChangelog();
