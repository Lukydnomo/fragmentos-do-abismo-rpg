// scriptFichas.js

const totalPontos = 15;
const atributoInputs = document.querySelectorAll('.atributo-input');
const pontosRestantesEl = document.getElementById('pontos-restantes');
const hpEl = document.getElementById('hp');
const sanidadeEl = document.getElementById('sanidade');
const manaCalcEl = document.getElementById('manaCalc');
const maxPericiasEl = document.getElementById('max-pericias');
const periciaCheckboxes = document.querySelectorAll('#pericias input[type="checkbox"]');
const racaSelect = document.getElementById('raca');
const classeSelect = document.getElementById('classe');

// Mapeamento de perícias automáticas por raça
const periciasRaca = {
  "Humano": [],
  "Demi-Humano": ["Intuição", "Percepção", "Investigação"],
  "Semi-Humano": ["Sobrevivência", "Fortitude", "Percepção"],
  "Lobisomem": ["Reflexos", "Furtividade", "Acrobacia"],
  "Demônio/Oni": ["Percepção", "Iniciativa"],
  "Elfo": ["Furtividade", "Sobrevivência", "Vontade"],
  "Vampiro ou Bonecos Amaldiçoado": ["Intuição", "Furtividade", "Enganação"],
  "Triclope": [],
  "Ciclope": ["Intuição", "Investigação", "Diplomacia"],
  "Semi-Dragão": ["Psychokinesis", "Intuição", "Vontade"],
  "Mult-membros": ["Sobrevivência", "Fortitude", "Tática"],
  "Semi-Gigante": ["Iniciativa", "Fortitude", "Intimidação"],
  "Espírito": ["Conhecimento", "Intuição"] // +1 magia de escolha
};

// Mapeamento de bônus de perícias extras por raça
const periciasExtrasRaca = {
  "Humano": 2,
  "Demi-Humano": 2,
  "Semi-Humano": 0,
  "Lobisomem": 0,
  "Demônio/Oni": 0,
  "Elfo": 0,
  "Vampiro ou Bonecos Amaldiçoado": 0,
  "Triclope": 0,
  "Ciclope": 0,
  "Semi-Dragão": 0,
  "Mult-membros": 0,
  "Semi-Gigante": 0,
  "Espírito": 0
};

// Mapeamento de perícias automáticas por classe
const periciasClasse = {
  "Mago": [],
  "Feiticeiro": ["Linguagem"],
  "Bruxo": ["Runas"],
  "Necromante": ["Magia de Trevas"],
  "Bárbaro": ["Luta", "Intimidação"],
  "Bardo": ["Atuação"],
  "Clérigo": ["Medicina"],
  "Druida": [],
  "Atirador": ["Pontaria","Percepção"],
  "Guerreiro": ["Arma", "Luta"],
  "Assassino": ["Furtividade", "Reflexos", "Acrobacia"],
  // Adicione as demais classes conforme regras do sistema
};

// Atualiza pontos e status
function atualizarAtributos() {
  let soma = 0;
  atributoInputs.forEach(input => {
    soma += parseInt(input.value) || 1;
  });
  const pontosUsados = soma - atributoInputs.length;
  const restantes = totalPontos - pontosUsados;
  pontosRestantesEl.textContent = restantes >= 0 ? restantes : 0;

  // Cálculos detalhados conforme regras do sistema

  // Resistência: HP base 25 + tabela
  const resistencia = parseInt(document.getElementById('resistencia').value) || 1;
  let hpBase = 25;
  let hpBonus = 0;
  if (resistencia === 1) hpBonus = 3;
  else if (resistencia === 2) hpBonus = 6;
  else if (resistencia === 3) hpBonus = 9;
  else if (resistencia === 4) hpBonus = 12;
  else if (resistencia === 5) hpBonus = 15;
  else if (resistencia === 6) hpBonus = 18;
  else if (resistencia === 7) hpBonus = 21;
  else if (resistencia === 8) hpBonus = 24;
  else if (resistencia === 9) hpBonus = 27;
  else if (resistencia >= 10) hpBonus = 30;
  hpEl.textContent = hpBase + hpBonus;

  // Inteligência: Sanidade base 50 + tabela
  const inteligencia = parseInt(document.getElementById('inteligencia').value) || 1;
  let sanBonus = 0;
  if (inteligencia === 1) sanBonus = 5;
  else if (inteligencia === 2) sanBonus = 10;
  else if (inteligencia === 3) sanBonus = 15;
  else if (inteligencia === 4) sanBonus = 20;
  else if (inteligencia === 5) sanBonus = 25;
  else if (inteligencia === 6) sanBonus = 30;
  else if (inteligencia === 7) sanBonus = 35;
  else if (inteligencia === 8) sanBonus = 40;
  else if (inteligencia === 9) sanBonus = 45;
  else if (inteligencia >= 10) sanBonus = 50;
  sanidadeEl.textContent = 50 + sanBonus;

  // Mana: tabela
  const manaAttr = parseInt(document.getElementById('manaAttr').value) || 1;
  let manaTotal = 0;
  if (manaAttr === 1) manaTotal = 11;
  else if (manaAttr === 2) manaTotal = 15;
  else if (manaAttr === 3) manaTotal = 22;
  else if (manaAttr === 4) manaTotal = 29;
  else if (manaAttr === 5) manaTotal = 36;
  else if (manaAttr === 6) manaTotal = 43;
  else if (manaAttr === 7) manaTotal = 50;
  else if (manaAttr === 8) manaTotal = 60;
  else if (manaAttr === 9) manaTotal = 70;
  else if (manaAttr === 10) manaTotal = 85;
  else if (manaAttr > 10) manaTotal = 100 + (manaAttr - 10) * 20;
  manaCalcEl.textContent = manaTotal;

  atualizarPericias();
}

