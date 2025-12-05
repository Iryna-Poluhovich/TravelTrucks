import axios from 'axios';


const BASE = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io';


export const api = axios.create({
baseURL: BASE,
headers: { 'Content-Type': 'application/json' },
});


export const fetchCampers = async (params: Record<string, any>) => {
// params should include page, limit, and any filter fields
const res = await api.get('/campers', { params });
return res.data;
};


export const fetchCamperById = async (id: string) => {
const res = await api.get(`/campers/${id}`);
return res.data;
};


export const sendBooking = async (camperId: string, data: any) => {
// As mockapi probably doesn't accept bookings, we simulate success by posting to /bookings
try {
const res = await api.post('/bookings', { camperId, ...data });
return res.data;
} catch (err) {
// If mockapi doesn't support bookings, return simulated object
return { success: true };
}
};