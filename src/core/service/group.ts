import BackendClient from "../../infra/client/BackendClient";
import { Groups, Group } from "../models";

export const getAllGroup = async (): Promise<Groups> => {
    try {
        const response = await BackendClient.get<Groups>('/group/get/?is_deleted=false');
        return response.data 
      } catch (error) {
        console.error('Falha ao buscar dados dos grupos:', error);
        throw error
      }
}

export const getByID = async (id?: string): Promise<Group> =>{
  try {
    const response = await BackendClient.get<Group>(`group/get/${id}/`);
    return response.data
  } catch (error) {
    throw error
  }
}


export const addFirmwareToGroup = async (firmwareID: string, groupID: string): Promise<Group> => {
    try {
        const data = {
            firmware_id: firmwareID,
            group_id: groupID
        }
        const response = await BackendClient.post<Group>(`/group/create/add-firmware/`,data);
        return response.data 
      } catch (error) {
        console.error('Falha ao adicionar firmware ao grupo:', error);
        throw error
      }
}

export const addWifiToGroup = async (wifiID: string, groupID: string): Promise<Group> => {
    try {
        const data = {
            wifi_id: wifiID,
            group_id: groupID
        }
        const response = await BackendClient.post<Group>(`/group/create/add-wifi/`,data);
        return response.data 
      } catch (error) {
        console.error('Falha ao adicionar wifi ao grupo:', error);
        throw error
      }
}

export const initializeGroupOta = async( group_id: string): Promise<Group> => {
  try {
    const response = await BackendClient.post<Group>(`/group/create/initialize-ota/${group_id}/`);
    return response.data
  } catch (error) {
    throw error
  }
}

export const createGroup = async (values: { name: string }): Promise<Group> => {
    try {
        const response = await BackendClient.post<Group>('/group/create/', values);
        return response.data 
      } catch (error) {
        console.error('Falha ao criar grupo:', error);
        throw error
      }
}