// Controle de seleção de perícias
function atualizarPericias() {
  const inteligencia = parseInt(document.getElementById('inteligencia').value) || 1;
  const raca = racaSelect ? racaSelect.value : "";
  const classe = classeSelect ? classeSelect.value : "";
  const extras = periciasExtrasRaca[raca] || 0;
  const automaticsRaca = periciasRaca[raca] || [];
  const automaticsClasse = periciasClasse[classe] || [];
  const maxAllowed = inteligencia + 3 + extras;

  // Atualiza texto do máximo
  maxPericiasEl.textContent = maxAllowed;

  // Marca automáticas e desabilita
  periciaCheckboxes.forEach(checkbox => {
    if (automaticsRaca.includes(checkbox.value) || automaticsClasse.includes(checkbox.value)) {
      checkbox.checked = true;
      checkbox.disabled = true;
    } else {
      checkbox.disabled = false;
    }
  });

  // Conta apenas as não automáticas
  const checked = Array.from(periciaCheckboxes)
    .filter(cb => cb.checked && !automaticsRaca.includes(cb.value) && !automaticsClasse.includes(cb.value));

  // Bloqueia seleção se atingir limite
  periciaCheckboxes.forEach(checkbox => {
    if (!automaticsRaca.includes(checkbox.value) && !automaticsClasse.includes(checkbox.value)) {
      checkbox.disabled = checked.length >= maxAllowed && !checkbox.checked;
    }
  });
}

// Event listeners para atributos, raça e perícias
atributoInputs.forEach(input => {
  input.addEventListener('input', atualizarAtributos);
});
periciaCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', atualizarPericias);
});
if (racaSelect) {
  racaSelect.addEventListener('change', atualizarPericias);
}
if (classeSelect) {
  classeSelect.addEventListener('change', atualizarPericias);
}

