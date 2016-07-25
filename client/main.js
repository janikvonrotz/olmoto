import {createApp} from 'mantra-core';
import initContext from './configs/context';
import injectTapEventPlugin from 'react-tap-event-plugin';

// modules
import coreModule from './modules/core';
import eventModule from './modules/event';
import fileModule from './modules/file';
import userModule from './modules/user';

// init context
const context = initContext();
injectTapEventPlugin();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(eventModule);
app.loadModule(fileModule);
app.loadModule(userModule);
app.init();

// make sure FlowRouter only runs when user is loaded
Tracker.autorun(() => {
  if(!Meteor.subscribe("user.current").ready()){
    FlowRouter.wait();
  }
  if(Meteor.subscribe("user.current").ready() && !FlowRouter._initialized) {
    FlowRouter.initialize();
  };
});
