import BackendClient from "../../infra/client/BackendClient";
import { Firmware, Firmwares } from "../models";

export const getAllFirmware = async (): Promise<Firmwares> => {
    try {
        const response = await BackendClient.get<Firmwares>('/firmware/get/?is_deleted=false');
        return response.data 
      } catch (error) {
        console.error('Falha ao buscar dados dos firmwares:', error);
        throw error
      }
}

export const getFirmwareByID = async (id: string): Promise<Firmware> => {
    try {
        const response = await BackendClient.get<Firmware>(`/firmware/get/${id}/`);
        return response.data 
      } catch (error) {
        console.error('Falha ao buscar dados do firmware:', error);
        throw error
      }
}	

export const addFirmware = async (firmware: {code:string,name:string}): Promise<Firmware> => {
    try {
        const response = await BackendClient.post<Firmware>('/firmware/create/', firmware);
        return response.data 
      } catch (error) {
        console.error('Falha ao adicionar firmware:', error);
        throw error
      }
}

export const updateFirmware = async (firmware: Firmware): Promise<Firmware> => {
    try {
        const response = await BackendClient.patch<Firmware>(`/firmware/update/${firmware.uuid}/`, firmware);
        return response.data 
      } catch (error) {
        console.error('Falha ao atualizar firmware:', error);
        throw error
      }
}