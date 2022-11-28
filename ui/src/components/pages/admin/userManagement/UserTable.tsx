import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { UserManagementService } from '../../../../services/userManagement.service';

interface IUserManagement {
    userId: number,
    firstName: string,
    lastName: string,
    email: string,
    organisation: string,
    noSitesManaged: number,
    role: string
}

function UserTable() {
    const [usersList, setUsersList] = useState<IUserManagement[]>([]);

    const mUsers: IUserManagement[] = [
        {
            userId: 1,
            firstName: "John",
            lastName: "Doe",
            email: "john.doe@gmail.com",
            organisation: "Cardiff University",
            noSitesManaged: 3,
            role: "facility energy manager"
        },
        {
            userId: 3,
            firstName: "Blake",
            lastName: "Green",
            email: "blake.green@gmail.com",
            organisation: "E2S",
            noSitesManaged: 0,
            role: "admin"
        },
        {
            userId: 1,
            firstName: "Sofie",
            lastName: "O'hare",
            email: "sofie.o@gmail.com",
            organisation: "NHS",
            noSitesManaged: 5,
            role: "director of estates"
        }
    ];
    

    useEffect(() => {
        setUsersList(mUsers);
    }, []);

    const u = usersList.map((data, id) => {
        return <tr>
            <td>{data.userId}</td>
            <td>{data.firstName}</td>
            <td>{data.lastName}</td>
            <td>{data.email}</td>
            <td>{data.organisation}</td>
            <td>{data.noSitesManaged}</td>
            <td>{data.role}</td>
        </tr>
    });
    console.log(usersList);

    return (
        <>
        <div className="container">
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email Address</th>
                        <th>Organisation</th>
                        <th>No Of Sites Managed</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {u}
                </tbody>
            </Table>
        </div>
        </>
    );
};

export default UserTable;