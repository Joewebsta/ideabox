const cardForm = document.querySelector(".js-card-form");
const cardTitle = document.querySelector(".js-card-form-title");
const cardBody = document.querySelector(".js-card-form-body");
const saveButton = document.querySelector('.js-save-button');
const cards = document.querySelector('.js-cards');
const showStarredButton = document.querySelector('.js-starred-button');

let ideas = [];

// SAVE AND DISPLAY IDEA

function handleSaveBtnClick(e) {
  e.preventDefault();

  const idea = createIdea();
  saveIdea(idea);
  displayIdea(idea);
  cardForm.reset();
  saveButton.disabled = true;
}

function createIdea() {
  const title = cardTitle.value;
  const body = cardBody.value;
  const id = Date.now();
  return new Idea(title, body, id);
}

function saveIdea(idea) {
  ideas.push(idea);
  idea.saveToStorage();
}

function displayIdea(idea) {
  const ideaHTML = createCardHTML(idea.title, idea.body, idea.id, idea.star);
  cards.insertAdjacentHTML('beforeend', ideaHTML);
}

function createCardHTML(title, body, id, star) {
  const iconName = star ? '-active': ''
  
  return `<div class="card" data-id="${id}">
    <header class="card-header js-card-header">
      <img src="./assets/star${iconName}.svg" class="js-favorite-icon" alt="Star icon">
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
  displayCards(ideas);
}

function populateIdeasArray() {
  const localStorageIdeas = localStorage.getItem('ideas');
  
  if (!localStorageIdeas) {
    ideas = [];
  } else {
    ideas = JSON.parse(localStorage.getItem('ideas'));
    ideas = ideas.map(idea => new Idea(idea.title, idea.body, idea.id, idea.star));
  }
}

function displayCards(ideas) {
  ideas.forEach(idea => {
    const ideaHTML = createCardHTML(idea.title, idea.body, idea.id, idea.star);
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
    deleteIdea(e);
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

// FILTER BY FAVORITES
function handleShowStarredClick() {
  const starredIdeas = filterIdeasByStarred();
  const filteredStatus = showStarredButton.dataset.filtered;

  clearCards();
  updateFilteredAttr(filteredStatus);
  updateStarredBtnText(filteredStatus);
  updateDisplayedCards(starredIdeas, filteredStatus)
}

function filterIdeasByStarred() {
  return ideas.filter(idea => idea.star); 
}

function updateFilteredAttr(filteredStatus) {
  showStarredButton.dataset.filtered = (filteredStatus === 'false') ? 'true' : 'false';
}

function updateStarredBtnText(filteredStatus) {
  showStarredButton.textContent = (filteredStatus === 'false') ? 'Show All Ideas' : 'Show Starred Ideas'; ;
}

function updateDisplayedCards(starredIdeas, filteredStatus) {
  if (filteredStatus === 'false') {
    displayCards(starredIdeas);
  } else {
    displayCards(ideas);
  }
}

// DELETE IDEA

function deleteIdea(e) {
  const id = findId(e);
  const idea = findIdea(id); 
  const ideaIdx = findIdx(id);

  idea.deleteFromStorage();
  deleteFromIdeas(ideaIdx);
  removeCard(e);
 }

 function deleteFromIdeas(idx) {
  ideas.splice(idx, 1);
 }

 function removeCard(e) {
   e.target.closest('.card').remove();
 }

// FORM VALIDATION

function monitorCardFields() {
  if (cardTitle.value.length && cardBody.value.length) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}

// HELPERS
function findId(e) {
  return +e.target.closest('.card').dataset.id;
}

function findIdea(ident) {
  return ideas.find(idea => idea.id === ident);
}

function findIdx(id) {
  return ideas.findIndex(idea => idea.id === id);
}

function clearCards() {
  cards.textContent = '';
}

saveButton.addEventListener('click', handleSaveBtnClick);
window.addEventListener('load', handlePageLoad);
cards.addEventListener('click', handleCardClick);
cardForm.addEventListener('keyup', monitorCardFields);
showStarredButton.addEventListener('click', handleShowStarredClick)