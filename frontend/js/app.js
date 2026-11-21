const API = 'http://127.0.0.1:4000';
const $ = s => document.querySelector(s);
const $$ = s => document.querySelectorAll(s);

let settings = {};
let allProducts = [];
let activeCategory = 'all';

async function load() {
  try {
    const [settingsRes, catsRes, prodsRes] = await Promise.all([
      fetch(`${API}/api/settings`),
      fetch(`${API}/api/categories`),
      fetch(`${API}/api/products`)
    ]);
    
    settings = await settingsRes.json();
    const cats = await catsRes.json();
    allProducts = await prodsRes.json();

    if (settings) {
      if($('#hoursBadge')) $('#hoursBadge').textContent = settings.openingHours || 'Horário não informado';
      if($('#addressBadge')) $('#addressBadge').textContent = settings.address || 'Endereço não informado';
      if($('#infoHorario')) $('#infoHorario').textContent = settings.openingHours || 'Consulte no WhatsApp';
      if($('#infoEndereco')) $('#infoEndereco').textContent = settings.address || 'Consulte no WhatsApp';
    }

    const tabs = $('#categoryTabs');
    if (tabs) {
      tabs.innerHTML = `<button class="active" data-cat="all">Todos</button>` +
        cats.map(c => `<button data-cat="${c._id}">${c.name}</button>`).join('');

      tabs.querySelectorAll('button').forEach(b => {
        b.onclick = () => {
          $$('#categoryTabs button').forEach(x => x.classList.remove('active'));
          b.classList.add('active');
          activeCategory = b.dataset.cat;
          render();
        };
      });
    }

    render();
  } catch (err) {
    console.error("ERRO:", err);
    if($('#menuList')) $('#menuList').innerHTML = `<p class="empty" style="color:red;">Erro de conexão com o servidor. Verifique se o backend está ligado.</p>`;
  }
}

function render() {
  const grid = $('#menuList');
  if (!grid) return;

  const inputSearch = $('#searchInput');
  const term = inputSearch ? inputSearch.value.toLowerCase() : '';
  
  let list = allProducts;
  if (activeCategory !== 'all') list = list.filter(p => p.category?._id === activeCategory);
  if (term) list = list.filter(p => p.name.toLowerCase().includes(term));

  if (!list.length) { 
    grid.innerHTML = '<p class="empty">Nenhum produto encontrado nesta categoria.</p>'; 
    return; 
  }

  grid.innerHTML = list.map(p => {
    const catName = p.category ? p.category.name : 'Cardápio';
    
    let additionsHtml = '';
    if (p.additions && p.additions.length > 0) {
      additionsHtml = `
        <div class="card-additions">
          <span>Adicionais:</span>
          ${p.additions.map(a => `<small>+ ${a.name} (R$ ${a.price.toFixed(2).replace('.', ',')})</small>`).join('')}
        </div>
      `;
    }
    
    return `
    <div class="menu-card ${p.unavailable ? 'unavailable' : ''}">
      <div class="menu-card-img">
        ${p.imageUrl ? `<img src="${p.imageUrl}" alt="${p.name}">` : '<div class="placeholder">🍢</div>'}
        ${p.featured ? '<span class="badge-featured">⭐ DESTAQUE</span>' : ''}
        ${p.unavailable ? '<span class="badge-unavailable">🚫 ESGOTADO</span>' : ''}
      </div>
      
      <div class="menu-card-body">
        <div class="card-header">
          <h3>${p.name}</h3>
          <div class="card-price">R$ ${p.price.toFixed(2).replace('.', ',')}</div>
        </div>
        <p>${p.description || 'Preparado na brasa com todo carinho.'}</p>
        ${additionsHtml}
        <div class="card-tag">${catName}</div>
      </div>
    </div>`;
  }).join('');
}

if($('#searchInput')) $('#searchInput').oninput = render;

load();