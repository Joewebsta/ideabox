let saveButton = document.querySelector('.js-save-button');

saveButton.addEventListener('click', createIdea);

function createIdea(e) {
  e.preventDefault();

  console.log(e.target)
}