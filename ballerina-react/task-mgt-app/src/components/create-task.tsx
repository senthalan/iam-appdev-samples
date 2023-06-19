import { useAuthContext } from "@asgardeo/auth-react";
import React, { useState } from "react";
import { FunctionComponent, ReactElement } from "react";
import { postTask } from "../api/manage/create-task";
import { Task } from "../api/types/task";

export const CreateTask: FunctionComponent = (): ReactElement => {

    const { getAccessToken } = useAuthContext();
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [assigedUserId, setAssigedUserId] = useState<string>("");
    const [taskCreated, setTaskCreated] = useState<boolean>(false);

    const handleOnSubmit = () => {
        
        async function createTask() {
            const accessToken = await getAccessToken();
            const payload: Task = {
            title: title,
            description: description,
            assignedUser: assigedUserId
            };
            const response = await postTask(accessToken, payload);
            response.status === 201 ? setTaskCreated(true) : setTaskCreated(false);
        }
    };

    return (
        <div className="mt-2">
            <form className="bg-white rounded pt-2 pb-1" onSubmit={handleOnSubmit}>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Title
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="title"
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Description
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="description"
                    type="text"
                    placeholder="description"
                    onChange={(e) => setDescription(e.target.value)}
                />
                </div>
                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Assigned User ID
                </label>
                <input
                    className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="assignedUser"
                    type="text"
                    placeholder="assignedUser"
                    onChange={(e) => setAssigedUserId(e.target.value)}
                />
                </div>
                <div className="mt-12">
                  <button
                    type="button"
                    className="btn primary"
                    // className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleOnSubmit}
                  >
                    Create Task
                  </button>
                </div>
            </form>
        </div>
    );
};