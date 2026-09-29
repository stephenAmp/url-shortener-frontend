export class ApiEndpoints {
 static  createShortUrl = "/urls"
 static getAllUrls = (page?:number, limit?:number)=> `/urls?page=${page}&limit=${limit}`

 static getUrlDetails = (uuid: string) => `/urls/${uuid}/analytics`
 static deactivateUrl = (shortCode: string) => `/urls/${shortCode}`
 static getRedirectUrl = (shortCode: string) => `/urls/${shortCode}`
 static removeUrl = (uuid: string) =>  `urls/${uuid}/remove`
 static activateUrl = (uuid: string) => `urls/${uuid}/activate`
}