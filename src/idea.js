class Idea {
  constructor(title, body, id, star=false, comments=[]) {
    this.title = title;
    this.body = body;
    this.id = id;
    this.star = star;
    this.comments = comments;
  }

  saveToStorage() {
    if (!localStorage.length) {
      this.initializeStorage();
    }
    
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

  updateIdea(prop, val) {
    const ideas = this.retreiveFromStorage();
    const ideaIdx = ideas.findIndex(idea => idea.id === this.id);
    ideas[ideaIdx][prop] = val;
    this.setStorage(ideas);
  }

  retreiveFromStorage() {
    return JSON.parse(localStorage.getItem('ideas'));
  }

  setStorage(ideas) {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }

  initializeStorage() {
    localStorage.setItem('ideas', '[]');
  }
}