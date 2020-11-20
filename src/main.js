// SIDEBAR
const starredIdeasContainer = document.querySelector('.js-starred-ideas');
const showStarredButton = document.querySelector('.js-starred-button');
const menuButton = document.querySelector('.js-menu-icon');

// CARD FORM
const cardForm = document.querySelector(".js-card-form");
const cardTitle = document.querySelector(".js-card-form-title");
const cardBody = document.querySelector(".js-card-form-body");
const saveButton = document.querySelector('.js-save-button');
const searchInput = document.querySelector('.js-search');

// CARDS
const cards = document.querySelector('.js-cards');

// OVERLAY AND MODAL
const overlay = document.querySelector('.js-modal-overlay');
const modalContent = document.querySelector('.js-modal-content');
const modalCloseButton = document.querySelector('.js-modal-close-button');

// COMMENT FORM
const commentTextarea = document.querySelector('.js-comment-textarea');
const addCommentButton = document.querySelector('.js-add-comment-button');
const commentsContainer = document.querySelector('.js-comments');

// ************ EVENT LISTENERS ************

// COMMENTS
const emptyHTML = `<li class="comment-empty-state js-comment-empty-state"><p class="empty-state">No comments...</p></li>`

// PAGE RELOAD
window.addEventListener('load', handlePageLoad);

// CARD FORM
saveButton.addEventListener('click', handleSaveBtnClick);

// CARDS
cards.addEventListener('click', handleCardClick);
cardForm.addEventListener('keyup', monitorCardFormFields);
showStarredButton.addEventListener('click', handleShowStarredClick);
searchInput.addEventListener('keyup', handleSearch);

// MODAL/OVERLAY
modalCloseButton.addEventListener('click', hideModal);
overlay.addEventListener('click', hideModal);

// COMMENT
commentTextarea.addEventListener('keyup', monitorCommentField);
addCommentButton.addEventListener('click', handleAddCommentClick);
commentsContainer.addEventListener('click', handleDeleteCommentClick);

// MENU
menuButton.addEventListener('click', toggleMenuOpenState);

