/*global reduxUtils, searchReducer */
var siteReducer = function(state,action){
    switch(action.type){
    case "TAP_CELL" :
	var new_searches = reduxUtils.replaceItem(state.searches,action.search, searchReducer(state.searches[action.search],action) );
	return Object.assign({},state,{searches: new_searches});
    case "ROLL":
	new_searches = reduxUtils.replaceItem(state.searches,action.search,searchReducer(state.searches[action.search],action));
	return Object.assign({},state,{searches: new_searches});
    case "SEARCH":
	new_searches = reduxUtils.replaceItem(state.searches,action.search,searchReducer(state.searches[action.search],action));
	return Object.assign({},state,{searches: new_searches});
    }
};
