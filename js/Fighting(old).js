// JavaScript Document
// Fighting
;
var _Fighting = null,
	_Fighting_Speed = 200;

function Fighting(e , p){
	this.obj = e;
	this.player = p;
	this.box = $("#pop_wrap");
	this.timer = null;
}

Fighting.prototype = {
	init : function(){
			if(Fighting.fightTest(this.obj).isWin){
				$('<div class="fighting_box" id="fighting_box"></div>').appendTo(this.box);
				var box = $("#fighting_box"),
					player = this.player,
					enemy = Enemy.data[this.obj.name]["values"];
				var html = '<div class="ft">'+
								'<div class="fplayer">'+
									'<div class="player_down">'+'</div>'+
									'<div class="row"><span>生命：</span><span id="ph">'+player.health+'</span></div>'+
									'<div class="row"><span>攻击：</span>'+player.attack+'</div>'+
									'<div class="row"><span>防御：</span>'+player.defense+'</div>'+
								'</div>'+
								'<div class="fenemy">'+
									'<div class="block '+this.obj.name+'">'+'</div>'+
									'<div class="row"><span id="eh">'+enemy.health+'</span><span>：生命</span></div>'+
									'<div class="row">'+enemy.attack+'<span>：攻击</span></div>'+
									'<div class="row">'+enemy.defense+'<span>：防御</span></div>'+
								'</div>'+
								'<div class="fvs">VS</div>'+
						   '</div>'+
						   '<div class="fc">'+
								'<p id="fc_p">战斗中...</p>'+
								'<div class="fend" id="fend" style="display:none">'+
									'<div class="continue">按空格键继续...</div>'+
								'</div>'+
						   '</div>';
				box.html(html).show(200 , this.start());
				_Player.allowMove = false;
				$(document).unbind();
			}else{
				Dialog.showMessage("您暂时不是怪物的对手，请抓紧修炼！")
			}
		},
	start : function(){
			_Debug.log("你碰到了" + "<span>【" + Enemy.data[this.obj.name]["CH_name"] + "】</span>" + ",战斗开始!");
			this.fight();
		},
	end : function(){
			clearInterval(this.timer);
			$("#fc_p").html("战斗结束！");
			$("#fend").show();
			this.addPrototype();
			$(document).bind("keyup",_Fight_end);
		},
	fight : function(){
			this.timer = setInterval(gogo , _Fighting_Speed);
			var _that = this;
			var enemy = Enemy.clone(Enemy.data[_that.obj.name]["values"]);
			function gogo(){  //战斗排序是以玩家为先手
				enemy.health -= _Player.attack - enemy.defense > 0 ? _Player.attack - enemy.defense : 0 ;
				$("#eh").html(enemy.health);
				if(enemy.health <= 0){
					$("#eh").html(0);
					_that.end();
					return
				}
				_Player.health -= enemy.attack - _Player.defense > 0 ? enemy.attack - _Player.defense : 0 ;
				$("#ph").html(_Player.health);
			}
		},
	addPrototype : function(){
			var jiangli = Enemy.data[this.obj.name]["win"],
				jb = 0,
				jy = 0;
			for(var pro in jiangli){
				_Player[pro] += jiangli[pro];
				if(pro == "money")
					jb = jiangli[pro];
				if(pro == "expe")
					jy = jiangli[pro];
			}
			_Debug.log("战斗结束，恭喜你获得了 <em>" + jb + "金币</em> 和 <em>" + jy + "经验</em>",true)
		},
	close : function(){
			this.box.empty();
			_Player.changePosition(_Player.direct);
			this.clearEnemy();
			_Player.refreshData();
			_Player.allowMove = true;
			$(document).unbind().bind("keyup",_Player_Move);
		},
	clearEnemy : function(){
			var floor_f = _Map["floor_"+_Player.f];
			floor_f[_Player.y][_Player.x] = null;
			var arr = $("."+this.obj.name);
			for(var i=0; i<arr.length; i++){
				if($(arr[i]).css("left") == _Player.x*32+"px" && $(arr[i]).css("top") == _Player.y*32+"px")
					$(arr[i]).remove();
			}
		}
}

