/*global reduxUtils, searchReducer, utopia */
var siteReducer = function(state,action){
    
    switch(action.type){
    case "TAP_CELL" :
	var new_searches = reduxUtils.replaceItem(state.searches,action.search, searchReducer(state.searches[action.search],action) );
	return Object.assign({},state,{searches: new_searches,last_found: 0});
    case "ROLL":
	new_searches = reduxUtils.replaceItem(state.searches,action.search,searchReducer(state.searches[action.search],action));
	return Object.assign({},state,{searches: new_searches,last_found: 0});
    case "RESOLVE":
	var last_found = 0;
	var new_infight = 0;
	var new_active_search = state.active_search;
	new_searches = reduxUtils.replaceItem(state.searches,action.search,searchReducer(state.searches[action.search],action));
	var score = utopia.scoreBoxes(new_searches[action.search].boxes);
	var new_foundconstruct = state.foundconstruct;
	if (score > 0  && score < 11 ){
	    if ( state.foundconstruct == 0 ) {
		new_foundconstruct = 1;
		last_found = 2;
		new_active_search = new_active_search + 1;
            }
	} else  {
	    if (score > 10 && score < 100 ) {
		last_found = 1;
		new_active_search = new_active_search + 1;
	    } else {
		var monsterLvl = utopia.monsterLevel(score);
		if ( monsterLvl != null ){
		    new_infight = monsterLvl;
		    alert("Monster" +  monsterLvl);
		}
	    }
	}
	return Object.assign({},state,{searches: new_searches,foundconstruct: new_foundconstruct , infight: new_infight,last_found: last_found , active_search: new_active_search  });
    case "SEARCH":
	new_searches = reduxUtils.replaceItem(state.searches,action.search,searchReducer(state.searches[action.search],action));
	return Object.assign({},state,{searches: new_searches});
    }
};
