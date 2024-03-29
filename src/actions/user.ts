import { AxiosError } from "axios";

import { UserSignIn, UserSignUp } from "../types/user";
import setAuthToken from "../utils/setAuthToken";
import { useUserStore } from "../stores/user";
import api from "../utils/api";


export const getUser = async (): Promise<any> => {
    try {
        const response = await api.get('user/get-user');
        const data = response.data?.user;
        const store = useUserStore();
        if (!data){
            store.$reset();
            localStorage.removeItem('isAuthenticated');
            return {
                error: "Erro na autenticação."
            }; 
        }
        store.$patch({ user: data, isAuthenticated: true });
        localStorage.setItem('isAuthenticated', 'true');
        return data;

    } catch (err) {
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}

export const signIn = async ({ email, password }: UserSignIn): Promise<any> => {
    try {
        const response = await api.post('/user/signin', { email, password });
        const token = response.data.token;
        if (!token) {
            return {
                error: "Erro na autenticação."
            };
        }
        await setAuthToken(token);
        var user = await getUser();
        return user;
    } catch (err) {
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}

export const signUp = async ({ email, password, name, role }: UserSignUp): Promise<any> => {
    try {
        const response = await api.post('/user/signup', { email, password, name, role });
        const token = response.data.token;
        if (!token) {
            return {
                error: "Erro na autenticação."
            };
        }
        await setAuthToken(token);
        var user = await getUser();
        return user;
    } catch(err){
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}

export const updateUser = async ({ id, data }: { id?: string, data: object }): Promise<any> => {
    try {
        const response = await api.put('/user/update', id ? { id, data } : { data });
        const user = response.data.user;
        if (!user) {
            return {
                error: "Erro na atualização."
            };
        }
        console.log(user)
        await getUser();
        return user;
    } catch(err){
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}
export const deleteUser = async (): Promise<any> => {
    try {
        const response = await api.delete('/user/delete');
        const data = response.data;
        if (!data) {
            return {
                error: "Erro ao deletar."
            };
        }
        return data;
    } catch(err){
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}
