/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
  name: "Ederson Villalba",
  photo: "images/profile_photo.jpg",
  favoriteFoods: [
    'Lasagna',
    'Pizza',
    'Hamburger',
    'Chicken Rice',
    'Hot dog'
  ],
  hobbies: [
    "Video games",
    "Anime",
    "Programming"
  ],
  placesLived: []
}

/* Populate Profile Object with placesLive objects */
myProfile.placesLived.push(
  {
    place: 'Bolivar, Venezuela',
    length: '27 years'
  },
  {
    place: 'Caracas, Venezuela',
    length: '2 years'
  }
);

/* DOM Manipulation - Output */

/* Name */
document.getElementById('name').textContent = myProfile.name;

/* Photo with attributes */
document.getElementById('photo').src = myProfile.photo;
document.getElementById('photo').alt = myProfile.name;

/* Favorite Foods List*/
myProfile.favoriteFoods.forEach((food) => {
  let liElement = document.createElement('li');
  liElement.textContent = food;
  document.getElementById('favorite-foods').appendChild(liElement);
});

/* Hobbies List */
myProfile.hobbies.forEach((hobbie) => {
  let liElement = document.createElement('li');
  liElement.textContent = hobbie;
  document.querySelector('#hobbies').appendChild(liElement);
});

/* Places Lived DataList */
myProfile.placesLived.forEach((item) => {
  let dtElement = document.createElement('dt');
  dtElement.textContent = item.place;

  let ddElement = document.createElement('dd');
  ddElement.textContent = item.length;

  document.querySelector('#places-lived').append(dtElement, ddElement);
});