// LIVE LIST OF PAGE IDEAS
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
  return new Idea(cardTitle.value, cardBody.value, Date.now());
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
    <footer class="card-footer js-card-comment">
      <img src="assets/comment.svg" alt="Comment icon" class="js-card-comment">
      <p class="js-card-comment">Comment</p>
    </footer>
  </div>`
}

// FORM VALIDATION

function monitorCardFormFields() {
  if (cardTitle.value && cardBody.value) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}

// RELOAD PAGE AND DISPLAY IDEAS

function handlePageLoad() {
  populateIdeasArray();
  displayCards(ideas);
}

function populateIdeasArray() {
  if (!localStorage.getItem('ideas')) return;

  ideas = JSON.parse(localStorage.getItem('ideas'))
  ideas = ideas.map(idea => new Idea(idea.title, idea.body, idea.id, idea.star, populateCommentsArray(idea.comments)));
}

function populateCommentsArray(comments) {
  return comments.map(comment => new Comment(comment.id, comment.content));
}

function displayCards(ideas) {
  ideas.forEach(idea => {
    const ideaHTML = createCardHTML(idea.title, idea.body, idea.id, idea.star);
    cards.insertAdjacentHTML('beforeend', ideaHTML);
  });
}

// MENU
function toggleMenuOpenState() {
  if (starredIdeasContainer.classList.contains('hide')) {
    starredIdeasContainer.classList.remove('hide');
    menuButton.src = 'assets/menu-close.svg';
  } else {
    starredIdeasContainer.classList.add('hide');
    menuButton.src = 'assets/menu.svg';
  }
}

// FAVORITE IDEA

function handleCardClick(e) {
  const classes = e.target.classList;

  if (classes.contains('js-favorite-icon')) favoriteCard(e);
  if (classes.contains('js-delete-icon')) deleteIdea(e);
  if (classes.contains('js-card-comment')) handleCardCommentClick(e);
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
  updateDisplayedCards(starredIdeas, filteredStatus);
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

  idea.deleteFromStorage(ideaIdx);
  deleteFromIdeas(ideaIdx);
  removeCard(e);
 }

 function deleteFromIdeas(idx) {
  ideas.splice(idx, 1);
 }

 function removeCard(e) {
   e.target.closest('.card').remove();
 }
 
 // SEARCH
 function handleSearch(e) {
   const searchString = e.target.value;
   const matchingIdeas = filterBySearchString(searchString);
   clearCards();
   displayCards(matchingIdeas);
 }
 
 function filterBySearchString(searchString) {
   return ideas.filter(idea => (`${idea.title} ${idea.body}`).includes(searchString));
 }

// MODAL

function showModal() {
  overlay.classList.remove('hide');
}

function hideModal(e) {
  if (e.target === overlay || e.target === modalCloseButton) {
    overlay.classList.add('hide');
  }  
}

// COMMENT
function handleCardCommentClick(e) {
  const id = findId(e);
  const idea = findIdea(id);
  showModal();
  updateIdeaId(id);
  displayComments(idea);
  commentTextarea.focus();
}

function updateIdeaId(id) {
  modalContent.dataset.ideaId = id;
}

function displayComments(idea) {
  commentsContainer.textContent = '';

  if (!idea.comments.length) {
    commentsContainer.insertAdjacentHTML('beforeend', emptyHTML);
    return;
  }

  idea.comments.forEach(comment => {
    commentsContainer.insertAdjacentHTML('beforeend', createCommentHTML(comment));
  });
}

function handleAddCommentClick(e) {
  e.preventDefault();
  
  const ideaId = findCommentIdeaId(e);
  const idea = findIdea(ideaId);
  const newComment = createComment();
  
  idea.comments.push(newComment);
  appendComment(newComment);
  newComment.saveToStorage(idea);
  
  commentTextarea.value = '';
  addCommentButton.disabled = true;
}

function createComment() {
  const commentContent = commentTextarea.value;
  return new Comment(Date.now(), commentContent);
}

function appendComment(comment) {
  removeCommentEmptyState();

  const commentHTML = createCommentHTML(comment);
  commentsContainer.insertAdjacentHTML('beforeend', commentHTML);
}

function createCommentHTML(comment) {
  return `
    <li class="comment" data-id="${comment.id}">
      <p>${comment.content}</p>
      <img src="../assets/delete-active.svg" class="js-delete-comment" alt="delete icon">
    </li>`;
}

function removeCommentEmptyState() {
  const commentEmptyState = document.querySelector('.js-comment-empty-state');

  if (commentEmptyState) {
    commentEmptyState.remove();
  }
}

function monitorCommentField(e) {
  if (e.target.value) {
    addCommentButton.disabled = false;
  } else {
    addCommentButton.disabled = true;
  }
}

function handleDeleteCommentClick(e) {
  if (e.target.classList.contains('js-delete-comment')) {
    const ideaId = findCommentIdeaId(e);
    const idea = findIdea(ideaId);
    const ideaIdx = findIdx(ideaId);
    const commentId = findCommentId(e);
    const comment = findComment(idea, commentId);
    const commentIdx = findCommentIdx(idea, commentId);
    
    deleteComment(idea, commentIdx);
    removeComment(e);
    addCommentEmptyState(idea);
    comment.deleteFromStorage(ideaIdx, commentIdx);
  }
}

function deleteComment(idea, commentIdx) {
  idea.comments.splice(commentIdx, 1);
}

function removeComment(e) {
  e.target.parentElement.remove();
}

function addCommentEmptyState(idea) {
  if (!idea.comments.length) {
    commentsContainer.insertAdjacentHTML('beforeend', emptyHTML);
  }
}

// HELPERS
function findId(e) {
  return +e.target.closest('.card').dataset.id;
}

function findIdea(id) {
  return ideas.find(idea => idea.id === id);
}

function findIdx(id) {
  return ideas.findIndex(idea => idea.id === id);
}

function clearCards() {
  cards.textContent = '';
}

function findCommentIdeaId(e) {
 return +e.target.closest('.js-modal-content').dataset.ideaId;
}

function findCommentId(e) {
  return +e.target.parentElement.dataset.id;
}

function findComment(idea, commentId) {
  return idea.comments.find(comment => comment.id === commentId);
}

function findCommentIdx(idea, commentId) {
  return idea.comments.findIndex(comment => comment.id === commentId);
}