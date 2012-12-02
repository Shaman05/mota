/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-2
 * Time: 下午10:21
 * To change this template use File | Settings | File Templates.
 *
 * 初始化游戏
 */

define(function(require, exports, modules){
    var util = require('util');
    var data = require('data');

    util.namespace('mota');
    //require('Map');


    modules.exports = {
        start : function(){
            this.createPlayer();
            this.createNpcs();
            console.log(mota.player);
            console.log(mota.npc);
        },
        createPlayer : function(){
            var Player = require('Player');
            var playerName = $.trim($("#player_name").val()) || "勇士";
            mota.player = new Player(playerName);
        },
        createNpcs : function(){
            var Npc = require('Npc');
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
        createItems : function(){
            var Item = require('Items');

        },

        mapInit : function(){

        }
    }
});