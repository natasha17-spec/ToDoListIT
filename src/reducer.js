export const ADD_TODOLIST = 'todolist-app/reducer/ADD-TODOLIST';
export const ADD_TASK = 'todolist-app/reducer/ADD_TASK';
export const DELETE_TASK = 'todolist-app/reducer/DELETE_TASK';
export const DELETE_LIST = 'todolist-app/reducer/DELETE_LIST';


const initialState= {
    todolists: [

    ]
};
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODOLIST: {
            return{
                ...state,
                todolists:[...state.todolists, action.newTodolist]
            }
        }
        case ADD_TASK: {
            return {
                ...state,
                todolists: state.todolists.map((todo) => {
                    if (todo.id === action.todoId) {
                        return {
                            ...todo,
                            tasks: [...todo.tasks, action.newTask]
                        }
                    } else {
                        return todo
                    }
                })
            }
        }
        case DELETE_TASK: {
            return {
                ...state, todolists: [...state.todolists.map(todolist => {
                    if (todolist.id === action.todoListId) {
                        return {...todolist, tasks: [...todolist.tasks.filter(
                                task => task.id !== action.taskId)]
                        }
                    } else return todolist
                })]
            }
        }
        case DELETE_LIST: {
            return {
                ...state, todolists: [...state.todolists.filter(
                    todolist => todolist.id !== action.listId)]
            }

        }



    }

    return state;
};

export const addTodolist = (newTodolist)=> ({type: ADD_TODOLIST, newTodolist:newTodolist});
export const addTask = (todoId, newTask)=> ({type: ADD_TASK, todoId, newTask});
export const deleteTask = (todoListId, taskId)=> ({type: DELETE_TASK, todoListId, taskId});
export const deletelist = (listId)=> ({type: DELETE_LIST, listId});
export default reducer;
