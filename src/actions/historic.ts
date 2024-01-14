import { AxiosError } from "axios";

import api from "../utils/api";


export const getHistoric = async (): Promise<any> => {
    try {
        const response = await api.get('historic/get-all');
        const data = response.data;
        return data;

    } catch (err) {
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}