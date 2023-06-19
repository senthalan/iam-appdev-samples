import { useAuthContext } from "@asgardeo/auth-react";
import { TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FunctionComponent, ReactElement } from "react";
import { getCreatedTasks } from "../api/manage/view-created-tasks";
import { getAssignedTasks } from "../api/me/view-assigned-tasks";

export interface ListTasksInterface {
    opertation: string;
}

export const ListTasks: FunctionComponent<ListTasksInterface> = (
    props: ListTasksInterface 
): ReactElement => {

    const {
        opertation
    } = props;

    const { getAccessToken } = useAuthContext();
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        
        async function listTasks(operation: string) {
            const accessToken = await getAccessToken();
            if (operation === "ListCreatedTasks") {
                const response = await getCreatedTasks(accessToken);
                setTasks(response.data)
            } else if (operation === "ListAssignedTasks") {
                const response = await getAssignedTasks(accessToken);
                setTasks(response.data);
            }   
        }
        
        listTasks(opertation);
    }, [opertation]);

    return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell>Title</TableCell>
                            <TableCell align="left">Description</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {tasks.map((row) => (
                            <TableRow
                            key={row.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                            <TableCell component="th" scope="row">
                                {row.title}
                            </TableCell>
                            <TableCell align="left">{row.description}</TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                </TableContainer>
        );
};

