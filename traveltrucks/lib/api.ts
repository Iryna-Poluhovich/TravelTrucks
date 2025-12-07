import axios from "axios";

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  gallery: string[];
  adults: number;
  engine: string;
  transmission: string;

  // features (booleans in backend)
  AC?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;

  // details
  form?: string;
  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  consumption?: string;

  // reviews optional (mock)
  reviews?: { id: string; name: string; rating: number; text: string }[];
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

export interface CamperParams {
  page?: number;
  limit?: number;
  location?: string;
  bodyType?: string;
  // features intentionally omitted because we'll filter locally
  features?: string[];
}

export async function fetchCampers(
  params?: CamperParams
): Promise<Camper[]> {
  try {
    const query: Record<string, string | number> = {};
    if (params) {
      if (params.page) query.page = params.page;
      if (params.limit) query.limit = params.limit;
      if (params.location) query.location = params.location;
      if (params.bodyType) query.bodyType = params.bodyType;
      // do not convert features here — local filter will handle it
    }

    const { data } = await axios.get(`${BASE_URL}/campers`, { params: query });
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error("fetchCampers error:", err);
    return [];
  }
}

export async function fetchCamperById(id: string): Promise<Camper | null> {
  try {
    const { data } = await axios.get(`${BASE_URL}/campers/${id}`);
    return data ?? null;
  } catch (err) {
    console.error("fetchCamperById error:", err);
    return null;
  }
}