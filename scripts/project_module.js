import { callEndpoint, cardCharacterElement, paginationElement, emptyData, loadingData } from './utils.js';

let globalStatus = 'all';
let globalSearch = '';

export async function drawElements(url = undefined) {
  // Hide search delete icon
  document.querySelectorAll('.box-search-delete').forEach(box => box.classList.add('hidden'));
  // Clear Elements
  document.getElementById('characters').innerHTML = '';
  document.getElementById('pagination').innerHTML = '';
  // Show loading message
  document.getElementById('box-message').innerHTML = loadingData;
  // Keep search value
  document.querySelectorAll('.search-navbar').forEach(searchElement => searchElement.value = globalSearch);

  let params = {};
  let page = undefined;

  if (url)
    page = url.split('&')[0].split('page=')[1];

  if (page)
    params.page = page;

  if (globalSearch != '') {
    params.name = globalSearch;
    // Show search delete icon
    document.querySelectorAll('.box-search-delete').forEach(box => box.classList.remove('hidden'));
  }

  if (globalStatus != '' && globalStatus != 'all')
    params.status = globalStatus;

  // Retrieve data from API
  const characters = await callEndpoint({ params });

  if (characters && characters.results && characters.results.length) {
    // Remove loading message
    document.getElementById('box-message').innerHTML = '';
    // Draw characters
    for (const [_, character] of Object.entries(characters.results)) {
      document.getElementById('characters').innerHTML += cardCharacterElement(character);
    }
    // Draw pagination
    const pagination = paginationElement(characters.info);
    if (pagination)
      document.querySelector('#pagination').appendChild(pagination);
  } else {
    document.getElementById('box-message').innerHTML = emptyData;
  }

}


drawElements();

/* 
  Events Listeners
 */

document.querySelectorAll('.search-navbar').forEach(searchElement => {
  searchElement.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
      const search = e.target.value;
      if (globalSearch != search) {
        globalSearch = search;
        drawElements();
      }
    }
  });
});

document.querySelectorAll('.search-status').forEach(searchElement => {
  searchElement.addEventListener('click', function (e) {
    const status = this.dataset.status;
    if (globalStatus != status) {
      globalStatus = status;
      drawElements();
      document.getElementById('status_selected').textContent = String(status).charAt(0).toUpperCase() + String(status).slice(1);
    }
  });
});

document.querySelectorAll('.search-delete').forEach(searchElement => {
  searchElement.addEventListener('click', function (e) {
    if (globalSearch != '') {
      globalSearch = '';
      drawElements();
    }
  });
});
