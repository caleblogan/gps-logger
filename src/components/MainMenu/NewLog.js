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

  render() {
    return (
      <Modal
        trigger={<Menu.Item onClick={this.open}><Icon inverted name='add circle'/> New Log</Menu.Item>}
        open={this.state.open}
      >
        <Modal.Header>Create New Log</Modal.Header>
        <Modal.Content>
          <Input onChange={this.handleNameChange} value={this.state.name} label='Log Name' placeholder='My super gps route'
                 error={this.state.nameFieldError}
          />
        </Modal.Content>
        <Modal.Actions>
          <Button negative content='Cancel' onClick={this.close}/>
          <Button positive icon='checkmark' labelPosition='right' content='Save' onClick={this.handleSave}/>
        </Modal.Actions>
      </Modal>
    );
  }
};

NewLog.propTypes = {

};

export default NewLog;
