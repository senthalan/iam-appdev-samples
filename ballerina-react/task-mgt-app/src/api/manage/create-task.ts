import { AxiosResponse } from "axios";
import { Task } from "../type/task";
import { getTaskManageInstance } from "./instance";

export async function postTask(accessToken: string, payload?: Task) {
  
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  const response = await getTaskManageInstance().post("/tasks", payload, {
    headers: headers,
  });
  return response as AxiosResponse<Task>;
}