import { initialApi } from "../../axios/interceotor.js";



export const getUser = async () => {
    try {
        let res = await initialApi.get("/user/");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const getLastLoginUsers = async () => {
    try {
        let res = await initialApi.get("/user/lastLoginusers");
        return res.data;
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = async (data) => {
    try {
        let res = await initialApi.post("/user/login", data);
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};


export const editUser = async (id, data) => {
    try {
        const response = await initialApi.patch("/user/edit/" + id, data);
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await initialApi.delete("/user/delete/" + id);
        return response.data.data;
    } catch (error) {
        console.log(error);
    }
};
