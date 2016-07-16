export const acl = {
  "routes": [
    { "name" : "file.edit",
      "roles" : ["Authenticated", "Admin"]
    }
  ],
  "actions": [
    { "name" : "file.edit",
      "roles" : ["Authenticated", "Admin"]
    }
  ]
}

export function is_allowed(action) {
  var roles = _.findWhere(acl.actions, {name: action}).roles;
  var user = Meteor.userId() || 'Unauthenticated';
  var admin = Meteor.user() ? Meteor.user().admin : null;
  if(_.contains(roles, "Authenticated") && Meteor.userId()){
    console.log("allow action [" + action + "] for user [" + user + "]");
    return true;
  }
  if(_.contains(roles, "Admin") && admin){
    console.log("allow action [" + action + "] for user [" + user + "]");
    return true;
  }
  if(_.contains(roles, "Public")){
    console.log("allow action [" + action + "] for user [" + user + "]");
    return true;
  }
  console.log("deny action [" + action + "] for user [" + user + "]");  
  return false;
}

export function cannot_access(routename) {
  var roles = _.findWhere(acl.routes, {name: routename}).roles;
  var user = Meteor.userId() || 'Unauthenticated';
  var admin = Meteor.user() ? Meteor.user().admin : null;
  var result = true;
  if(_.contains(roles, "Authenticated") && Meteor.userId()){
    console.log("allow route [" + routename + "] for user [" + user + "]");
    result = false;
  }
  if(_.contains(roles, "Admin") && admin){
    console.log("allow route [" + routename + "] for user [" + user + "]");
    result = false;
  }
  if(_.contains(roles, "Public")){
    console.log("allow route [" + routename + "] for user [" + user + "]");
    result = false;
  }
  if(result){
    console.log("deny route [" + routename + "] for user [" + user + "]");
  }
  return result;
}
