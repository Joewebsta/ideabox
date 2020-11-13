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
  
function saveIdea(e) {
  e.preventDefault();
  const idea = createIdea();

  idea.saveToStorage();
  ideas.push(idea);

  cardForm.reset();
}

function deleteIdea(id) {
 const idea = ideas.find(idea => idea.id === id);
 const ideaIdx = ideas.findIndex(idea => idea.id === id);
 ideas.splice(ideaIdx, 1);
 idea.deleteFromStorage();
}

function monitorCardFields() {
  if (cardTitle.value.length && cardBody.value.length) {
    saveButton.disabled = false;
  } else {
    saveButton.disabled = true;
  }
}

saveButton.addEventListener('click', saveIdea);
cardForm.addEventListener('keyup', monitorCardFields);