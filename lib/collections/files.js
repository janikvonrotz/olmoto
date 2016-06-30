import {Mongo} from 'meteor/mongo';
import {FilesCollection} from 'meteor/ostrio:files';

// const Files = new FilesCollection({
const Files = new Meteor.Files({
  storagePath: 'C:/uploads',
  collectionName: 'files',
  allowClientCode: false, // Disallow remove files from Client
});

export default Files;
