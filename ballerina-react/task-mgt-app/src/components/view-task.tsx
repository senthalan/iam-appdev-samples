import React, { ReactElement } from "react";
import { FunctionComponent } from "react";

export interface ViewTaskInterface {
    accessToken: string;
    taskId: string;
    operation: string;
}

export const ViewTask: FunctionComponent<ViewTaskInterface> = ( 
    props: ViewTaskInterface 
): ReactElement => { 

    const {
        accessToken,
        taskId,
        operation
    } = props;

    return (
        <>
                
        </>
    );
}