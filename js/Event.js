// JavaScript Document
// Event

/****************************
 *	对话事件
 *	@param o : 对话的npc
 * 	@param p : 玩家
 ****************************/
function EventDialog(o , p){
	_Dialog = new Dialog(o,p);
	_Dialog.start();
}

/****************************
 *	上下楼事件
 *	@param d : 楼梯方向
 * 	@param p : 玩家
 ****************************/
function EventStairs(d , p){
	var m = _Map["floor_"+p.f],
		upp = _Map["updata_player_position"][p.f];
		_Updata_Player_Position(p.f , upp[d].y , upp[d].x); //更新上一次所在楼层中玩家的位置
	if(d == "go_up"){  //上楼
		p.f ++;
		var isBeenTo = false;
		for(var i=0; i<p.f_arr.length; i++)
			if(p.f == p.f_arr[i])   //需要判断是否已经去过该楼层
				isBeenTo = true;
		if(!isBeenTo)
			p.f_arr.push(p.f);
	}else if(d == "go_down"){  //下楼
		p.f --;
	}
	_Debug.log("你来到了第" + p.f + "层！")
	_Map_Init(p.f);
}

/****************************
 *	战斗事件
 *	@param e : 怪物
 * 	@param p : 玩家
 ****************************/
function EventFighting(e , p){
	_Fighting = new Fighting(e,p);
	_Fighting.init();
}

/****************************
 *	购物事件
 *	@param s : 商店名
 * 	@param p : 玩家
 ****************************/
function EventShopping(s , p){
	_Shopping = new Shopping(s , p);
	_Shopping.start();
}

/****************************
 *	开门事件
 *	@param door : 门
 * 	@param p : 玩家
 ****************************/
function EventOpenDoor(door , p){
	_Debug.log("你开启了一座门" + door.name)
}

//玩家动作
function _Player_Move(e){
	var kv = e.keyCode;
	if(kv == 37 ){ //向左
		_Player.move("left")	
	}else if(kv == 39){  //向右
		_Player.move("right")
	}else if(kv == 38){  //向上
		_Player.move("up")
	}else if(kv == 40){  //向下
		_Player.move("down")
	}else if(kv == 76 ){ //查看怪物属性
		if(_Player.items.sgh)  //必须要有圣光徽
			Dialog.viewEnemyInit(_Player.f);	
	}else if(kv == 74 ){ //跳跃楼层
		if(_Player.items.fzlp)  //必须要有风之罗盘
			if(_Player.f == 22)
				Dialog.showMessage("很不幸，本层被魔咒笼罩着，风之罗盘失效了。");
			else		
				Dialog.chooseFloor(_Player.f_arr);
	}
}

//对话中
function _Dialog_ing(e){
	var kv = e.keyCode;
	if(kv == 32 ){ //按空格继续
		_Dialog.next();	
	}
}

//提示信息
function showMessage_close(e){
	var kv = e.keyCode;
	if(kv == 32 ){ //按空格继续
		Dialog.close();	
	}
}

//战斗中
function _Fight_end(e){
	var kv = e.keyCode;
	if(kv == 32 ){ //按空格继续
		_Fighting.close();	
	}
}

//购物中
function _Shop_ing(e){
	var kv = e.keyCode;
	if(kv == 32 ){ //按空格继续 取消购物
		Dialog.close();
		_Shopping.end();
	}else if(kv == 38){  //向上移动选框
		_Shopping.selectItem("up");
	}else if(kv == 40){  //向下移动选框
		_Shopping.selectItem("down");
	}else if(kv == 13){  //按回车 确定购买所选物品
		_Shopping.ok();
	}
}

//使用风之罗盘跳跃楼层
function _Use_fzlp(e){
	var kv = e.keyCode;
	if(kv == 32 ){ //按空格继续 取消跳跃
		Dialog.close();
		_Player.Choose_end();
	}else if(kv == 38){  //选择上一层
		_Player.Choose_floor("up");
	}else if(kv == 40){  //选择下一层
		_Player.Choose_floor("down");
	}else if(kv == 13){  //按回车 确定跳跃
		_Player.Go_floor();
	}
}