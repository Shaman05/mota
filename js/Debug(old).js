//JavaScript Document
//Debug

function Timer(){
	var second = 0;
	var gogo = function(){
			second ++ ;
		}
	this.run = function(){
			Timer.clock = setInterval(gogo , 1000);
		}
	this.stop = function(){
			clearInterval(Timer.clock);
		}
	this.getSecond = function(){
			return second;
		}
}

function toggleDebug(){
	var a = $("#toggle");
	a.toggleClass("toggle_off");
	$(".debug").slideToggle(200)
}

Timer.clock = null;

var _Debug = {
	
	log : function(msg , type){  //游戏信息面板输出当前游戏总时间（以实际时间计算秒数）
		var box = $("#debug"),
			st = _T.getSecond();
		var h = Math.floor(st/3600),
			m = st > 3600 ? Math.floor((st%3600)/60) : Math.floor(st/60),
			s = st > 60 ? st%60 : st;
		var d = Math.floor(h/24);
			h = h > 24 ? h%24 : h;
		h = h < 10 ? "0"+h : h;
		m = m < 10 ? "0"+m : m;
		s = s < 10 ? "0"+s : s;
		var timerTip = type == true ? "<span>" + msg + "</span>" : "<strong>第" + d + "天" + h + "时" + m + "分" + s + "秒：</strong><br>" + msg;
		$("<p>" + timerTip + "</p>").prependTo(box);
	},
	localData : {  //预留对话段的索引，后期可以为添加保存游戏功能准备
		"angle" : {
			"dialog_index" : 1
		},
		"shop_m_l" : {
			"dialog_index" : 1
		},
		"shop_m_h" : {
			"dialog_index" : 1
		},
		"shop_key_sell" : {
			"dialog_index" : 1
		},
		"shop_key_buy" : {
			"dialog_index" : 1
		},
		"smlr_03" : {
			"dialog_index" : 1
		},
		"sr_03" : {
			"dialog_index" : 1
		},
		"smlr_16" : {
			"dialog_index" : 1
		},
		"sr_16" : {
			"dialog_index" : 1
		},
		"jack" : {
			"dialog_index" : 1
		},
		"shop_e_l" : {
			"dialog_index" : 1
		},
		"shop_e_h" : {
			"dialog_index" : 1
        }
	}
};

function save_game(){
	if(window.localStorage){
		var s = window.localStorage;
		var data = {};
		data.player = {};  //人物属性
		data.dialog = _Debug.localData;  //对话索引
		data.map = {
			timer : new Date().getTime(),
			maps : _Clone_map(_Map)
		};
		console.log(data.map)
		for(var pro in _Player){
			if(typeof(_Player[pro]) != "function"){
				data.player[pro] = _Player[pro];  //写入人物属性
			}
		}
		s.setItem("mota_localData" , JSON.stringify(data)); //写入本地存储
	}else{
		alert("您的浏览器不支持本地存储！")
		return ;
	}
}

function load_game(data){
	if(window.localStorage){
		var s = window.localStorage;
		//console.log(data.map.floor_1[7])
		//console.log(_Map.floor_1[7])
		var data = JSON.parse(s.getItem("mota_localData"));  //读取到本地游戏数据
		if(data){
			for(var pro in data.player){   //设置人物属性
				_Player[pro] = data.player[pro];
			}
			_Debug.localData = data.dialog;  //设置对话索引
			//_Map = data.map;
			_Player.refreshData();
			_Map_Init(_Player.f);
		}else{
			alert("尚无游戏进度！");
		}
	}else{
		alert("您的浏览器不支持本地存储！")
		return ;
	}
}