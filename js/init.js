/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-2
 * Time: 下午10:21
 * To change this template use File | Settings | File Templates.
 *
 * 初始化游戏资源
 */

define(function(require, exports, modules){
    var util = require('util');
    var data = require('data');

    util.namespace('mota');
    mota.data = data;

    var Player = require('Player');
    var Barrier = require('Barrier').Barrier;
    var Stair = require('Barrier').Stair;
    var Npc = require('Npc');
    var Monster = require('Monster');
    var Item = require('Item');
    var Map = require('Map');

    modules.exports = {
        init : function(){
            this.createPlayer();
            this.createBarrier();
            this.createNpcs();
            this.createEnemy();
            this.createItems();
            this.start();
        },
        start : function(){
            $(function(){
                //增加图片预加载  优化地图显示速度
                $.preloadImage([
                    "enemy_01.jpg","enemy_02.jpg","enemy_03.jpg","enemy_04.jpg","enemy_05.jpg","enemy_06.jpg",
                    "enemy_07.jpg","enemy_08.jpg","enemy_09.jpg","enemy_10.jpg","enemy_11.jpg","enemy_12.jpg",
                    "enemy_13.jpg","enemy_14.jpg","enemy_15.jpg","enemy_16.jpg","enemy_17.jpg","enemy_18.jpg",
                    "enemy_19.jpg","enemy_20.jpg","enemy_21.jpg","enemy_22.jpg","enemy_23.jpg","enemy_24.jpg",
                    "enemy_25.jpg","enemy_26.jpg","enemy_27.jpg","enemy_28.jpg","enemy_29.jpg","enemy_30.jpg",
                    "enemy_31.jpg","item_yellowKey.jpg","item_blueKey.jpg","item_redKey.jpg","item_keyList.jpg",
                    "item_blueStone.jpg","item_redStone.jpg","item_bluePotions.jpg","item_redPotions.jpg","item_sword_1.jpg",
                    "item_sgh.jpg","item_tiedun.jpg","item_xiaofeiyu.jpg","item_jinbidai.jpg","item_smszj.jpg","item_ssp.jpg",
                    "item_fzlp.jpg","item_xgsl.jpg","item_hjd.jpg","shop_left.jpg","shop.jpg","shop_npc.jpg","shop_right.jpg",
                    "door_blue.jpg","door_red.jpg","door_gold.jpg","fence.jpg","jack.jpg","princess.jpg","shop_key.jpg",
                    "player.png","angle.jpg","fire.jpg","sky.jpg","go_up.jpg","go_down.jpg","door_yellow.jpg"
                ],init);
            })

            function init(){
                $(".welcome").removeClass("loading");
                $(".chapter").animate({"margin-top":0},5000);
                $("#startBtn").click(function(){
                    gameStart()
                });
                $("#toggle").click(function(){
                    toggleDebug();
                });
                $(".tab_h span").click(function(){
                    var index = $(this).index();
                    $(this).addClass("current").siblings().removeClass("current");
                    $(".tab_c").hide().eq(index).show();
                });
            }

            var _this = this;
            function gameStart(){
                $(".welcome").slideUp(500,function(){
                    var name = $.trim($("#player_name").val());
                    if(name != "输入游戏角色名称")
                        mota.player.name = name;

                    //console.time("装载地图")
                    _this.mapInit(1);
                    //console.timeEnd("装载地图")

                    /*_T = new Timer();
                    _T.run(); //开始计时
                    _Debug.log("游戏开始了...");

                    $(document).bind("keyup",_Player_Move);

                    toggleDebug();*/

                    $(this).remove();
                })
            }
            jQuery.preloadImage=function(images,callback){
                //console.log(arguments[0].length)
                for(var i=0; i<arguments[0].length; i++){
                    $("<img/>").attr("src","image/"+arguments[0][i]).load(function(){
                        //console.log($(this).attr("src")+" hasbeen loaded");
                    });
                }
                if(callback)
                    callback();
            }
        },
        createPlayer : function(){
            var playerName = $.trim($("#player_name").val()) || "勇士";
            mota.player = new Player(playerName);
        },
        createBarrier : function(){
            mota.barrier = {};
            mota.barrier._Wall = new Barrier("wall");  //墙壁
            mota.barrier._Fire = new Barrier("fire");  //火堆
            mota.barrier._Sky = new Barrier("sky");  //星空
            mota.barrier._Door_gold = new Barrier("door_gold");  //黄金门
            mota.barrier._Shop_left = new Barrier("shop_left");  //商店左墙壁
            mota.barrier._Shop_right = new Barrier("shop_right");  //商店右墙壁
            mota.barrier._Up_stairs =  new Stair("go_up");  //向上楼梯
            mota.barrier._Down_stairs =  new Stair("go_down");  //向下楼梯
        },
        createNpcs : function(){
            mota.npcs = [
                'angle',  //仙子
                'shop_m_l',  //低级商店（金币购物）
                'shop_m_h',  //高级商店（金币购物）
                'shop_e_l',  //低级商店（经验购物）
                'shop_e_h',  //高级商店（经验购物）
                'shop_key_sell',  //买钥匙的
                'shop_key_buy',  //卖钥匙的
                'jack',  //小偷杰克
                'smlr_03',  //第三层的神秘老人
                'sr_03',  //第三层的商人
                'smlr_16',  //第十六层的神秘老人
                'sr_16',  //第十六层的商人
                'princess'  //公主
            ];
            mota.npc = {};
            for(var i = 0, len = mota.npcs.length; i < len; i++){
                var _npc = mota.npcs[i];
                mota.npc[_npc] = new Npc(_npc, data.dialog[_npc]);
            }
        },
        createEnemy : function(){
            mota.mosters = [
                'enemy_01','enemy_02','enemy_03','enemy_04','enemy_05','enemy_06',
                'enemy_07','enemy_08','enemy_09','enemy_10','enemy_11','enemy_12',
                'enemy_13','enemy_14','enemy_15','enemy_16','enemy_17','enemy_18',
                'enemy_19','enemy_20','enemy_21','enemy_22','enemy_23','enemy_24',
                'enemy_25','enemy_26','enemy_27','enemy_28','enemy_29','enemy_30',
                'enemy_31','enemy_32','enemy_33'
            ];
            mota.moster = {};
            for(var i = 0, len = mota.mosters.length; i < len; i++){
                var _moster = mota.mosters[i];
                mota.moster[_moster] = new Monster(_moster, data.monster[_moster]);
            }
        },
        createItems : function(){
            mota.items = [
                'yellow_door','blue_door','red_door','fence','yellow_key','blue_key',
                'red_key','keyList','blue_stone','red_stone','red_potions','blue_potions',
                'sword_1','sword_2','sgh','fzlp','smszj','xgsl',
                'tiedun','hjd','xiaofeiyu','dafeiyu','jinbidai','ssp'
            ];
            mota.item = {};
            for(var i = 0, len = mota.items.length; i < len; i++){
                var _item = mota.items[i];
                mota.item[_item] = new Item(_item, data.item[_item]);
            }
        },

        mapInit : function(){
            mota.map = new Map();
            mota.map.init(1);
        }
    }
});