// script.js

// Variáveis para controle dos atributos
const totalPontos = 15;
const atributoInputs = document.querySelectorAll('.atributo-input');
const pontosRestantesEl = document.getElementById('pontos-restantes');

// Elementos dos status calculados
const hpEl = document.getElementById('hp');
const sanidadeEl = document.getElementById('sanidade');
const manaCalcEl = document.getElementById('manaCalc');

// Elementos para perícias
const maxPericiasEl = document.getElementById('max-pericias');
const periciaCheckboxes = document.querySelectorAll('#pericias input[type="checkbox"]');

// Atualiza os pontos restantes e os status computados
function atualizarAtributos() {
  let soma = 0;
  atributoInputs.forEach(input => {
    soma += parseInt(input.value) || 0;
  });
  // Cada atributo inicia com 1; portanto, a soma base é 8.
  const pontosUsados = soma - 8;
  const restantes = totalPontos - pontosUsados;
  pontosRestantesEl.textContent = restantes >= 0 ? restantes : 0;

  // Atualiza status: HP, Sanidade e Mana
  const resistencia = parseInt(document.getElementById('resistencia').value) || 1;
  hpEl.textContent = resistencia * 3; // Exemplo: HP = Resistência * 3

  const inteligencia = parseInt(document.getElementById('inteligencia').value) || 1;
  sanidadeEl.textContent = 50 + (inteligencia * 5); // Exemplo: Sanidade base 50 + (Inteligência * 5)
  
  const manaAttr = parseInt(document.getElementById('manaAttr').value) || 1;
  manaCalcEl.textContent = manaAttr * 2; // Exemplo: Mana = Mana attribute * 2

  // Atualiza o número máximo de perícias permitidas = Inteligência + 3
  maxPericiasEl.textContent = inteligencia + 3;
}

// Adiciona event listeners aos inputs de atributo
atributoInputs.forEach(input => {
  input.addEventListener('change', atualizarAtributos);
});
atualizarAtributos();

// Controle de seleção de perícias: não permitir mais do que o permitido
function atualizarPericias(event) {
  const inteligencia = parseInt(document.getElementById('inteligencia').value) || 1;
  const maxAllowed = inteligencia + 3;
  const checked = document.querySelectorAll('#pericias input[type="checkbox"]:checked');
  if (checked.length > maxAllowed) {
    event.target.checked = false;
    alert(`Você só pode selecionar até ${maxAllowed} perícias.`);
  }
}

// Adiciona event listeners aos checkboxes de perícias
periciaCheckboxes.forEach(checkbox => {
  checkbox.addEventListener('change', atualizarPericias);
});

// Função para gerar o PDF usando jsPDF
function gerarPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
  
    const nome = document.getElementById("nome").value;
    const raca = document.getElementById("raca").value;
    const classe = document.getElementById("classe").value;
    const origem = document.getElementById("origem").value;
  
    const line = (txt, y) => { doc.text(txt, 10, y); return y + 8; };
  
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    let y = 15;
    doc.text("Ficha RE:Zero RPG", 70, y);
    y += 10;
  
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    y = line(`Nome: ${nome}`, y);
    y = line(`Raça: ${raca}    Classe: ${classe}    Origem: ${origem}`, y);
  
    // Atributos
    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Atributos", 10, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    atributoInputs.forEach(input => {
      y = line(`${input.dataset.nome}: ${input.value}`, y);
    });
  
    // Status
    y += 5;
    doc.setFont("helvetica", "bold");
    doc.text("Status", 10, y);
    doc.setFont("helvetica", "normal");
    y += 7;
    y = line(`HP: ${hpEl.textContent}`, y);
    y = line(`Sanidade: ${sanidadeEl.textContent}`, y);
    y = line(`Mana: ${manaCalcEl.textContent}`, y);
  
    // Perícias
    y += 5;
    const periciasSelecionadas = Array.from(document.querySelectorAll('#pericias input[type="checkbox"]:checked')).map(cb => cb.value);
    if (periciasSelecionadas.length) {
      doc.setFont("helvetica", "bold");
      doc.text("Perícias", 10, y);
      doc.setFont("helvetica", "normal");
      y += 7;
      let linha = "";
      periciasSelecionadas.forEach((p, i) => {
        linha += p + (i < periciasSelecionadas.length - 1 ? ", " : "");
        if (linha.length > 80) {
          y = line(linha, y);
          linha = "";
        }
      });
      if (linha) y = line(linha, y);
    }
  
    // Magias selecionadas
    // Magias selecionadas
