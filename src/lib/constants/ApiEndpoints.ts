export class ApiEndpoints {
 static  createShortUrl = "/urls"
 static getAllUrls = (
    page?:number, 
    limit?:number, 
    q?: string, 
    status?: string, 
    createdFrom?: string, 
    createdBefore?: string
)=>{
    const params = new URLSearchParams()

    if(page !== undefined) params.append("page", page.toString())
    if(limit !== undefined) params.append("limit", limit.toString())
    if(q !== undefined) params.append("q", q.toString())
    if(status !== undefined) params.append("is_active", status.toString())
    if(createdFrom !== undefined) params.append("created_from", createdFrom.toString())
    if(createdBefore !== undefined) params.append("created_before", createdBefore.toString())

    return `/urls?${params.toString()}`

} 

 static getUrlDetails = (uuid: string) => `/urls/${uuid}/analytics`
 static deactivateUrl = (shortCode: string) => `/urls/${shortCode}`
 static getRedirectUrl = (shortCode: string) => `/urls/${shortCode}`
 static removeUrl = (uuid: string) =>  `urls/${uuid}/remove`
 static activateUrl = (uuid: string) => `urls/${uuid}/activate`
}