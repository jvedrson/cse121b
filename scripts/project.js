// Constant
const API_URL = 'https://rickandmortyapi.com/api/character';

// Function to Call Endpoint
async function callEndpoint({ url = API_URL, params = undefined }) {
  try {
    const response = params ? await fetch(url + '?' + new URLSearchParams(params)) : await fetch(url);
    if (response.ok) {
      return await response.json();
    }
    return [];
  } catch (err) {
    console.log('API: connection now allowed!')
    console.error(err)
  }
}

// Card Element
const cardCharacterElement = ({ name = '', image = '', status = '', gender = '', species = '', origin }) => {
  let statusColor = status == 'Alive' ? 'green' : status == 'Dead' ? 'red' : 'gray';
  let genderColor = gender == 'Male' ? 'blue' : gender == 'Female' ? 'yellow' : 'gray';

  return `<div
    class="grid gap-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="${image}" target="_blank"><img class="rounded-t-lg" src="${image}" alt="${name}" /><a/>
    <div class="p-5">
      <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${name}</h5>
      <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">
        Status: 
        <span class="font-normal ${status.toLowerCase() == 'unknown' ? 'line-through' : ''} text-${statusColor}-700 dark:text-${statusColor}-400">
          ${status}
        </span>
      </p>
      <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">
        Species: 
        <span class="font-normal ${species.toLowerCase() == 'unknown' ? 'line-through' : ''}">
          ${species}
        </span>
      </p>
      <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">
        Gender: 
        <span class="font-normal ${gender.toLowerCase() == 'unknown' ? 'line-through' : ''} text-${genderColor}-700 dark:text-${genderColor}-400">
          ${gender}
        </span>
      </p>
      <p class="mb-3 font-bold text-gray-700 dark:text-gray-400">
        Origin: 
        <span class="font-normal ${origin.name.toLowerCase() == 'unknown' ? 'line-through' : ''}">
          ${origin.name}
        </span>
      </p>
    </div>
  </div>`;
}

// Pagination: Number Pages
const numberPageElement = (numberPage, currentPage) => (`<button type="button" onclick="drawElements('${API_URL}?page=${numberPage}')" class="flex items-center justify-center px-4 h-10 leading-tight ${numberPage == currentPage ? 'text-white bg-blue-700' : 'text-gray-700 bg-white'} border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">${numberPage}</button>`);

// Pagination: Build Element
const paginationElement = ({ prev, next, pages }) => {
  if (pages <= 1)
    return;

  const prevBtn = `<div class="flex">
  <button type="button" ${!prev ? 'disabled' : ''} onclick="drawElements('${prev ? prev : ''}')" class="flex items-center justify-center px-4 h-10 me-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${!prev ? 'cursor-not-allowed' : ''}">
    <svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/>
    </svg>
    Previous
  </button>`;

  const nextBtn = `<button type="button" ${!next ? 'disabled' : ''} onclick="drawElements('${next ? next : ''}')" class="flex items-center justify-center px-4 h-10 ml-3 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${!next ? 'cursor-not-allowed' : ''}">
      Next
      <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
      </svg>
    </button>
  </div>`;

  let htmlPages = '';
  let count = 0;
  const totalPages = Number(pages);
  const nextPage = Number(next?.split('&')[0].split('?page=')[1]) || 0;
  const currentPage = nextPage == 0 ? totalPages : nextPage - 1;

  const startFrom = (totalPages <= 10) ? 1 : (currentPage >= 10) ? currentPage - 5 : 1;

  for (let nPage = startFrom; nPage <= totalPages; nPage++) {
    count++;
    htmlPages += numberPageElement(nPage, currentPage);
    if (count > 10) break;
  }

  return prevBtn + htmlPages + nextBtn;
}

let globalStatus = 'all';
let globalSearch = '';

async function drawElements(url = undefined) {
  // Hide search delete icon
  document.querySelectorAll('.box-search-delete').forEach(box => box.classList.add('hidden'));
  // Show loading message
  document.getElementById('box-message').innerHTML = '<h3 class="font-bold text-xl text-green-500">Loading ...</h3>';
  // Clear Elements
  document.getElementById('characters').innerHTML = '';
  document.getElementById('pagination').innerHTML = '';
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
      document.querySelector('#pagination').innerHTML += pagination;
  } else {
    document.getElementById('box-message').innerHTML = '<h3 class="font-bold text-xl text-red-500">404 Not Found</h3>';
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
