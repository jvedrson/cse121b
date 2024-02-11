/* W05: Programming Tasks */

/* Declare and initialize global variables */
const templesElement = document.getElementById('temples');
let templeList = [];
/* async displayTemples Function */
const displayTemples = (temples) => {
  const templesSorted = temples.sort((prev, next) => prev.templeName.localeCompare(next.templeName)); // # Stretch sort by name option #1
  // const templesSorted = temples.sort(sortTemplesByName); // # Stretch sort by name option #2
  templesSorted.forEach(temple => {
    let articleElement = document.createElement('article');
    
    let h3Element = document.createElement('h3');
    h3Element.textContent = temple.templeName;
    
    let imgElement = document.createElement('img');
    imgElement.src = temple.imageUrl;
    imgElement.alt = temple.location;
    
    articleElement.append(h3Element, imgElement);

    templesElement.appendChild(articleElement);
  });
}

/* async getTemples Function using fetch()*/
const getTemples = async () => {
  const response = await fetch('https://byui-cse.github.io/cse121b-ww-course/resources/temples.json');
  templeList = await response.json();
  displayTemples(templeList);
}

/* reset Function */
const reset = () => templesElement.innerHTML = '';

/* filterTemples Function */
const filterTemples = (temples) => {
  reset();
  const filter = document.querySelector('#filtered').value;

  switch (filter) {
    case "utah":
      const utahTempleList = temples.filter((temple) => temple.location.includes('Utah'));
      displayTemples(utahTempleList);
      break;
    case "notutah":
      const notutahTempleList = temples.filter((temple) => !temple.location.includes('Utah'));
      displayTemples(notutahTempleList);
      break;
    case "older":
      const olderTempleList = temples.filter((temple) => {
        const dedicated = new Date(temple.dedicated);
        const compareDate = new Date(1950, 0, 1);
        return compareDate > dedicated;
      });
      displayTemples(olderTempleList);
      break;
    case "all":
      displayTemples(temples);
      break;
    default:
      break;
  }

}

getTemples();

/* Event Listener */
document.querySelector('#filtered').addEventListener('change', () => filterTemples(templeList));

/* Stretch function: sort by name option #2 */
const sortTemplesByName = (prev, next) => {
  const prevName = prev.templeName.toUpperCase();
  const nextName = next.templeName.toUpperCase();

  if (prevName > nextName) return 1;
  if (prevName < nextName) return -1;
  
  return 0;
}



