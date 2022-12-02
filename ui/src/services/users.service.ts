import axios from "axios";

export class UsersService {

    public async findUserByEmailAndPassword(email: string, password: string): Promise<any> {
        const response = await axios.get(`/api/users/${email}/${password}`);
        return await response.data;
    }

    public async getAllUsers(): Promise<any> {
        const response = await axios.get("/api/users");
        return await response.data;
    }
}
