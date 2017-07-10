require.config(requireConfig);
require([
	'swiper'
],function(){
	(function(){
		console.log(1)
		var Swipe=new Swiper('.swiper-container',{
			mousewheelControl : false,
			paginationClickable:true,
	    	pagination:'.pagination',
	    	watchActiveIndex : false,
	    	loop:true,
	    	mode: 'vertical',
	        autoplay: 2000,
	        onInit:function(swiper){
	        	swiper.swipeNext()
	        },
	        onSlideChangeStart:function(swiper){
	        	console.log(Swipe.activeIndex)
	        	
	        }
		});
	})()
})