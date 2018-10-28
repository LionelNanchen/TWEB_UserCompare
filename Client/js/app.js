$(function () {

  //Global elements
  ADD_USER_BUTTON = "images/add_user.png";

  /**
   * Initialize the content of the page
   */
  function initialize() {
    createFrame(new User("Kylo Ren"));
    createFrame(new User("Patrick Sebastien"));
    createFrame(new User("Donald Trump"));
    createFrame(new User("Alain Berset"));
  }

  /**
   * Create a frame with the user informations
   * @param user the user on which the frame will be created
   */
  function createFrame(user) {
    const row = $("#user-frame-row");
    const div = document.createElement("div");
    div.setAttribute("class", "col-lg-4 col-sm-6 text-center mb-4 user-frame");
    const buttonImg = document.createElement("img");
    buttonImg.setAttribute("class", "add-user-button");
    buttonImg.src = ADD_USER_BUTTON;
    const a = document.createElement("a");
    a.setAttribute("class", "user-frame-image");
    a.id = user.getName().split(' ').join('-') + "-frame";
    const avatar = document.createElement("img");
    avatar.setAttribute("class", "rounded-circle img-fluid d-block mx-auto");
    avatar.src = user.getAvatar();
    a.appendChild(avatar);
    const h3 = document.createElement("h3");
    h3.setAttribute("class", "user-frame-name");
    h3.textContent = user.getName();

    //append new elements
    div.appendChild(buttonImg);
    div.appendChild(a);
    div.appendChild(h3);
    row.append(div);

    //attach user to the frame
    $("#" + a.id).data(a.id, user);
  }

  //code inspired by https://www.w3schools.com/howto/howto_js_filter_lists.asp
  $(document).on("keyup", ".search-bar", function () {
    let input, filter, ul, li, a, i;
    input = document.getElementById("search-bar");
    filter = input.value.toUpperCase();
    div = document.getElementById("user-frame-row");
    frames = div.getElementsByClassName("user-frame");
    for (i = 0; i < frames.length; i++) {
        frame = frames[i];
        if (frame.innerHTML.toUpperCase().indexOf(filter) > -1) {
            frames[i].style.display = "";
        } else {
            frames[i].style.display = "none";
        }
    }
  });

  /**
  *  Check if the user is already in the list.
  *  @param String id  the id of the list-group-item corresponding to the user.
  */
  function isUserInList(id) {
    return $("#" + id).length > 0;
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
        if (users[i].textContent.toLowerCase() > users[i + 1].textContent.toLowerCase()) {
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
  $(document).on("click", ".add-user-button", function addUserToList() {
    //get user attach to the frame
    const frame = this.parentElement.getElementsByClassName("user-frame-image")[0];
    const frameId = frame.getAttribute("id");
    const user = $("#" + frameId).data(frameId);

    //id for the futur user a in the list
    const id = user.getName().split(' ').join('-') + "-list";

    //check if user is already in the list
    if (isUserInList(id)) return;

    const a = document.createElement("a");
    a.setAttribute("href", "#");
    a.setAttribute("class", "list-group-item user-list");
    a.setAttribute("id", id);

    const spanUserName = document.createElement("span");
    spanUserName.setAttribute("class", "users-list-name")
    spanUserName.textContent = user.getName();

    const button = document.createElement("button");
    button.setAttribute("type", "button");
    button.setAttribute("class", "close delete-user");
    button.setAttribute("aria-label", "Close");

    const span = document.createElement("span");
    span.setAttribute("aria-hidden", "true");
    span.innerHTML = "&times;";

    a.appendChild(spanUserName)
    button.appendChild(span);
    a.appendChild(button);

    const element = document.getElementById("users-list");
    element.appendChild(a);

    //attach user to user element in list
    $("#" + id).data(id, user);

    //sort the list
    sortUsersList();
  });

  /**
  *  Action performed after click on the compare users button
  *  Open model with the users comparison.
  */
  $(document).on("click", "#compare-user-btn", function() {
    //get users
    const userslist = $("#users-list").children();
    const alert = $("#compare-user-alert");

    //need at least 2 users to compare
    if (userslist.length < 2) {
      alert.html("Need at least two users");
      setTimeout(() => {
        alert.html("")
      }, 2000);
      return;
    }
    //but no more than 5 users (readability of the table)
    else if (userslist.length > 5) {
      alert.html("No more than 5 users");
      setTimeout(() => {
        alert.html("")
      }, 2000);
      return;
    }

    //initialize array with all UserList objects
    let users = [];
    for (let i = 0; i < userslist.length; ++i) {
      const id = userslist[i].getAttribute("id")
      users.push($("#" + id).data(id));
    }

    //get table informations
    const table = $("#users-comparison-table");
    const headRow = $("#head-row");
    const rows = $("#sorted-tbody").children();

    //clear the table
    table.find("th").not("th").remove();
    table.find("td").not("th").remove();

    //users images
    for (let i = 0; i < users.length; i++) {
      const td = document.createElement("td");
      td.setAttribute("class", "text-center table-row");
      const img = document.createElement("img");
      img.setAttribute("src", users[i].getAvatar());
      img.setAttribute("class", "rounded-circle table-user-image");
      td.append(img);
      headRow.append(td);
    }

    //users names
    for (let i = 0; i < users.length; i++) {
      const td = document.createElement("td");
      td.class = "text-center table-row";
      td.textContent = users[i].getName();
      rows[0].append(td);
    }

    //user infos
    for (let i = 0; i < users.length; i++) {
      const td = document.createElement("td");
      td.setAttribute("class", "table-row");
      td.textContent = "some informations";
      rows[1].append(td);
    }

    for (let i = 0; i < users.length; i++) {
      const td = document.createElement("td");
      td.setAttribute("class", "table-row");
      td.textContent = "some other informations";
      rows[2].append(td);
    }

    $("#users-comparison-table #sorted-head tr").sortable("refresh");

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
      itemSelector: 'td',
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

    $("#compare-users-modal").modal();
  });

  /**
  *  Action performed after click on a user frame or user name in the users list.
  *  Open model with the user informations.
  */
  $(document).on("click", ".user-frame-image, .user-list", function () {

    //get user
    const id = this.getAttribute("id");
    user = $("#" + id).data(id);

    //title
    $("#user-info-modal-title").text(user.getName());//CHANGE WITH USER NAME

    //image
    $("#user-modal-image").attr("src", user.getAvatar());//CHANGE WITH IMAGE

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

  //Initialization of the web page;
  initialize();
});
