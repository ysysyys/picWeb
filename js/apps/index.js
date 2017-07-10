/*
 *admin by ys
 *2016.12.15
 */
require.config(requireConfig);
require([
	'common',
	'swiper'
],function(common){
	var $swiper=document.getElementById('main-swiper'),
		$gonext=document.getElementById('gonext'),
		$item=document.getElementsByName('swipe-item'),
		$video=document.getElementById('video-player'),
		$switch=document.getElementById('services-switch'),
		$services=document.getElementById('services'),
		Swipe,mainModule={};
	mainModule.initEvent=function(){
		Swipe=new Swiper('.swiper-container',{
			mousewheelControl:true,
	    	mode: 'vertical',
	    	autoplay : 2000,
	        onInit:function(swiper){
	        	swiper.swipeNext()
	        },
	        onSlideChangeStart:function(swiper){
	        	// console.log(Swipe.activeIndex)
	        	if(Swipe.activeIndex!=$item.length-1){
					$gonext.style.visibility='visible';
				}else{
					$gonext.style.visibility='hidden';
				}
	        }
		});
		$gonext.addEventListener('click',function(e){
			// console.log(e)
			// console.log(Swipe)
			Swipe.swipeNext();
			if(Swipe.activeIndex==$item.length-1){
				this.style.visibility='hidden';
				// this.style.visibility='visible';
			}
		},false);
		$video.addEventListener('timeupdate',function(e){
			// console.log(this.ended)
			if(this.ended){
				this.style['z-index']='-99';
				$swiper.style['z-index']=99;
				Swipe.activeIndex=0;
			}
			else{
				this.style['z-index']=99;
				$swiper.style['z-index']='-99';
			}
		},false);
		$switch.addEventListener('mouseover',function(e){
			$services.className=common.removeClass($services,'hidden');
		},false);
		$switch.addEventListener('mouseout',function(e){
			$services.className=common.addClass($services,'hidden');
		},false);

	};
	(function(){
		// console.log(1)
		console.log($video)
		mainModule.initEvent();
	})()
})