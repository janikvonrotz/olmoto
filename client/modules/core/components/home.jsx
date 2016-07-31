import React from 'react';
import { Meteor } from 'meteor/meteor';
import Page from '../containers/page';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.setLocalState({title: Meteor.settings.public.app_name})
  }

  render() {
    return (
      <div>
        <Page title="Home" />
      </div>
    );
  }
}

export default Home;
