import axios from 'axios';
import { AudioInfo } from './types';

const axiosClient = axios.create({
  baseURL: process.env.API_URL!,
});

export const getAudioInfo = (id: string) =>
  axiosClient.get<AudioInfo>(`/audio/${id}`);

export const downloadAudioApi = (id: string, options: any) =>
  axiosClient.post(
    `/audio`,
    { id },
    {
      responseType: 'blob',
      ...options,
    }
  );
