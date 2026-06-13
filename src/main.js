import './style.css';
import { supabase } from './supabase.js';

let currentUser = null;

const articlesContainer = document.getElementById('articles-container');
const btnAdd = document.getElementById('btn-add');
const btnAuth = document.getElementById('btn-auth');
const articleModal = document.getElementById('article-modal');
const articleForm = document.getElementById('article-form');
const modalTitle = document.getElementById('modal-title');
const btnCloseModal = document.getElementById('btn-close-modal');

async function checkUser() {
  const { data: { session } } = await supabase.auth.getSession();
  currentUser = session ? session.user : null;
  
  if (currentUser) {
    btnAuth.textContent = 'Wyloguj';
    btnAuth.className = 'bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer';
  } else {
    btnAuth.textContent = 'Logowanie';
    btnAuth.className = 'bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 cursor-pointer';
  }
}
async function fetchArticles() {
  const { data: articles, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return console.error(error);

  articlesContainer.innerHTML = '';
  articles.forEach(article => {
    const dateObj = new Date(article.created_at);
    const dateFormatted = dateObj.toLocaleDateString('pl-PL');
    const isoDate = dateObj.toISOString().split('T')[0];

    const articleEl = document.createElement('article');
    articleEl.className = 'bg-white rounded-xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow duration-200 max-w-full break-words';
    
    articleEl.innerHTML = `
      <div>
        <h2 class="text-xl font-bold text-slate-900 mb-1 leading-snug">${article.title}</h2>
        <h3 class="text-sm font-medium text-slate-400 mb-3">${article.subtitle}</h3>
        <p class="text-xs text-slate-500 mb-4 flex flex-wrap gap-1 items-center">
          <span>Napisano dnia:</span>
          <time datetime="${isoDate}" class="font-semibold text-slate-600">${dateFormatted}</time>
          <span>przez</span>
          <address class="inline not-italic font-semibold text-slate-700">${article.author}</address>
        </p>
        <p class="text-slate-600 text-sm leading-relaxed whitespace-pre-line">${article.content}</p>
      </div>
      <div class="mt-6 flex gap-2 justify-end actions-panel"></div>
    `;

    if (currentUser) {
      const actionsPanel = articleEl.querySelector('.actions-panel');
      
      const btnEdit = document.createElement('button');
      btnEdit.type = 'button';
      btnEdit.className = 'bg-amber-50 hover:bg-amber-100 text-amber-700 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors duration-200 cursor-pointer';
      btnEdit.textContent = 'Edytuj';
      btnEdit.addEventListener('click', () => openModalForEdit(article));

      const btnDelete = document.createElement('button');
      btnDelete.type = 'button';
      btnDelete.className = 'bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-md text-xs font-semibold transition-colors duration-200 cursor-pointer';
      btnDelete.textContent = 'Usuń';
      btnDelete.addEventListener('click', () => deleteArticle(article.id));

      actionsPanel.appendChild(btnEdit);
      actionsPanel.appendChild(btnDelete);
    }

    articlesContainer.appendChild(articleEl);
  });
}

function openModalForAdd() {
  if (!currentUser) {

    window.location.href = './login/index.html';
    return;
  }
  modalTitle.textContent = 'Dodaj nowy artykuł';
  articleForm.reset();
  document.getElementById('article-id').value = '';
  articleModal.classList.remove('hidden');
}

function openModalForEdit(article) {
  modalTitle.textContent = 'Edytuj artykuł';
  document.getElementById('article-id').value = article.id;
  document.getElementById('input-title').value = article.title;
  document.getElementById('input-subtitle').value = article.subtitle;
  document.getElementById('input-author').value = article.author;
  document.getElementById('input-content').value = article.content;
  articleModal.classList.remove('hidden');
}

function closeModal() {
  articleModal.classList.add('hidden');
}

async function handleFormSubmit(e) {
  e.preventDefault();
  const id = document.getElementById('article-id').value;
  const payload = {
    title: document.getElementById('input-title').value,
    subtitle: document.getElementById('input-subtitle').value,
    author: document.getElementById('input-author').value,
    content: document.getElementById('input-content').value,
    created_at: new Date().toISOString() // Data zawsze aktualizowana na bieżącą
  };

  if (id) {
    await supabase.from('articles').update(payload).eq('id', id);
  } else {
    await supabase.from('articles').insert([payload]);
  }

  closeModal();
  fetchArticles();
}

async function deleteArticle(id) {
  if (confirm('Czy na pewno chcesz bezpowrotnie usunąć ten artykuł?')) {
    await supabase.from('articles').delete().eq('id', id);
    fetchArticles(); // Automatyczne odświeżenie listy po usunięciu (Wymóg profesora)
  }
}
btnAuth.addEventListener('click', async () => {
  if (currentUser) {
    await supabase.auth.signOut();
    window.location.reload();
  } else {

    window.location.href = './login/index.html';
  }
});

btnAdd.addEventListener('click', openModalForAdd);
btnCloseModal.addEventListener('click', closeModal);
articleForm.addEventListener('submit', handleFormSubmit);

(async () => {
  await checkUser();
  await fetchArticles();
})();