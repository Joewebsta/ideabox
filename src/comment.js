class Comment {
  constructor(content) {
    this.content = content;
    this.id = Date.now();
  }

  saveToStorage(commentIdea) {
    const ideas = this.retreiveFromStorage();
    const idea = ideas.find(idea => idea.id === commentIdea.id);
    const ideaIdx = ideas.findIndex(idea => idea.id === commentIdea.id);
    ideas[ideaIdx].comments.push(this);
    console.log(ideas);
    // this.setStorage(ideas);

    // console.log(ideaIdx);
    // idea.comments.push(this);
  }

  deleteFromStorage() {
    
  }

  retreiveFromStorage() {
    return JSON.parse(localStorage.getItem('ideas'));
  }

  setStorage(ideas) {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }
}