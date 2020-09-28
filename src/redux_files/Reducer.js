let lastId = 0;

export default function Reducer (state = [], action) {
    switch(action.type){
        case "add_query":
            return [...state, {id: ++lastId, query : action.payload.query}];
    
        default: 
            return state;
    }
}