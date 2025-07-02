// services/AssignmentService.js

import axios from "axios";

const API_URL = "http://localhost:3001/api/assignments";

export const createAssignment = (data) => {
  return axios.post(API_URL, data);
};

export const getAssignments = () => {
  return axios.get(API_URL);
};

export const getAssignmentById = (id) => {
  return axios.get(`${API_URL}/${id}`);
};

export const updateAssignment = (id, data) => {
  return axios.put(`${API_URL}/${id}`, data);
};

export const deleteAssignment = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};
