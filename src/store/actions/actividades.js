import activityService from '../../services/actividadService';
import * as actionTypes from './actionTypes';
import alertify from 'alertifyjs';

export const fetchActivityStart = () => {
    return {
        type: actionTypes.FETCH_ACTIVITY_START
    };
};

export const fetchActivitySuccess = (data) => {


    return {

        type: actionTypes.FETCH_ACTIVITY_SUCCESS,
        activity: data
    };
};

export const fetchActivityFail = error => {
    return {
        type: actionTypes.FETCH_ACTIVITY_FAIL,
        error: error
    };
};


export const fetchActivitiesInit = () => {
    return {
        type: actionTypes.FETCH_ACTIVITIES_INIT
    };
};

export const fetchActivitiesStart = () => {
    return {
        type: actionTypes.FETCH_ACTIVITIES_START
    };
};

export const fetchActivitiesSuccess = (activities, pagination) => {
    return {
        type: actionTypes.FETCH_ACTIVITIES_SUCCESS,
        activities: activities,
        pagination: pagination
    };
};

export const fetchActivitiesFail = error => {
    return {
        type: actionTypes.FETCH_ACTIVITIES_FAIL,
        error: error
    };
};


export const addActivityStart = () => {
    return {
        type: actionTypes.ADD_ACTIVITY_START
    };
};

export const addActivitySuccess = (activity) => {
    return {
        type: actionTypes.ADD_ACTIVITY_SUCCESS,
        activity: activity
    };
};

export const addActivityFail = error => {
    return {
        type: actionTypes.ADD_ACTIVITY_FAIL,
        error: error
    };
};


export const deleteActivityStart = () => {
    return {
        type: actionTypes.DELETE_ACTIVITY_START
    };
};
export const deleteActivityFail = error => {
    return {
        type: actionTypes.DELETE_ACTIVITY_FAIL,
        error: error
    };
};



export const updateActivityStart = () => {
    return {
        type: actionTypes.UPDATE_ACTIVITY_START
    };
};

export const updateActivitySuccess = activity => {
    return {
        type: actionTypes.UPDATE_ACTIVITY_SUCCESS,
        activity: activity
    };
};

export const updateActivityFail = error => {
    return {
        type: actionTypes.UPDATE_ACTIVITY_FAIL,
        error: error
    };
};


export const getPaginado = (pageNumber, pageSize, userParams) => {

    return async dispatch => {
        dispatch(fetchActivitiesInit());
        dispatch(fetchActivitiesStart());
        try {
            const response = await activityService.Getpaginado(
                pageNumber,
                pageSize,
                userParams
            );

            const activities = response.data;
            const pagination = JSON.parse(response.headers.pagination);

            dispatch(fetchActivitiesSuccess(activities, pagination));
        } catch (error) {
            dispatch(fetchActivitiesFail(error));

        }
    };
};

export const getActivity = id => {
    return async dispatch => {
        dispatch((fetchActivityStart()));
        try {
            const { data } = await activityService.GetActivity(id);
            console.log('data', data);
            dispatch(fetchActivitySuccess(data));

        } catch (error) {
            console.log(error);
            dispatch(fetchActivityFail(error));
            alertify.error(error.response.statusText);
        }
    };
};


export const registerActivity = activity => {

    return async dispatch => {
        dispatch(addActivityStart());
        try {
            await activityService.register(activity);
            alertify.success('Registration successful');
        } catch (error) {
            console.log('error register', error);
            if (error) {
                if (error.response) {
                    dispatch(addActivityFail(error.response.data));
                    alertify.error(error.response.data);
                }
            }
        }
    };
};


export const deleteActivity = (id) => {
    return async dispatch => {
        dispatch(deleteActivityStart());
        try {

            await activityService.deleteActivity(id);
            //dispatch(deleteActivitySuccess(newUser));
        } catch (error) {
            dispatch(deleteActivityFail(error));
        }
    };
};

export const updateActivity = (activity) => {
    return async dispatch => {
        dispatch(updateActivityStart());
        try {
            await activityService.updateActivity(activity);
            dispatch(updateActivitySuccess(activity));
        } catch (error) {
            console.log('errror', error)
            if (error && error.response.data) {
                dispatch(updateActivityFail(error.response.data));
            }
        }
    };
};