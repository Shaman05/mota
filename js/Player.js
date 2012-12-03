/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-2
 * Time: 下午10:41
 * To change this template use File | Settings | File Templates.
 *
 * 玩家模块
 */

define(function(require, exports, module){

    module.exports = Player;

    function Player(name){
        this.name = name;  //玩家名字
        this.direct = "up";  //玩家方向
        this.x = 10; //玩家x坐标 初始值可以任意
        this.y = 10; //玩家y坐标 初始值可以任意
        this.allowMove = true;
        this.f = 0; //玩家所处楼层
        this.f_arr = [1];  //存储玩家所去过的楼层 初始存入第一层
        this.rank = 1; //玩家等级
        this.health = 1000; //玩家生命
        this.money = 0; //玩家金钱
        this.attack = 10; //玩家攻击力
        this.defense = 10; //玩家防御力
        this.expe = 0; //玩家经验值
        this.yellow_key = 10; //玩家拥有的黄钥匙
        this.blue_key = 0; //玩家拥有的蓝钥匙
        this.red_key = 0; //玩家拥有的红钥匙
        //this.moveSpeed = 100; //玩家移动速度 暂时关闭移动动画

        //以下是隐藏的属性
        this.items = {  //玩家拥有的物品

        };
    }

    Player.prototype = {
        setPosition : function(x , y){
            this.x = x;
            this.y = y;
        },
        move : function(direct){
            this.direct = direct;
            if(this.allowMove){
                var player = $("#"+this.name),
                    cssDirect = null,
                    cssStep = null;
                player.attr("class","player_"+direct);
                var _left = parseInt(player.css("left")),
                    _top = parseInt(player.css("top"));
                if(direct == "left"){
                    _left -= 32;
                    cssDirect = "left";
                    cssStep = _left;
                }
                if(direct == "right"){
                    _left += 32;
                    cssDirect = "left";
                    cssStep = _left;
                }
                if(direct == "up"){
                    _top -= 32;
                    cssDirect = "top";
                    cssStep = _top;
                }
                if(direct == "down"){
                    _top += 32;
                    cssDirect = "top";
                    cssStep = _top;
                }
                var x = _left/32,
                    y = _top/32,
                    s = this.moveStatus(x,y);
                if(s.canMove){
                    player.css(cssDirect , cssStep+"px");
                    this.setPosition(x,y);
                }else{
                    this.action(s.obj);
                }
            }
        },
        moveStatus : function(x , y){
            var x = x,
                y = y,
                floor_f = _Map["floor_"+this.f];
            if(x>=0 && x<=10 && y>=0 && y<=10){
                var o = floor_f[y][x];
                if(o == null || o.name == _Player.name) //无障碍和玩家位置
                    return { canMove : true }
                if(o.type == "barrier") //墙、火、星空等其他障碍物
                    return { canMove : false , obj : "limit" }
                return { canMove : false , obj : o }
            }
            return { canMove : false , obj : "limit" }  //超出地图界限
        },
        action : function(o){
            if(o == "limit"){
                return
            }else{
                var name = o.name,
                    type = o.type;
                if(type == "npc"){  //NPC
                    EventDialog(o,_Player);
                }else if(name == "go_up" || name == "go_down"){  //上下楼梯
                    EventStairs(name,_Player);
                }else if(type == "enemy"){  //遇到怪物
                    EventFighting(o,_Player);
                }else if(type == "item"){  //物品
                    this.changePosition(this.direct);
                    if(name == "item-ssp"){  //圣水瓶
                        this.health += this.health;
                        _Debug.log("你获得了物品："+"<em>【"+o.CH_name+"】</em> 生命值翻倍！" ,true);
                        this.refreshData();
                    }else{
                        this.addPrototype(o.itemId);
                        _Debug.log("你获得了物品："+"<em>【"+o.CH_name+"】</em>",true);
                    }
                    o.clearThis();
                    var n = o.CH_name;
                    if(n == "圣光徽")
                        Dialog.showMessage("你拿到了圣光徽，该宝物可以允许你查看怪物属性，并计算出你打败怪物所损耗的生命值。现在可以按 '<span class='shopKey'>L</span>' 键查看怪物属性。");
                    if(n == "风之罗盘")
                        Dialog.showMessage("你拿到了风之罗盘，该宝物可以使你在走过的楼层间自由穿梭。现在可以按 '<span class='shopKey'>J</span>' 键，选择你要去的楼层。");
                }else if(type == "door"){  //门
                    if(this[Item.data[o.itemId]["need"]] > 0 || Item.data[o.itemId]["need"] == null){
                        if(name != "fence")
                            this.addPrototype(o.itemId);
                        this.changePosition(this.direct);
                        _Debug.log("你打开了一座："+"<em>"+o.CH_name+"</em>",true);
                        o.clearThis();
                    }else{
                        return
                    }
                }else{
                    return
                }
            }
        },
        changePosition : function(direct){
            var player = $("#"+this.name),
                d = direct,
                _left = parseInt(player.css("left")),
                _top = parseInt(player.css("top"));
            if(direct == "left" || direct == "right"){
                d = "left";
                _left = direct == "left" ? _left-32 : _left+32;
                player.css(d , _left+"px");
            }
            if(direct == "up" || direct == "down"){
                d = "top";
                _top = direct == "up" ? _top-32 : _top+32;
                player.css(d , _top+"px");
            }
            var x = _left/32,
                y = _top/32;
            this.setPosition(x,y);
        },
        addPrototype : function(itemName){
            var prototypes = Item.data[itemName]["values"];
            if(prototypes == "item"){
                this.items[Item.data[itemName]["name"]] = true;
            }else{
                for(var pro in prototypes){
                    this[pro] += prototypes[pro];
                }
            }
            this.refreshData();
        },
        clone : function(option){
            var o = {};
            for(var pro in option){
                o[pro] = option[pro];
            }
            return o;
        },
        refreshData : function(){
            $("#floor_index").text(this.f);
            $("#player_rank").text(this.rank);
            $("#player_health").text(this.health);
            $("#player_money").text(this.money);
            $("#player_attack").text(this.attack);
            $("#player_defense").text(this.defense);
            $("#player_expe").text(this.expe);
            $("#yellow_key").text(this.yellow_key);
            $("#blue_key").text(this.blue_key);
            $("#red_key").text(this.red_key);
        },
        Choose_floor : function(direct){
            var list = $("#floor_list"),
                li = list.find("li"),
                index = list.find(".selected").index();
            if(direct == "up" && index != 0){
                li.removeClass("selected").eq(index-1).addClass("selected");
            }
            if(direct == "down" && index != li.length-1){
                li.removeClass("selected").eq(index+1).addClass("selected");
            }
        },
        Choose_end : function(){
            _Debug.log("你取消了使用风之罗盘！",true);
        },
        Go_floor : function(){
            var selected = $("#floor_list").find(".selected"),
                choose_f = parseInt(selected.text())
            isBeenTo = selected.attr("isBeenTo");
            if(isBeenTo == "true"){
                this.f = choose_f;
                _Map_Init(choose_f);
                this.refreshData();
                _Debug.log("你使用风之罗盘来到了第 "+ choose_f +" 层！",true);
            }else{ //选择的楼层未到达则跳跃至当前楼层
                _Debug.log("由于你尚未到达过 "+ choose_f +" 层，风之罗盘将你送回了第 "+ this.f +" 层",true);
                _Map_Init(this.f);
            }
            Dialog.close();
        }
    }
});