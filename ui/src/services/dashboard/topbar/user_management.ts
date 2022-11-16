export class UserManagementService {

    public async findUserManagementByUserId(userId: number): Promise<any> {
        const response = await fetch(`/api/user_management/${userId}`);
        return await response.json();
    }

}
