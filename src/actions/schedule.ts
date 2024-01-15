import { AxiosError, AxiosRequestConfig } from "axios";

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
        const response = await api.get('user/get-all');
        const data = response.data;
        return data;

    } catch (err) {
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}

export const getBrokersSchedule = async (): Promise<any> => {
    try {
        const response = await api.post('user/broker-schedule');
        const data = response.data;
        return data;

    } catch (err) {
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}