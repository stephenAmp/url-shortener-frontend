export interface CreateUrlResponse{
  "short_code": string,
  "original_url"?: string,
}

export interface CreateUrl{
  "original_url": string,
  "expires_at"?: string,
  "custom_code"?: string
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
}


export interface Url {
  "uuid" : string,
  "created_at": string,
  "click_count": number,
  "expires_at":  null | string,
  "short_code": string,
  "original_url": string,
  "isActive": null | boolean
}

export interface GetUrlResponse {
  data: Url[];
  pagination: Pagination;
}