import * as types from './types';

export function searchDoQuery(query) {
    return {
        type: types.SEARCH_DO_QUERY,
        payload: query
    }
};

export function searchSetResults(results) {
    return {
        type: types.SEARCH_DO_QUERY,
        payload: results
    }
};