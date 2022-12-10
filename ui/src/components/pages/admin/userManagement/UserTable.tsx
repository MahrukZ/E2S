import { useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { UserManagementService } from "../../../../services/userManagement.service";
import DeleteBtn from "./DeleteBtn";

export interface IUser {
    userId?: number;
    firstName?: string;
    lastName?: string;
    email?: string;
    role?: string;
    password?: string;
    orgId?: number;
}

export interface IUserManagement {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    organisation: string;
    noSitesManaged: number;
    role: string;
}

function UserTable() {
    const [usersList, setUsersList] = useState<IUserManagement[]>([]);
    const userManagementService = new UserManagementService();

    useEffect(() => {
        const getAllUsers = async () => {
            const users = await userManagementService.getAllUserManagements();
            setUsersList(users.data);
        };
        getAllUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const userManagementData = usersList.map((data, id) => {
        return (
            <tr key={id}>
                <td>{data.userId}</td>
                <td>{data.firstName}</td>
                <td>{data.lastName}</td>
                <td>{data.email}</td>
                <td>{data.organisation}</td>
                <td>{data.noSitesManaged}</td>
                <td>{data.role}</td>
                <td>EDIT</td>
                <td>
                    <DeleteBtn id={data.userId} setUsersList={setUsersList} />
                </td>
            </tr>
        );
    });

    return (
        <>
            <Container>
                <Table id="userTable" striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email Address</th>
                            <th>Organisation</th>
                            <th>No Of Sites Managed</th>
                            <th>Role</th>
                            <th colSpan={2}>Actions</th>
                        </tr>
                    </thead>

                    <tbody>{userManagementData}</tbody>
                </Table>
            </Container>
        </>
    );
}

export default UserTable;
