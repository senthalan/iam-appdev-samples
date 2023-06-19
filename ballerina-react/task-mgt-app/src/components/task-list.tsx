import React from "react";
import { FunctionComponent, ReactElement } from "react";

export interface ListTaskInterface {
    accessToken: string;
    associatedUserId: string;
    opertation: string;
}

export const ListTask: FunctionComponent<ListTaskInterface> = (
    props: ListTaskInterface 
): ReactElement => {

    const {
        accessToken,
        associatedUserId,
        opertation
    } = props;

    return (
        <>
                
        </>
    );
};