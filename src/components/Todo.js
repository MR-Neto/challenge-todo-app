import React, { Component, Fragment } from 'react';
import { Card, Button } from 'semantic-ui-react'



class Todo extends Component {

  handlerEdit = () => {
    const { todo, setModeEdit } = this.props;
    setModeEdit(todo.title, todo._id, todo.body);
  }

  handlerDone = () => {
    const { todo, handlerDone } = this.props;
    if (todo.done) {
      handlerDone(todo._id, false);
    } else {
      handlerDone(todo._id, true);
    }
  }

  handlerDelete = () => {
    const { todo, handlerDelete } = this.props;
    handlerDelete(todo._id);
  }

  render() {
    const { todo } = this.props;
    return (
      <Card>
        <Card.Content header={todo.title} />
        <Card.Content description={todo.body} />
        <Card.Content extra>
          {todo.done ?
            <div>
              <Button onClick={this.handlerDone} fluid color='green'>
                Completed
              </Button>
            </div>
            :
            <div className='ui three buttons'>
              <Button basic onClick={this.handlerDone} color='green'>
                Done
                </Button>
              <Button basic onClick={this.handlerEdit} color='grey'>
                Edit
              </Button>
              <Button basic onClick={this.handlerDelete} color='red'>
                Delete
                </Button>
            </div>
          }
        </Card.Content>
      </Card >



    );
  }

}

export default Todo;