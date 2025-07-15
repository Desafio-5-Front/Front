import axios from 'axios';
import { API_BASE_URL } from './config';

export interface HealthUnit {
  id: string;
  displayName?: {
    text: string;
  };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
}

export async function fetchHealthUnits(category: string, municipio: string): Promise<Record<string, HealthUnit[]>> {
  try {
    const params: any = { category };
    if (municipio !== 'todos') {
      params.municipio = municipio;
    }

    const response = await axios.get(`${API_BASE_URL}/health-units`, { params });
    return response.data || {};
  } catch (error) {
    console.error('Erro ao buscar unidades de saúde:', error);
    throw new Error('Falha ao carregar unidades de saúde');
  }
}

export async function fetchMunicipios(): Promise<string[]> {
  try {
    const response = await axios.get(`${API_BASE_URL}/municipios`);
    return response.data || [];
  } catch (error) {
    console.error('Erro ao buscar municípios:', error);
    throw new Error('Falha ao carregar municípios');
  }
}