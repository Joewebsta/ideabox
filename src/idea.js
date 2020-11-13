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
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }

  deleteFromStorage() {
    const ideas = this.retreiveStorage();
    const ideaIdx = ideas.findIndex(idea => idea.id === this.id);
    ideas.splice(ideaIdx, 1);
    localStorage.setItem('ideas', JSON.stringify(ideas)); //THIS LINE IS DUPLICATED FROM SAVESTORAGE ABOVE
    // console.log(ideaIdx);
  }

  retreiveStorage() {
    return JSON.parse(localStorage.getItem('ideas'));
  }

  initializeStorage() {
    if (!localStorage.length) {
      localStorage.setItem('ideas', '[]');
    }
  }
}