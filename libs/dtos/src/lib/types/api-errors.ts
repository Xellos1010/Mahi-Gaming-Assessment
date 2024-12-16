export interface ApiError extends Error {
    operation: string;
}
