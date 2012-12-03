// JavaScript Document
// Items

/****************** Item ******************
 *  物品
 ******************************************/
function Item(name){
	this.name = name;
	this.type = "notype";
	this.itemId = null;
	this.setItem();
}

Item.prototype = {
	setItem : function(){
		var str = this.name,
			arr = str.split("-");
		this.type = arr[0];
		this.itemId = arr[1];
		this.CH_name = Item.data[this.itemId]["CH_name"];
	},
	setId : function(){
		var randomStr = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		this.id = "item_" + new Date().getTime();
	},
	clearThis : function(){
		var floor_f = _Map["floor_"+_Player.f];
		floor_f[_Player.y][_Player.x] = null;
		var arr = $("."+this.name);
		for(var i=0; i<arr.length; i++){
			if($(arr[i]).css("left") == _Player.x*32+"px" && $(arr[i]).css("top") == _Player.y*32+"px")
				$(arr[i]).remove();
		}
	}
}

Item.data = {
	"yellow_door" : {
		"need" : "yellow_key",
		"values" : {
			"yellow_key" : -1
		},
		"CH_name" : "黄门"
	},
	"blue_door" : {
		"need" : "blue_key",
		"values" : {
			"blue_key" : -1
		},
		"CH_name" : "蓝门"
	},
	"red_door" : {
		"need" : "red_key",
		"values" : {
			"red_key" : -1
		},
		"CH_name" : "红门"
	},
	"fence" : {
		"need" : null,
		"values" : null,
		"CH_name" : "栅栏"
	},
	"yellow_key" : {
		"values" : {
			"yellow_key" : 1
		},
		"CH_name" : "黄钥匙"
	},
	"blue_key" : {
		"values" : {
			"blue_key" : 1
		},
		"CH_name" : "蓝钥匙"
	},
	"red_key" : {
		"values" : {
			"red_key" : 1
		},
		"CH_name" : "红钥匙"
	},
	"keyList" : {
		"values" : {
			"yellow_key" : 1,
			"blue_key" : 1,
			"red_key" : 1
		},
		"CH_name" : "钥匙链"
	},
	"blue_stone" : {
		"values" : {
			"defense" : 3
		},
		"CH_name" : "蓝宝石"
	},
	"red_stone" : {
		"values" : {
			"attack" : 3
		},
		"CH_name" : "红宝石"
	},
	"red_potions" : {
		"values" : {
			"health" : 200
		},
		"CH_name" : "小血瓶"
	},
	"blue_potions" : {
		"values" : {
			"health" : 500
		},
		"CH_name" : "大血瓶"	
	},
	"sword_1" : {
		"values" : {
			"attack" : 10
		},
		"CH_name" : "铁剑"	
	},
	"sword_2" : {
		"values" : {
			"attack" : 70
		},
		"CH_name" : "青锋剑"	
	},
	"sgh" : {
		"values" : "item",
		"name" : "sgh",
		"CH_name" : "圣光徽"	
	},
	"fzlp" : {
		"values" : "item",
		"name" : "fzlp",
		"CH_name" : "风之罗盘"	
	},
	"smszj" : {
		"values" : "item",
		"name" : "smszj",
		"CH_name" : "圣母十字架"	
	},
	"xgsl" : {
		"values" : "item",
		"name" : "xgsl",
		"CH_name" : "星光神锒"	
	},
	"tiedun" : {
		"values" : {
			"defense" : 10
		},
		"CH_name" : "铁盾"	
	},
	"hjd" : {
		"values" : {
			"defense" : 85
		},
		"CH_name" : "黄金盾"	
	},
	"xiaofeiyu" : {
		"values" : {
			"rank" : 1,
			"health" : 1000,
			"attack" : 10,
			"defense" : 10
		},
		"CH_name" : "小飞羽"	
	},
	"dafeiyu" : {
		"values" : {
			"rank" : 3,
			"health" : 3000,
			"attack" : 30,
			"defense" : 30
		},
		"CH_name" : "大飞羽"	
	},
	"jinbidai" : {
		"values" : {
			"money" : 300
		},
		"CH_name" : "金币袋"	
	},
	"ssp" : {
		"values" : {
			"health" : 2  //生命值翻倍
		},
		"CH_name" : "圣水瓶"	
	}
}