// src/api/authAPI.js
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export async function registerUser(userData) {
  const res = await axios.post(`${API_BASE_URL}/auth/register`, userData);
  return res.data; // return only the payload
}

export async function loginUser(credentials) {
  const res = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
  return res.data; //  return only the payload
}

export async function getProfile(token) {
  const res = await axios.get(`${API_BASE_URL}/auth/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data; //  return only the user data
}
