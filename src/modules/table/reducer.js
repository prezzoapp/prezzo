import { Map } from 'immutable';
import {
    LIST_OPEN_TABLE_REQUEST,
    LIST_QUEUED_TABLE_REQUEST,
    ACCEPT_QUEUED_REQUEST,
    DELETE_QUEUED_REQUEST,
    SECTION_CHANGE
} from './types';

const INITIAL_STATE = Map({
    section: 0,
    openTableList: [],
    queuedTableList: []
});

function getDummyData() {

    return [
        {
            id: "1",
            userName: 'Abc',
            tableId: 134,
            userImg: 'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
            status: false
        },
        {
            id: "2",
            userName: 'Cdef',
            tableId: 1341,
            userImg: 'https://wrappixel.com/ampleadmin/ampleadmin-html/plugins/images/users/varun.jpg',
            status: true
        }
    ]

}


const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_OPEN_TABLE_REQUEST:
            return state.update('openTableList', () => getDummyData());

        case LIST_QUEUED_TABLE_REQUEST:
            return state.update('queuedTableList', () => getDummyData());

        case ACCEPT_QUEUED_REQUEST:
            return state.update('queuedTableList', () => action.payload);

        case DELETE_QUEUED_REQUEST:
            return state.update('queuedTableList', () => action.payload);

        case SECTION_CHANGE:
            return state.update('section', () => action.payload);

        default:
            return state;

    }
}

export default reducer;
