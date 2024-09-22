import { server } from "./base";

export interface CreateCommunityRequest {
    name : string;
    description : string;
    imageUrl : string | null;
}

export interface CommunityResponse {
    id: string;
    name : string;
    description : string;
    imageUrl : string | null;
}

export const createCommunity = async (createForm : CreateCommunityRequest): Promise<CommunityResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await server.post('api/community/create', createForm)
    if(response.status !== 200) throw new Error("Failed to create community");
    return {
        id: response.data.id,
        name : response.data.name,
        description : response.data.description,
        imageUrl : response.data.imageUrl
    }
}


export const getCommunities = async (): Promise<CommunityResponse[]> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await server.get<CommunityResponse[]>('api/community/user')
    if(response.status !== 200) throw new Error("Failed to get communities");
    return response.data
}
