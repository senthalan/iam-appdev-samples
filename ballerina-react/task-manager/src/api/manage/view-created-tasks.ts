import { AxiosResponse } from "axios";
import { Task } from "../type/task";
import { initInstance } from "../instance";

export async function getCreatedTasks(baseURL: string, accessToken: string) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await initInstance(baseURL).get("/tasks", {
      headers: headers,
    });
    return response as AxiosResponse<Task[]>;
}