/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-8
 * Time: 上午11:17
 * To change this template use File | Settings | File Templates.
 *
 * 战斗系统
 */

define(function(require, exports, module){

    module.exports = Fighting;

    function Fighting(){
        this.obj = null;
        this.player = null;
        this.box = $("#pop_wrap");
        this.timer = null;
    }

    Fighting.prototype = {
        init : function(o, p){
            this.obj = o;
            this.player = p;
            if(this.fightingTest(this.obj, this.player).isWin){
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

        fightingTest : function(o, p){
            var enemy = o.clone();
            var player = p.clone();
            function gogo(){//战斗排序是以玩家为先手
                enemy.health -= player.attack - enemy.defense > 0 ? player.attack - enemy.defense : 0 ;
                if(enemy.health <= 0){
                    return { isWin : true , loss : p.health - player.health}
                }
                player.health -= enemy.attack - player.defense > 0 ? enemy.attack - player.defense : 0 ;
                if(player.health <= 0){
                    return { isWin : false , loss : "???"}
                }
                return gogo(); //递归 继续下一回合
            }
            return gogo();
        }
    }

    function fightingTest(o, p){
        var enemy = o.clone();
        var player = p.clone();
        function gogo(){//战斗排序是以玩家为先手
            enemy.health -= player.attack - enemy.defense > 0 ? player.attack - enemy.defense : 0 ;
            if(enemy.health <= 0){
                return { isWin : true , loss : p.health - player.health}
            }
            player.health -= enemy.attack - player.defense > 0 ? enemy.attack - player.defense : 0 ;
            if(player.health <= 0){
                return { isWin : false , loss : "???"}
            }
            return gogo(); //递归 继续下一回合
        }
        return gogo();
    }
});