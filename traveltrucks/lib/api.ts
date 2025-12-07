import axios from "axios";

/* ----------------------------- */
/* Camper interface              */
/* ----------------------------- */
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

  AC?: boolean;
  kitchen?: boolean;
  bathroom?: boolean;
  TV?: boolean;
  radio?: boolean;
  refrigerator?: boolean;
  microwave?: boolean;
  gas?: boolean;
  water?: boolean;

  form?: string;
  length?: string;
  width?: string;
  height?: string;
  tank?: string;
  consumption?: string;

  reviews?: {
    id: string;
    name: string;
    rating: number;
    text: string;
  }[];
}

/* ----------------------------- */
/* Base URL configuration        */
/* ----------------------------- */
const BASE_URL =
  process.env.NODE_ENV === "development"
    ? process.env.NEXT_PUBLIC_LOCAL_URL // localhost:3000
    : process.env.NEXT_PUBLIC_API_URL; // MockAPI

if (!BASE_URL) {
  throw new Error(
    "❌ BASE_URL is missing. Please check your .env.local or environment variables"
  );
}

/* ----------------------------- */
/* Query params interface        */
/* ----------------------------- */
export interface CamperParams {
  page?: number;
  limit?: number;
  location?: string;
  bodyType?: string;
  features?: string[]; // local filtering
}

/* ---------------------------------- */
/* Fetch campers with pagination      */
/* ---------------------------------- */
export async function fetchCampers(params?: CamperParams): Promise<Camper[]> {
  try {
    const query: Record<string, string | number> = {};

    if (params?.page) query.page = params.page;
    if (params?.limit) query.limit = params.limit;
    if (params?.location) query.location = params.location;
    if (params?.bodyType) query.bodyType = params.bodyType;

    const endpoint = `${BASE_URL}/campers`;

    const { data } = await axios.get(endpoint, { params: query });

    if (!Array.isArray(data)) {
      console.warn(`⚠️ Expected array from ${endpoint}, got:`, data);
      return [];
    }

    return data;
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("fetchCampers error:", err.message);
  } else {
    console.error("fetchCampers error:", err);
  }
  return [];
}
}

/* ---------------------------------- */
/* Fetch single camper by ID          */
/* ---------------------------------- */
export async function fetchCamperById(id: string): Promise<Camper | null> {
  try {
    if (!id) return null;
    const endpoint = `${BASE_URL}/campers/${id}`;
    const { data } = await axios.get(endpoint);

    if (!data) return null;
    return data;
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("fetchCamperById error:", err.message);
  } else {
    console.error("fetchCamperById error:", err);
  }
  return null;
}
}