import axios from "axios";
axios.defaults.withCredentials = true;

export class UsersService {

    public async findUserByEmailAndPassword(email: string, password: string): Promise<any> {
        const response = await axios.get(`/api/users/${email}/${password}`);
        return await response.data;
    }

    public async getAllUsers(): Promise<any> {
        const response = await axios.get("/api/users");
        return await response.data;
    }

    public async signIn(email: string, password: string): Promise<any> {
        const response = await axios.post(`/sign-in`, {
            "email": email,
            "password": password
        });
        const token = response.data.token; 
        localStorage.setItem("token", token);
        console.log("signed in. Token from local storage: ", localStorage.getItem("token"));
        return await response.data;
    }

    public async checkSignIn(): Promise<any> {
        const response = await axios.get("/sign-in");
        return await response.data;
    }

    public async checkAuth(token?: string): Promise<any> {
        const response = await axios.get("/is-user-auth", {headers: {
            "x-access-token": localStorage.getItem("token")
        }});
        return await response.data;
    }
}
