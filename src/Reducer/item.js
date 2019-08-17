const INITIAL_STATE = {
    items: [{}],
  };
  
  function itemReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'ITEMS_GET': {
        return {...state, items: action.payload};
      }
      case 'ITEM_ADD': {
        return {...state, items:[action.payload, ...state.items]};
      }
      case 'ITEM_DELETE':{
        const newItems = Object.assign([],{...state.items});
        const index= state.items.findIndex(item => {return item.id === action.id})
        newItems.splice(index, 1);
        console.log(index);
        console.log(newItems)
        return {...state, items: newItems};
      }
      default:
        return state;
    }
  }
  
  export default itemReducer;