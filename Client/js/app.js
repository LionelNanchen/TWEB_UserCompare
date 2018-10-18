
$(function () {
  /**
  *  Check if the user is already in the list.
  *  @param String userNameID  the id of the list-group-item corresponding to the user.
  */
  function isUserInList(userNameID) {
    return $("#" + userNameID).length > 0;
  }

  /**
   * Sort the users list
   */
  function sortUsersList() {
    let i, users, shouldSwitch;
    let list = document.getElementById("users-list");
    let switching = true;

    while (switching) {
      switching = false;
      users = list.getElementsByClassName("list-group-item");
      for (i = 0; i < (users.length - 1); ++i) {
        shouldSwitch = false;
        if (users[i].innerHTML.toLowerCase() > users[i + 1].innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        users[i].parentNode.insertBefore(users[i + 1], users[i]);
        switching = true;
      }
    }
  }

  /**
  *  Action performed after click on the add-user-button button.
  *  Add the user in the user list.
  */
  $(".add-user-button").click(function addUserToList() {
    let userName = this.parentElement.getElementsByClassName("user-frame-name")[0].textContent;
    let userNameID = userName.split(' ').join('-') + "-list"; //id for the futur userName span in the list

    //check if user is already in the list
    if (isUserInList(userNameID)) return;

    let a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("class", "list-group-item");

    let spanUserName = document.createElement("span");
    spanUserName.setAttribute("id", userNameID);
    spanUserName.textContent = userName;

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "close delete-user");
    button.setAttribute("aria-label", "Close");
    button.click(function deleteUserFromList() {
      this.parentElement.parentElement.removeChild(this.parentElement);
    });

    let span = document.createElement("span");
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = "&times;";

    a.appendChild(spanUserName)
    button.appendChild(span);
    a.appendChild(button);

    let element = document.getElementById("users-list");
    element.appendChild(a);

    //sort the list
    sortUsersList();
  });

  /**
   *  Action performed after click on a user frame or user name in the users list.
   *  Open model with the user informations.
   */
  $(".user-frame-image, .user-list").click(function openUserInfo() {
    $("#user-info-modal").modal();
  });

  /**
   * Action performed after click on a cross in the users list.
   * Delete the user from the list.
   */
  $(".delete-user").click(function deleteUserFromList() {
    this.parentElement.parentElement.removeChild(this.parentElement);
  });

});
