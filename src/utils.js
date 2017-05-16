var reduxUtils = {
     replaceItem: function(arr,index,item){
	 var i = Number(index);
	 console.log("OLD" + index );
	 console.log(arr);
	 
	 var new_arr = arr.slice(0,i).concat([item]).concat(arr.slice(i+1));
	 console.log("NEW"); 
	 console.log(new_arr);
	 return new_arr;
     }
};
