function login(username, password) {
  var apiMethod = 'DnnUser/Login';
  var url = apiUrl + apiMethod
    + "?username=" + encodeURIComponent(username)
    + "&password=" + encodeURIComponent(password);
  // $2sxc(moduleId).webApi.get(url);
  var ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);
  ajax.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
  ajax.send(null);
}

function logout() {
  var apiMethod = 'DnnUser/Logout';
  var url = apiUrl + apiMethod;
  // $2sxc(moduleId).webApi.get(url);
  var ajax = new XMLHttpRequest();
  ajax.open("GET", url, true);
  ajax.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
  ajax.send(null);
}

function reload() {
  setTimeout(() => {
    location.reload();
  }, 1000);
}

function register(username, password, callback) {
  var apiMethod = 'DnnUser/Register';
  var url = apiUrl + apiMethod
  + "?username=" + encodeURIComponent(username)
  + "&password=" + encodeURIComponent(password);
  var ajax = new XMLHttpRequest();

  ajax.onreadystatechange = function() {
    if (ajax.readyState === 4) {
      callback(ajax.response);
    }
  }

  ajax.open("GET", url, true);
  ajax.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
  ajax.responseType = "text";
  ajax.send(null);
}

function createGroup(name, callback) {
  var apiMethod = 'DnnUser/CreateGroup';
  var url = apiUrl + apiMethod
  + "?name=" + encodeURIComponent(name)
  var ajax = new XMLHttpRequest();

  ajax.onreadystatechange = function() {
    if (ajax.readyState === 4) {
      callback(ajax.response);
    }
  }

  ajax.open("GET", url, true);
  ajax.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
  ajax.responseType = "text";
  ajax.send(null);
}

function addGroupMember(groupname, username, callback) {
  var apiMethod = 'DnnUser/AddGroupMember';
  var url = apiUrl + apiMethod
  + "?groupname=" + encodeURIComponent(groupname)
  + "&username=" + encodeURIComponent(username);
  var ajax = new XMLHttpRequest();

  ajax.onreadystatechange = function() {
    if (ajax.readyState === 4) {
      callback(ajax.response);
    }
  }

  ajax.open("GET", url, true);
  ajax.setRequestHeader("Content-type", 'application/json; charset=UTF-8');
  ajax.responseType = "text";
  ajax.send(null);
}

