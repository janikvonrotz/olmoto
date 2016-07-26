import events from './events';
import files from './files';
import users from './users';
import pages from './pages';

export default function () {
  events();
  files();
  users();
  pages();
}
