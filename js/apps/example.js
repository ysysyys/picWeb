require.config(requireConfig);
require([
	'regular',
	'ajax'
],function(Regular,ajaxdal){
	var menuModule,
		tableModule,//自媒体账号
		itemModule,
		taskModule,//任务管理
		newModule;
	//自媒体账号数据 
	function getData(callback){
		// alert("拉取数据")
		// ajaxdal.getJsonRequest('/admin/index/media-manage',{action:'get'},'post').done(function(data){
			tableModule.data.tableData=[
				{id:1,video_channel_id:'1',video_channel:'资讯',video_source:'优酷',video_source_id:'1',we_media_name:'testyk',we_media_url:'www.youku.com'},
				{id:2,video_channel_id:'2',video_channel:'财经',video_source:'爱奇艺',video_source_id:'2',we_media_name:'testiqiyi',we_media_url:'www.iqiyi.com'},
				{id:3,video_channel_id:'1',video_channel:'资讯',video_source:'腾讯',video_source_id:'3',we_media_name:'testqq',we_media_url:'v.qq.com'},
			];
			itemModule.data.sourceData=[
				{id:1,source_name:'优酷'}
				{id:2,source_name:'爱奇艺'}
				{id:3,source_name:'腾讯'}
				{id:4,source_name:'乐视'}
				{id:5,source_name:'秒拍'},
			];
			itemModule.data.channelData=[
				{id:1,name:'资讯'},
				{id:2,name:'财经'},
				{id:3,name:'科技'},
				{id:4,name:'生活'},
				{id:2,name:'体育'},
			];
			itemModule.$update();
			tableModule.$update();
			callback&&callback()

		// })
	};
	function operateData(params){
	};
	// 删除自媒体账号
	function deleteData(id,callback){
		ajaxdal.getJsonRequest('/admin/index/media-manage',{action:'delete',media_id:id},'post').done(function(data){
			callback&&callback()
		})
	}
	// 添加自媒体账号
	function addData(params,callback){
		ajaxdal.getJsonRequest('/admin/index/media-manage',{action:'add',data:params},'post').done(function(data){
			callback&&callback()
		})
	};
	// 任务数据
	function getTaskData(callback){
		// alert("拉取数据")
		ajaxdal.getJsonRequest('/admin/index/task-manage',{action:'get'},'post').done(function(data){
			
			taskModule.data.taskData=data.data.task;
			newModule.data.mediaData=data.data.media;
			newModule.data.sourceData=data.data.source;
			newModule.data.channelData=data.data.channel;
			newModule.data.crawlData=data.data.crawl;
			newModule.$update();
			taskModule.$update();
			callback&&callback()

		})
	};
	// 添加任务
	function addTaskData(params,callback){
		ajaxdal.getJsonRequest('/admin/index/task-manage',{action:'add',data:params},'post').done(function(data){
			callback&&callback()
		})
	};
	// 删除任务
	function deleteTaskData(id,callback){
		ajaxdal.getJsonRequest('/admin/index/task-manage',{action:'delete',task_id:id},'post').done(function(data){
			callback&&callback()
		})
	}
	// 禁用/启用任务
	function operateTask(type,id,callback){
		ajaxdal.getJsonRequest('/admin/index/task-manage',{action:type,task_id:id},'post').done(function(data){
			callback&&callback()
		})
	}
	


	(function(){
		// 左侧菜单
		menuModule=new Regular({
			template:'#menu_tpl',
			data:{
				activeIndex:0,
				tabData:[{name:'自媒体账号',url:'#'},
						{name:'任务管理',url:'#'},
						{name:'Tab2',url:'#'},
						{name:'Tab3',url:'#'}]
			},
			tabChange:function($event,value){
				this.data.activeIndex=value;
				// console.log(value);
				if(value==1){
					tableModule.$inject(false);
					taskModule.$inject('#table_rgl');
					getTaskData()
				}else{
					taskModule.$inject(false);
					tableModule.$inject('#table_rgl');
					getData()
				}
				itemModule.$inject(false);
				newModule.$inject(false);
				this.$update();
			},
			init:function(){

			}
		}).$inject('#menu_rgl');

		// 自媒体账号列表
		tableModule=new Regular({
			template:'#table_tpl',
			data:{
				tableData:[],
			},
			operate:function(status){
				operateData(status)
			},
			toAddItem:function($event){
				// console.log(itemModule.data.value)
				itemModule.$inject('#body','bottom');
				itemModule.$update()
				tableModule.$update();
			},
			deleteItem:function($event,id){
				deleteData(id,function(){
					getData()
				});
			},
			init:function(){
				getData()
			}
		}).$inject('#table_rgl');

		// 添加自媒体账号模块
		itemModule=new Regular({
			template:'#add_tpl',
			data:{
				value:['','','','','','',''],
				sourceData:[],
				channelData:[],
			},
			addItem:function($event){
				// console.log(this.data.value)
				var component=this,
					params={
						source_id:component.data.value[1],
						channel_id:component.data.value[2],
						name:component.data.value[3],
						url:component.data.value[4]
					};
				component.$inject(false)
				addData(params,function(){
					getData()
				})			
			},
			remove:function($event){
				this.data.value=['','','','','','',''];
				this.$inject(false)
				// this.$update()
			},
			init:function(){
				
			}
		});

		// 任务管理列表
		taskModule=new Regular({
			template:'#task_tpl',
			data:{
				taskData:[],
			},
			toAddItem:function($event){
				// console.log(itemModule.data.value)
				newModule.$inject('#body','bottom');
				newModule.$update()
				taskModule.$update();
			},
			deleteTask:function($event,id){
				deleteTaskData(id,function(){
					getTaskData()
				});
			},
			disable:function($event,id,value){
				var type=value==1?'disable':'enable';
				operateTask(type,id,function(){
					getTaskData()
				});
				
			},
			init:function(){
				// getTaskData()
			}
		});
		// 添加任务模块
		newModule=new Regular({
			template:'#add_task_tpl',
			data:{
				value:['','','','','','','1',''],
				mediaData:[],
				sourceData:[],
				channelData:[],
				crawlData:[],
			},
			change:function($event,value){
				// this.data.value[value==1?2:1]='';
				this.data.value[3]='';
				this.data.value[4]='';
				this.data.value[5]='';

			},
			mediaChange:function($event){
				// console.log($event)
				var fire=$event.target.selectedOptions[0].dataset;
				this.data.value[1]=fire.sourceid;
				this.data.value[2]=fire.channelid;
				this.data.value[4]=fire.url;
				this.data.value[5]='';

			},
			urlChange:function($event){
				this.data.value[3]='';
				this.data.value[5]='';
			},
			addItem:function($event){
				// console.log(this.data.value)
				var component=this,
					params={
						source_id:component.data.value[1],
						channel_id:component.data.value[2],
						media_id:component.data.value[3],
						url:component.data.value[4],
						crawl:component.data.value[5],
						is_crawl:component.data.value[6],
			
					};
				component.$inject(false)
				addTaskData(params,function(){
					getTaskData()
				})			
			},
			remove:function($event){
				this.data.value=['','','','','','',''];
				this.$inject(false)
				// this.$update()
			},
			init:function(){

			}
		})

	})()
})