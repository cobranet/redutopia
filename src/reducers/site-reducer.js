/*global reduxUtils, searchReducer, utopia */
var siteReducer = function(state,action){
    
    switch(action.type){
    case "END_FIGHT":
	var sstate = {};
	sstate.fight_message = "";
	sstate.infight = 0;
	sstate.lock_site = null;
	
	
	var search_old = Object.assign({},state.searches[state.active_search]);
	search_old.insearch = 0;
	var new_searches = reduxUtils.replaceItem(state.searches,state.active_search, search_old );
	console.log(new_searches);
	sstate.active_search = state.active_search + 1;
	if (sstate.active_search > 5 ) {
	    sstate.active_search = null;
	} else {
	    var search_new = Object.assign({},state.searches[sstate.active_search]);
	    new_searches = reduxUtils.replaceItem(new_searches,sstate.active_search, search_new );
	}

	sstate.searches = new_searches;
	console.log(sstate.searches);
	sstate.fightdices = [];
	sstate.state_of_fight= 0;
	var new_state = Object.assign({},state,sstate);
	console.log(new_state);
	return new_state;
    case "TAP_CELL" :
	new_searches = reduxUtils.replaceItem(state.searches,action.search, searchReducer(state.searches[action.search],action) );
	return Object.assign({},state,{searches: new_searches,last_found: 0});
    case "ROLL":
	new_searches = reduxUtils.replaceItem(state.searches,action.search,searchReducer(state.searches[action.search],action));
	return Object.assign({},state,{searches: new_searches,last_found: 0});
    case "ROLL_FIGHT":
	var ssite = {};
	ssite.fightdices = [reduxUtils.rollDice(),reduxUtils.rollDice()];
	ssite.killed = 0;
	ssite.damage = 0;
	var monster = state.monsters[state.infight-1];
	ssite.fightdices.forEach(function(dice){
	    if  (monster.hit.includes(dice) ) {
		ssite.killed = 1;
		var dropdice = reduxUtils.rollDice();
		alert(dropdice);
		if (dropdice <= state.infight ) {
		    alert("Monster Drop");
		}
		
	    }
	    if ( monster.atk.includes(dice)){
		ssite.damage = ssite.damage + 1;
	    }
	});
	ssite.state_of_fight = 1;
	
	ssite.fight_message = "You suffer " + ssite.damage + " damage. ";
	if(ssite.killed == 1) {
	    ssite.fight_message = ssite.fight_message + "You killed "+ monster.name ;
	    ssite.state_of_fight = 2;
	}
	return Object.assign({},state,ssite);

	
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
