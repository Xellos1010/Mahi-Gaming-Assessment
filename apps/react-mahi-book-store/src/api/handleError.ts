import axios from "axios";

export const handleError = (error: any) => {
    let message = "Something went wrong. Please try again.";
    
    if (axios.isAxiosError(error)) {
        message = error.response?.data?.message || message; // Modify according to your server's error response format
    }
    
    console.error("API Error:", message);
    return message;
};
