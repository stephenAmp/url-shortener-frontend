export interface CreateUrlResponse{
  "short_code": string,
  "original_url"?: string,
}

export interface CreateUrl{
  "original_url": string,
  "expires_at"?: string,
  "custom_code"?: string
}