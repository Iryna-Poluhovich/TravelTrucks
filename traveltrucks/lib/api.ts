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
/* 🔥 ALWAYS MockAPI fallback    */
/* ----------------------------- */
const MOCK_API = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io";

/**
 * NEXT_PUBLIC_API_URL is optional now.
 * If it’s missing → automatically fallback to MOCK_API.
 */
const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL?.trim() ||
  process.env.NEXT_PUBLIC_BASE_API_URL?.trim() ||
  MOCK_API;

console.log("🔗 API BASE_URL:", BASE_URL);

/* ----------------------------- */
/* Query params interface        */
/* ----------------------------- */
export interface CamperParams {
  page?: number;
  limit?: number;
  location?: string;
  bodyType?: string;
  features?: string[];
}

/* ------------------------------------------------ */
/* Helper: safe GET that never throws 404           */
/* ------------------------------------------------ */
async function safeGet<T>(url: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    const response = await axios.get<T>(url, { params });
    return response.data ?? null;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.warn(`⚠️ API request failed: ${url}`);
      console.warn("Reason:", error.response?.status, error.message);
    } else {
      console.warn("⚠️ Unknown error:", error);
    }
    return null;
  }
}

/* ---------------------------------- */
/* Fetch campers with pagination      */
/* ---------------------------------- */
export async function fetchCampers(params?: CamperParams): Promise<Camper[]> {
  const endpoint = `${BASE_URL}/campers`;

  const query: Record<string, string | number> = {};

  if (params?.page) query.page = params.page;
  if (params?.limit) query.limit = params.limit;
  if (params?.location) query.location = params.location;
  if (params?.bodyType) query.bodyType = params.bodyType;

  const data = await safeGet<Camper[]>(endpoint, query);

  if (!data) return [];
  if (!Array.isArray(data)) {
    console.warn(`⚠️ Expected array from ${endpoint}, got:`, data);
    return [];
  }

  return data;
}

/* ---------------------------------- */
/* Fetch single camper by ID          */
/* ---------------------------------- */
export async function fetchCamperById(id: string): Promise<Camper | null> {
  if (!id) return null;

  const endpoint = `${BASE_URL}/campers/${id}`;

  const data = await safeGet<Camper>(endpoint);

  return data ?? null;
}
