import * as provider from '../provider';
import * as formatters from '../utils/formatters';
import {
    DailyProblemData,
    SelectProblemData,
    ProblemSetQuestionListData,
} from '../types';

export async function getDailyProblem(raw: boolean = false): Promise<any> {
    try {
        const data = await provider.fetchDailyProblem();
        if (raw) return data;
        return formatters.formatDailyData(data);
    } catch (error: any) {
        console.error('LeetCode Daily Problem Error:', error.message);
        throw new Error('Error fetching LeetCode daily problem');
    }
}

export async function getSelectProblem(titleSlug: string, raw: boolean = false): Promise<any> {
    try {
        const data = await provider.fetchSelectProblem(titleSlug);
        if (raw) return data;
        return formatters.formatQuestionData(data);
    } catch (error: any) {
        console.error('LeetCode Select Problem Error:', error.message);
        throw new Error('Error fetching LeetCode selected problem');
    }
}

export async function getProblems(params: any): Promise<any> {
    try {
        const data = await provider.fetchProblems(params);
        return formatters.formatProblemsData(data);
    } catch (error: any) {
        console.error('LeetCode Problems Error:', error.message);
        throw new Error('Error fetching LeetCode problems');
    }
}

export async function getOfficialSolution(titleSlug: string): Promise<any> {
    try {
        return await provider.fetchOfficialSolution(titleSlug);
    } catch (error: any) {
        console.error('LeetCode Official Solution Error:', error.message);
        throw new Error('Error fetching LeetCode official solution');
    }
}
