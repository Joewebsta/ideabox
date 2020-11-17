class Idea {
  constructor(title, body, id, star=false ) {
    this.title = title;
    this.body = body;
    this.id = id;
    this.star = star;
    this.comments = [];
  }

  saveToStorage() {
    this.initializeStorage();
    
    const ideas = this.retreiveFromStorage();
    ideas.push(this);
    this.setStorage(ideas);
  }

  deleteFromStorage() {
    const ideas = this.retreiveFromStorage();
    const ideaIdx = ideas.findIndex(idea => idea.id === this.id);
    ideas.splice(ideaIdx, 1);
    this.setStorage(ideas);
  }

  updateIdea(key, val) {
    const ideas = this.retreiveFromStorage();
    const ideaIdx = ideas.findIndex(idea => idea.id === this.id);
    ideas[ideaIdx][key] = val;
    this.setStorage(ideas);
  }

  retreiveFromStorage() {
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