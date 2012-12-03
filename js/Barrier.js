/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-3
 * Time: 下午9:50
 * To change this template use File | Settings | File Templates.
 *
 * 障碍物
 */

define(function(require, exports, module){

    module.exports = {
        Barrier : function (name){
            this.name = name;
            this.type = "barrier";
        },
        Stair : function (name){
            this.name = name;
            this.type = "stair";
        }
    };
});