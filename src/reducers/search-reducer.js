/*global reduxUtils, utopia */
var searchReducer = function(state,action){
    var new_insearch;
    switch(action.type){
    case "TAP_CELL" :
	var new_state = Object.assign({},state);  
	if ( state.boxes[action.cell] != "" ){
	    return new_state;
	}
	if (state.insearch != "1" && state.insearch != "2" ) {
	    return new_state;
	}
	if ( state.insearch == 1 ) {
	    new_insearch = 2;
	} else {
	    new_insearch = 0;
	}
	var new_boxes =  reduxUtils.replaceItem(state.boxes,action.cell,action.dicevalue);
	var new_score = utopia.scoreBoxes(new_boxes);
	if ( new_score != null ) {
	    new_insearch = 3; 
	}
	return Object.assign({},state,{boxes: new_boxes,insearch: new_insearch,score: new_score} );
    case "ROLL":
	return Object.assign({},state,{dices: [Math.floor(Math.random() * 6) + 1,
					       Math.floor(Math.random() * 6) + 1],
				       insearch: 1}
			    );
    case "RESOLVE":
	return Object.assign({},state,{dices: [],
				       insearch: 4}
			    );
    }
};
