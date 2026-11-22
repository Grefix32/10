const STORAGE_KEY = 'selectedLanguage';

const resources = {
  uk: {
    translation: {
      title: 'Каталог книг',
      langLabel: 'Мова:',
      found: 'Знайдено записів:'
    }
  },
  en: {
    translation: {
      title: 'Book Catalog',
      langLabel: 'Language:',
      found: 'Items found:'
    }
  }
};

const catalogItems = [
  { uk: 'Кобзар – Тарас Шевченко', en: 'Kobzar – Taras Shevchenko' },
  { uk: 'Лісова пісня – Леся Українка', en: 'The Forest Song – Lesya Ukrainka' },
  { uk: 'Тигролови – Іван Багряний', en: 'Tiger Trappers – Ivan Bahrianyi' }
];

const modal = document.getElementById('language-modal');
const catalogPage = document.getElementById('catalog-page');
const languageSelector = document.getElementById('language-selector');
const catalogList = document.getElementById('catalog-list');
const statusEl = document.getElementById('status');

function updateContent() {
  const lang = i18next.language;
  document.documentElement.lang = lang;
  document.getElementById('title').textContent = i18next.t('title');
  document.getElementById('lang-label').textContent = i18next.t('langLabel');
  languageSelector.value = lang;

  catalogList.replaceChildren();
  for (const item of catalogItems) {
    const li = document.createElement('li');
    li.textContent = item[lang];
    catalogList.append(li);
  }

  statusEl.textContent = `${i18next.t('found')} ${catalogItems.length}`;
}

function initPage(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  modal.hidden = true;
  catalogPage.hidden = false;

  i18next.init(
    {
      lng: lang,
      resources
    },
    (err) => {
      if (err) return console.error(err);
      updateContent();
    }
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem(STORAGE_KEY);

  if (savedLang) {
    initPage(savedLang);
  } else {
    modal.hidden = false;
  }

  modal.querySelectorAll('button[data-lang]').forEach((button) => {
    button.addEventListener('click', () => {
      initPage(button.dataset.lang);
    });
  });

  languageSelector.addEventListener('change', function () {
    const selectedLanguage = this.value;
    localStorage.setItem(STORAGE_KEY, selectedLanguage);
    i18next.changeLanguage(selectedLanguage, updateContent);
  });
});
