
export type PaginationParams = {
    page?: number;
    limit?: number;
}

export type PaginationResponse = {
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    }
}