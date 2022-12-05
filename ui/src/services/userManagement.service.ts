import axios from "axios";

export class UserManagementService {
  public async findUserManagementByUserId(userId: number): Promise<any> {
    const response = await axios.get(`/api/user-management/${userId}`);
    return await response.data;
  }

  public async getAllUserManagements(): Promise<any> {
    const response = await axios.get("/api/user-managements");
    return await response.data;
  }
}
