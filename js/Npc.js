/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-2
 * Time: 下午10:58
 * To change this template use File | Settings | File Templates.
 *
 * Npc模块
 */

define(function(require, exports, module){

    module.exports = Npc;

    /**
     * @param name
     * @param id
     * @param option
     * @constructor
     */
    function Npc(name, option, id){
        this.name = name;
        this.id = id || this.name;
        this.option = option;
        this.type = "npc";
    }

    Npc.stack = [];
})