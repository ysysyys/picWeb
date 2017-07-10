define(function(){
	var common={};

	// 判断输入为空、空格、非空
	// 1 --空 2 --空格 3 --非空
	common.judge=function(value){
		if(value.length!=0){//有输入
			if(value.replace(/^\s+/, '').replace(/\s+$/, '').length!=0)//空格输入
				return 3;
			else//非空输入
				return 2
		}
		return 1;//未输入
	};


	//删除数组指定元素
    Array.prototype.remove = function(val) {
        var index = this.indexOf(val);
        if (index > -1) {
            this.splice(index,1);
        }
    };

    
	// new Date('2013-2-15')
	// new Date('2013/2/15')
	// new Date('02/15/2013')
	// new Date('2013-FEB-15')
	// new Date('FEB, 15, 2013')
	// new Date('FEB 15, 2013')
	// new Date('Feberuary, 15, 2013')
	// new Date('Feberuary 15, 2013')
	// new Date('15 Feb 2013')
	// new Date('15, Feberuary, 2013')
	// Fri Feb 15 2013 00:00:00 GMT+0800 (CST)
	// mode 月日的形式09/9 split 分割号 month是否月格式
	common.dateFomat=function(date,mode,split,month){
		var _year=date.getFullYear(),
			_month=date.getMonth()>8?date.getMonth()+1:'0'+(date.getMonth()+1),
			_day=date.getDate()>9?date.getDate():'0'+date.getDate(),
			dateStr=_year+_month+_day;
		// console.log(month);
		switch(mode){
			case 'yyyymmss':return common.dateFomatFull(dateStr,split,month);
			case 'yyyyms':return common.dateFomatSingle(dateStr,split,month);
		}

	}

    //20160605-----2016?6?5 默认201665 month默认false true--2016?6
	common.dateFomatSingle=function(str,split,month){
		var _year=str.substring(0,4),
			_month=str.substring(4,5)=='0'?str.substring(5,6):str.substring(4,6),
			_day=str.substring(6,7)=='0'?str.substring(7,8):str.substring(6,8),
			split=split?split:'';
		return _year+split+_month+(month?'':split+_day);
	}

    //20160605-----2016?06?05 默认20160605  month默认false true--2016?06
	common.dateFomatFull=function(str,split,month){
		var _year=str.substring(0,4),
			_month=str.substring(4,6),
			_day=str.substring(6,8),
			split=split?split:'';
		return _year+split+_month+(month?'':split+_day);
	}



	common.removeClass=function(ele,name){
		var classes=ele.className.split(' ');
		if(classes.indexOf(name)>0){
			classes.splice(1,1)
		}
		return classes.join(' ');
	}
		
	common.addClass=function(ele,name){
		var classes=ele.className;
		return classes+' '+name;
	}





	

	return common;
});