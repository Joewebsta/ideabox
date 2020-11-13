const cardForm = document.querySelector(".js-card-form");
const cardTitle = document.querySelector(".js-card-form-title");
const cardBody = document.querySelector(".js-card-form-body");
const saveButton = document.querySelector('.js-save-button');

let ideas = [];

function createIdea(e) {
  const title = cardTitle.value;
  const body = cardBody.value;
  return new Idea(title, body);
}
  
function handleSaveClick(e) {
  e.preventDefault();

  createIdea().saveToStorage();
  cardForm.reset();
}

saveButton.addEventListener('click', handleSaveClick);