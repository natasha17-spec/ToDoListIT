import axios from "axios";
import {TaskType, TodoType} from "../Types/entities";


type CommonResponseType<value> = {
    resultCode: number
    messages: string[]
    data: value
}
type GetTasksResponseType = {
    items: TaskType[]
    totalCount: number
    error: string | null
}

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.1/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "aee8e0dc-0edb-41fe-ae30-2037f01a0933"}
});

export const api = {
    getTodolists() {
        return instance.get<TodoType[]>("");
    },
    createTodolist(title: string) {
        return instance.post<CommonResponseType<{ item: TodoType }>>("", {title})
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<CommonResponseType<{}>>(`/${todolistId}`)
    },
    updateTodolistTitle(title: string, todolistId: string) {
        return instance.put(`/${todolistId}`, {title: title})
    },
    getTasks(todolistId: string) {
        return instance.get<GetTasksResponseType>(`/${todolistId}/tasks`)
    },
    createTask(newTaskTitle: string, todolistId: string) {
        return instance.post<CommonResponseType<{ item: TaskType }>>(`/${todolistId}/tasks`, {title: newTaskTitle});
    },
    updateTask(taskId: string, todolistId: string, task: TaskType) {
        return instance.put<CommonResponseType<{}>>(`/${todolistId}/tasks/${taskId}`, task)
    },
    deleteTask(taskId: string, todolistId: string) {
        return instance.delete<CommonResponseType<{}>>(`/${todolistId}/tasks/${taskId}`)
    }
};




