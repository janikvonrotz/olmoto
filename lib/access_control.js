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
    console.log((new Date()).toISOString() + ": allow action [" + action + "] for user [" + userId + "]");
    return true;
  }
  if(_.contains(roles, "Admin") && admin){
    console.log((new Date()).toISOString() + ": allow action [" + action + "] for user [" + userId + "]");
    return true;
  }
  if(_.contains(roles, "Public")){
    console.log((new Date()).toISOString() + ": allow action [" + action + "] for user [" + userId + "]");
    return true;
  }
  console.log((new Date()).toISOString() + ": deny action [" + action + "] for user [" + userId + "]");
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
    console.log((new Date()).toISOString() + ": allow route [" + routename + "] for user [" + userId + "]");
    result = false;
  }
  if(_.contains(roles, "Admin") && admin){
    console.log((new Date()).toISOString() + ": allow route [" + routename + "] for user [" + userId + "]");
    result = false;
  }
  if(_.contains(roles, "Public")){
    console.log((new Date()).toISOString() + ": allow route [" + routename + "] for user [" + userId + "]");
    result = false;
  }
  if(result){
    console.log((new Date()).toISOString() + ": deny route [" + routename + "] for user [" + user + "]");
  }
  return result;
}
