import BackendClient from "../../infra/client/BackendClient";
import { Devices, Device } from "../models";

export const getAllDevice = async (): Promise<Devices> => {
    try {
        const response = await BackendClient.get<Devices>('/device/get/?is_deleted=false');
        return response.data 
      } catch (error) {
        console.error('Falha ao buscar dados dos dispositivos:', error);
        throw error
      }
}

export const addDeviceToGroup = async (device_id: string, group_id: string ): Promise<Device> =>{
    try{
     const data = {
        device_id,
        group_id
     }

     const response = await BackendClient.post<Device>('/group/create/add-device/',data);
     return response.data
    }catch(error){
        console.error('Falha ao adicionar firmware ao grupo:', error);
        throw error
    }
}