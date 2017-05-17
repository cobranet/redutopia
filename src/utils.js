var reduxUtils = {
     replaceItem: function(arr,index,item){
	 var i = Number(index);
	 var new_arr = arr.slice(0,i).concat([item]).concat(arr.slice(i+1));
	 return new_arr;
     }
};
