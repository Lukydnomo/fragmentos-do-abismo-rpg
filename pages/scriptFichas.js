// scriptFichas.js

const totalPontos = 15;
const atributoInputs = document.querySelectorAll('.atributo-input');
const pontosRestantesEl = document.getElementById('pontos-restantes');
const maxPericiasEl = document.getElementById('max-pericias');
const periciaCheckboxes = document.querySelectorAll('#pericias input[type="checkbox"]');
const racaSelect = document.getElementById('raca');
const classeSelect = document.getElementById('classe');

function playSound(url) {
  const audio = new Audio(url);
  audio.play();
}

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
  "Humano": 0,
  "Demi-Humano": 0,
  "Semi-Humano": 0,
  "Lobisomem": 0,
  "Demônio/Oni": 1,
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

  atualizarMedidorPeso();
  atualizarPericias();
  atualizarStatus(hpBase + hpBonus, 50 + sanBonus, manaTotal);
}

let statusAtual = {
  hp: 0,
  sanidade: 0,
  mana: 0,
  max: { hp: 0, sanidade: 0, mana: 0 }
};

function atualizarStatus(hpMax, sanMax, manaMax) {
  // Atualiza os máximos
  statusAtual.max.hp = hpMax;
  statusAtual.max.sanidade = sanMax;
  statusAtual.max.mana = manaMax;

  // Inicializa se ainda for 0
  if (statusAtual.hp === 0 && hpMax > 0) statusAtual.hp = hpMax;
  if (statusAtual.sanidade === 0 && sanMax > 0) statusAtual.sanidade = sanMax;
  if (statusAtual.mana === 0 && manaMax > 0) statusAtual.mana = manaMax;

  atualizarBarra("hp");
  atualizarBarra("sanidade");
  atualizarBarra("mana");
}

function atualizarBarra(tipo) {
  const atual = statusAtual[tipo];
  const max = statusAtual.max[tipo] || 1;
  const percent = Math.min((atual / max) * 100, 100);

  const barra = document.getElementById(`${tipo}-bar`);
  const texto = document.getElementById(`${tipo}-value`);
  if (!barra || !texto) return;

  barra.style.width = `${percent}%`;
  texto.innerText = `${atual} / ${max}`;
}

function alterarStatus(tipo, delta, event) {
  if (event && event.ctrlKey) {
    delta *= 5; // se estiver segurando Ctrl, multiplica por 5
  }

  if (!statusAtual.max[tipo]) return;

  statusAtual[tipo] = Math.min(
    statusAtual.max[tipo],
    Math.max(0, statusAtual[tipo] + delta)
  );

  atualizarBarra(tipo);
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
  } else {
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

  atualizarMedidorPeso();
}

function atualizarMedidorPeso() {
  const container = document.getElementById('inventario-peso');
  if (!container) return;

  // Calcula peso atual
  const pesoAtual = inventario.reduce((acc, i) => acc + (i.espaco * i.quantidade), 0);

  // Calcula limite baseado na força
  const forca = parseInt(document.getElementById('forca')?.value) || 1;
  let limitePeso = 10;
  if (forca === 1) limitePeso = 10;
  else if (forca === 2) limitePeso = 15;
  else if (forca === 3) limitePeso = 20;
  else if (forca === 4) limitePeso = 25;
  else if (forca === 5) limitePeso = 30;
  else if (forca === 6) limitePeso = 40;
  else if (forca === 7) limitePeso = 50;
  else if (forca === 8) limitePeso = 60;
  else if (forca === 9) limitePeso = 75;
  else if (forca === 10) limitePeso = 80;
  else if (forca >= 11 && forca <= 15) limitePeso = 100;
  else if (forca >= 16 && forca <= 20) limitePeso = 120;
  else if (forca > 20) limitePeso = 120 + (forca - 20) * 20;

  const porcentagem = Math.min((pesoAtual / limitePeso) * 100, 100);
  const cor = porcentagem < 70 ? "#4CAF50" : porcentagem < 90 ? "#FF9800" : "#F44336";

  container.innerHTML = `
    <p><strong>Peso:</strong> ${pesoAtual} / ${limitePeso}</p>
    <div style="width:100%;background:#ddd;border-radius:6px;height:12px;overflow:hidden;">
      <div style="width:${porcentagem}%;height:12px;background:${cor};transition:width 0.3s;"></div>
    </div>
  `;
}

