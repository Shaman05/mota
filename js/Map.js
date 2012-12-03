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
    var map = $("#map");

    module.exports = Map;

    function Map(){

    };

    Map.prototype = {
        init : function(f){
            var _Player = mota.player;
            var floor_f = mota.data.map["floor_" + f];
            var html = "";
            _Player.f = f;
            for(var i = 0, len = floor_f.length; i < len; i++)
                for(var j = 0, _len = floor_f[i].length; j < _len; j++){
                    var o = floor_f[i][j];
                    if(!!o){
                        var id = o.name == _Player.name ? _Player.name :
                                o.id ? o.id : "",
                            cn = o.name == _Player.name ? "player_" + o.direct : "block " + o.name;
                        var x = j * 32,
                            y = i * 32;
                        html += '<div id="' + id + '" class="' + cn + '" style="left:' + x + 'px;top:' + y + 'px"></div>';
                    }
                }
            map.html(html);
            _Player.refreshData();
        },
        upDatePlayerPosition : function(f, x, y){
            var _Player = mota.player;
            var floor_f = mota.data.map["floor_" + f];
            for(var i = 0, len = floor_f.length; i < len; i++)
                for(var j = 0, _len = floor_f[i].length; j < _len; j++){
                    if(floor_f[i][j] == _Player){
                        floor_f[i][j] = null;
                        break
                    }
                }
            floor_f[x][y] = _Player;
        }
    }
});