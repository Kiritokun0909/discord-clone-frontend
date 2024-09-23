export interface ChannelTypeResponse {
    id: string
    name: string
}

export interface ChannelResponse {
    id: string
    name: string
}

// Example of an API call that fetches the community details by ID
export const getCommunityDetails = async (communityId: number) => {
    // Simulate API response
    return {
      id: communityId,
      name: "Community Name",
      channelTypes: [
        {
          typeName: "Text Channels",
          channels: [
            { id: 101, name: "general" },
            { id: 102, name: "random" }
          ]
        },
        {
          typeName: "Voice Channels",
          channels: [
            { id: 201, name: "Voice 1" },
            { id: 202, name: "Voice 2" }
          ]
        }
      ]
    };
  };
  