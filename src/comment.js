class Comment {
  constructor(content) {
    this.content = content;
    this.id = Date.now();
  }

  saveToStorage(commentIdea) {
    const ideas = this.retreiveFromStorage();
    const idea = ideas.find(idea => idea.id === commentIdea.id);
    // const ideaIdx = ideas.findIndex(idea => idea.id === commentIdea.id);
    idea.comments.push(this);
    this.setStorage(ideas);
    console.log(ideas);

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