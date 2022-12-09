import axios from "axios";
import { IUser } from "../components/pages/admin/userManagement/UserTable";
axios.defaults.withCredentials = true;

export class UsersService {
    public async findUserByEmailAndPassword(
        email: string,
        password: string
    ): Promise<any> {
        const response = await axios.get(`/api/users/${email}/${password}`);
        return await response.data;
    }

    public async getAllUsers(): Promise<any> {
        const response = await axios.get("/api/users");
        return await response.data;
    }

    public async signIn(email: string, password: string): Promise<any> {
        const response = await axios.post(`/sign-in`, {
            email: email,
            password: password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        return await response.data;
    }

    public async signOut(): Promise<any> {
        const response = await axios.post(`/sign-out`);
        return await response.data;
    }

    public async checkSignIn(): Promise<any> {
        const response = await axios.get("/sign-in");
        return await response.data;
    }

    public async createUser(user: IUser): Promise<any> {
        const response = await axios.post(`/api/user`, user);
        return await response.data;
    }

    public async deleteUser(userId: number): Promise<any> {
        const response = await axios.delete(`/api/user/${userId}`);
        return await response.data;
    }

    public async updateUser(user: IUser): Promise<any> {
        const response = await axios.put(`/api/user`, user);
        return await response.data;
    }
}
