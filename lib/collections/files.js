import {Mongo} from 'meteor/mongo';
import {FilesCollection} from 'meteor/ostrio:files';

// const Files = new FilesCollection({
const Files = new Meteor.Files({
  collectionName: 'files',
  allowClientCode: false, // Disallow remove files from Client
});

Files.allowClient();

export default Files;
