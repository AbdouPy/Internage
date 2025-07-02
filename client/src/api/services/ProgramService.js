import axios from "axios";

const API_URL = "http://localhost:3001/api/programs";

// Get all programs
export const getAllPrograms = () => axios.get(API_URL);

// Create a new program
export const createProgram = (programData) => axios.post(API_URL, programData);

// Get program by ID
export const getProgramById = (id) => axios.get(`${API_URL}/${id}`);

// Update program
export const updateProgram = (id, programData) => axios.put(`${API_URL}/${id}`, programData);

// Delete program
export const deleteProgram = (id) => axios.delete(`${API_URL}/${id}`);
