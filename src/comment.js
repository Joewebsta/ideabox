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

  deleteFromStorage(commentIdea) {
    const ideas = this.retreiveFromStorage();
    const idea = ideas.find(idea => idea.id === commentIdea.id);
    const comments = idea.comments;
    const commentIdx = comments.findIndex(comment => comment.id === this.id );
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