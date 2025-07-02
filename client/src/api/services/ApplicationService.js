import axios from "axios";

const API_URL = "http://localhost:3001/api/applications";

export const getAllApplications = () => axios.get(API_URL);

export const createApplication = (applicationData) =>
  axios.post(API_URL, applicationData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

export const getApplicationById = (id) => axios.get(`${API_URL}/${id}`);

export const updateApplication = (id, updatedData) =>
  axios.put(`${API_URL}/${id}`, updatedData);

export const updateStatus = (intern_id, program_id, status) => {
  return axios.put(
    `${API_URL}/${intern_id}/${program_id}/status`,
    { status }, // Only the body goes here
    {
      headers: {
        "x-admin-key": "admin"
      }
    }
  );
};


export const deleteApplication = (id) => axios.delete(`${API_URL}/${id}`);


export const fetchApplicationStats = async () => {
  const response = await axios.get("http://localhost:3001/api/applications/stats");
  return response.data;  // { total, pending, accepted, rejected }
};
