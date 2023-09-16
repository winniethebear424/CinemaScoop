// Define the state shape
export interface AuthState {
    token: string | null;
  }
  
  // Define possible action types
  export enum AuthActionTypes {
    SET_TOKEN = "SET_TOKEN",
    REMOVE_TOKEN = "REMOVE_TOKEN"
  }
  