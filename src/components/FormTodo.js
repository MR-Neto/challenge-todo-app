import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form } from 'semantic-ui-react'


class FormTodo extends Component {

  state = {
    title: this.props.editTitle || "",
    body: this.props.editBody || "",
    editID: this.props.editID || "",
  }

  handleFormSubmit = () => {
    const { handleFormSubmit } = this.props;
    handleFormSubmit(this.state);
  }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    const { title, body } = this.state;
    const { editID } = this.props;

    return (
      <Form>
        <Form.Field>
          <label>Title:</label>
          <input type="text" name="title" value={title} onChange={this.handleChange} />
        </Form.Field>
        <Form.Field>
          <label>Body:</label>
          <input type="text" name="body" value={body} onChange={this.handleChange} />
        </Form.Field>
        <Button type="submit" value="Submit" onClick={this.handleFormSubmit}>{editID ? "Save Edit" : "Create New Todo"}</Button>
      </Form>
    );
  }
}

export default FormTodo;



// <div>
// <label>
//   Title:
//   <input type="text" name="title" value={title} onChange={this.handleChange} />
// </label>
// <label>
//   Body:
//   <input type="text" name="body" value={body} onChange={this.handleChange} />
// </label>
// <input type="submit" value="Submit" onClick={this.handleFormSubmit} />
// </div>