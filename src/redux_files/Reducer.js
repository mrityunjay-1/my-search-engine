let lastId = 0;

export default function Reducer (state = [], action) {
    switch(action.type){
        case "add_query":
            return [...state, {id: ++lastId, query : action.payload.query}];
        
        case "update_query":
            console.log(state);
            return state.map(everystate =>  {   
                        return everystate.id === action.payload.id ? {id: everystate.id, query: action.payload.query}  : everystate.query
                        
                    });
        default: 
            return state;
    }
}