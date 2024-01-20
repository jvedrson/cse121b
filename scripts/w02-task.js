/* W02-Task - Profile Home Page */

/* Step 1 - Setup type tasks - no code required */

/* Step 2 - Variables */
const fullName = "Ederson Villalba";
const currentYear = new Date().getFullYear();
const profilePicture = 'images/profile_photo.jpg';

/* Step 3 - Element Variables */
const nameElement = document.getElementById("name");
const foodElement = document.getElementById("food");
const yearElement = document.querySelector('#year');
const imageElement = document.querySelector("img")

/* Step 4 - Adding Content */
nameElement.innerHTML = `<strong>${fullName}</strong>`;
yearElement.textContent = currentYear;
imageElement.setAttribute("src", profilePicture);
imageElement.setAttribute("alt", `Profile image of ${fullName}`);

/* Step 5 - Array */
const favoriteFoods = ['Lasagna', 'Pizza', 'Hamburger', 'Chicken Rice'];
foodElement.innerHTML = favoriteFoods;
const singleFavoriteFood = 'Hot dog';
favoriteFoods.push(singleFavoriteFood);
foodElement.innerHTML += `<br>${favoriteFoods}`;
favoriteFoods.shift();
foodElement.innerHTML += `<br>${favoriteFoods}`;
favoriteFoods.pop();
foodElement.innerHTML += `<br>${favoriteFoods}`;



