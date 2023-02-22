import request from "./api-request-helper";

class UsersApi {
    /************************************CORRECT USER OR ADMIN ONLY************************************/

    /*method for logging in
    form = {username, password}
    */
    static async login(loginForm) {
        const res = await request("auth/token", "", "POST", loginForm);

        return res;
    }


    /*method for logging in
    form = {username, password, firstName, lastName, email}
    */
    static async register(registerForm) {
        const res = await request("auth/register", "", "POST", registerForm);

        return res;
    }

    /*method for getting user's own info
    form = { username, firstName, lastName, email, isAdmin, currencyAmount }
    returns user object { username, firstName, lastName, email, isAdmin, currencyAmount }
    */
    static async currUser(username, token) {
        const res = await request(`user/${username}`, token);

        return res;
    }

    /*method for updating user's own info
    updatedInfo should contain {password, firstName, lastName}
    returns {user:{ username, firstName, lastName, email, isAdmin, currencyAmount }}
    */
    static async patchUserDetails(username, dataToUpdate, token) {

        const res = await request(`user/${username}`, token, "PATCH", dataToUpdate);

        return res;
    }

    /*method for deleting a user
    updatedInfo should contain {password, firstName, lastName}
    returns {user:{ username, firstName, lastName, email, isAdmin, currencyAmount }}
    */
    static async deleteUser(username, token) {
        const res = await request(`user/${username}`, token, "DELETE", {});

        return res;
    }

    /*******************ADMIN ONLY************************************/

    /*method for getting a list of all users
    returns {users: [{ username, firstName, lastName},...]}
    */
    static async getAllUsers(token) {
        const res = await request("user/admin/allusers", token);

        return res;
    }

    /*method for creating admin
    returns object {users: [{ username, firstName, lastName},...]}
    */
    static async createAdmin(form, token) {
        const res = await request("user/admin/createuser", token, "POST", form);

        return res;
    }
};

export default UsersApi;
