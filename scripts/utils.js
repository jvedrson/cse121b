import { drawElements } from './project_module.js';

// Constants
export const API_URL = 'https://rickandmortyapi.com/api/character';
export const emptyData = '<h3 class="font-bold text-xl text-red-500">404 Not Found</h3>';
export const loadingData = '<h3 class="font-bold text-xl text-green-500">Loading ...</h3>';

// Function to Call Endpoint
export const callEndpoint = async ({url = API_URL, params = undefined}) => {
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

// Create a card Element HMTL
export const cardCharacterElement = ({ name = '', image = '', status = '', gender = '', species = '', origin}) => {
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

function createButtonElement ({
  color = 'gray',
  bgColor = 'white',
  hoverBgColor = 'gray',
  hoverColor = 'gray',
  disabled = false,
  innerHTML,
  callback
}) {
  const btn = document.createElement('button');
  let btnClass = `flex items-center justify-center px-4 h-10 me-1 text-base font-medium text-${color}-500 bg-${bgColor} border border-${color}-300 rounded-lg hover:bg-${hoverBgColor}-100 hover:text-${hoverColor}-700 dark:bg-${bgColor}-800 dark:border-${color}-700 dark:text-${color}-400 dark:hover:bg-${hoverBgColor}-700 dark:hover:text-white ${disabled ? 'cursor-not-allowed' : ''}`.split(" ").filter(i => i);
  btn.classList.add(...btnClass);
  btn.type = 'button';
  btn.disabled = disabled;
  btn.innerHTML = innerHTML;
  btn.addEventListener('click', callback);

  return btn;
}


// Pagination: Build Element
export const paginationElement = ({ prev, next, pages }) => {
  if (pages <= 1)
    return;
  
  let count = 0;
  const totalPages = Number(pages);
  const nextPage = Number(next?.split('&')[0].split('?page=')[1]) || 0;
  const currentPage = nextPage == 0 ? totalPages : nextPage - 1;

  const startFrom = (totalPages <= 10) ? 1 : (currentPage >= 10) ? currentPage - 5 : 1;

  const divContainer = document.createElement('div');
  divContainer.classList.add('flex');

  // Prev Buttions
  divContainer.appendChild(
    createButtonElement({
      innerHTML: `<svg class="w-3.5 h-3.5 me-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4"/></svg>Previous`,
      callback: () => drawElements(prev ? prev : undefined),
      disabled: !prev ? true : false
    })
  );

  // Buttons Page
  for (let nPage = startFrom; nPage <= totalPages; nPage++) {
    count++;

    divContainer.appendChild(
      createButtonElement({
        innerHTML: nPage,
        callback: () => drawElements(`${API_URL}?page=${nPage}`),
        color: nPage == currentPage ? 'white' : 'gray',
        bgColor: nPage == currentPage ? 'blue-700' : 'white'
      })
    );

    if (count > 10) break;
  }

  // Next Button
  divContainer.appendChild(
    createButtonElement({
      innerHTML: `Next <svg class="w-3.5 h-3.5 ms-2 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10"><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/></svg>`,
      callback: () => drawElements(prev ? prev : undefined),
      disabled: !next ? true : false
    })
  );

  return divContainer;
}
