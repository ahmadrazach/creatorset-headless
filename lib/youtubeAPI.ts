import axios from "axios";
import { YouTubeChannel } from "../common/types";

export const getChannels = async (
    channelName: string
): Promise<YouTubeChannel[]> => {
    try {
        const response = await axios.get(
            `https://hplc0h4iwc.execute-api.us-east-1.amazonaws.com/default/searchChannelProxy?q=${channelName}`
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return response.data.map((channel: any) => {
            return { ...channel };
        });
    } catch (error) {
        console.error("Error fetching YouTube channels:", error);
        return [];
    }
};
