import axiosClient from "../config/axios";

// Get current seller
export const getCurrentSeller = () =>
  JSON.parse(localStorage.getItem("userData"));

//Get all clients
export const getClients = (sellerId) => {
  return axiosClient.get(`/users?role=client&sellerId=${sellerId}`);
};

export const statusOptions = [
  { value: "completed", label: "Відправлено" },
  { value: "pending", label: "Очікується" },
  { value: "canceled", label: "Скасовано" },
];
