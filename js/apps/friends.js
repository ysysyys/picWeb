require.config(requireConfig);
require([
	'common'
],function(common){
	(function(){
		var date=new Date('2016-09-12');
		var date1=date.getFullYear()+(date.getMonth()>9?date.getMonth():'0'+date.getMonth())+(date.getDate()>9?date.getDate():'0'+date.getDate());
		
		// date1.setMonth(month-1)
		console.log(date)
		console.log(date1)

	})()
})