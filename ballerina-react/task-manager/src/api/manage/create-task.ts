import { AxiosResponse } from "axios";
import { Task } from "../type/task";
import { initInstance } from "../instance";

export async function postTask(baseURL: string, accessToken: string, payload?: Task) {
  
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await initInstance(baseURL).post("/tasks", payload, {
    headers: headers,
  });
  return response as AxiosResponse<Task>;
}