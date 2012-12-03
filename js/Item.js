/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-3
 * Time: 下午9:20
 * To change this template use File | Settings | File Templates.
 *
 * 道具
 */

define(function(require, exports, module){

    module.exports = Item;

    /**
     * @param name
     * @param options
     * @param id
     * @constructor
     */
    function Item(name, options, id){
        this.name = name;
        this.options = options;
        this.itemId = id || this.name;
        //this.CH_name = mota.data.item[this.itemId]["CH_name"];
        this.type = "item";
    }

    Item.prototype = {
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
});