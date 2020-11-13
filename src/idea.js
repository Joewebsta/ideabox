class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage() {
    this.initializeStorage();
    
    let ideas = JSON.parse(localStorage.getItem('ideas'));
    ideas.push(this);
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }

  initializeStorage() {
    if (!localStorage.length) {
      localStorage.setItem('ideas', '[]');
    }
  }
}