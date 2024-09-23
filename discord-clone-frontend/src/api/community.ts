import { resolve } from "path";
import { server } from "./base";
import { ChannelTypeResponse } from "./channel";

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

export interface CommunityDetailResponse {
    community : CommunityResponse;
    channels : ChannelTypeResponse[];
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

export const mockCommunities: CommunityResponse[] = [
    {
      id: "1",
      name: "JavaScript Enthusiasts",
      description: "A community for people who love JavaScript",
      imageUrl: null
    },
    {
      id: "2",
      name: "React Developers",
      description: "All about React and its ecosystem",
      imageUrl: "https://example.com/react.png"
    },
    {
      id: "3",
      name: "TypeScript Coders",
      description: "Learn and grow with TypeScript",
      imageUrl: null
    }
  ];

export const getCommunities = async (): Promise<CommunityResponse[]> => {
    return mockCommunities;

    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await server.get<CommunityResponse[]>('api/community/user')
    if(response.status !== 200) throw new Error("Failed to get communities");
    return response.data
}

export const getDetailCommunity = async (id: string): Promise<CommunityDetailResponse> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const response = await server.get(`api/community/${id}`)
    if(response.status !== 200) throw new Error("Failed to get communities");
    console.log(response)
    return {
        community : response.data.community,
        channels : response.data.channels
    }
}