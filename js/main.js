/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-2
 * Time: 下午10:17
 * To change this template use File | Settings | File Templates.
 *
 * 游戏入口
 */

seajs.config({
    preload : ['jquery-1.6.min']
    //,debug : 2
});

seajs.use('init', function(game){
    game.init();
});
