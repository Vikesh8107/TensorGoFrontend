import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getInvoices = async (token: string) => {
  const response = await api.get('/invoices', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};
