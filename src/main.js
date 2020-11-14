const cardForm = document.querySelector(".js-card-form");
const cardTitle = document.querySelector(".js-card-form-title");
const cardBody = document.querySelector(".js-card-form-body");
const saveButton = document.querySelector('.js-save-button');
const cards = document.querySelector('.js-cards');

let ideas = [];

// SAVE AND DISPLAY IDEA

function handleSaveBtnClick(e) {
  saveIdea(e);
  displayIdea();
  cardForm.reset();
  saveButton.disabled = true;
}

function saveIdea(e) {
  e.preventDefault();
  const idea = createIdea();

  idea.saveToStorage();
  ideas.push(idea);
}

function createIdea(e) {
  const title = cardTitle.value;
  const body = cardBody.value;
  return new Idea(title, body);
}

function displayIdea() {
  const title = cardTitle.value;
  const body = cardBody.value;
  const ideaHTML = createCardHTML(title, body);
  cards.insertAdjacentHTML('beforeend', ideaHTML);
}

function createCardHTML(title, body, id) {
  return `<div class="card" data-id="${id}">
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
  </div>`
}  

// RELOAD PAGE AND DISPLAY IDEAS

function handlePageLoad() {
  populateIdeasArray();
  displayCards();
}

function populateIdeasArray() {
  const localStorageIdeas = localStorage.getItem('ideas');
  
  if (!localStorageIdeas) {
    ideas = [];
  } else {
    ideas = JSON.parse(localStorage.getItem('ideas'));
    ideas = ideas.map(idea => new Idea(idea.title, idea.body, idea.id,));
  }
}

function displayCards() {
  ideas.forEach(idea => {
    const ideaHTML = createCardHTML(idea.title, idea.body, idea.id);
    cards.insertAdjacentHTML('beforeend', ideaHTML);
  });
}


// FAVORITE IDEA

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
  
  const id = +e.target.closest('.card').dataset.id;
  const idea = ideas.find(idea => idea.id === id);
  idea.star = !idea.star;
  idea.updateIdea('star', idea.star);
}

function toggleFavoriteIcon(e) {
  if (e.target.src.includes('active')) {
    e.target.src = "../assets/star.svg";
  } else {
    e.target.src = "../assets/star-active.svg";
  }
}

// DELETE IDEA

function deleteIdea(id) {
  const idea = ideas.find(idea => idea.id === id);
  const ideaIdx = ideas.findIndex(idea => idea.id === id);
  ideas.splice(ideaIdx, 1);
  idea.deleteFromStorage();
 }

// FORM VALIDATION

function monitorCardFields() {
  if (cardTitle.value.length && cardBody.value.length) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}

saveButton.addEventListener('click', handleSaveBtnClick);
window.addEventListener('load', handlePageLoad);
cards.addEventListener('click', handleCardClick);
cardForm.addEventListener('keyup', monitorCardFields);
