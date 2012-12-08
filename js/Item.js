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

    function Item(name, options, id){
        this.name = name;
        this.options = options;
        this.itemId = id || this.name;
        this.type = "item";
    }

    Item.prototype.remove = function(){
        mota.map.clearObject(this);
        mota._Debug.log("你获得了物品：" + "<em>【" + this.options.CH_name + "】</em>",true);
    }
});