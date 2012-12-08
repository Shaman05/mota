/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-3
 * Time: 下午10:10
 * To change this template use File | Settings | File Templates.
 *
 * 地图模块
 */

define(function(require, exports, module){
    var mapBox = $("#map");

    module.exports = Map;

    function Map(){
        this.floorData = [];
    };

    Map.prototype = {
        init : function(f){
            var player = mota.player;
            var mapHtml = "";
            var currentFloorData = mota.data.map["floor_" + f];
            player.f = f;
            this.floorData[f] = [];
            for(var i = 0, len = currentFloorData.length; i < len; i++){
                this.floorData[f][i] = [];
                for(var j = 0, _len = currentFloorData[i].length; j < _len; j++){
                    var objCode = currentFloorData[i][j];
                    var objName = mota.data._map[objCode];
                    var o = mota[objName];
                    if(!!o){
                        var id = o.name == player.name ? player.name : o.id ? o.id : "";
                        var cn = o.name == player.name ? "player_" + o.direct : "block " + o.name;
                        var x = j * 32;
                        var y = i * 32;
                        mapHtml += '<div id="' + id + '" class="' + cn + '" style="left:' + x + 'px;top:' + y + 'px"></div>';
                        this.floorData[f][i][j] = o;
                    }else{
                        this.floorData[f][i][j] = null;
                    }
                }
            }
            mapBox.html(mapHtml);
            player.refreshData();
        },

        clearObject : function(o){
            var player = mota.player;
            var f = player.f;
            var x = player.x;
            var y = player.y;
            mota.data.map["floor_" + f][y][x] = null;
            this.floorData[f][y][x] = null;
            $("." + o.name).each(function(){
                if($(this).css("left") == x * 32 + "px" && $(this).css("top") == y * 32 + "px")$(this).remove();
            })
        },

        upDatePlayerPosition : function(f, x, y){
            var player = mota.player;
            var floor_f = mota.data.map["floor_" + f];
            for(var i = 0, len = floor_f.length; i < len; i++){
                for(var j = 0, _len = floor_f[i].length; j < _len; j++){
                    if(floor_f[i][j] == player.id){
                        floor_f[i][j] = null;
                        this.floorData[f][i][j] = null;
                        break
                    }
                }
            }
            floor_f[x][y] = player.id;
            this.floorData[f][x][y] = player;
        }
    }
});