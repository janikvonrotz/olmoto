import events from './events';
import files from './files';
import users from './users';

export default function () {
  events();
  files();
  users();
}