const magiasSelecionadas = Array.from(document.querySelectorAll('#magia-container .magia-select'))
.map(sel => sel.value).filter(v => v !== '');
if (magiasSelecionadas.length) {
y += 5;
doc.setFont("helvetica", "bold");
doc.text("Magias Selecionadas", 10, y);
doc.setFont("helvetica", "normal");
y += 7;
magiasSelecionadas.forEach(m => {
  y = line(`- ${m}`, y);
});
}

  
    // Equipamentos
    const equipamentos = document.getElementById("equipamentos").value;
    if (equipamentos.trim()) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Equipamentos", 10, y);
      doc.setFont("helvetica", "normal");
      y += 7;
      const lines = doc.splitTextToSize(equipamentos, 180);
      lines.forEach(l => y = line(l, y));
    }
  
    // Magias livres
    const magiasLivres = document.getElementById("magias").value;
    if (magiasLivres.trim()) {
      y += 5;
      doc.setFont("helvetica", "bold");
      doc.text("Magias Extras", 10, y);
      doc.setFont("helvetica", "normal");
      y += 7;
      const lines = doc.splitTextToSize(magiasLivres, 180);
      lines.forEach(l => y = line(l, y));
    }
  
    doc.save(`Ficha_${nome || "personagem"}.pdf`);
  }
  

const magiasPrimeiroCirculo = [
    "Buff Elemental",
    "Armadura Elemental",
    "Wind Arrow",
    "Fura",
    "Wind Bust",
    "Dona",
    "Dona Ataque",
    "Earth Seal",
    "Earth Sword",
    "Tuch Rock",
    "Fire Sword",
    "Fire Territory",
    "Goa",
    "Artes de Gelo",
    "Ice Crystal",
    "Água Corrente",
    "Magia de Cura",
    "Lar do Lagarto Aquático",
    "Levitação Corporal",
    "Camuflagem das trevas",
    "Shamak",
    "Minya",
    "Jiwald",
    "Akra",
    "Sabre de Luz"
  ];

let contadorMagias = 0;
let contadorMagiasID = 0; // apenas pra ID única do elemento

const magiasInfo = {
    "Buff Elemental": "Custo: 3 mana | Efeito: +1 dado no elemento",
    "Armadura Elemental": "Custo: 3 mana | Efeito: +1 resistência ao elemento",
    "Wind Arrow": "Custo: 3 mana | Dano: 1d8 perfuração",
    "Fura": "Custo: 3 mana | Dano: 2d4 corte",
    "Wind Bust": "Custo: 3 mana | Efeito: +3m deslocamento",
    "Dona": "Custo: 3 mana | Defesa: parede com 15 HP",
    "Dona Ataque": "Custo: 3 mana | Dano: 1d6",
    "Earth Seal": "Custo: 3 mana | Efeito: prende no chão (teste de Reflexos/Fortitude)",
    "Earth Sword": "Custo: 3 mana | Dano: depende da arma",
    "Tuch Rock": "Custo: 3 mana | Dano: 1d6",
    "Fire Sword": "Custo: 3 mana | Dano: 1d4 + queimadura",
    "Fire Territory": "Custo: 3 mana | Área: queimadura por 3 turnos",
    "Goa": "Custo: 3 mana | Dano: 1d4 (par = queimadura)",
    "Artes de Gelo": "Custo: 3 mana | Dano: 1d6 + 1d4",
    "Ice Crystal": "Custo: 3 mana | Dano: 1d4 (par = queimadura)",
    "Água Corrente": "Custo: 3 mana | Cura: 1d4 por 1d4+1 turnos",
    "Magia de Cura": "Custo: 3 mana | Cura: 1d8",
    "Lar do Lagarto Aquático": "Custo: 3 mana | Defesa: 15 HP de água",
    "Levitação Corporal": "Custo: 3 mana | Efeito: levitação (2m)",
    "Camuflagem das trevas": "Custo: 3 mana | Efeito: corta o invisível/atravessa objetos",
    "Shamak": "Custo: 3 mana | Efeito: inimigo perde visão ou audição (1d3 turnos)",
    "Minya": "Custo: 3 mana | Dano: 1d6 + 1d4",
    "Jiwald": "Custo: 3 mana | Dano: 1d8 luz",
    "Akra": "Custo: 3 mana | Efeito: objeto mais leve",
    "Sabre de Luz": "Custo: 3 mana | Dano: 1d10"
  };
  
  function atualizarPreviewMagia(select) {
    const container = select.closest('.magia-select-group');
    const preview = container.querySelector('.preview-magia');
    const magia = select.value;
    preview.textContent = magiasInfo[magia] || "";
  }
  

