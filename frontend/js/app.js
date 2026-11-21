const API = window.API_URL || 'https://espetinho-miranda-api.onrender.com';
const $ = s => document.querySelector(s);

let allProducts = [];
let allCategories = [];
let activeCategory = 'all';

const fmt = (val) => {
  const num = Number(val);
  return isNaN(num) ? '0,00' : num.toFixed(2).replace('.', ',');
};

function getCategoryIcon(name) {
  const n = name.toLowerCase();
  if (n.includes('espetinho') || n.includes('espeto')) return 'fa-drumstick-bite';
  if (n.includes('cerveja') || n.includes('chopp')) return 'fa-beer-mug-empty';
  if (n.includes('dose') || n.includes('whisky') || n.includes('vodka') || n.includes('cachaça')) return 'fa-whiskey-glass';
  if (n.includes('copo') || n.includes('copão')) return 'fa-wine-glass';
  if (n.includes('bebida') || n.includes('refrigerante') || n.includes('suco') || n.includes('água')) return 'fa-bottle-water';
  if (n.includes('porcao') || n.includes('porção')) return 'fa-bowl-food';
  if (n.includes('combo')) return 'fa-star';
  if (n.includes('sobremesa') || n.includes('doce')) return 'fa-ice-cream';
  return 'fa-utensils';
}

async function load() {
  try {
    const [catsRes, prodsRes] = await Promise.all([
      fetch(`${API}/api/categories`),
      fetch(`${API}/api/products`)
    ]);
    
    allCategories = await catsRes.json();
    allProducts = await prodsRes.json();

    renderCategories();
    render();
  } catch (err) {
    console.error("ERRO:", err);
    $('#menuList').innerHTML = `<p style="color:red; text-align:center; padding: 20px;">Erro de conexão com o servidor.</p>`;
  }
}

function renderCategories() {
  const tabs = $('#categoryTabs');
  if (!tabs) return;

  tabs.innerHTML = `
    <button class="active" data-cat="all"><i class="fa-solid fa-fire"></i> Todos</button>
    ${allCategories.map(c => {
      const iconClass = getCategoryIcon(c.name);
      return `<button data-cat="${c._id}"><i class="fa-solid ${iconClass}"></i> ${c.name}</button>`;
    }).join('')}
  `;

  tabs.querySelectorAll('button').forEach(b => {
    b.onclick = () => {
      tabs.querySelectorAll('button').forEach(x => x.classList.remove('active'));
      b.classList.add('active');
      activeCategory = b.dataset.cat;
      
      // Limpa a barra de pesquisa ao trocar de categoria
      const inputSearch = $('#searchInput');
      if (inputSearch) inputSearch.value = '';
      
      const catName = b.textContent.trim();
      $('#currentCategoryTitle').innerHTML = `<i class="fa-solid fa-utensils"></i> ${catName}`;
      
      render();
    };
  });
}

function render() {
  const grid = $('#menuList');
  if (!grid) return;

  const inputSearch = $('#searchInput');
  const term = inputSearch ? inputSearch.value.toLowerCase().trim() : '';
  
  let list = allProducts;

  // LÓGICA NOVA: Se estiver pesquisando, busca em TUDO. Se não, filtra pela categoria.
  if (term) {
    list = list.filter(p => p.name.toLowerCase().includes(term));
    // Muda o título para "Resultados da busca" para o cliente saber
    $('#currentCategoryTitle').innerHTML = `<i class="fa-solid fa-search"></i> Resultados: "${term}"`;
  } else {
    // Se não estiver pesquisando, aplica o filtro de categoria normal
    if (activeCategory !== 'all') {
      list = list.filter(p => p.category?._id === activeCategory);
    }
    // Restaura o título da categoria
    const activeBtn = document.querySelector('#categoryTabs button.active');
    if (activeBtn) {
      $('#currentCategoryTitle').innerHTML = `<i class="fa-solid fa-utensils"></i> ${activeBtn.textContent.trim()}`;
    } else {
       $('#currentCategoryTitle').innerHTML = `<i class="fa-solid fa-utensils"></i> Cardápio`;
    }
  }

  if (!list.length) { 
    grid.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:20px;">Nenhum produto encontrado.</p>'; 
    return; 
  }

  grid.innerHTML = list.map(p => {
    const imgHtml = p.imageUrl 
      ? `<div class="product-img"><img src="${p.imageUrl}" alt="${p.name}"></div>` 
      : `<div class="product-img"><i class="fa-solid fa-utensils"></i></div>`;

    let additionsHtml = '';
    if (p.additions && Array.isArray(p.additions) && p.additions.length > 0) {
      additionsHtml = `
        <div class="card-additions">
          <span>Adicionais:</span>
          ${p.additions.map(a => `<small>+ ${a.name} (R$ ${fmt(a.price)})</small>`).join('')}
        </div>
      `;
    }
    
    return `
    <div class="product-card ${p.unavailable ? 'unavailable' : ''}">
      ${imgHtml}
      <div class="product-info">
        <h3>${p.name}</h3>
        <p>${p.description || 'Preparado na brasa com todo carinho.'}</p>
        <div class="price">R$ ${fmt(p.price)}</div>
        ${additionsHtml}
      </div>
      ${p.featured ? '<span class="badge-featured"> DESTAQUE</span>' : ''}
      ${p.unavailable ? '<span class="badge-unavailable"> ESGOTADO</span>' : ''}
    </div>`;
  }).join('');
}

// Evento da barra de pesquisa
if($('#searchInput')) {
  $('#searchInput').addEventListener('input', render);
}

load();