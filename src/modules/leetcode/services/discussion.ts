import * as provider from '../provider';

export async function getTrendingDiscuss(first: number): Promise<any> {
    try {
        return await provider.fetchTrendingDiscuss(first);
    } catch (error: any) {
        console.error('LeetCode Trending Discuss Error:', error.message);
        throw new Error('Error fetching LeetCode trending discussions');
    }
}

export async function getDiscussTopic(topicId: number): Promise<any> {
    try {
        return await provider.fetchDiscussTopic(topicId);
    } catch (error: any) {
        console.error('LeetCode Discuss Topic Error:', error.message);
        throw new Error('Error fetching LeetCode discuss topic');
    }
}

export async function getDiscussComments(params: any): Promise<any> {
    try {
        return await provider.fetchDiscussComments(params);
    } catch (error: any) {
        console.error('LeetCode Discuss Comments Error:', error.message);
        throw new Error('Error fetching LeetCode discuss comments');
    }
}
