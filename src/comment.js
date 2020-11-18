class Comment {
  constructor(id, content) {
    this.content = content;
    this.id = id;
  }

  saveToStorage(commentIdea) {
    const ideas = this.retreiveFromStorage();
    const idea = ideas.find(idea => idea.id === commentIdea.id);
    idea.comments.push(this);
    this.setStorage(ideas);
  }

  deleteFromStorage(ideaIdx, commentIdx) {
    const ideas = this.retreiveFromStorage();
    const idea = ideas[ideaIdx];
    const comments = idea.comments;
    comments.splice(commentIdx, 1);
    this.setStorage(ideas);
  }

  retreiveFromStorage() {
    return JSON.parse(localStorage.getItem('ideas'));
  }

  setStorage(ideas) {
    localStorage.setItem('ideas', JSON.stringify(ideas));
  }
}