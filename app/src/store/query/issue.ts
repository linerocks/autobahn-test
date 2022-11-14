import { isEmpty } from 'lodash';
import { useRecoilValue } from 'recoil';

import { UnauthorizedError } from '../../common/errors';
import { Params, paramsToQueryString } from '../../common/paramsToQueryString';

import { accessTokenAtom } from '../atom/accessToken.atom';
import { Issue } from '../model/issue';

const ISSUE_PATH = 'issue';

type CreateIssuePayload = Pick<Issue, 'name' | 'score'> &
  Partial<Pick<Issue, 'description' | 'created_at'>>;

interface CreatedAtRange {
  created_at_start_date?: string;
  created_at_end_date?: string;
}

interface GetIssuesParams extends CreatedAtRange {
  page?: number;
  page_size?: number;
  order_by?: 'created_at' | 'score' | 'name' | 'updated_at' | 'id';
  sort_by?: 'ASC' | 'DESC';
}

type GetIssuesStatisticsParams = CreatedAtRange;

export default {
  createIssue: (payload: CreateIssuePayload) => {
    const accessToken = useRecoilValue(accessTokenAtom);

    if (!accessToken) {
      throw new UnauthorizedError('Access token is required.');
    }

    return fetch(`${process.env.REACT_APP_API_URL}/${ISSUE_PATH}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(payload),
    });
  },
  getIssues: (params: GetIssuesParams) => {
    const accessToken = useRecoilValue(accessTokenAtom);

    if (!accessToken) {
      throw new UnauthorizedError('Access token is required.');
    }

    const uri = `${process.env.REACT_APP_API_URL}/${ISSUE_PATH}?${
      !isEmpty(params) ? paramsToQueryString(params as Params) : ''
    }`;

    return fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
  getIssuesStatistics: (params: GetIssuesStatisticsParams) => {
    const accessToken = useRecoilValue(accessTokenAtom);

    if (!accessToken) {
      throw new UnauthorizedError('Access token is required.');
    }

    const uri = `${process.env.REACT_APP_API_URL}/${ISSUE_PATH}/statistics?${
      !isEmpty(params) ? paramsToQueryString(params as Params) : ''
    }`;

    return fetch(uri, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
  },
};
