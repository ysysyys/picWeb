require.config(requireConfig);
require([
	'jquery', 
	'common', 
	'swiper3d'
],function($,common){
	var mainModule={};
	
	mainModule.initEvent=function(){
		var mySwiper = new Swiper('.swiper-container',{
			loop: true,
      		autoplay: 2000,
	    	// paginationClickable:true,
	    	// pagination:'.pagination',
	    	mode: 'horizontal',
			speed: 3000,
			slidesPerView : 3,
			centeredSlides : true,
			tdFlow: {
			      rotate : 50,
			      depth:300,
			  },
			// scrollbar: {
			// 	container : '.swiper-scrollbar',
			// }
		});  
		
		//定义callback 函数
		// var myCallbackFunction = function(data){
		//         // 对返回的数据做后续处理
		//         console.log(data);
		//     }
		// //把callback函数赋给window对象，供script回调   
		// window.myCallbackFunction = myCallbackFunction;
		// //创建并加载script
		// var script = document.createElement('script');
		// script.src = 'http://yangshi.whwbdaily.com/paper/index/ajaxreprintrank?page=1&callback=myCallbackFunction';
		// document.body.appendChild(script);
	};
	$(function(){
		console.log('family');
		mainModule.initEvent();
		var obj1={
			a:1,b:2,d:0
		};
		var obj2=obj1;
		// obj2={};
		// Object.defineProperty(obj1,'a',{
		// 	writable:false,
		// 	value:2
		// })
		Object.defineProperty(obj2,'c',{
			get:function(){
				return this.b;
			},
			set:function(newvalue){
				this.d=newvalue+this.c;
			}
		});
		obj2.c=1;
		// obj2.a=0;
		// obj2.c=obj1.a;
		// obj2.c=0;
		console.log(obj1)
		console.log(obj2)
		console.log(Object.getOwnPropertyDescriptor(obj2,'c'))
		console.log(Object.getOwnPropertyDescriptor(obj2,'a'))
		Object.prototype.name='ys';
		console.log(obj1)
		function Person(name,old){
			console.log(this.prototype)
			this.name=name;
			this.old=old;
			// this.prototype.howold=function(){
			// 	console.log(this)
			// 	return this.old;
			// }
		}
		Person.prototype.howold=function(){
			// console.log(this)
			return 1;
		};

		var person1=new Person('ys',22);
		console.log(person1)
		console.log(Person.prototype)
		console.log(person1.prototype)
		person1.howold()
		console.log(person1.howold())



	})
})