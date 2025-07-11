import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL + "/notes";

// Auth header helper
const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

//  CREATE a new note
export const createNote = async (noteData, token) => {
  const res = await axios.post(API_BASE_URL, noteData, authHeaders(token));
  return res.data.note;
};

//  GET all notes for logged-in user
export const getUserNotes = async (token) => {
  const res = await axios.get(API_BASE_URL, authHeaders(token));
  return res.data.notes;
};

//  GET a single note by slug
export const getNoteBySlug = async (slug, token) => {
  const res = await axios.get(`${API_BASE_URL}/${slug}`, authHeaders(token));
  return res.data.note;
};

//  UPDATE a note by slug
export const updateNote = async (slug, updatedData, token) => {
  const res = await axios.put(`${API_BASE_URL}/${slug}`, updatedData, authHeaders(token));
  return res.data.note;
};

//  SOFT DELETE (move to trash)
export const deleteNote = async (slug, token) => {
  const res = await axios.patch(`${API_BASE_URL}/${slug}/trash`, {}, authHeaders(token));
  return res.data;
};

//  PERMANENT DELETE (only from Trash page)
export const permanentDeleteNote = async (slug, token) => {
  const res = await axios.delete(`${API_BASE_URL}/${slug}/permanent`, authHeaders(token));
  return res.data;
};

//  RESTORE from trash
export const restoreNote = async (slug, token) => {
  const res = await axios.patch(`${API_BASE_URL}/${slug}/restore`, {}, authHeaders(token));
  return res.data.note;
};

//  Get all trashed notes
export const getTrashedNotes = async (token) => {
  const res = await axios.get(`${API_BASE_URL}/trash/all`, authHeaders(token));
  return res.data.notes;
};

// TOGGLE pin/unpin
export const togglePin = async (slug, token) => {
  const res = await axios.patch(`${API_BASE_URL}/${slug}/pin`, {}, authHeaders(token));
  return res.data.note;
};

//  TOGGLE archive/unarchive
export const toggleArchive = async (slug, token) => {
  const res = await axios.patch(`${API_BASE_URL}/${slug}/archive`, {}, authHeaders(token));
  return res.data.note;
};
