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
            return state.update('queuedTableList', (state) => {
                console.warn(state.queuedTableList);
                if(state.queuedTableList != undefined){
                    let queuedTableList = state.queuedTableList.filter((element) => {
                        return element.id != action.payload
                    })
                    console.warn(queuedTableList);
                    return queuedTableList;

                }
                else
                {
                    return state;
                }
            });
        case DELETE_QUEUED_REQUEST:
            return state.update('queuedTableList', () => {
                state.queuedTableList.filter((element) => {
                    return element.id != action.payload
                })
            });
        default:
            return state;

    }
}

export default reducer;
