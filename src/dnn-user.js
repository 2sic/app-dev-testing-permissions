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