function adicionarCampoMagia(valor = "") {
    contadorMagias++;
    const container = document.getElementById('magia-container');
  
    const div = document.createElement('div');
    div.classList.add('magia-select-group');
    div.innerHTML = `
      <label for="magia-${contadorMagias}">Magia ${contadorMagias}:</label>
      <div class="magia-row">
        <select id="magia-${contadorMagias}" name="magiasSelecionadas" class="magia-select" onchange="atualizarPreviewMagia(this)">
          <option value="">Selecione...</option>
          ${magiasPrimeiroCirculo.map(m => `<option value="${m}">${m}</option>`).join('')}
        </select>
        <button type="button" class="remover-magia" onclick="removerMagia(this)">✖</button>
      </div>
      <div class="preview-magia" style="font-size: 0.9em; color: #aaa; margin-top: 4px;"></div>
    `;
  
    container.appendChild(div);
  
    // Se veio pré-carregada
    if (valor) {
      const select = div.querySelector("select");
      select.value = valor;
      atualizarPreviewMagia(select);
    }
  }
  

  function removerMagia(botao) {
    const linha = botao.closest('.magia-select-group');
    if (linha) {
      linha.remove();
      atualizarNumeracaoMagias();
    }
  }

  function atualizarNumeracaoMagias() {
    const grupos = document.querySelectorAll('.magia-select-group');
    grupos.forEach((grupo, index) => {
      const label = grupo.querySelector('label');
      if (label) {
        label.textContent = `Magia ${index + 1}:`;
      }
    });
  }  
  
function salvarJSON() {
    const ficha = {
      nome: document.getElementById("nome").value,
      raca: document.getElementById("raca").value,
      classe: document.getElementById("classe").value,
      origem: document.getElementById("origem").value,
      atributos: {},
      pericias: [],
      equipamentos: document.getElementById("equipamentos").value,
      magiasLivres: document.getElementById("magias").value,
      magiasSelecionadas: []
    };
  
    // Atributos
    atributoInputs.forEach(input => {
      ficha.atributos[input.dataset.nome] = input.value;
    });
  
    // Perícias
    document.querySelectorAll('#pericias input[type="checkbox"]:checked').forEach(cb => {
      ficha.pericias.push(cb.value);
    });
  
    // Magias selecionadas
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
  
  function carregarJSON() {
    const fileInput = document.getElementById("inputJson");
    const file = fileInput.files[0];
    if (!file) return;
  
    const reader = new FileReader();
    reader.onload = function (e) {
      const dados = JSON.parse(e.target.result);
  
      document.getElementById("nome").value = dados.nome || "";
      document.getElementById("raca").value = dados.raca || "";
      document.getElementById("classe").value = dados.classe || "";
      document.getElementById("origem").value = dados.origem || "";
  
      // Atributos
      for (const nome in dados.atributos) {
        const input = Array.from(atributoInputs).find(i => i.dataset.nome === nome);
        if (input) input.value = dados.atributos[nome];
      }
  
      // Perícias
      document.querySelectorAll('#pericias input[type="checkbox"]').forEach(cb => {
        cb.checked = dados.pericias.includes(cb.value);
      });
  
      // Equipamentos e magias livres
      document.getElementById("equipamentos").value = dados.equipamentos || "";
      document.getElementById("magias").value = dados.magiasLivres || "";
  
      // Magias Selecionadas
      document.getElementById("magia-container").innerHTML = "";
      dados.magiasSelecionadas.forEach(magia => {
        adicionarCampoMagia();
        const selects = document.querySelectorAll('.magia-select');
        selects[selects.length - 1].value = magia;
      });
  
      atualizarAtributos();
    };
    reader.readAsText(file);
  }
  