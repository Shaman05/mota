/**
 * Created with JetBrains PhpStorm.
 * Author: Shaman
 * Date: 12-12-2
 * Time: 下午11:13
 * To change this template use File | Settings | File Templates.
 *
 * 游戏数据资源
 */

define(function(require, exports, module){

    module.exports = {
        dialog : {
            angle : {
                "dialog_direct" : "up",
                "dialog_1" :{
                    "condition" : null ,   //触发条件下一对话的条件  无
                    "text" : [
                        {"figure" : "player" , "text" : "喔..."},
                        {"figure" : "angle" , "text" : "你醒了！"},
                        {"figure" : "player" , "text" : "你是谁？这是什么地方，我在哪里？"},
                        {"figure" : "angle" , "text" : "我是这里的仙子。"},
                        {"figure" : "angle" , "text" : "刚才你被这里的怪物打昏了。"},
                        {"figure" : "player" , "text" : "剑，剑，我的剑呢？"},
                        {"figure" : "angle" , "text" : "你的剑被他们抢走了，我只来得及将你救出来。"},
                        {"figure" : "player" , "text" : "那，你有看到公主吗？我是来救公主的。"},
                        {"figure" : "angle" , "text" : "公主还在里面，你这样进去是打不过里面的小怪的。"},
                        {"figure" : "player" , "text" : "那我怎么办，我答应了国王一定要把公主救出来的，那我现在应该怎么办呢？"},
                        {"figure" : "angle" , "text" : "放心吧，我把我的力量借给你，你就可以打赢那些小怪了。不过，你得先帮我去找一样东西，找到了再来这里找我。"},
                        {"figure" : "player" , "text" : "找东西？找什么东西？"},
                        {"figure" : "angle" , "text" : "是一个十字架，中间有一颗红色的宝石。"},
                        {"figure" : "player" , "text" : "那个东西有什么用吗？"},
                        {"figure" : "angle" , "text" : "我本是这座塔守护者，可不久前，从北方来了一批恶魔，并将我的魔力封在了这个十字架里面，如果你能将它带出塔来，那我的魔力便会慢慢地恢复，到那时我便可以把力量借给你去救出公主了。要记住：只有用我的魔力才能打开二十一层的门。"},
                        {"figure" : "player" , "text" : "......好吧，我试试看。"},
                        {"figure" : "angle" , "text" : "刚才我去看过了，你的剑被放在四楼，你的盾在六楼上，而那个十字架被放在八楼。要到八楼，你的先取回你的剑和盾。另外，在塔里的其它楼层上，还有一些存放了好几百年的宝剑和宝物，如果得到它们，对于你对付这里面的怪物将有很大的帮助。我这里有三把钥匙，你先拿去，在塔里面还有很多这样的钥匙，你一定要珍惜使用。"}
                    ],
                    "jiangli" : {
                        "type" : "items" ,
                        "pro" : {
                            "yellow_key" : 1 ,
                            "blue_key" : 1,
                            "red_key" : 1
                        }
                    }
                },
                "dialog_2" : {
                    "condition" : "smszj" ,  //触发条件下一对话的条件  需要圣母十字架
                    "text" : [
                        {"figure" : "angle" , "text" : "如果你拿到了<em>【圣母十字架】</em>，我把我的力量借给你，你就可以打赢那些小怪了。"}
                    ],
                    "jiangli" : null
                },
                "dialog_3" : {
                    "condition" : null ,
                    "text" : [
                        {"figure" : "player" , "text" : "仙子，我已经将那个十字架找到了。"},
                        {"figure" : "angle" , "text" : "你做得很好。那么，现在我就开始授与你更强的力量！咪啦哆咪哗......好了，我已经将你现在的力量提升了！记住：如果你没有足够的实力的话，不要去第二十一层！在那一层里，你所有宝物的法力都会失去作用！快走吧，杀死魔王后，来第二十二层上找我！"}
                    ],
                    "jiangli" : {
                        "type" : "powerUp" ,
                        "pro" : {
                            "health" : 1.3,
                            "attack" : 1.3 ,
                            "defense" : 1.3
                        }
                    }
                },
                "dialog_4" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "angle" , "text" : "加油勇士！你一定能救出公主的。"}
                    ],
                    "jiangli" : null
                }
            },
            smlr_03 : {   //第三层神秘老人
                "dialog_direct" : "up",
                "dialog_1" : {
                    "condition" : null ,
                    "text" : [
                        {"figure" : "player" , "text" : "您已经得救了！"},
                        {"figure" : "神秘老人" , "text" : "哦，我的孩子，真是太感谢你了！这个地方又脏又坏，我真的是快呆不下去了。"},
                        {"figure" : "player" , "text" : "快走吧，我还得去救被关在这里的公主。"},
                        {"figure" : "神秘老人" , "text" : "哦，你是来救公主的，为了表示对你的感谢，这个东西就送给你吧，这还是我年轻的时候用过的。拿着它去解救公主吧！"}
                    ],
                    "jiangli" : {
                        "type" : "abillity" ,
                        "pro" : {
                            "attack" : 70
                        }
                    }
                },
                "dialog_2" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "神秘老人" , "text" : "加油勇士！你一定能救出公主的。"}
                    ],
                    "jiangli" : null
                }
            },
            sr_03 : {   //第三层商人
                "dialog_direct" : "up",
                "dialog_1" : {
                    "condition" : null ,
                    "text" : [
                        {"figure" : "player" , "text" : "您已经得救了！"},
                        {"figure" : "商人" , "text" : "哦，是嘛！真是太感谢你了！我是个商人，不知道为什么被抓到这里来了。"},
                        {"figure" : "player" , "text" : "现在您已经自由了。"},
                        {"figure" : "商人" , "text" : "哦，对对对，我已经自由了。那这个东西就给你吧，本来我是准备卖钱的。相信它对你一定很有帮助！"}
                    ],
                    "jiangli" : {
                        "type" : "abillity" ,
                        "pro" : {
                            "defense" : 30
                        }
                    }
                },
                "dialog_2" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "商人" , "text" : "勇士，你救了我，真是太感谢你了！"}
                    ],
                    "jiangli" : null
                }
            },
            smlr_16 : {   //第十六层神秘老人
                "dialog_direct" : "up",
                "dialog_1" : {
                    "condition" : "expe" ,
                    "value" : 500,
                    "text" : [
                        {"figure" : "神秘老人" , "text" : "你好，勇敢的孩子，你终于来到这里了。我将给你一个非常好的宝物，它可以使你的攻击力提升120点，但这必须的用你的500点经验来进行交换，考虑一下子吧！"}
                    ],
                    "jiangli" : null
                },
                "dialog_2" : {
                    "condition" : null ,
                    "text" : [
                        {"figure" : "神秘老人" , "text" : "怎么样？你有500经验了吗？"},
                        {"figure" : "player" , "text" : "好吧，那就将那把剑给我吧！"},
                        {"figure" : "神秘老人" , "text" : "那好吧，这把剑就给你了！"}
                    ],
                    "jiangli" : {
                        "type" : "abillity" ,
                        "pro" : {
                            "attack" : 120
                        }
                    }
                },
                "dialog_3" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "神秘老人" , "text" : "勇敢的孩子，愿你早日救出公主！"}
                    ],
                    "jiangli" : null
                }
            },
            sr_16 : {   //第十六层商人
                "dialog_direct" : "up",
                "dialog_1" : {
                    "condition" : "money" ,
                    "value" : 500,
                    "text" : [
                        {"figure" : "神秘商人" , "text" : "啊哈，欢迎你的到来！我这里有一件对你来说非常好的宝物，只要你出得起钱，我就卖给你。"},
                        {"figure" : "player" , "text" : "什么宝物？要多少钱？"},
                        {"figure" : "神秘商人" , "text" : "是这个游戏里最好的盾牌，防御值可以增加120点，而你只要出500个金币就可以买下。"}
                    ],
                    "jiangli" : null
                },
                "dialog_2" : {
                    "condition" : null ,
                    "text" : [
                        {"figure" : "神秘商人" , "text" : "怎么样？你有500个金币吗？"},
                        {"figure" : "player" , "text" : "我有500个金币。"},
                        {"figure" : "神秘商人" , "text" : "好，成交！"}
                    ],
                    "jiangli" : {
                        "type" : "abillity" ,
                        "pro" : {
                            "defense" : 120
                        }
                    }
                },
                "dialog_3" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "神秘商人" , "text" : "年轻人，时间就是金钱，抓紧时间。"}
                    ],
                    "jiangli" : null
                }
            },
            shop_m_l : {  //低级商店（使用金币购物）
                "dialog_direct" : "down",
                "dialog_1" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "商店老板" , "text" : "你好勇士，欢迎来到 <span class='shopName'>初级怪物商店</span> 。告诉你一些操作方法：键盘 '<span class='shopKey'>&uarr;</span>' 和 '<span class='shopKey'>&darr;</span>' 可以控制上下选择，按 '<span class='shopKey'>回车</span>' 确认选择。确保你有足够的金币哦！"}
                    ],
                    "jiangli" : null
                }
            },
            shop_m_h : {  //低级商店（使用金币购物）
                "dialog_direct" : "up",
                "dialog_1" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "商店老板" , "text" : "你好勇士，欢迎来到 <span class='shopName'>高级怪物商店</span> 。确保你有足够的金币哦！"}
                    ],
                    "jiangli" : null
                }
            },
            shop_e_l : {  //低级商店（使经验购物）
                "dialog_direct" : "up",
                "dialog_1" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "商店老板" , "text" : "你好勇士，欢迎来到 <span class='shopName'>初级勇士商店</span> 。键盘 '<span class='shopKey'>&uarr;</span>' 和 '<span class='shopKey'>&darr;</span>' 可以控制上下选择，按 '<span class='shopKey'>回车</span>' 确认选择。只要你有足够的经验，我就可以让你变得更强大！"}
                    ],
                    "jiangli" : null
                }
            },
            shop_e_h : {  //高级商店（使经验购物）
                "dialog_direct" : "up",
                "dialog_1" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "商店老板" , "text" : "你好勇士，欢迎来到 <span class='shopName'>高级勇士商店</span> 。键盘 '<span class='shopKey'>&uarr;</span>' 和 '<span class='shopKey'>&darr;</span>' 可以控制上下选择，按 '<span class='shopKey'>回车</span>' 确认选择。只要你有足够的经验，我就可以让你变得更强大！"}
                    ],
                    "jiangli" : null
                }
            },
            shop_key_sell : {  //买钥匙
                "dialog_direct" : "down",
                "dialog_1" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "商店老板" , "text" : "相信你一定有特殊的需要，只要你有金币，我就可以帮你！"}
                    ],
                    "jiangli" : null
                }
            },
            shop_key_buy : {  //卖钥匙
                "dialog_direct" : "down",
                "dialog_1" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "商店老板" , "text" : "朋友你缺钱用吗？只要你不需要的破烂，我就可以帮你！"}
                    ],
                    "jiangli" : null
                }
            },
            jack : {
                "dialog_direct" : "down",
                "dialog_1" :{
                    "condition" : null ,   //触发条件下一对话的条件  无
                    "text" : [
                        {"figure" : "player" , "text" : "你已经得救了！"},
                        {"figure" : "小偷" , "text" : "啊，那真是太好了，我又可以在这里面寻宝了！哦，还没有自我介绍，我叫 <span class='npcName'>杰克</span> ，是这附近有名的小偷，什么金银财宝我样样都偷过。不过这次运气可不是太好，刚进来就被抓了。现在你帮我打开了门，那我就帮你做一件事吧。"},
                        {"figure" : "player" , "text" : "快走吧，外面还有很多怪物，我可能顾不上你。"},
                        {"figure" : "小偷" , "text" : "不，不，不会有事的。快说吧，叫我做什么？"},
                        {"figure" : "player" , "text" : "。。。。。。你会开门吗？"},
                        {"figure" : "小偷" , "text" : "那当然。"},
                        {"figure" : "player" , "text" : "那就请你帮我打开第三层的门吧！"},
                        {"figure" : "小偷" , "text" : "那个简单，不过，如果你能帮我找到一把嵌了红宝石的铁锒头的话，我还帮你打通第十八层的路。"},
                        {"figure" : "player" , "text" : "嵌了红宝石的铁锒头？好吧，我帮你找找。"},
                        {"figure" : "小偷" , "text" : "非常地感谢。一会我便会把第二层的门打开。如果你找到那个铁锒头的话，还是来这里找我！"}
                    ],
                    "jiangli" : {
                        "type" : "changeMap" ,
                        "pro" : {
                            f : 3,
                            x : 1,
                            y : 6
                        }
                    }
                },
                "dialog_2" : {
                    "condition" : "xgsl" ,
                    "text" : [
                        {"figure" : "杰克" , "text" : "如果你能帮我找到一把嵌了红宝石的铁锒头的话，我还帮你打通第十八层的路。"}
                    ],
                    "jiangli" : null
                },
                "dialog_3" : {
                    "condition" : null ,
                    "text" : [
                        {"figure" : "player" , "text" : "哈，快看，我找到了什么！"},
                        {"figure" : "杰克" , "text" : "太好了，这个东西果然是在这里。好吧，我这就去帮你修好第十八层的路面。"}
                    ],
                    "jiangli" : null
                },
                "dialog_4" : {
                    "condition" : "limit" ,
                    "text" : [
                        {"figure" : "杰克" , "text" : "你是我碰到过的最勇敢的勇士！"}
                    ],
                    "jiangli" : null
                }
            }
        }
    };

});
