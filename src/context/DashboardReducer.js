export const DashboardReducer= (state,action)=>{
    switch(action.type){
        case action.type === 'ADD_BENEFICIARY':
            state.data = action.payload
            return state;
        case action.type ==='REMOVE_BENEFICIARY':
          let  newState = state.data.filter((state)=>state.id!==action.payload.id)
            return newState    
        default:
            return state    

    }

}