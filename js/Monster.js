/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-3
 * Time: 下午21:01
 * To change this template use File | Settings | File Templates.
 *
 * 怪物
 */

define(function(require, exports, module){

    module.exports = Monster;

    /**
     * @param name
     * @param id
     * @param option
     * @constructor
     */
    function Monster(name, option, id){
        this.name = name;
        this.id = id || this.name;
        this.option = option;
        this.type = "enemy";
    }

    Monster.stack = [];
})