const users = {
  // host
  SuperUser: 'SuperUser',

  // admin
  PapaSmurf: 'Papa Smurf',

  // Smurfs
  BrainySmurf: 'Brainy Smurf',
  GreedeSmurf: 'Greede Smurf',
  Smurfette: 'Smurfette',
  AppSmurf: 'AppSmurf', // for app-permission checks

  // Bad Guys
  Gargamel: 'Gargamel',
  Azrael: 'Azrael',

  // registered users
  LoneRanger: 'Lone Ranger',
  Spiderman: 'Spiderman',
  Hulk: 'Hulk',

  Anonymous: '',
}

const passwords = {
  default: 'Split2018!',
}

const groups = {
  Smurfs: "Smurfs",
  BadGuys: "Bad Guys",
}

function install() {
  // create users
  for (var user in users) {
    if (!!users[user]) {
      register(users[user], passwords.default, logUser);
    }
  }

  // create groups
  for (var group in groups) {
    if (!!groups[group]) {
      createGroup(groups[group], logGroup);
    }
  }

  // admin
  addGroupMember("Administrators", users.PapaSmurf, log);

  // Smurfs
  addGroupMember(groups.Smurfs, users.BrainySmurf, log);
  addGroupMember(groups.Smurfs, users.GreedeSmurf, log);
  addGroupMember(groups.Smurfs, users.Smurfette, log);
  addGroupMember(groups.Smurfs, users.AppSmurf, log);

  // Bad Guys
  addGroupMember(groups.BadGuys, users.Gargamel, log);
  addGroupMember(groups.BadGuys, users.Azrael, log);

  //SuperUser
  log("ensure that user SuperUser is SuperUsers account");

}

function logGroup(message) {
  return log("group: " + message);
}

function logUser(message) {
  return log("user: " + message);
}

function log(message) {
  console.log('stv log', message);
  var userRolesStatus = document.getElementById('userRolesStatus');
  userRolesStatus.innerHTML += message + '<br>';
}