Fighting.fightTest = function(e){
	var name = e.name;
	var enemy = Enemy.clone(Enemy.data[name]["values"]),
		player = _Player.clone({health:_Player.health,attack:_Player.attack,defense:_Player.defense});
	function gogo(){//战斗排序是以玩家为先手
		enemy.health -= player.attack - enemy.defense > 0 ? player.attack - enemy.defense : 0 ;
		if(enemy.health <= 0){
			return { isWin : true , loss : _Player.health - player.health}
		}
		player.health -= enemy.attack - player.defense > 0 ? enemy.attack - player.defense : 0 ;
		if(player.health <= 0){
			return { isWin : false , loss : "???"}
		}
		return gogo(); //递归 继续下一回合
	}
	return gogo();
}

function Enemy(){
}

Enemy.clone = function(obj){
	var o = {};
	for(var pro in obj){
		o[pro] = obj[pro];
	}
	return o;
}

Enemy.data = { 
	"enemy_01" : { "values" : { "health" : 50, "attack" : 20, "defense" : 1}, "CH_name" : "绿头怪", "win" : { "money" : 1, "expe" : 1 } } , 
	"enemy_02" : { "values" : { "health" : 70, "attack" : 15, "defense" : 2}, "CH_name" : "红头怪", "win" : { "money" : 2, "expe" : 2 } } , 
	"enemy_03" : { "values" : { "health" : 100, "attack" : 20, "defense" : 5}, "CH_name" : "小蝙蝠", "win" : { "money" : 3, "expe" : 3 } } , 
	"enemy_04" : { "values" : { "health" : 110, "attack" : 25, "defense" : 5}, "CH_name" : "骷髅人", "win" : { "money" : 5, "expe" : 4 } } , 
	"enemy_05" : { "values" : { "health" : 200, "attack" : 35, "defense" : 10}, "CH_name" : "青头怪", "win" : { "money" : 5, "expe" : 5 } } , 
	"enemy_06" : { "values" : { "health" : 150, "attack" : 40, "defense" : 20}, "CH_name" : "骷髅士兵", "win" : { "money" : 8, "expe" : 6 } } , 
	"enemy_07" : { "values" : { "health" : 125, "attack" : 50, "defense" : 25}, "CH_name" : "初级法师", "win" : { "money" : 10, "expe" : 7 } } , 
	"enemy_08" : { "values" : { "health" : 150, "attack" : 65, "defense" : 30}, "CH_name" : "大蝙蝠", "win" : { "money" : 10, "expe" : 8 } } , 
	"enemy_09" : { "values" : { "health" : 300, "attack" : 75, "defense" : 45}, "CH_name" : "兽面人", "win" : { "money" : 13, "expe" : 10 } } , 
	"enemy_10" : { "values" : { "health" : 400, "attack" : 90, "defense" : 50}, "CH_name" : "骷髅队长", "win" : { "money" : 15, "expe" : 12 } } , 
	"enemy_11" : { "values" : { "health" : 500, "attack" : 115, "defense" : 65}, "CH_name" : "石头怪人", "win" : { "money" : 15, "expe" : 15 } } , 
	"enemy_12" : { "values" : { "health" : 250, "attack" : 120, "defense" : 70}, "CH_name" : "麻衣法师", "win" : { "money" : 20, "expe" : 17 } } , 
	"enemy_13" : { "values" : { "health" : 450, "attack" : 150, "defense" : 90}, "CH_name" : "初级卫兵", "win" : { "money" : 22, "expe" : 19 } } , 
	"enemy_14" : { "values" : { "health" : 550, "attack" : 160, "defense" : 90}, "CH_name" : "红蝙蝠", "win" : { "money" : 25, "expe" : 20 } } , 
	"enemy_15" : { "values" : { "health" : 100, "attack" : 200, "defense" : 110}, "CH_name" : "高级法师", "win" : { "money" : 30, "expe" : 25 } } , 
	"enemy_16" : { "values" : { "health" : 700, "attack" : 250, "defense" : 125}, "CH_name" : "怪王", "win" : { "money" : 32, "expe" : 30 } } , 
	"enemy_17" : { "values" : { "health" : 1300, "attack" : 300, "defense" : 150}, "CH_name" : "白衣武士", "win" : { "money" : 40, "expe" : 35 } } , 
	"enemy_18" : { "values" : { "health" : 850, "attack" : 350, "defense" : 200}, "CH_name" : "金卫士", "win" : { "money" : 45, "expe" : 40 } } , 
	"enemy_19" : { "values" : { "health" : 500, "attack" : 400, "defense" : 260}, "CH_name" : "红衣法师", "win" : { "money" : 47, "expe" : 45 } } , 
	"enemy_20" : { "values" : { "health" : 900, "attack" : 450, "defense" : 330}, "CH_name" : "兽面武士", "win" : { "money" : 50, "expe" : 50 } } , 
	"enemy_21" : { "values" : { "health" : 1250, "attack" : 500, "defense" : 400}, "CH_name" : "冥卫兵", "win" : { "money" : 55, "expe" : 55 } } , 
	"enemy_22" : { "values" : { "health" : 1500, "attack" : 560, "defense" : 460}, "CH_name" : "高级卫兵", "win" : { "money" : 60, "expe" : 60 } } , 
	"enemy_23" : { "values" : { "health" : 1200, "attack" : 620, "defense" : 520}, "CH_name" : "双手剑士", "win" : { "money" : 65, "expe" : 75 } } , 
	"enemy_24" : { "values" : { "health" : 2000, "attack" : 680, "defense" : 590}, "CH_name" : "冥战士", "win" : { "money" : 70, "expe" : 65 } } , 
	"enemy_25" : { "values" : { "health" : 900, "attack" : 750, "defense" : 650}, "CH_name" : "金队长", "win" : { "money" : 77, "expe" : 70 } } , 
	"enemy_26" : { "values" : { "health" : 1500, "attack" : 830, "defense" : 730}, "CH_name" : "灵法师", "win" : { "money" : 80, "expe" : 70 } } , 
	"enemy_27" : { "values" : { "health" : 2500, "attack" : 900, "defense" : 850}, "CH_name" : "冥队长", "win" : { "money" : 84, "expe" : 75 } } , 
	"enemy_28" : { "values" : { "health" : 1200, "attack" : 980, "defense" : 900}, "CH_name" : "灵武士", "win" : { "money" : 88, "expe" : 75 } } , 
	"enemy_29" : { "values" : { "health" : 3100, "attack" : 1150, "defense" : 1050}, "CH_name" : "影子战士", "win" : { "money" : 92, "expe" : 80 } } , 
	"enemy_30" : { "values" : { "health" : 15000, "attack" : 1000, "defense" : 1000}, "CH_name" : "红衣魔王", "win" : { "money" : 100, "expe" : 100 } } , 
	"enemy_31" : { "values" : { "health" : 30000, "attack" : 1700, "defense" : 1500}, "CH_name" : "冥灵魔王", "win" : { "money" : 250, "expe" : 220 } } , 
	"enemy_32" : { "values" : { "health" : 99999, "attack" : 5000, "defense" : 4000}, "CH_name" : "血影", "win" : { "money" : 0, "expe" : 0 } } , 
	"enemy_33" : { "values" : { "health" : 99999, "attack" : 9999, "defense" : 5000}, "CH_name" : "魔龙", "win" : { "money" : 0, "expe" : 0 } } 
}