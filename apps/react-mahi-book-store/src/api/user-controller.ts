
import { handleError } from "./handleError";
import { UserService } from "./services/user-service";
import { SingleUserResponseWithFavoriteBooksDto } from "@prismaDist/dtos/lib/user.dto";
export { addFavoriteBook, removeFavoriteBook } from './book-controller' //These endpoints live in the Book Controller, I may migrate them to the user controller since favorites management is handled by the UserContext - for now this works in an effort to save time before submission @ 12/12/11:32 pm

const userService = new UserService();
export const fetchUserFavorites = async (userId: number): Promise<SingleUserResponseWithFavoriteBooksDto> => {
    try {
        const response = await userService.fetchFavorites(userId);
        return response;
    } catch (error) {
        throw handleError(error);
    } 
};

// export const fetchAllUsers = async (): Promise<User[]> => {
//     try {
//         const response = await axios.get<any[]>(API_BASE_URL);
//         return response.data;
//     } catch (error) {
//         throw handleError(error);
//     }
// };

// export const fetchUserById = async (userId: number): Promise<User> => {
//     try {
//         const response = await axios.get<any>(`${API_BASE_URL}/${userId}`);
//         return response.data;
//     } catch (error) {
//         throw handleError(error);
//     }
// };

// export const addUser = async (userData: any): Promise<User> => {
//     try {
//         const response = await axios.post<any>(API_BASE_URL, userData);
//         return response.data;
//     } catch (error) {
//         throw handleError(error);
//     }
// };

// export const updateUser = async (userId: number, userData: any): Promise<User> => {
//     try {
//         const response = await axios.patch<any>(`${API_BASE_URL}/${userId}`, userData);
//         return response.data;
//     } catch (error) {
//         throw handleError(error);
//     }
// };

// export const removeUserById = async (userId: number): Promise<void> => {
//     try {
//         await axios.delete(`${API_BASE_URL}/${userId}`);
//     } catch (error) {
//         throw handleError(error);
//     }
// };