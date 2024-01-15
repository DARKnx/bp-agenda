import { AxiosError } from "axios";

import api from "../utils/api";


export const getSchedule = async (): Promise<any> => {
    try {
        const response = await api.get('event/get-all');
        const data = response.data;
        return data;

    } catch (err) {
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}

export const getBrokers = async (): Promise<any> => {
    try {
        const response = await api.get('user/get-all', { role: 'corretor'} as any);
        const data = response.data;
        return data;

    } catch (err) {
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}