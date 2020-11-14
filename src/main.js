const cardForm = document.querySelector(".js-card-form");
const cardTitle = document.querySelector(".js-card-form-title");
const cardBody = document.querySelector(".js-card-form-body");
const saveButton = document.querySelector('.js-save-button');
const cards = document.querySelector('.js-cards');

let ideas = [];

function createIdea(e) {
  const title = cardTitle.value;
  const body = cardBody.value;
  return new Idea(title, body);
}
  
function saveIdea(e) {
  e.preventDefault();
  const idea = createIdea();

  idea.saveToStorage();
  ideas.push(idea);
}

function deleteIdea(id) {
 const idea = ideas.find(idea => idea.id === id);
 const ideaIdx = ideas.findIndex(idea => idea.id === id);
 ideas.splice(ideaIdx, 1);
 idea.deleteFromStorage();
}

function displayIdea() {
  const title = cardTitle.value;
  const body = cardBody.value;
  const ideaHTML = createCardHTML(title, body);
  cards.insertAdjacentHTML('beforeend', ideaHTML);
}

function createCardHTML(title, body) {
  return `<div class="card">
    <header class="card-header js-card-header">
      <img src="./assets/star.svg" class="js-favorite-icon" alt="Star icon">
      <img src="./assets/delete.svg" class="js-delete-icon" alt="Delete icon">
    </header>
    <section class="card-body">
      <h2>${title}</h2>
      <p>${body}</p>
    </section>
    <footer class="card-footer">
      <img src="assets/comment.svg" alt="Comment icon">
      <p>Comment</p>
    </footer>
  </div>
  `
}

function handlePageLoad() {
  populateIdeasArray();
  displayCards();
}

function displayCards() {
  ideas.forEach(idea => {
    const ideaHTML = createCardHTML(idea.title, idea.body);
    cards.insertAdjacentHTML('beforeend', ideaHTML);
  });
}

function populateIdeasArray() {
  const localStorageIdeas = localStorage.getItem('ideas');
  
  if (!localStorageIdeas) {
    ideas = [];
  } else {
    ideas = JSON.parse(localStorage.getItem('ideas'));
  }
}

function handleSaveBtnClick(e) {
  saveIdea(e);
  displayIdea();
  cardForm.reset();
  saveButton.disabled = true;
}

function monitorCardFields() {
  if (cardTitle.value.length && cardBody.value.length) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}

function handleCardClick(e) {
  const classes = e.target.classList;

  if (classes.contains('js-favorite-icon')) {
    favoriteCard(e);
  }
  
  if (classes.contains('js-delete-icon')) {
    console.log('delete');
  }
}

function favoriteCard(e) {
  toggleFavoriteIcon(e);
}

function toggleFavoriteIcon(e) {
  if (e.target.src.includes('active')) {
    e.target.src = "../assets/star.svg";
  } else {
    e.target.src = "../assets/star-active.svg";
  }
}

window.addEventListener('load', handlePageLoad);
saveButton.addEventListener('click', handleSaveBtnClick);
cardForm.addEventListener('keyup', monitorCardFields);
cards.addEventListener('click', handleCardClick);
