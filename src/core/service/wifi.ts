import BackendClient from "../../infra/client/BackendClient";
import { Wifi, Wifis } from "../models";

export const getAllWifi = async (): Promise<Wifis> => {
    try {
        const response = await BackendClient.get<Wifis>('/wifi/get/?is_deleted=false');
        return response.data 
      } catch (error) {
        console.error('Falha ao buscar dados dos Wifis:', error);
        throw error
      }
}

export const getWifiByID = async (id: string): Promise<Wifi> => {
    try {
        const response = await BackendClient.get<Wifi>(`/Wifi/get/${id}/`);
        return response.data 
      } catch (error) {
        console.error('Falha ao buscar dados do Wifis:', error);
        throw error
      }
}	

export const createWifi = async (values: { SSDI: string; password: string }): Promise<Wifi> => {
    try {
        const response = await BackendClient.post<Wifi>('/wifi/create/', values);
        return response.data 
      } catch (error) {
        console.error('Falha ao criar Wifi:', error);
        throw error
      }
}