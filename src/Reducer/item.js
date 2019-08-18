const INITIAL_STATE = {
    items: [{}],
    selected: {}
  };
  
  function itemReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
      case 'ITEM_SELECTED':{
        let newSelected=(action.payload);
        console.log(newSelected)
        return {...state, selected: newSelected};
      }
      case 'ITEMS_GET': {
        return {...state, items: action.payload};
      }
      case 'ITEM_ADD': {
        return {...state, items:[action.payload, ...state.items]};
      }
      case 'ITEM_DELETE':{
        const newItems = Object.assign([],{...state.items});
        const index= state.items.findIndex(item => {return item.id === state.selected.id})
        newItems.splice(index, 1);
        console.log(index);
        console.log(newItems)
        return {...state, items: newItems};
      }
      case 'ITEM_EDIT':{
        const index= state.items.findIndex(item => {return item.id === action.payload.id})
        const newItemSet = state.items;
        newItemSet[index]= action.payload;
        return {...state, items: newItemSet};
      }
      default:
        return state;
    }
  }
  
  export default itemReducer;