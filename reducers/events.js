import { database } from "../config/config";

export const FETCH_EVENTS = "FETCH_EVENTS";
export const UPDATE_EVENTS = "UPDATE_EVENTS";

export const fetchEvents = (payload) => ({ type: FETCH_EVENTS, payload });
export const updateEvents = (payload) => ({ type: UPDATE_EVENTS, payload });

export function getEvents() {
    return dispatch => {
        const events = [];
        database.ref('/events').once('value', (snapshot) => {
            snapshot.forEach(
                child => {
                    events.push(child.val());
                });
        }).then(() => dispatch(fetchEvents(events)));
    }
}

export function watchEventsChanged() {
    return (dispatch) => {
        database.ref('/events').on('value', (snapshot) => {
            let events = [];
            snapshot.forEach(
                child => {
                    events.push(child.val());
                });
            dispatch(updateEvents(events));
        });
    }
}

/* export function watchEventsUpdate() {
    return dispatch => {
        const events = [];
        database.ref('/events').on('value', (snap) => {
            snap.forEach(
                child => {
                    events.push(child.val());
                });
        }).then(() => dispatch(updateEvents(events)));
    }
 
} */


export function events(state = [], { type, payload }) {
    switch (type) {
        case FETCH_EVENTS:
            return payload;
        case UPDATE_EVENTS:
            return payload;
        default:
            return state;
    }
}
