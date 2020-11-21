class Comment {
  constructor(id, content) {
    this.content = content;
    this.id = id;
  }

  saveToStorage(ideaIdx) {
    const ideas = this.retreiveFromStorage();
    ideas[ideaIdx].comments.push(this);
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