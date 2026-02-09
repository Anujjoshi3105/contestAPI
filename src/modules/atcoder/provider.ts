import { httpClient } from '../../shared/utils/http-client';
import * as cheerio from 'cheerio';
import { UserHistory, ContestStandings, AtCoderUserRating, ContestResult } from './types';
import { ATCODER_BASE_URL, ATCODER_SELECTORS, ATCODER_LABELS } from './constants';

export async function fetchUserRating(username: string): Promise<AtCoderUserRating> {
    const url = `${ATCODER_BASE_URL}/users/${username}`;
    try {
        const { data } = await httpClient.get(url);
        const $ = cheerio.load(data);

        // Check for 404 or "User not found"
        if ($('title').text().includes('404') || $('body').text().includes('User not found')) {
            throw new Error(`User '${username}' not found on AtCoder`);
        }

        const extractText = (label: string) => {
            const th = $(`th:contains('${label}')`);
            if (th.length === 0) return null;
            return th
                .next('td')
                .text()
                .replace(/\s+/g, ' ')
                .trim();
        };

        const rawRating = extractText(ATCODER_LABELS.RATING);
        if (rawRating === null) {
            throw new Error('AtCoder schema change detected: Rating label not found');
        }

        const rating = parseInt(rawRating.split(' ')[0]) || 0;
        const max_rating = parseInt(extractText(ATCODER_LABELS.MAX_RATING)?.split(' ')[0] || '0') || 0;
        const rank = extractText(ATCODER_LABELS.RANK) || 'N/A';
        const contests_participated = parseInt(extractText(ATCODER_LABELS.RATED_MATCHES) || '0') || 0;
        const last_competed = extractText(ATCODER_LABELS.LAST_COMPETED) || 'N/A';
        const country = extractText(ATCODER_LABELS.COUNTRY) || 'N/A';
        const birth_year = extractText(ATCODER_LABELS.BIRTH_YEAR) || 'N/A';

        const avatarAttr = $(ATCODER_SELECTORS.AVATAR).attr('src');
        const avatar = avatarAttr
            ? avatarAttr.startsWith('//') ? 'https:' + avatarAttr : avatarAttr
            : '';
        const display_name = $(ATCODER_SELECTORS.USERNAME).first().text().trim();
        const kyu = $(ATCODER_SELECTORS.KYU).first().text().trim();

        // Fetch rating history from the direct JSON endpoint
        let rating_history: UserHistory[] = [];
        try {
            rating_history = await fetchUserHistory(username);
        } catch (e) {
            // Fallback to scraping if JSON endpoint fails
            $('script').each((i, script) => {
                const content = $(script).text();
                if (content.includes('var rating_history =')) {
                    const match = content.match(/var rating_history\s*=\s*(\[.*?\]);/);
                    if (match) {
                        try {
                            rating_history = JSON.parse(match[1]);
                        } catch (err) { }
                    }
                }
            });
        }

        return {
            rating,
            max_rating,
            rank,
            contests_participated,
            last_competed,
            country,
            birth_year,
            avatar,
            display_name: display_name || username,
            kyu,
            rating_history,
        };
    } catch (error: any) {
        if (error.response?.status === 404) {
            throw new Error(`User '${username}' not found on AtCoder`);
        }
        throw error;
    }
}

export async function fetchUserHistory(username: string): Promise<UserHistory[]> {
    const url = `https://atcoder.jp/users/${username}/history/json`;
    const { data } = await httpClient.get(url);
    return data;
}

export async function fetchContestStandings(contestId: string, extended: boolean = false): Promise<ContestStandings> {
    const url = `https://atcoder.jp/contests/${contestId}/standings/${extended ? 'extended/' : ''}json`;
    const { data } = await httpClient.get(url);
    return data;
}

export async function fetchContestResults(contestId: string): Promise<ContestResult[]> {
    const url = `https://atcoder.jp/contests/${contestId}/results/json`;
    const { data } = await httpClient.get(url);
    return data;
}

export async function fetchVirtualStandings(contestId: string, showGhost: boolean = true): Promise<ContestStandings> {
    const url = `https://atcoder.jp/contests/${contestId}/standings/virtual/json?showGhost=${showGhost}`;
    const { data } = await httpClient.get(url);
    return data;
}
