
$(function () {
  function checkUserInList(userName) {
    let users = document.getElementsByClassName("list-group-item");
    for (let i = 0; i < users.length; ++i)
      if (users[i].textContent === userName)
        return false;
    return true;
  }

  $(".add-user-button").click(function addUserToList() {
    let userName = "YOLO";

    if (!checkUserInList(userName))
      return;

    let param = document.createElement("a");
    param.setAttribute("class", "list-group-item");
    param.setAttribute("href", "#");



    let node = document.createTextNode(userName);
    param.appendChild(node);
    let element = document.getElementById("users-list").appendChild(param);
    element.appendChild(param);
  });

  $(".user-frame-image").click(function openUserInfo() {
    $("#user-info-modal").modal();
  });

});
