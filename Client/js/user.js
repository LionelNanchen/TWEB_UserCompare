class User {
  constructor(userName) {
    // this.user = fetch(`/api/users/${userName}`).then(res => res.json());
    // this.name = this.user.name;
    // this.avatar = this.user.avatar_url;
    this.user = userName;
    this.name = userName;
    
    if (userName === "Kylo Ren") {
      this.avatar = "images/"+ "kyloren" + ".png";
    } else {
      this.avatar = "images/"+ "patseb" + ".png";
    }

  }

  getUser() {
    return this.user;
  }

  getName() {
    return this.name;
  }

  getAvatar() {
    return this.avatar;
  }
}
