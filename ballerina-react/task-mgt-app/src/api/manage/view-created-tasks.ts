import { AxiosResponse } from "axios";
import { Task } from "../type/task";
import { getTaskManageInstance } from "./instance";

export async function getCreatedTasks(accessToken: string) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await getTaskManageInstance().get("/tasks", {
      headers: headers,
    });
    return response as AxiosResponse<Task[]>;
}