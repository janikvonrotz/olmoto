import files from './files';
import users from './users';
import logs from './logs';
import pages from './pages';
import events from './events';

export default function () {
  events();
  files();
  users();
  logs();
  pages();
}