// Preview em tempo real
function atualizarPreview() {
  const previewEl = document.getElementById('ficha-preview');
  const nome = document.getElementById('nome')?.value || "";
  const idade = document.getElementById('idade')?.value || "";
  const sexo = document.getElementById('sexo')?.value || "";
  const raca = racaSelect ? racaSelect.value : "";
  const classe = classeSelect ? classeSelect.value : "";
  const origem = document.getElementById('origem')?.value || "";
  let html = `
    <h3>Preview da Ficha</h3>
    <div class="preview-content">
      <p><strong>Nome:</strong> ${nome || '-'}</p>
      <p><strong>Idade:</strong> ${idade || '-'}</p>
      <p><strong>Sexo:</strong> ${sexo || '-'}</p>
      <p><strong>Raça:</strong> ${raca || '-'}</p>
      <p><strong>Classe:</strong> ${classe || '-'}</p>
      <p><strong>Origem:</strong> ${origem || '-'}</p>
      <h4>Atributos</h4>
      <div class="preview-atributos">
  `;
  atributoInputs.forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    html += `<p><strong>${label ? label.textContent : input.id}:</strong> ${input.value}</p>`;
  });
  html += `
      </div>
      <h4>Status</h4>
      <p><strong>Pontos Restantes:</strong> ${pontosRestantesEl?.textContent || '-'}</p>
      <p><strong>HP:</strong> ${hpEl?.textContent || '-'}</p>
      <p><strong>Sanidade:</strong> ${sanidadeEl?.textContent || '-'}</p>
      <p><strong>Mana:</strong> ${manaCalcEl?.textContent || '-'}</p>
      <h4>Perícias</h4>
      <ul>
        ${
          Array.from(periciaCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => {
              if (cb.value === "Arma") {
                const armaTipo = cb.parentElement.querySelector('.arma-tipo');
                return `<li>Arma (${armaTipo ? armaTipo.value : ""})</li>`;
              }
              return `<li>${cb.value}</li>`;
            })
            .join('')
        }
      </ul>
      <h4>Equipamentos</h4>
      <p>${document.getElementById("equipamentos")?.value || '-'}</p>
      <h4>Magias Selecionadas</h4>
      <ul>
        ${
          Array.from(document.querySelectorAll('.magia-select'))
            .map(sel => sel.value)
            .filter(v => v)
            .map(v => `<li>${v}</li>`)
            .join('')
        }
      </ul>
      <h4>Magias Extras</h4>
      <p>${document.getElementById("magias")?.value || '-'}</p>
      <h4>Bençãos</h4>
      <p>${document.getElementById("bencaos")?.value || '-'}</p>
      <h4>Defeitos</h4>
      <p>${document.getElementById("defeitos")?.value || '-'}</p>
      <h4>Inventário</h4>
      <ul>
        ${
          inventario.length
            ? inventario.map(item => `<li>${item.nome} x${item.quantidade}</li>`).join('')
            : '<li>Nenhum item no inventário.</li>'
        }
      </ul>
    </div>
  `;
  previewEl.innerHTML = html;
}

// Atualiza preview em qualquer campo
document.querySelectorAll('input, select, textarea').forEach(el => {
  el.addEventListener('input', atualizarPreview);
});

// Magias dinâmicas
function adicionarCampoMagia(valor = "") {
  const container = document.getElementById('magia-container');
  const div = document.createElement('div');
  div.classList.add('magia-select-group');
  div.innerHTML = `
    <label>Magia:</label>
    <select class="magia-select">
      <option value="">Selecione...</option>
      <option>Buff Elemental</option>
      <option>Armadura Elemental</option>
      <option>Wind Arrow</option>
      <option>Fura</option>
      <option>Wind Bust</option>
      <option>Dona</option>
      <option>Dona Ataque</option>
      <option>Earth Seal</option>
      <option>Earth Sword</option>
      <option>Tuch Rock</option>
      <option>Fire Sword</option>
      <option>Fire Territory</option>
      <option>Goa</option>
      <option>Artes de Gelo</option>
      <option>Ice Crystal</option>
      <option>Água Corrente</option>
      <option>Magia de Cura</option>
      <option>Lar do Lagarto Aquático</option>
      <option>Levitação Corporal</option>
      <option>Camuflagem das trevas</option>
      <option>Shamak</option>
      <option>Minya</option>
      <option>Jiwald</option>
      <option>Akra</option>
      <option>Sabre de Luz</option>
    </select>
    <button type="button" onclick="this.parentElement.remove()">✖</button>
  `;
  container.appendChild(div);
  if (valor) div.querySelector('select').value = valor;
}

// --- Inventário ---
let inventario = [];

function atualizarInventario() {
  const lista = document.getElementById('inventario-list');
  lista.innerHTML = "";
  if (inventario.length === 0) {
    lista.innerHTML = "<p>Nenhum item no inventário.</p>";
    return;
  }
  inventario.forEach((item, idx) => {
    lista.innerHTML += `
      <div class="inventario-item">
        <div style="display:flex;align-items:center;gap:10px;">
          ${item.miniatura ? `<img src="${item.miniatura}" alt="Miniatura" style="width:32px;height:32px;border-radius:4px;border:1px solid #bbb;">` : ''}
          <span><strong>${item.nome}</strong> x${item.quantidade} <small>(Espaço: ${item.espaco})</small></span>
        </div>
        <div style="flex:1;">
          <span style="color:#666;font-size:0.95em;">${item.descricao || ''}</span>
        </div>
        <button type="button" onclick="removerItemInventario(${idx})">🗑️</button>
      </div>
    `;
  });
}

