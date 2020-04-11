import axios from "axios";
import {TaskType, TodoType} from "./types/entities";



type CreateTodoResponseType = {
    data:{
        item:TodoType
    }
    messages:string[]
    resultCode:number
}
type GetTasksResponseType = {
    items:TaskType[]
    totalCount:number
    error: string|null
}


const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    // меняем API-KEY на собственный
    headers: {"API-KEY": "aee8e0dc-0edb-41fe-ae30-2037f01a0933"}
});

export const api = {
    getTodolists() {
        return instance.get<TodoType[]>("");
    },
    createTodolist(title:string) {
        return instance.post<CreateTodoResponseType>("", {title})
    },
    deleteTodolist(todolistId:string) {
        return instance.delete(`/${todolistId}` )
    },
    updateTodolistTitle(title:string, todolistId:string) {
        return instance.put(`/${todolistId}`, {title: title})
    },
    getTasks(todolistId:string) {
        return instance.get<GetTasksResponseType>(`/${todolistId}/tasks`)
    },

    createTask(newTaskTitle:string, todolistId:string) {
        return instance.post(`/${todolistId}/tasks`, {title: newTaskTitle});
    },
    updateTask(taskId:string, todolistId:string, task:TaskType) {
        return instance.put(`/${todolistId}/tasks/${taskId}`,  task);
    },
    deleteTask(taskId:string, todolistId:string) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    }
};