function adicionarItemInventario() {
  const nome = document.getElementById('item-nome').value.trim();
  const quantidade = parseInt(document.getElementById('item-quantidade').value) || 1;
  const espaco = parseInt(document.getElementById('item-espaco').value) || 1;
  const descricao = document.getElementById('item-descricao').value.trim();
  const miniaturaInput = document.getElementById('item-miniatura');
  let miniatura = "";

  if (!nome) return;

  const pesoAtual = inventario.reduce((acc, i) => acc + (i.espaco * i.quantidade), 0);
  const forca = parseInt(document.getElementById('forca')?.value) || 1;
  let limitePeso = 10;
  if (forca === 1) limitePeso = 10;
  else if (forca === 2) limitePeso = 15;
  else if (forca === 3) limitePeso = 20;
  else if (forca === 4) limitePeso = 25;
  else if (forca === 5) limitePeso = 30;
  else if (forca === 6) limitePeso = 40;
  else if (forca === 7) limitePeso = 50;
  else if (forca === 8) limitePeso = 60;
  else if (forca === 9) limitePeso = 75;
  else if (forca === 10) limitePeso = 80;
  else if (forca >= 11 && forca <= 15) limitePeso = 100;
  else if (forca >= 16 && forca <= 20) limitePeso = 120;
  else if (forca > 20) limitePeso = 120 + (forca - 20) * 20;

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

// ---------------------------
// SALVAR JSON (atualizado)
// ---------------------------
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
    // status: inclui current e max para cada recurso
    status: {
      current: {
        hp: statusAtual.hp,
        sanidade: statusAtual.sanidade,
        mana: statusAtual.mana
      },
      max: {
        hp: statusAtual.max.hp,
        sanidade: statusAtual.max.sanidade,
        mana: statusAtual.max.mana
      }
    },
    pericias: [],
    equipamentos: document.getElementById("equipamentos")?.value || "",
    magiasLivres: document.getElementById("magias")?.value || "",
    magiasSelecionadas: [],
    bencaos: document.getElementById("bencaos")?.value || "",
    defeitos: document.getElementById("defeitos")?.value || "",
    inventario: inventario.slice(),
    preview: document.getElementById("ficha-preview")?.innerHTML || ""
  };

  // atributos
  atributoInputs.forEach(input => {
    ficha.atributos[input.id] = input.value;
  });

  // pericias (preserva objeto arma se existir)
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

  // magias selecionadas
  document.querySelectorAll('.magia-select').forEach(select => {
    if (select.value) ficha.magiasSelecionadas.push(select.value);
  });

  const blob = new Blob([JSON.stringify(ficha, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Ficha_${(ficha.nome || "personagem").replace(/\s+/g, "_")}.json`;
  a.click();
}


// ---------------------------
// CARREGAR JSON (atualizado)
// ---------------------------
function carregarJSON() {
  const fileInput = document.getElementById("inputJson");
  const file = fileInput.files && fileInput.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function (e) {
    let dados;
    try {
      dados = JSON.parse(e.target.result);
    } catch (err) {
      alert("Arquivo JSON inválido.");
      return;
    }

    // campos básicos
    document.getElementById("nome").value = dados.nome || "";
    document.getElementById("idade").value = dados.idade || "";
    if (racaSelect) racaSelect.value = dados.raca || "";
    if (classeSelect) classeSelect.value = dados.classe || "";
    document.getElementById("origem").value = dados.origem || "";
    document.getElementById("sexo").value = dados.sexo || "";

    // atributos (se vierem)
    if (dados.atributos) {
      for (const nome in dados.atributos) {
        const input = document.getElementById(nome);
        if (input) input.value = dados.atributos[nome];
      }
    }

    // perícias
    periciaCheckboxes.forEach(cb => {
      cb.checked = false;
      if (cb.value === "Arma") {
        // procura arma no array (objeto) — compatibilidade com formato salvo
        const armaObj = Array.isArray(dados.pericias) ? dados.pericias.find(p => typeof p === "object" && p.nome === "Arma") : null;
        cb.checked = !!armaObj;
        const armaTipo = cb.parentElement.querySelector('.arma-tipo');
        if (armaTipo && armaObj) armaTipo.value = armaObj.tipo || "";
      } else {
        // se pericias veio como array de strings
        cb.checked = Array.isArray(dados.pericias) ? dados.pericias.includes(cb.value) : false;
      }
    });

    // textos livres
    document.getElementById("equipamentos").value = dados.equipamentos || "";
    document.getElementById("magias").value = dados.magiasLivres || "";
    document.getElementById("bencaos").value = dados.bencaos || "";
    document.getElementById("defeitos").value = dados.defeitos || "";

    // magias dinâmicas
    document.getElementById("magia-container").innerHTML = "";
    (dados.magiasSelecionadas || []).forEach(magia => adicionarCampoMagia(magia));

    // inventário
    inventario = Array.isArray(dados.inventario) ? dados.inventario : [];
    atualizarInventario();

    // pontos restantes (compat)
    if (pontosRestantesEl) pontosRestantesEl.textContent = dados.pontosRestantes || pontosRestantesEl.textContent || "";

    // --- Status: compatibilidade com formatos antigos e novo ---
    if (dados.status && typeof dados.status === "object") {
      // novo formato salvo pela função acima
      const cur = dados.status.current || {};
      const mx = dados.status.max || {};
      // atualiza máximos e atuais com segurança
      const hpMax = Number(mx.hp) || statusAtual.max.hp || 0;
      const sanMax = Number(mx.sanidade) || statusAtual.max.sanidade || 0;
      const manaMax = Number(mx.mana) || statusAtual.max.mana || 0;
      atualizarStatus(hpMax, sanMax, manaMax);

      // sobrescreve valores atuais somente se vierem valores numéricos
      if (Number.isFinite(Number(cur.hp))) statusAtual.hp = Number(cur.hp);
      if (Number.isFinite(Number(cur.sanidade))) statusAtual.sanidade = Number(cur.sanidade);
      if (Number.isFinite(Number(cur.mana))) statusAtual.mana = Number(cur.mana);
      atualizarBarra("hp");
      atualizarBarra("sanidade");
      atualizarBarra("mana");
    } else {
      // compatibilidade com formato antigo (hp / sanidade / mana como strings)
      // tenta extrair números caso venham no formato "X / Y" ou só "X"
      function extrairNum(str) {
        if (!str && str !== 0) return null;
        const s = String(str);
        const m = s.match(/(\d+)/);
        return m ? Number(m[1]) : null;
      }
      const hpOld = extrairNum(dados.hp);
      const sanOld = extrairNum(dados.sanidade);
      const manaOld = extrairNum(dados.mana);
      // se houver valores, atualiza máximos e atuais
      if (hpOld !== null || sanOld !== null || manaOld !== null) {
        // chamamos atualizarAtributos() primeiro para recomputar máximos
        atualizarAtributos();
        // se vier apenas um número, vamos assumir que é o máximo (compatibilidade)
        if (hpOld !== null) {
          statusAtual.max.hp = hpOld;
          statusAtual.hp = hpOld;
        }
        if (sanOld !== null) {
          statusAtual.max.sanidade = sanOld;
          statusAtual.sanidade = sanOld;
        }
        if (manaOld !== null) {
          statusAtual.max.mana = manaOld;
          statusAtual.mana = manaOld;
        }
        atualizarBarra("hp"); atualizarBarra("sanidade"); atualizarBarra("mana");
      } else {
        // Se não vier nada, apenas recalcula com base nos atributos
        atualizarAtributos();
      }
    }

    // atualiza componentes dependentes
    atualizarPericias();
    atualizarPreview();
  };
  reader.readAsText(file);
}

// ---------------------------
// GERAR PDF (atualizado)
// ---------------------------
function gerarPDF() {
  const { jsPDF } = window.jspdf || {};
  if (!jsPDF) {
    alert("Biblioteca jsPDF não encontrada. Verifique o <script> do jsPDF no HTML.");
    return;
  }

  const doc = new jsPDF({ unit: "mm", format: "a4" });

  const nome = document.getElementById("nome")?.value || "Personagem";
  const raca = document.getElementById("raca")?.value || "";
  const classe = document.getElementById("classe")?.value || "";
  const origem = document.getElementById("origem")?.value || "";
  const idade = document.getElementById("idade")?.value || "";
  const sexo = document.getElementById("sexo")?.value || "";

  let y = 15;
  const lineHeight = 7;
  const pageHeight = 290;
  const margin = 10;

  const addText = (text, x, yPos) => {
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, x, yPos);
    return yPos + lines.length * 6;
  };

  // Cabeçalho
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text("Ficha RE:Zero RPG", 70, y);
  y += 10;

  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  y = addText(`Nome: ${nome}`, margin, y);
  y = addText(`Idade: ${idade}    Sexo: ${sexo}`, margin, y);
  y = addText(`Raça: ${raca}    Classe: ${classe}    Origem: ${origem}`, margin, y);

  const addSectionTitle = (title) => {
    y += 6;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text(title, margin, y);
    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
  };

  // Atributos
  addSectionTitle("Atributos");
  atributoInputs.forEach(input => {
    const label = document.querySelector(`label[for="${input.id}"]`);
    y = addText(`${label ? label.textContent : input.id}: ${input.value}`, margin, y);
    if (y > pageHeight) { doc.addPage(); y = 20; }
  });

  // Status (usando statusAtual)
  addSectionTitle("Status");
  const hpText = `${statusAtual.hp} / ${statusAtual.max.hp}`;
  const sanText = `${statusAtual.sanidade} / ${statusAtual.max.sanidade}`;
  const manaText = `${statusAtual.mana} / ${statusAtual.max.mana}`;
  y = addText(`HP: ${hpText}`, margin, y);
  y = addText(`Sanidade: ${sanText}`, margin, y);
  y = addText(`Mana: ${manaText}`, margin, y);

  // Perícias
  const periciasSelecionadas = [];
  periciaCheckboxes.forEach(cb => {
    if (cb.checked) {
      if (cb.value === "Arma") {
        const armaTipo = cb.parentElement.querySelector(".arma-tipo");
        periciasSelecionadas.push(`Arma (${armaTipo ? armaTipo.value : ""})`);
      } else periciasSelecionadas.push(cb.value);
    }
  });
  if (periciasSelecionadas.length) {
    addSectionTitle("Perícias");
    y = addText(periciasSelecionadas.join(", "), margin, y);
  }

  // Magias
  const magiasSelecionadas = Array.from(document.querySelectorAll(".magia-select"))
    .map(sel => sel.value)
    .filter(v => v !== "");
  if (magiasSelecionadas.length) {
    addSectionTitle("Magias Selecionadas");
    magiasSelecionadas.forEach(m => y = addText(`- ${m}`, margin, y));
  }

  // Campos de texto
  const adicionarCampo = (titulo, id) => {
    const valor = document.getElementById(id)?.value.trim();
    if (valor) {
      addSectionTitle(titulo);
      y = addText(valor, margin, y);
    }
  };

  adicionarCampo("Equipamentos", "equipamentos");
  adicionarCampo("Magias Extras", "magias");
  adicionarCampo("Bençãos", "bencaos");
  adicionarCampo("Defeitos", "defeitos");

  // Inventário
  if (inventario.length) {
    addSectionTitle("Inventário");
    inventario.forEach(item => {
      const itemTexto = `- ${item.nome} x${item.quantidade} (${item.espaco} espaço${item.espaco > 1 ? "s" : ""})`;
      y = addText(itemTexto, margin, y);
      if (item.descricao) y = addText(`   ${item.descricao}`, margin + 5, y);
      if (y > pageHeight) { doc.addPage(); y = 20; }
    });
  }

  // Rodapé
  doc.setFontSize(10);
  doc.text(`Ficha gerada automaticamente em ${new Date().toLocaleDateString()}`, margin, 285);

  doc.save(`Ficha_${nome.replace(/\s+/g, "_")}.pdf`);
}

// ===== ⚙️ CONFIGURAÇÕES =====
const MAX_DICE_GROUP = 100;
const MAX_FACES = 1000;
const TEMPO_NOTIFICACAO = 8000; // ms

// ===== 🎲 FUNÇÃO PRINCIPAL DE ROLAGEM =====
function rolarDadoExpr(expressao, detalhado = true) {
  const regex = /(\d*)d(\d+)/gi;
  const detalhes = [];
  let exprMod = expressao;

  function substituir(match, qtdStr, facesStr) {
    const qtd = parseInt(qtdStr) || 1;
    const faces = parseInt(facesStr);

    // Limites de segurança
    if (qtd > MAX_DICE_GROUP || faces > MAX_FACES)
      throw new Error(`Limite: até ${MAX_DICE_GROUP} dados de d${MAX_FACES}`);

    const rolagens = Array.from({ length: qtd }, () => Math.floor(Math.random() * faces) + 1);
    detalhes.push([...rolagens].sort((a, b) => b - a));

    return String(rolagens.reduce((a, b) => a + b, 0));
  }

  exprMod = exprMod.replace(regex, substituir);

  let resultado;
  try {
    resultado = Function(`"use strict";return (${exprMod})`)();
  } catch {
    return null;
  }

  // Retorno simples
  if (!detalhado) {
    return { resultado, resultadoWOutEval: exprMod };
  }

  // Retorno detalhado
  const breakdown = detalhes.map(lst => `[${lst.join(", ")}]`).join(" + ");
  const diceGroup = expressao;
  return { resultado, resultadoWOutEval: breakdown || exprMod, dice_group: diceGroup };
}

// ===== 🔔 SISTEMA DE NOTIFICAÇÕES =====
function criarNotificacao(titulo, detalhe, total) {
  const container = document.getElementById("notificacoes");
  if (!container) return;

  const notif = document.createElement("div");
  notif.classList.add("notificacao");

  notif.innerHTML = `
    <div class="icone-dado"></div>
    <div class="conteudo">
      <h4>${titulo}</h4>
      <div class="detalhes">${detalhe}</div>
    </div>
    <div class="resultado">${total}</div>
    <span class="fechar">&times;</span>
  `;

  container.appendChild(notif);
  setTimeout(() => notif.classList.add("show"), 50);

  // botão fechar
  notif.querySelector(".fechar").addEventListener("click", () => fecharNotificacao(notif));

  // auto fechar
  setTimeout(() => fecharNotificacao(notif), TEMPO_NOTIFICACAO);
}

function fecharNotificacao(notif) {
  notif.classList.remove("show");
  setTimeout(() => notif.remove(), 300);
}

// ===== 🧮 CONTROLADOR DE ROLAGEM =====
function rolarDado() {
  const entrada = document.getElementById("expressaoDado").value.trim();
  const usuario = document.getElementById("nome")?.value || "Jogador";

  if (!entrada) {
    alert("Digite uma expressão de dado, ex: 2d6+3 ou 5#d10+2");
    return;
  }

  try {
    if (entrada.includes("#")) {
      const [qtdStr, dadoExpr] = entrada.split("#", 2);
      const qtd = parseInt(qtdStr) || 1;

      for (let i = 0; i < qtd; i++) {
        const r = rolarDadoExpr(dadoExpr, false);
        criarNotificacao(`${usuario} (${entrada})`, `[${r.resultadoWOutEval}]`, r.resultado);
      }
    } else {
      const r = rolarDadoExpr(entrada, true);
      if (!r) throw new Error("Expressão inválida!");
      criarNotificacao(`${usuario} (${entrada})`, r.resultadoWOutEval, r.resultado);
    }
  } catch (err) {
    criarNotificacao("❌ Erro na Rolagem", err.message, "—");
  }
  playSound("../images/roll_dice.mp3");
}

// ===== 🚀 INICIALIZAÇÃO =====
document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("rolarDado");
  if (btn) btn.addEventListener("click", rolarDado);
});

// ===== 🧠 Mapeamento de perícias e atributos =====
const periciaAtributos = {
  "Acrobacia": ["agilidade"],
  "Adestramento": ["carisma", "mana"],
  "Atletismo": ["agilidade", "forca"],
  "Atuação": ["carisma"],
  "Conhecimento": ["inteligencia"],
  "Crime": ["inteligencia"],
  "Diplomacia": ["inteligencia", "carisma"],
  "Enganação": ["carisma"],
  "Fortitude": ["resistencia"],
  "Furtividade": ["agilidade"],
  "Iniciativa": ["agilidade"],
  "Intimidação": ["carisma"],
  "Intuição": ["deteccao"],
  "Investigação": ["deteccao"],
  "Luta": ["forca"],
  "Magia de Água": ["mana"],
  "Magia de Fogo/Gelo": ["mana"],
  "Magia de Terra": ["mana"],
  "Magia de Vento": ["mana"],
  "Magia de Luz": ["mana"],
  "Magia de Trevas": ["mana"],
  "Arma": ["forca"], // depende, mas default
  "Medicina": ["inteligencia"],
  "Atualidades": ["inteligencia"],
  "Pontaria": ["agilidade"],
  "Criação": ["inteligencia"],
  "Nobreza": ["carisma"],
  "Reflexos": ["agilidade"],
  "Percepção": ["deteccao"],
  "Tática": ["inteligencia"],
  "Sobrevivência": ["inteligencia", "resistencia"],
  "Vontade": ["inteligencia", "resistencia"],
  "Negociação": ["inteligencia", "carisma"],
  "Explosivos": ["agilidade"],
  "Linguagem": ["inteligencia"],
  "Contratante": ["mana"],
  "Runas": ["mana"],
  "Maldições": ["mana"],
  "Psychokinesis": ["inteligencia"],
  "Pilotagem": ["agilidade"]
};

function rolarPericia(nomePericia) {
  const atributos = periciaAtributos[nomePericia] || [];
  if (atributos.length === 0) {
    criarNotificacao("❌ Erro", `Perícia '${nomePericia}' sem atributo definido`, "—");
    return;
  }

  // Calcula a média dos atributos associados
  let soma = 0;
  atributos.forEach(attr => {
    const el = document.getElementById(attr.toLowerCase());
    soma += el ? parseInt(el.value) || 0 : 0;
  });
  const atributoMedio = soma / atributos.length;

  // Verifica se é treinada
  const periciaTreinada = Array.from(periciaCheckboxes).some(cb => cb.checked && cb.value === nomePericia);
  const bonus = periciaTreinada ? 5 : 0;

  // ===== 🎲 Cálculo de quantidade de dados =====
  // Treinadas começam com 1 dado base, não treinadas com 0
  let dadosRolados = (periciaTreinada ? 1 : 0) + Math.floor(atributoMedio / 5);
  let modo = "melhor";

  // Se tiver 0 ou menos dados → rola com desvantagem
  if (dadosRolados <= 0) {
    modo = "pior";
    dadosRolados = Math.abs(dadosRolados) + 2; // ex: 0→2, -1→3, -2→4...
  }

  // ===== 🎯 Rola os dados =====
  const resultados = Array.from({ length: dadosRolados }, () => Math.floor(Math.random() * 20) + 1);

  let resultadoBase;
  if (modo === "melhor") {
    resultadoBase = Math.max(...resultados);
  } else {
    resultadoBase = Math.min(...resultados);
  }

  const resultadoFinal = resultadoBase + bonus;

  playSound("../images/roll_dice.mp3");
  // ===== 🧾 Exibe notificação =====
  criarNotificacao(
    `${nomePericia} (${periciaTreinada ? "Treinada" : "Não Treinada"})`,
    `[${resultados.join(", ")}] ${modo === "melhor" ? "→" : "→"} +${bonus}`,
    resultadoFinal
  );
}

// ===== 🧷 Adiciona os botões de rolar =====
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("#pericias label").forEach(label => {
    const input = label.querySelector("input[type='checkbox']");
    if (!input) return;

    const pericia = input.value;
    if (!label.querySelector(".botao-rolar")) {
      const img = document.createElement("img");
      img.src = "../images/dice-icon.png";
      img.classList.add("botao-rolar");
      img.alt = "Rolar";
      img.width = 16;
      img.height = 16;
      img.style.cursor = "pointer";
      img.style.marginLeft = "6px";

      // Impede o clique de afetar o checkbox
      img.addEventListener("click", (ev) => {
        ev.stopPropagation();  // ← evita alternar o checkbox
        ev.preventDefault();
        rolarPericia(pericia);
      });

      label.appendChild(img);
    }
  });
});

document.querySelectorAll('.bar-btn').forEach(btn => {
  btn.addEventListener('click', ev => ev.preventDefault());
});

// ===== 🧩 Sincronização de atributos com SVG =====
document.querySelectorAll(".atributo-input").forEach((input) => {
  input.addEventListener("input", () => {
    const mapa = {
      forca: "val-FOR",
      agilidade: "val-AGI",
      carisma: "val-CAR",
      inteligencia: "val-INT",
      manaAttr: "val-MAN",
      resistencia: "val-RES",
      sorte: "val-SOR",
      deteccao: "val-DET",
    };
    const alvoId = mapa[input.id];
    if (alvoId) {
      const t = document.getElementById(alvoId);
      if (t) t.textContent = input.value || "1";
    }
  });
});

// ===== 🛠️ Alternar modo de edição de atributos no SVG =====
(() => {
  const btn = document.getElementById("toggle-edicao-atributos");
  const inputs = document.querySelectorAll(".atributo-input");
  const mapa = {
    forca: "val-FOR",
    agilidade: "val-AGI",
    carisma: "val-CAR",
    inteligencia: "val-INT",
    manaAttr: "val-MAN",
    resistencia: "val-RES",
    sorte: "val-SOR",
    deteccao: "val-DET",
  };
  let modoEdicao = false;

  if (!btn) return; // evita erro se o botão não existir ainda

  btn.addEventListener("click", () => {
  modoEdicao = !modoEdicao;

  // Define os SVGs inline
  const svgPencil = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71
               7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003
               1.003 0 0 0-1.42 0l-1.83 1.83 3.75
               3.75 1.84-1.82z"/>
    </svg>`;

  const svgCheck = `
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="rgba(255, 255, 255, 1)" viewBox="0 0 24 24">
      <path d="M9 16.17L4.83 12l-1.42
               1.41L9 19l12-12-1.41-1.41z"/>
    </svg>`;

  // Alterna ícone e cor de fundo
  btn.innerHTML = modoEdicao ? svgCheck : svgPencil;
  btn.style.background = modoEdicao ? "rgba(72, 187, 120, 0)" : "transparent";

  // Lógica de ativar edição
  Object.entries(mapa).forEach(([idInput, idText]) => {
    const t = document.getElementById(idText);
    if (!t) return;
    if (modoEdicao) {
      t.style.cursor = "pointer";
      t.addEventListener("click", editarValor);
    } else {
      t.style.cursor = "default";
      t.removeEventListener("click", editarValor);
    }
  });
});

  function editarValor(e) {
    const target = e.target;
    const idSvg = target.id;
    const inputId = Object.keys(mapa).find((k) => mapa[k] === idSvg);
    const input = document.getElementById(inputId);
    if (!input) return;

    const valorAtual = input.value || 1;
    const novo = prompt(
      `Novo valor para ${inputId.replace(/Attr/, "")}:`,
      valorAtual
    );
    if (novo !== null && !isNaN(parseInt(novo))) {
      input.value = parseInt(novo);
      target.textContent = novo;
      input.dispatchEvent(new Event("input"));
    }
  }
})();

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
  atualizarAtributos();
  atualizarPreview();
  atualizarInventario();
  atualizarMedidorPeso();
});