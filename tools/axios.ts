import axios, { AxiosInstance } from "axios";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000";
const BASE_URL = typeof window !== "undefined" ? "" : BACKEND_URL;

export default axios?.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const apiActions: AxiosInstance = axios?.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export const apiMultipartActions: AxiosInstance = axios?.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

