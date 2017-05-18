var utopia = {
    /*
      score return number if search is over .. 
      if search is not over return null
    */
    scoreBoxes: function(boxes){
	var score = 0;
	var i;
	var full = 0;
	boxes.forEach(function(box){
	    if ( box != "" ) {
		full = full + 1;
	    }
	});
	if ( full != 6 ) {
	    return null;
	}
	var cols = [];
	var sign = 1;
	for (i=0; i<3; i++){
	    cols[i] = Number(boxes[i])-Number(boxes[i+3]);
	    if (cols[i] < 0 )  {
		sign = -1;
	    }
	}
	score = Math.abs(cols[0])*100 +
	    Math.abs(cols[1])*10 +
	    Math.abs(cols[2]);
	return score*sign;
    },
    monsterLevel: function (score){
	if ( (score > 99 && score < 200 )  || (score < 0 && score > -101 ) ) {return 1;}
	if ( (score > 199 && score < 300 ) || (score < -100 && score > -201 ) ) {return 2;}
	if ( (score > 299 && score < 400 ) || (score < -200 && score > -301 ) ) {return 3;}
	if ( (score > 399 && score < 500 ) || (score < -300 && score > -401 ) ) {return 4;}
	if ( (score > 499 && score < 556 ) || (score < -400 && score > -556 ) ) {return 5;}
	return null;
    }
    
};
