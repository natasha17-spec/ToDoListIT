import React from 'react';
import './App.css';


class TodoListHeader extends  React.Component {

           constructor(props) {
            super(props);
            this.newTaskTitleRef = React.createRef();
        }
        onAddTaskClick=()=>{
            let newTitle = this.newTaskTitleRef.current.value;
            this.newTaskTitleRef.current.value ='';
            this.props.addTask(newTitle);
        };

        render = () => {

        return (
            <div className='center'>
                <h3>What to learn</h3>
                <div>
                    <div>
                        <input ref={this.newTaskTitleRef} type='text' placeholder='New task'/>
                        <button onClick={this.onAddTaskClick} className='button'>Add</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default TodoListHeader;

