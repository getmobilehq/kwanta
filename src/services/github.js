import { Octokit } from '@octokit/rest';
export const getGitHubInstance = (token) => new Octokit({ auth: token });