import axios from "axios"

export class UserManagementService {

    public async findUserManagementByUserId(userId: number): Promise<any> {
        const response = await axios.get(`/api/user_management/${userId}`);
        return await response.data;
    }

}