function adicionarItemInventario() {
  const nome = document.getElementById('item-nome').value.trim();
  const quantidade = parseInt(document.getElementById('item-quantidade').value) || 1;
  const espaco = parseInt(document.getElementById('item-espaco').value) || 1;
  const descricao = document.getElementById('item-descricao').value.trim();
  const miniaturaInput = document.getElementById('item-miniatura');
  let miniatura = "";

  if (!nome) return;

  if (miniaturaInput.files && miniaturaInput.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      miniatura = e.target.result;
      inventario.push({ nome, quantidade, espaco, descricao, miniatura });
      atualizarInventario();
      limparCamposInventario();
    };
    reader.readAsDataURL(miniaturaInput.files[0]);
  } else {
    inventario.push({ nome, quantidade, espaco, descricao, miniatura: "" });
    atualizarInventario();
    limparCamposInventario();
  }
}

function limparCamposInventario() {
  document.getElementById('item-nome').value = "";
  document.getElementById('item-quantidade').value = 1;
  document.getElementById('item-espaco').value = 1;
  document.getElementById('item-miniatura').value = "";
  document.getElementById('item-descricao').value = "";
}

function removerItemInventario(idx) {
  inventario.splice(idx, 1);
  atualizarInventario();
}

// Salvar JSON
function salvarJSON() {
  const ficha = {
    nome: document.getElementById("nome")?.value || "",
    idade: document.getElementById("idade")?.value || "",
    raca: racaSelect?.value || "",
    classe: classeSelect?.value || "",
    origem: document.getElementById("origem")?.value || "",
    sexo: document.getElementById("sexo")?.value || "",
    atributos: {},
    pontosRestantes: pontosRestantesEl?.textContent || "",
    hp: hpEl?.textContent || "",
    sanidade: sanidadeEl?.textContent || "",
    mana: manaCalcEl?.textContent || "",
    pericias: [],
    equipamentos: document.getElementById("equipamentos")?.value || "",
    magiasLivres: document.getElementById("magias")?.value || "",
    magiasSelecionadas: [],
    bencaos: document.getElementById("bencaos")?.value || "",
    defeitos: document.getElementById("defeitos")?.value || "",
    inventario: inventario.slice(),
    preview: document.getElementById("ficha-preview")?.innerHTML || ""
  };
  atributoInputs.forEach(input => {
    ficha.atributos[input.id] = input.value;
  });
  periciaCheckboxes.forEach(cb => {
    if (cb.checked) {
      if (cb.value === "Arma") {
        const armaTipo = cb.parentElement.querySelector('.arma-tipo');
        ficha.pericias.push({
          nome: cb.value,
          tipo: armaTipo ? armaTipo.value : ""
        });
      } else {
        ficha.pericias.push(cb.value);
      }
    }
  });
  document.querySelectorAll('.magia-select').forEach(select => {
    if (select.value) ficha.magiasSelecionadas.push(select.value);
  });
  const blob = new Blob([JSON.stringify(ficha, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Ficha_${ficha.nome || "personagem"}.json`;
  a.click();
}

// Carregar JSON
function carregarJSON() {
  const fileInput = document.getElementById("inputJson");
  const file = fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    const dados = JSON.parse(e.target.result);

    document.getElementById("nome").value = dados.nome || "";
    document.getElementById("idade").value = dados.idade || "";
    if (racaSelect) racaSelect.value = dados.raca || "";
    if (classeSelect) classeSelect.value = dados.classe || "";
    document.getElementById("classe").value = dados.classe || "";
    document.getElementById("origem").value = dados.origem || "";
    document.getElementById("sexo").value = dados.sexo || "";

    for (const nome in dados.atributos) {
      const input = document.getElementById(nome);
      if (input) input.value = dados.atributos[nome];
    }

    periciaCheckboxes.forEach(cb => {
      cb.checked = false;
      if (cb.value === "Arma") {
        const armaObj = dados.pericias.find(p => typeof p === "object" && p.nome === "Arma");
        cb.checked = !!armaObj;
        const armaTipo = cb.parentElement.querySelector('.arma-tipo');
        if (armaTipo && armaObj) armaTipo.value = armaObj.tipo || "";
      } else {
        cb.checked = dados.pericias.includes(cb.value);
      }
    });

    document.getElementById("equipamentos").value = dados.equipamentos || "";
    document.getElementById("magias").value = dados.magiasLivres || "";
    document.getElementById("bencaos").value = dados.bencaos || "";
    document.getElementById("defeitos").value = dados.defeitos || "";

    document.getElementById("magia-container").innerHTML = "";
    (dados.magiasSelecionadas || []).forEach(magia => adicionarCampoMagia(magia));

    inventario = Array.isArray(dados.inventario) ? dados.inventario : [];
    atualizarInventario();

    if (pontosRestantesEl) pontosRestantesEl.textContent = dados.pontosRestantes || "";
    if (hpEl) hpEl.textContent = dados.hp || "";
    if (sanidadeEl) sanidadeEl.textContent = dados.sanidade || "";
    if (manaCalcEl) manaCalcEl.textContent = dados.mana || "";

    atualizarAtributos();
    atualizarPreview();
  };
  reader.readAsText(file);
}

// PDF
function gerarPDF() {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  const nome = document.getElementById("nome")?.value || "";
  const raca = racaSelect?.value || "";
  const classe = classeSelect?.value || "";
  const origem = document.getElementById("origem")?.value || "";
  const idade = document.getElementById("idade")?.value || "";
  const sexo = document.getElementById("sexo")?.value || "";
  let y = 15;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Ficha RE:Zero RPG", 70, y);
  y += 10;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Nome: ${nome}`, 10, y); y += 7;
  doc.text(`Idade: ${idade}    Sexo: ${sexo}`, 10, y); y += 7;
  doc.text(`Raça: ${raca}    Classe: ${classe}    Origem: ${origem}`, 10, y); y += 7;
  doc.text("Atributos", 10, y); y += 7;
  atributoInputs.forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    doc.text(`${label ? label.textContent : input.id}: ${input.value}`, 10, y); y += 7;
  });
  doc.text("Status", 10, y); y += 7;
  doc.text(`HP: ${hpEl.textContent}`, 10, y); y += 7;
  doc.text(`Sanidade: ${sanidadeEl.textContent}`, 10, y); y += 7;
  doc.text(`Mana: ${manaCalcEl.textContent}`, 10, y); y += 7;
  const periciasSelecionadas = [];
  periciaCheckboxes.forEach(cb => {
    if (cb.checked) {
      if (cb.value === "Arma") {
        const armaTipo = cb.parentElement.querySelector('.arma-tipo');
        periciasSelecionadas.push(`Arma (${armaTipo ? armaTipo.value : ""})`);
      } else {
        periciasSelecionadas.push(cb.value);
      }
    }
  });
  if (periciasSelecionadas.length) {
    doc.text("Perícias", 10, y); y += 7;
    doc.text(periciasSelecionadas.join(", "), 10, y); y += 7;
  }
  const magiasSelecionadas = Array.from(document.querySelectorAll('.magia-select')).map(sel => sel.value).filter(v => v !== '');
  if (magiasSelecionadas.length) {
    doc.text("Magias Selecionadas", 10, y); y += 7;
    magiasSelecionadas.forEach(m => { doc.text(`- ${m}`, 10, y); y += 7; });
  }
  const equipamentos = document.getElementById("equipamentos")?.value || "";
  if (equipamentos.trim()) {
    doc.text("Equipamentos", 10, y); y += 7;
    doc.text(equipamentos, 10, y); y += 7;
  }
  const magiasLivres = document.getElementById("magias")?.value || "";
  if (magiasLivres.trim()) {
    doc.text("Magias Extras", 10, y); y += 7;
    doc.text(magiasLivres, 10, y); y += 7;
  }
  const bencaos = document.getElementById("bencaos")?.value || "";
  if (bencaos.trim()) {
    doc.text("Bençãos", 10, y); y += 7;
    doc.text(bencaos, 10, y); y += 7;
  }
  const defeitos = document.getElementById("defeitos")?.value || "";
  if (defeitos.trim()) {
    doc.text("Defeitos", 10, y); y += 7;
    doc.text(defeitos, 10, y); y += 7;
  }
  if (inventario.length) {
    doc.text("Inventário", 10, y); y += 7;
    inventario.forEach(item => {
      doc.text(`- ${item.nome} x${item.quantidade}`, 10, y); y += 7;
    });
  }
  doc.save(`Ficha_${nome || "personagem"}.pdf`);
}

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  atualizarAtributos();
  atualizarPreview();
  atualizarInventario();
});