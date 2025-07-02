import axios from "axios";

const API_URL = "http://localhost:3001/api/interns";

// Get all interns
export const getAllInterns = () => axios.get(API_URL);

// Create a new intern
export const createIntern = (internData) => axios.post(API_URL, internData);

// Get intern by ID
export const getInternById = (id) => axios.get(`${API_URL}/${id}`);

// Update intern
export const updateIntern = (id, internData) => axios.put(`${API_URL}/${id}`, internData);

// Delete intern
export const deleteIntern = (id) => axios.delete(`${API_URL}/${id}`);
