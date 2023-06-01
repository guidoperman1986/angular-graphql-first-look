export interface Continent {
    name: string
}

export interface Country {
    name    : string,
    capital : string,
    currency: string,
    emoji   : string,
    phone   : string,
    continet: Continent
}

export interface PaginatedResponse<T>{
    content: T[],
    totalResults: number
}