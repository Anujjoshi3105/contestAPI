import * as codeforcesService from '../codeforces/service';
import * as codechefService from '../codechef/service';
import * as leetcodeService from '../leetcode/services';
import * as atcoderService from '../atcoder/service';
import * as gfgService from '../gfg/service';
import type { AggregateRatingsResponse } from './types';
import { withTimeout } from '../../shared/utils/timeout';

const PLATFORM_TIMEOUT = 5000; // 5 seconds per platform

// Get ratings from all platforms
export async function getAllRatings(username: string): Promise<AggregateRatingsResponse> {
    const [codeforces, codechef, leetcode, atcoder, gfg] = await Promise.allSettled([
        withTimeout(codeforcesService.getUserRating(username), PLATFORM_TIMEOUT, 'Codeforces timeout'),
        withTimeout(codechefService.getUserRating(username), PLATFORM_TIMEOUT, 'CodeChef timeout'),
        withTimeout(leetcodeService.getUserRating(username), PLATFORM_TIMEOUT, 'LeetCode timeout'),
        withTimeout(atcoderService.getUserRating(username), PLATFORM_TIMEOUT, 'AtCoder timeout'),
        withTimeout(gfgService.getUserRating(username), PLATFORM_TIMEOUT, 'GFG timeout'),
    ]);

    return {
        username,
        codeforces: codeforces.status === 'fulfilled' ? codeforces.value : { error: 'Failed to fetch' },
        codechef: codechef.status === 'fulfilled' ? codechef.value : { error: 'Failed to fetch' },
        leetcode: leetcode.status === 'fulfilled' ? leetcode.value : { error: 'Failed to fetch' },
        atcoder: atcoder.status === 'fulfilled' ? atcoder.value : { error: 'Failed to fetch' },
        gfg: gfg.status === 'fulfilled' ? gfg.value : { error: 'Failed to fetch' },
    };
}

// Get rating for a specific platform
export async function getPlatformRating(platform: string, username: string): Promise<any> {
    switch (platform.toLowerCase()) {
        case 'codeforces':
            return await codeforcesService.getUserRating(username);
        case 'codechef':
            return await codechefService.getUserRating(username);
        case 'leetcode':
            return await leetcodeService.getUserRating(username);
        case 'atcoder':
            return await atcoderService.getUserRating(username);
        case 'gfg':
            return await gfgService.getUserRating(username);
        default:
            throw new Error('Invalid platform');
    }
}
