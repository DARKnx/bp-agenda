import { AxiosError, AxiosRequestConfig } from "axios";

import { IEventCreate } from "../types/event";
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

export const createSchedule = async (body: IEventCreate): Promise<any> => {
    try {
        const response = await api.post('event/create', body);
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

export const getBrokersSchedule = async ({id, date}: {id: String, date: Date}): Promise<any> => {
    try {
        const response = await api.post('event/broker-schedule', {id, date});
        const data = response.data;
        return data;

    } catch (err) {
        return { error: (err instanceof AxiosError) ? err.response?.data.msg : 'Erro desconhecido.' };
    }
}