import {Pages} from '/lib/collections';
import {Meteor} from 'meteor/meteor';
import {check} from 'meteor/check';
import {is_allowed} from '/lib/access_control';

export default function () {
  Meteor.publish('page.item', function (title) {
    check(title, String);
    if(is_allowed('page.item', this.userId)){
      var pages = Pages.find({title: title})

      // if page not exist create
      if((pages.count() == 0) && is_allowed('page.insert', this.userId)){
        Pages.insert({title: title, content: `# ${title}`});
        return Pages.find({title: title})
      }
      return pages;
    }else{
      this.stop();
    }
  });
}
