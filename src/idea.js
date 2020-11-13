class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }

  saveToStorage() {
    this.initializeStorage();
    
    const ideas = this.retreiveStorage();
    ideas.push(this);
    this.setStorage(ideas);
  }

  deleteFromStorage() {
    const ideas = this.retreiveStorage();
    const ideaIdx = ideas.findIndex(idea => idea.id === this.id);
    ideas.splice(ideaIdx, 1);
    this.setStorage(ideas);
  }

  retreiveStorage() {
    return JSON.parse(localStorage.getItem('ideas'));
  }

  setStorage(ideas) {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }

  initializeStorage() {
    if (!localStorage.length) {
      localStorage.setItem('ideas', '[]');
    }
  }
}