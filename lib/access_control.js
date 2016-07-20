export const acl = {
  "routes": [
    { "name" : "file.edit",
      "roles" : ["Authenticated", "Admin"] },
  ],
  "actions": [
    { "name" : "file.remove",
      "roles" : ["Admin"] },
    { "name" : "file.update",
      "roles" : ["Admin"] },
    { "name" : "file.upload",
      "roles" : ["Admin"] },
    { "name" : "file.list",
      "roles" : ["Authenticated", "Admin"] },
    { "name" : "file.item",
      "roles" : ["Authenticated", "Admin"] },
    { "name" : "file.cover",
      "roles" : ["Authenticated", "Admin"] },
    { "name" : "file.getIdOf",
      "roles" : ["Authenticated", "Admin"] },
  ]
}

function log(result, type, name, userId){
  Meteor.call('log.insert', result, type, name, userId, (err, res) => {
    if (err) {
      console.log(err.message)
    }
  });
}

export function is_allowed(action, userId) {
  var roles = _.findWhere(acl.actions, {name: action}).roles;
  if (Meteor.isServer) {
    var user = Meteor.users.findOne(userId);
  }else{
    var userId = Meteor.userId();
    var user = Meteor.user();
  }
  var admin = user ? user.admin : null;
  if(_.contains(roles, "Authenticated") && userId){
    log("allow", "action", action, userId)
    return true;
  }
  if(_.contains(roles, "Admin") && admin){
    log("allow", "action", action, userId)
    return true;
  }
  if(_.contains(roles, "Public")){
    log("allow", "action", action, userId)
    return true;
  }
  log("deny", "action", action, userId)
  return false;
}

export function cannot_access(routename, userId) {
  var roles = _.findWhere(acl.routes, {name: routename}).roles;
  if (Meteor.isServer) {
    var user = Meteor.users.findOne(userId);
  }else{
    var userId = Meteor.userId();
    var user = Meteor.user();
  }
  var admin = user ? user.admin : null;
  var result = true;
  if(_.contains(roles, "Authenticated") && userId){
    log("allow", "route", routename, userId)
    result = false;
  }
  if(_.contains(roles, "Admin") && admin){
    log("allow", "route", routename, userId)
    result = false;
  }
  if(_.contains(roles, "Public")){
    log("allow", "route", routename, userId)
    result = false;
  }
  if(result){
    log("deny", "route", routename, userId)
  }
  return result;
}
