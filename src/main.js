let cardForm = document.querySelector(".js-card-form");
let cardTitle = document.querySelector(".js-card-form-title");
let cardBody = document.querySelector(".js-card-form-body");
let saveButton = document.querySelector('.js-save-button');

let ideas = [];

function createIdea(e) {
  e.preventDefault();
  let title = cardTitle.value;
  let body = cardBody.value;
  let idea = new Idea(title, body);

  cardForm.reset();

  console.log(idea);
}
  
saveButton.addEventListener('click', createIdea);