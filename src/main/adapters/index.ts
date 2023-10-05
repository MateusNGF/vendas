
export const makeBodyResponse = (status : number, content : any) => {
    return [200, 204].includes(status) ? 
    { ok: 1, content } : 
    { ok : 0, error: content };
}