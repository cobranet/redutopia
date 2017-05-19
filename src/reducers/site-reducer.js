/*global reduxUtils, searchReducer, utopia */
var siteReducer = function(state,action){
    
    switch(action.type){
    case "END_FIGHT":
	var sstate = {};
	sstate.fight_message = "";
	sstate.infight = 0;
	sstate.fightdices = [];
	sstate.state_of_fight= 0;
	return Object.assign({},state,sstate);
    case "TAP_CELL" :
	var new_searches = reduxUtils.replaceItem(state.searches,action.search, searchReducer(state.searches[action.search],action) );
	return Object.assign({},state,{searches: new_searches,last_found: 0});
    case "ROLL":
	new_searches = reduxUtils.replaceItem(state.searches,action.search,searchReducer(state.searches[action.search],action));
	return Object.assign({},state,{searches: new_searches,last_found: 0});
    case "ROLL_FIGHT":
	var new_dices = [Math.floor(Math.random() * 6) + 1, Math.floor(Math.random() * 6) + 1];
	var killed = 0;
	var damage = 0;
	var monster = state.monsters[state.infight-1];
	new_dices.forEach(function(dice){
	    if  (monster.hit.includes(dice) ) {
		killed = 1;
	    }
	    if ( monster.atk.includes(dice)){
		damage = damage + 1;
	    }
	});
	var new_state_of_fight = state.state_of_fight;
	var new_message = "You suffer " + damage + " damage. ";
	if(killed == 1) {
	    new_message = new_message + "You killed "+ monster.name ;
	    new_state_of_fight = 2;
	}
	return Object.assign({},state,{fightdices: new_dices,state_of_fight: new_state_of_fight,fight_message: new_message});

	
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
		}
	    }
	}
	return Object.assign({},state,{searches: new_searches,foundconstruct: new_foundconstruct , infight: new_infight,last_found: last_found , active_search: new_active_search  });
    case "SEARCH":
	new_searches = reduxUtils.replaceItem(state.searches,action.search,searchReducer(state.searches[action.search],action));
	return Object.assign({},state,{searches: new_searches});
    }
};
