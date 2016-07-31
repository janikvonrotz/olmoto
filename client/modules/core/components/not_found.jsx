import React from 'react';

const style = {
  fontFamily: 'Roboto',
}

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount(){
    this.props.setLocalState({title: "Not Found"})
  }

  render() {
    return (
      <div style={stlye}>
        <h1>Route not found</h1>
        <p>
          Sorry, but we couldn't find what you where looking for.
        </p>
      </div>
    );
  }
}

export default NotFound;
