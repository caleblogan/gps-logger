import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import {Header, Form, Input, Grid, Button} from 'semantic-ui-react';

import {login, logout} from '../../actions/authActions';

class LoginScene extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: [],
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.logout = this.logout.bind(this)
  }

  /**
   * Validates all form inputs. Returns true if form is valid.
   * Side effects: adds errors to local state.errors
   * @returns {boolean} true if form is valid otherwise false
   */
  validate() {
    const errors = []
    // if (this.username.value.trim() === '') {
    //   errors.push('Username field must not be empty')
    // }
    // if (this.password.value.trim() === '') {
    //   errors.push('Password field must not be empty')
    // }
    this.setState({errors})
    return errors.length === 0
  }

  handleSubmit(event, form) {
    if (this.validate()) {
      console.log('submitting')
      this.props.dispatch(login('admin', 'boomkin88'))
    } else {
      console.log('invalid form: errors')
    }
  }

  logout() {
    this.props.dispatch(logout())
  }

  render() {
    const errors = this.state.errors.map(error => (
      <p>{error}</p>
    ))
    return (
      <Grid centered>
        <Grid.Row>
          <Header as='h2'>Login</Header>
          <p>toke {this.props.token}</p>
        </Grid.Row>
        <Grid.Row>
          <div>
            {errors}
          </div>
          <Form onSubmit={this.handleSubmit}>
            <Input ref={r => this.username = r} label='username' placeholder='username...' /> <br/>
            <Input ref={r => this.password = r} label='password' placeholder='password...' /> <br/>
            <Button>login</Button>
          </Form>
        </Grid.Row>
        <Button negative onClick={this.logout}>Logout</Button>
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
