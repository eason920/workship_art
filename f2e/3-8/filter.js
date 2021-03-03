$(document).ready(function(){
	// var array = [3,8,24,55,73,568,123458];
	var array = [{ 'name': 'Eason', 'age': '38' }, { 'name': 'Brenda', 'age': '46' }, { 'name': 'Johnny', 'age': '29' }, { 'name': 'Cherry', 'age': '36' }]
	// function filter(){
		array = array.filter(function(a){
			// console.log(a);
			// return a%2 === 0;
			return a
		});
		console.log( array );
	// }
	// filter();
});