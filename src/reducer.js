import {api} from "./Api";
export const ADD_TODOLIST = "TodoList/Reducer/ADD-TODOLIST";
export const DELETE_TODOLIST = "TodoList/Reducer/DELETE-TODOLIST";
export const DELETE_TASK = "TodoList/Reducer/DELETE-TASK";
export const ADD_TASK = "TodoList/Reducer/ADD-TASK";
export const SET_TASKS = "TodoList/Reducer/SET_TASKS";
export const UPDATE_TASK = "TodoList/Reducer/UPDATE-TASK";
export const SET_TODOLISTS = "TodoList/Reducer/SET_TODOLISTS";

const initialState = {
    "todolists": []
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    } else {
                        return {...tl, tasks: action.tasks}
                    }
                })
            }
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            }
        case ADD_TODOLIST:
            return {
                ...state,
                todolists: [...state.todolists, action.newTodolist]
            }
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => tl.id != action.todolistId)
            }
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => t.id != action.taskId)
                        }
                    } else {
                        return tl
                    }
                })
            }
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]}
                    } else {
                        return tl
                    }
                })
            }
        case UPDATE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id != action.taskId) {
                                    return t;
                                } else {
                                    return {...t, ...action.obj};
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            }
    }
    console.log("reducer: ", action);
    return state;
}

export const deleteTaskAC = (todolistId, taskId) => {
    return {
        type: DELETE_TASK,
        todolistId,
        taskId
    };
}
const deleteTodolistAC = (todolistId) => {
    return {type: DELETE_TODOLIST, todolistId: todolistId};
}
const updateTaskAC = (taskId, obj, todolistId) => {
    return {type: UPDATE_TASK, taskId, obj, todolistId};
}
const setTasksAC = (tasks, todolistId) => {
    return {type: SET_TASKS, tasks, todolistId};
}
const addTaskAC = (newTask, todolistId) => {
    return {type: ADD_TASK, newTask, todolistId};
}
const addTodolistAC = (newTodolist) => {
    return {type: ADD_TODOLIST, newTodolist: newTodolist}
}
const setTodolistsAC = (todolists) => {
    return {type: SET_TODOLISTS, todolists: todolists}
};

export const getTodolistsTC = () => (dispatch) => {
    api.getTodolists().then(res => {
        dispatch(setTodolistsAC(res.data));
    });
};
export const setTaskTC = (todolistId) => (dispatch) => {
    api.getTask(todolistId)
        .then(res => {
            dispatch(setTasksAC(res.data.items, todolistId));
        });
};
export const addTodolistTC = (title) => (dispatch) => {
    api.createTodoList(title).then(res => {
        dispatch(addTodolistAC(res.data.data.item));
    });
};
export const changeTaskTC = (taskId, obj, todolistId) => {
    debugger
    return (dispatch, getState) => {
        debugger
        const selectedTodo = getState().todolists.find(tl => tl.id === todolistId)
        selectedTodo.tasks.forEach(t => {
            debugger
            if (t.id === taskId) {
                debugger
                api.updateTask(taskId, todolistId,{...t, ...obj})
                    .then(res => {
                        debugger
                        dispatch(updateTaskAC(taskId, obj, todolistId))
                    })
            }
        })
    };
}
export const deleteTodolistTC = (todolistId) => (dispatch) => {
    api.deleteTodolist(todolistId)
        .then(res => {
            dispatch(deleteTodolistAC(todolistId));
        });
};
export const deleteTaskTC = (todolistId, taskId) => (dispatch) => {
    api.deleteTodolist(todolistId, taskId)
        .then(res => {
            dispatch(deleteTaskAC(todolistId, taskId));
        });
};
export const createTaskTC = (newText, todolistId) => (dispatch) => {
    debugger
    api.createTask(newText, todolistId)
        .then(res => {
            if (res.data.resultCode === 0) {
                dispatch(addTaskAC(res.data.data.item, todolistId));
            }

        });
};


export default reducer;
