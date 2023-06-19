import { AxiosResponse } from "axios";
import { Task } from "../type/task";
import { getTaskMeInstance } from "./instance";

export async function getAssignedTasks(accessToken: string) {
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    const response = await getTaskMeInstance().get("/tasks", {
      headers: headers,
    });
    return response as AxiosResponse<Task[]>;
}