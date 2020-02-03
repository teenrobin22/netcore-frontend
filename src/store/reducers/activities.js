import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    activity: null,
    activities: null,
    pagination: null,
    error: null
};

const fetchActivitiesInit = (state, action) => {
    return updateObject(state, {
        activity: null,
        activities: null,
        error: null,
        pagination: null
    });
};

const fetchActivitiesStart = (state, action) => {
    return updateObject(state, { error: null });
};

const fetchActivitiesSuccess = (state, action) => {
    return updateObject(state, {
        activities: action.activities,
        pagination: action.pagination,
        error: null
    });
};

const fetchActivitiesFail = (state, action) => {
    return updateObject(state, { error: action.error });
};



const fetchActivityStart = (state, action) => {
    console.log('llegó al reducer', action);
    return updateObject(state, { error: null });
};

export const fetchActivitySuccess = (state, action) => {
    return updateObject(state, {
        activity: action.activity,
        error: null
    });
};

const fetchActivityFail = (state, action) => {
    return updateObject(state, {
        activity: action.activity,
        error: null
    });
};



const addActivitySuccess = (state, action) => {
    return updateObject(state, { error: null });
};

const addActivityFail = (state, action) => {
    return updateObject(state, {
        activity: action.activity,
        error: null
    });
};


const deleteActivityStart = (state, action) => {
    return updateObject(state, { error: null });
};

const deleteActivityFail = (state, action) => {
    return updateObject(state, { error: action.error });
};


const updateActivityStart = (state, action) => {
    return updateObject(state, { error: null });
};
const updateActivitySuccess = (state, action) => {
    return updateObject(state, {
        activity: action.activity,
        error: null
    });
};
const updateActivityFail = (state, action) => {
    return updateObject(state, { error: action.error });
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_ACTIVITIES_INIT:
            return fetchActivitiesInit(state, action);
        case actionTypes.FETCH_ACTIVITIES_START:
            return fetchActivitiesStart(state, action);
        case actionTypes.FETCH_ACTIVITIES_SUCCESS:
            return fetchActivitiesSuccess(state, action);
        case actionTypes.FETCH_ACTIVITIES_FAIL:
            return fetchActivitiesFail(state, action);
        case actionTypes.FETCH_ACTIVITY_START:
            return fetchActivityStart(state, action);
        case actionTypes.FETCH_ACTIVITY_SUCCESS:
            return fetchActivitySuccess(state, action);
        case actionTypes.FETCH_ACTIVITY_FAIL:
            return fetchActivityFail(state, action);
        case actionTypes.ADD_ACTIVITY_SUCCESS:
            return addActivitySuccess(state, action);
        case actionTypes.ADD_ACTIVITY_FAIL:
            return addActivityFail(state, action);
        case actionTypes.DELETE_ACTIVITY_START:
            return deleteActivityStart(state, action);
        case actionTypes.DELETE_ACTIVITY_FAIL:
            return deleteActivityFail(state, action);

        case actionTypes.UPDATE_ACTIVITY_START:
            return updateActivityStart(state, action);
        case actionTypes.UPDATE_ACTIVITY_SUCCESS:
            return updateActivitySuccess(state, action);
        case actionTypes.UPDATE_ACTIVITY_FAIL:
            return updateActivityFail(state, action);


        default:
            return state;
    }
};

export default reducer;