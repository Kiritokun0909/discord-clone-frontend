import { server } from "./base";

export interface Community {
    name : string;
    description : string;
    imageUrl : string | null;
}

export const createCommunity = async (createForm : Community): Promise<Community> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await server.post('api/community/create', createForm)
    if(response.status !== 200) throw new Error("Failed to create community");
    return {
        name : response.data.name,
        description : response.data.description,
        imageUrl : response.data.imageUrl
    }
}