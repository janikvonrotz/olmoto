import React from 'react';
import Page from '../containers/page';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.setLocalState({title: "Home"})
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
