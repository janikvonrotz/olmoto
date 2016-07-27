import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        Loggin in ...
      </div>
    );
  }

  componentDidMount(){
    const {email, password} = this.props;
    this.props.login(email, password);
  }
}

export default Login;
