/*global reduxUtils */
var searchReducer = function(state,action){
    var new_insearch;
    switch(action.type){
    case "TAP_CELL" :
	if ( state.insearch == 1 ) {
	    new_insearch = 2;
	} else {
	    new_insearch = 0;
	}
	var new_boxes =  reduxUtils.replaceItem(state.boxes,action.cell,action.dicevalue); 
	return Object.assign({},state,{boxes: new_boxes,insearch: new_insearch} );
    case "ROLL":
	return Object.assign({},state,{dices: [Math.floor(Math.random() * 6) + 1,
					       Math.floor(Math.random() * 6) + 1],
				       insearch: 1});
    }
};
