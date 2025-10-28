
import { PurchaseRequest } from "@/types/request";

// Mock storage key
const STORAGE_KEY = 'purchase_requests';

// Get requests from local storage
export const getRequests = (): PurchaseRequest[] => {
  const requests = localStorage.getItem(STORAGE_KEY);
  return requests ? JSON.parse(requests) : [];
};

// Save a new request
export const saveRequest = (request: Omit<PurchaseRequest, 'id' | 'requestDate' | 'status'>): PurchaseRequest => {
  const requests = getRequests();
  
  const newRequest: PurchaseRequest = {
    ...request,
    id: `req_${Date.now()}`,
    requestDate: new Date().toISOString(),
    status: 'pending'
  };
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...requests, newRequest]));
  return newRequest;
};

// Remove a request
export const removeRequest = (id: string): boolean => {
  const requests = getRequests();
  const filteredRequests = requests.filter(request => request.id !== id);
  
  if (filteredRequests.length < requests.length) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredRequests));
    return true;
  }
  
  return false;
};
