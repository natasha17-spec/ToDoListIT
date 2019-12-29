import React from 'react';
import './App.css';


class AddNewItemForm extends  React.Component {

           constructor(props) {
            super(props);
            this.newTaskTitleRef = React.createRef();
        }
    state={
        error:false,
        title:''
    };
        onAddItemClick=()=>{
            let newTitle = this.state.title;
            this.setState({title:''}) ;
            if(newTitle.trim()===''){
                this.setState({error: true})
            } else {
                this.setState({error: false});
                this.props.addItem(newTitle);
            }
        };

        onTitleChanged = (e) => {
            this.setState({
                error:false,
                title:e.currentTarget.value
            })
        };
    onKeyPress = (e) =>{
        if(e.key === 'Enter'){
            this.onAddItemClick()
        }
    };
        render = () => {
            let classForInput = this.state.error ? 'error':'';

        return (
             <div>
                 <input
                               type='text'
                               placeholder='New item name'
                               className={classForInput}
                               onChange={this.onTitleChanged}
                               onKeyPress={this.onKeyPress}
                               value={this.state.title}
                               // ref={this.newTaskTitleRef}
                        />
                        <button onClick={this.onAddItemClick} className='button'>Add</button>
                    </div>

        );
    }
}

export default AddNewItemForm;

