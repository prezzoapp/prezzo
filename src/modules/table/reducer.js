import { Map } from 'immutable';
import {
    LIST_OPEN_TABLE_REQUEST,
    LIST_QUEUED_TABLE_REQUEST,
    ACCEPT_QUEUED_REQUEST,
    DELETE_QUEUED_REQUEST
} from './types';

const INITIAL_STATE = Map({
    openTableList: [],
    queuedTableList: []
});

function getDummyData() {
    setTimeout(() => {
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
    }, 2000);
}


const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case LIST_OPEN_TABLE_REQUEST:
            return state.update('openTableList', () => getDummyData());
            break;
        case LIST_QUEUED_TABLE_REQUEST:
            return state.update('queuedTableList', () => getDummyData());
            break;
        case ACCEPT_QUEUED_REQUEST:
            return state.update('queuedTableList', () => {
                state.queuedTableList.filter((element) => {
                    return element.id != action.payload
                })
            });
            break;
        case ACCEPT_QUEUED_REQUEST:
            return state.update('queuedTableList', () => {
                state.queuedTableList.filter((element) => {
                    return element.id != action.payload
                })
            });
            break;

    }
}

export default reducer;
