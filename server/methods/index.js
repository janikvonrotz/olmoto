import files from './files';
import users from './users';
import logs from './logs';
import events from './events';

export default function () {
  events();
  files();
  users();
  logs();
}
