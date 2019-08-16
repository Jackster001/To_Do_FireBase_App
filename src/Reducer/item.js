const INITIAL_STATE = {
    items: [{}],
  };
  
  function itemReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'ITEMS_GET': {
        return {...state, items: action.payload};
      }
      case 'ITEM_ADD': {
        let newItems=Object.assign([],state.items);
        newItems.push(action.payload)
        // let newItem={}
        return {...state.items, items: newItems};
      }
      default:
        return state;
    }
  }
  
  export default itemReducer;