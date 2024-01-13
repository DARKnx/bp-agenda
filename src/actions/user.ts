import { UserSignIn, UserSignUp } from "../types/user";
import setAuthToken from "../utils/setAuthToken";
import { useUserStore } from "../stores/user";
import api from "../utils/api";

export const getUser = async (): Promise<any> => {
    try {
        const response = await api.get('user/get-user');
        const data = response.data?.user;
        const store = useUserStore();
        store.$patch({...data});
        return data;

    } catch(err){
        console.log(err);
    }
}
export const signIn = async ({ email, password }: UserSignIn): Promise<any> => {
    try {
        const response = await api.post('/user/signin', { email, password });
        const token = response.data.token;
        if (!token) return {
            message: "erro na autenticação"
        } 
        await setAuthToken(token);
        var user = await getUser();
        return user
    } catch(err){
        console.log(err);
    }
}
export const signUp = async ({ email, password, name }: UserSignUp): Promise<any> => {
    try {

    } catch(err){

    }
}
