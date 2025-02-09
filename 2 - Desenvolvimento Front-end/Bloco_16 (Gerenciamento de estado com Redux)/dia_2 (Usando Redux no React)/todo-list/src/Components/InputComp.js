import React from 'react';
import { connect } from 'react-redux';
import {addTaskAction, clearAction, clearTodoAction, clearCompletedAction, changeFilterAction, recoverAction} from '../Actions'

class InputComp extends React.Component {
  constructor() {
    super()
    this.state = {task: ''};
  }

  render() {
    const { task } = this.state;
    const { add, clear, clearToDo, clearCompleted, chageFilter, recover, id } = this.props;

    const handleChange = ({target}) => {
      const { name } = target
      const value = target.type === 'checkbox' ? target.checked : target.value;
      this.setState({ [name]: value})
    }

    const handleFilter = ({target}) => {
      chageFilter(target.value)
    }

    const submit = () => {
      add(task, id)
      this.setState({task:''})
    }

    const clearAll = () => {
      clear()
      this.setState({task:''})
    }

    const clearToDoList = () => {
      clearToDo()
      this.setState({task:''})
    }

    const clearCompletedList = () => {
      clearCompleted()
      this.setState({task:''})
    }

    return (
      <div className="flex-colum-center">
        <input name="task" onChange={handleChange} value={ task } />
        <div>
          <button onClick={() => submit()}>Add</button>
          <button onClick={() => clearAll()}>Clear</button>
          <select name="filter" onChange={handleFilter}>
            <option value=''>All</option>
            <option value='completed'>Completed</option>
            <option value='toDo'>To Do</option>
          </select>
          <button onClick={() => clearToDoList()}>Clear 1</button>
          <button onClick={() => clearCompletedList()}>Clear 2</button>
          <button onClick={() => recover()}>Undo</button>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  add: (task, id) => dispatch(addTaskAction(task, id)),
  clear: () => dispatch(clearAction()),
  clearToDo: () => dispatch(clearTodoAction()),
  clearCompleted: () => dispatch(clearCompletedAction()),
  chageFilter: (value) => dispatch(changeFilterAction(value)),
  recover: () => dispatch(recoverAction())

});

const mapStateToProps = (state) => ({
  id: state.taskReducer.id
})

export default connect(mapStateToProps, mapDispatchToProps) (InputComp)