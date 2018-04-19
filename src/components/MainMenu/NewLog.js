import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Menu, Icon, Input, Button} from "semantic-ui-react";

class NewLog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      name: '',
      nameFieldError: false
    }
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  open() {
    this.setState({
      open: true,
      name: '',
      nameFieldError: false
    })
  }

  close() {
    this.setState({open: false})
  }

  handleSave() {
    if (this.state.name.trim().length) {
      this.props.onSave(this.state.name)
      this.close()
    } else {
      this.setState({nameFieldError: true})
    }
  }

  handleNameChange(event) {
    this.setState({name: event.target.value, nameFieldError: false})
  }

  handleKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSave()
    }
  }

  _renderContent() {
    return this.props.isLoggedIn ? (
      <React.Fragment>
        <Modal.Header>Create New Log</Modal.Header>
        <Modal.Content>
          <Input
            onKeyPress={this.handleKeyPress} onChange={this.handleNameChange}
            value={this.state.name} label='Log Name' placeholder='My super gps route'
            error={this.state.nameFieldError}
            autoFocus
          />
        </Modal.Content>
        <Modal.Actions>
          <Button negative content='Cancel' onClick={this.close}/>
          <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.handleSave}/>
        </Modal.Actions>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Modal.Header>You Must Be Logged in to Add a new Log</Modal.Header>
        <Modal.Actions>
          <Button negative content='Cancel' onClick={this.close}/>
        </Modal.Actions>
      </React.Fragment>
    );
  }

  render() {
    return (
      <Modal
        trigger={<Menu.Item onClick={this.open}><Icon inverted name='add circle'/> New Log</Menu.Item>}
        open={this.state.open}
      >
        {this._renderContent()}
      </Modal>
    );
  }
};

NewLog.propTypes = {

};

export default NewLog;
