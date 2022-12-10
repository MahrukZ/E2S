import AddUser from "./AddUser";
import UserTable from "./UserTable";

function UserManagementPage() {
  return (
    <div className="text-center">
      <h1>User Management</h1>
      <AddUser />
      <UserTable />
    </div>
  );
}

export default UserManagementPage;
