
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
    a.setAttribute("class", "list-group-item user-list");

    let spanUserName = document.createElement("span");
    spanUserName.setAttribute("id", userNameID);
    spanUserName.setAttribute("class", "users-list-name")
    spanUserName.textContent = userName;

    let button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "close delete-user");
    button.setAttribute("aria-label", "Close");

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
  *  Action performed after click on the compare users button
  *  Open model with the users comparison.
  */
  $(document).on("click", "#compare-user-btn", function() {
    let table = $("#users-comparison-table");
    let tbody = $("#sorted-tbody");

    //clear the table
    // table.children().not(":first").remove();

    //get users
    let users = $("#users-list").children();

    for (let i = 0; i < users.length; i++) {
      let user = document.createElement("li");
      user.textContent = users[i].getElementsByClassName("users-list-name")[0].textContent;
      table.append(user);
    }

    //code inspired by https://johnny.github.io/jquery-sortable/#
    $("#users-comparison-table").sortable({
      containerSelector: "#users-comparison-table",
      itemPath: '> tbody',
      itemSelector: 'tr',
      placeholder: '<tr class="placeholder"/>'
    });

    var oldIndex;
    $('#sorted-head tr').sortable({
      containerSelector: 'tr',
      itemSelector: 'th:not(#first-column)',
      placeholder: '<th class="placeholder"/>',
      vertical: false,
      onDragStart: function ($item, container, _super) {
        oldIndex = $item.index();
        $item.appendTo($item.parent());
        _super($item, container);
      },
      onDrop: function  ($item, container, _super) {
        var field,
        newIndex = $item.index();

        if(newIndex != oldIndex) {
          $item.closest('table').find('tbody tr').each(function (i, row) {
            row = $(row);
            if(newIndex < oldIndex) {
              row.children().eq(newIndex).before(row.children()[oldIndex]);
            } else if (newIndex > oldIndex) {
              row.children().eq(newIndex).after(row.children()[oldIndex]);
            }
          });
        }

        _super($item, container);
      }
    });

    $("#compare-user-modal").modal();
  });

  /**
  *  Action performed after click on a user frame or user name in the users list.
  *  Open model with the user informations.
  */
  $(document).on("click", ".user-frame-image, .user-list", function () {

    //title
    $("#user-info-modal-title").text("USER NAME YO");//CHANGE WITH USER NAME

    //image
    $("#user-modal-image").attr("src", "images/patseb.jpg");//CHANGE WITH IMAGE

    //infos
    $("#user-infos-repo-global").text("yolo/yolo/yolo");
    $("#user-infos-repo-created").text("yala");
    $("#user-infos-repo-joined").text("lol");
    $("#user-infos-added-line").text("lil");
    $("#user-infos-sub-line").text("yo");
    $("#user-infos-ratio-line").text("ya");

    //open modal
    $("#user-info-modal").modal();
  });

  /**
  * Action performed after click on a cross in the users list.
  * Delete the user from the list.
  */
  $(document).on("click", ".delete-user", function (e) {
    e.stopPropagation();
    this.parentElement.parentElement.removeChild(this.parentElement);
  });
});
