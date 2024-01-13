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
                message: "Erro na autenticação"
            }; 
        }
        store.$patch({ user: data, isAuthenticated: true });
        localStorage.set('isAuthenticated', 'true');
        return data;

    } catch (err) {
        return {
            message:(err instanceof Error) ? err.message : 'Erro desconhecido'
        };
    }
}

export const signIn = async ({ email, password }: UserSignIn): Promise<any> => {
    try {
        const response = await api.post('/user/signin', { email, password });
        const token = response.data.token;
        if (!token) {
            return {
                message: "Erro na autenticação",
                error: "Token não encontrado"
            };
        }
        await setAuthToken(token);
        var user = await getUser();
        return user;
    } catch (err) {
        return {
            message: (err instanceof Error) ? err.message : 'Erro desconhecido'
               }
    }
}

export const signUp = async ({ email, password, name }: UserSignUp): Promise<any> => {
    try {

    } catch(err){

    }
}
