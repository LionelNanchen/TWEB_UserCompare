
$(function () {
  /**
   *  Check if the user is already in the list.
   *  @param String userName  the name of the user to check.
   */
  function checkUserInList(userName) {
    let users = document.getElementsByClassName("list-group-item");
    for (let i = 0; i < users.length; ++i)
      if (users[i].textContent === userName)
        return false;
    return true;
  }

  /**
   *  Action performed after click on the add-user-button button.
   *  Add the user in the user list.
   */
  $(".add-user-button").click(function addUserToList() {
    let userName = this.parentElement.getElementsByClassName("user-frame-name")[0].textContent; //useID
    if (!checkUserInList(userName))
      return;

    let a = document.createElement("a");
    a.setAttribute("class", "list-group-item");
    a.setAttribute("href", "#");
    let node = document.createTextNode(userName);
    a.appendChild(node);
    let element = document.getElementById("users-list").appendChild(a);
    element.appendChild(a);
  });

  /**
   *  Action performed after click on a user frame.
   *  Open model with the user informations.
   */
  $(".user-frame-image").click(function openUserInfo() {
    $("#user-info-modal").modal();
  });

});
