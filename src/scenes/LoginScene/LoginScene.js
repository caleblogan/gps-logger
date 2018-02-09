import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {Header, Grid, Button} from 'semantic-ui-react';

import {login, logout} from '../../actions/authActions';
import LoginForm from "./LoginForm";

class LoginScene extends Component {

  handleLogout() {
    this.props.dispatch(logout())
  }

  handleRedirect() {
    this.props.history.push('/')
  }

  render() {
    return (
      <Grid centered>
        <Grid.Row>
          <Header as='h2'>Login</Header>
          <p>toke {this.props.token}</p>
        </Grid.Row>
        <Grid.Row>
          <LoginForm dispatch={this.props.dispatch} redirect={this.handleRedirect.bind(this)}/>
        </Grid.Row>
        <Button negative onClick={this.handleLogout.bind(this)}>Logout</Button>
      </Grid>
    );
  }
}

LoginScene.propTypes = {};

const mapStateToProps = state => {
  return {
    token: state.token
  }
}

const LoginSceneContainer = connect(mapStateToProps)(LoginScene)
export default LoginSceneContainer;
