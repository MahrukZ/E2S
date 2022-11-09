export class UserService {
    public async getAllUsers(): Promise<any> {
        const response = await fetch('http://localhost:8080/users');
        return response.json();
    }

    public async getUsers(): Promise<any> {
        const fetchData = () => {
            fetch("http://localhost:8080/users")
                .then(response => {
                    return response.json();
                })
        }
        return fetchData;
    }
}