/* ============ 故事线：12 座词岛 · 72 幕小剧情 ============ */
/* who: li=小梨  sp=单词精灵  fog=迷雾怪  tree=雪梨树  all=精灵们 */
window.STORY = {
  idle: [
    '嘿，今天也一起加油吧！',
    '答错了也没关系，再试一次就好。',
    '我最喜欢听你读英语了。',
    '集齐六只精灵，雪梨树就会发光哦。',
    '先听，再说，最后拼出来，就不容易忘。',
    '累了就休息一下，小梨会等你。'
  ],
  books: {
    '1-1': {
      island: '打招呼岛',
      intro: [
        { who: 'li', t: '我叫小梨，是雪梨岛的单词向导。刚才一阵大雾吹过，单词精灵全都不见了！' },
        { who: 'li', t: '听说它们躲进了六个地方。我们一关一关找，好吗？' },
        { who: 'fog', t: '哼，单词吵死了。你们找不回来的……' }
      ],
      beats: [
        {
          title: '树下的小影子', place: '大梨树下',
          lines: [
            { who: 'li', t: '大梨树下有个小影子在发抖。它最怕生，我们先跟它打个招呼吧。' },
            { who: 'sp', t: 'H… Hello？你们是来抓我的吗？' }
          ],
          clear: { who: 'sp', t: '原来打招呼不可怕。我叫小招，跟你走啦！' }
        },
        {
          title: '会跑的铅笔', place: '雾中的教室',
          lines: [
            { who: 'li', t: '教室里传来沙沙声，一支铅笔在雾里乱跑。' },
            { who: 'sp', t: '我的名字叫 pencil，可是我把名字弄丢了……' }
          ],
          clear: { who: 'sp', t: 'pencil！我想起来了。走，我带你去找下一只精灵。' }
        },
        {
          title: '褪色的彩虹', place: '颜色山谷',
          lines: [
            { who: 'li', t: '前面的彩虹变成灰白色了，得把颜色一个一个叫回来。' },
            { who: 'sp', t: '红色是 red，蓝色是 blue……你记得黄色怎么说吗？' }
          ],
          clear: { who: 'sp', t: '黄色是 yellow！彩虹又亮起来啦。' }
        },
        {
          title: '数不清的萤火虫', place: '萤火虫坡',
          lines: [
            { who: 'li', t: '萤火虫太多啦，一只一只数，别被迷雾怪搅乱。' },
            { who: 'sp', t: '一、二、三……你帮我数到 ten，我就敢出来。' }
          ],
          clear: { who: 'sp', t: '数到十啦！我最喜欢会数数的朋友。' }
        },
        {
          title: '看不见的身体', place: '镜子湖边',
          lines: [
            { who: 'li', t: '这只精灵被雾罩住，只剩下眼睛。说出身体部位，它就能显形。' },
            { who: 'sp', t: '这是我的 hand，这是我的 foot……还有，我的 nose 呢？' }
          ],
          clear: { who: 'sp', t: '我完整啦！谢谢你帮我找回身体。' }
        },
        {
          title: '躲起来的动物', place: '小动物林',
          lines: [
            { who: 'li', t: '最后一只精灵藏在动物堆里，它学什么像什么。' },
            { who: 'sp', t: '喵——猜猜我是 cat 还是 dog？' }
          ],
          clear: { who: 'sp', t: '猜对啦！六只精灵都回来了！' }
        }
      ],
      finale: [
        { who: 'all', t: '六只精灵都回来了，雪梨树醒啦！' },
        { who: 'li', t: '你看，树上结出了一颗金色的小梨，那是你的第一枚勇气果。' },
        { who: 'tree', t: '孩子，单词不是用来背的，是用来交朋友的。下一座岛，还在等你。' }
      ]
    },

    '1-2': {
      island: '暖阳岛',
      intro: [
        { who: 'li', t: '暖阳岛本来天天出太阳，今天却下起了冷雾。' },
        { who: 'li', t: '岛上的六只精灵冻得说不出话，我们去给它们送温暖吧。' },
        { who: 'fog', t: '冷一点才安静。都给我躲好！' }
      ],
      beats: [
        {
          title: '吹散的全家福', place: '暖阳小屋',
          lines: [
            { who: 'li', t: '一张全家福被风吹成了碎片，精灵在找照片里的家人。' },
            { who: 'sp', t: '这是 mother，这是 father……还有 my sister 呢？' }
          ],
          clear: { who: 'sp', t: '家人都在照片里啦，暖和多啦。' }
        },
        {
          title: '饿肚子的小精灵', place: '面包房',
          lines: [
            { who: 'li', t: '小精灵的肚子咕咕叫，可它忘了食物怎么说。' },
            { who: 'sp', t: '我想吃 bread，还想喝 milk……' }
          ],
          clear: { who: 'sp', t: 'bread 和 milk 都记住啦，谢谢你！' }
        },
        {
          title: '飞走的皮球', place: '玩具院',
          lines: [
            { who: 'li', t: '风把皮球吹到了树梢上，精灵急得直转圈。' },
            { who: 'sp', t: '我的 ball！还有我的 doll 和 car……' }
          ],
          clear: { who: 'sp', t: '皮球回来啦，我们一起玩 ball！' }
        },
        {
          title: '打翻的水果篮', place: '果园',
          lines: [
            { who: 'li', t: '水果篮翻了，得把水果一个一个放回去。' },
            { who: 'sp', t: 'apple、banana、orange……咦，pear 是你的名字吗？' }
          ],
          clear: { who: 'sp', t: '都放好啦，送你一颗最甜的 pear！' }
        },
        {
          title: '晾衣绳上的追逐', place: '晒衣台',
          lines: [
            { who: 'li', t: '衣服被风吹得满天飞，快帮精灵把衣服认出来。' },
            { who: 'sp', t: '我的 coat！我的 shoes！还有那件 blue shirt！' }
          ],
          clear: { who: 'sp', t: '穿得暖暖的，再也不怕冷雾啦。' }
        },
        {
          title: '卡住的天气机', place: '天气塔',
          lines: [
            { who: 'li', t: '天气机卡在 cloudy 和 rainy 之间，岛上一直阴着。' },
            { who: 'sp', t: '你最喜欢 sunny 还是 snowy？说给我听听。' }
          ],
          clear: { who: 'sp', t: 'sunny！太阳出来啦，暖阳岛回来啦！' }
        }
      ],
      finale: [
        { who: 'all', t: '暖阳岛的太阳升起来了，六只精灵围成一圈。' },
        { who: 'li', t: '你的勇气果又长大了一点，雪梨树在远处发着光。' },
        { who: 'tree', t: '记住，家、食物和一句问候，都是温暖的火苗。' }
      ]
    },

    '2-1': {
      island: '彩虹学园岛',
      intro: [
        { who: 'li', t: '彩虹学园岛的钟声停了，学生们都被困在雾里。' },
        { who: 'li', t: '找到六只精灵，钟声才会重新响起。' },
        { who: 'fog', t: '上学多没意思，都留下来陪我吧。' }
      ],
      beats: [
        {
          title: '会飞的文具', place: '一年级教室',
          lines: [
            { who: 'li', t: '文具盒打开了，铅笔和尺子像小鸟一样飞出去。' },
            { who: 'sp', t: '帮我抓住 ruler，还有那支 red pen！' }
          ],
          clear: { who: 'sp', t: '文具都回盒子里啦，上课不迟到！' }
        },
        {
          title: '形状桥', place: '学园小河',
          lines: [
            { who: 'li', t: '河上的桥断成了几块，得用形状把它拼起来。' },
            { who: 'sp', t: '这是 circle，这是 square……还差一个 triangle。' }
          ],
          clear: { who: 'sp', t: '桥拼好啦，踩上去稳稳的！' }
        },
        {
          title: '十一级台阶', place: '钟楼',
          lines: [
            { who: 'li', t: '通往钟楼的台阶，每一级都刻着一个数字。' },
            { who: 'sp', t: 'eleven、twelve……数错了会掉下去哦。' }
          ],
          clear: { who: 'sp', t: '十九、二十！钟楼就在眼前。' }
        },
        {
          title: '躲猫猫的小狗', place: '学园草坪',
          lines: [
            { who: 'li', t: '小狗听见雾的声音，躲进草丛不肯出来。' },
            { who: 'sp', t: '它叫 dog，最爱玩 ball。你轻轻叫它试试？' }
          ],
          clear: { who: 'sp', t: '汪汪！它摇尾巴啦。' }
        },
        {
          title: '定格的同学', place: '大操场',
          lines: [
            { who: 'li', t: '雾把同学们定住了，说出动作就能让他们动起来。' },
            { who: 'sp', t: 'jump！run！swim！你也做给我看看？' }
          ],
          clear: { who: 'sp', t: '大家都动起来啦，操场又热闹了。' }
        },
        {
          title: '黑漆漆的房间', place: '学园宿舍',
          lines: [
            { who: 'li', t: '最后一间屋子没有灯，精灵怕黑不敢进去。' },
            { who: 'sp', t: '帮我打开 door，再找到 kitchen 的灯，好吗？' }
          ],
          clear: { who: 'sp', t: '灯亮啦！六只精灵到齐，钟声要响了。' }
        }
      ],
      finale: [
        { who: 'all', t: '当——当——学园岛的钟声响了六下。' },
        { who: 'li', t: '你的名字被写进了学园岛的星星榜，真棒。' },
        { who: 'tree', t: '学校不只是教室，是你和世界打招呼的地方。' }
      ]
    },

    '2-2': {
      island: '星期小镇',
      intro: [
        { who: 'li', t: '星期小镇的日历被撕乱了，今天到底是星期几，谁也不知道。' },
        { who: 'li', t: '六只精灵各守着一个日子，我们一天一天找回来。' },
        { who: 'fog', t: '没有星期，就没有期待。多好。' }
      ],
      beats: [
        {
          title: '飞走的日历', place: '小镇钟楼',
          lines: [
            { who: 'li', t: '日历页像白鸟一样飞过屋顶，先抓住星期一。' },
            { who: 'sp', t: 'Monday、Tuesday……你最喜欢哪一天？' }
          ],
          clear: { who: 'sp', t: '日历回来了，星期一不再迷路。' }
        },
        {
          title: '缺人的小镇', place: '面包街',
          lines: [
            { who: 'li', t: '小镇的面包店、医院和学校都缺人，精灵急坏了。' },
            { who: 'sp', t: '谁能当 doctor？谁能当 teacher？你来选！' }
          ],
          clear: { who: 'sp', t: '大家都上岗啦，小镇转起来了。' }
        },
        {
          title: '迷路的公交车', place: '车站路口',
          lines: [
            { who: 'li', t: '一辆 bus 在雾里绕圈，司机看不清路牌。' },
            { who: 'sp', t: '帮我看路牌：是 by bus 还是 by train？' }
          ],
          clear: { who: 'sp', t: '到站啦！乘客们都松了一口气。' }
        },
        {
          title: '不会开花的种子', place: '小镇花园',
          lines: [
            { who: 'li', t: '种子被雾冻住了，需要阳光和一句温柔的话。' },
            { who: 'sp', t: '种子、tree、flower……它们都在等你叫醒。' }
          ],
          clear: { who: 'sp', t: '开花啦！整条街都香了。' }
        },
        {
          title: '灰蒙蒙的心情', place: '中央广场',
          lines: [
            { who: 'li', t: '迷雾怪把大家的笑容收走了，岛上静悄悄的。' },
            { who: 'sp', t: '我现在有点 sad，你能让我 happy 吗？' }
          ],
          clear: { who: 'sp', t: '我笑啦！你的声音比太阳还暖。' }
        },
        {
          title: '最后一盏灯笼', place: '节日广场',
          lines: [
            { who: 'li', t: '节日广场只剩一盏灯笼亮着，最后一关就在这里。' },
            { who: 'sp', t: '点亮 lantern，我们就能把雾赶出小镇！' }
          ],
          clear: { who: 'sp', t: '灯笼全亮了，节日开始啦！' }
        }
      ],
      finale: [
        { who: 'all', t: '星期小镇挂起了彩灯，六只精灵跳起了舞。' },
        { who: 'li', t: '从星期一到星期天，每一天都值得期待。' },
        { who: 'tree', t: '有期待的孩子，走到哪里都不会迷路。' }
      ]
    },

    '3-1': {
      island: '好朋友岛',
      intro: [
        { who: 'li', t: '好朋友岛来了一位新同学，可他躲在雾里，谁也不敢靠近。' },
        { who: 'li', t: '我们先找回六只精灵，再去跟他打招呼。' },
        { who: 'fog', t: '新朋友？他们才不会喜欢一个陌生人。' }
      ],
      beats: [
        {
          title: '雾中的你好', place: '校门口',
          lines: [
            { who: 'li', t: '新同学站在校门口，低着头，手里攥着书包带。' },
            { who: 'sp', t: '我该说 Hello 还是 Good morning？会不会说错？' }
          ],
          clear: { who: 'sp', t: '你说 Hello 的时候，他抬头笑了。' }
        },
        {
          title: '介绍新朋友', place: '教室讲台',
          lines: [
            { who: 'li', t: '该把他介绍给大家了，可他的名字还藏在雾里。' },
            { who: 'sp', t: 'This is my friend. His name is……' }
          ],
          clear: { who: 'sp', t: '大家记住他的名字啦，他不再是一个人。' }
        },
        {
          title: '会跳舞的机器人', place: '科学实验室',
          lines: [
            { who: 'li', t: '实验室的机器人只会转圈，它分不清自己的身体。' },
            { who: 'sp', t: '帮我找到它的 head 和 hand，它就能跳舞了。' }
          ],
          clear: { who: 'sp', t: '机器人跳起舞，新同学也跟着笑了。' }
        },
        {
          title: '家庭树', place: '岛上花园',
          lines: [
            { who: 'li', t: '岛上有一棵家庭树，每片叶子写着一个家人。' },
            { who: 'sp', t: 'mother、father、grandma……你的树上都有谁？' }
          ],
          clear: { who: 'sp', t: '家庭树长满了叶子，新同学说他想家了。' }
        },
        {
          title: '分享一辆小车', place: '游戏区',
          lines: [
            { who: 'li', t: '两个孩子都想玩那辆 car，谁也不肯先松手。' },
            { who: 'sp', t: '试着说 Can I play with you？看看会发生什么。' }
          ],
          clear: { who: 'sp', t: '他们一起玩起来了，笑声传得很远。' }
        },
        {
          title: '给朋友的颜色', place: '美术教室',
          lines: [
            { who: 'li', t: '最后一关，用颜色给新同学画一张欢迎卡。' },
            { who: 'sp', t: '你想画 red 的太阳，还是 green 的树？' }
          ],
          clear: { who: 'sp', t: '卡片画好了，他说这是他收到最好的礼物。' }
        }
      ],
      finale: [
        { who: 'all', t: '六只精灵围着新同学，他第一次大声说：Hello, everyone!' },
        { who: 'li', t: '你不仅找回了单词，还找回了一个朋友。' },
        { who: 'tree', t: '勇气不是不害怕，是害怕的时候还说一句你好。' }
      ]
    },

    '3-2': {
      island: '寻宝岛',
      intro: [
        { who: 'li', t: '寻宝岛的地图被迷雾怪撕成了六片，宝藏也跟着不见了。' },
        { who: 'li', t: '每闯一关，就能找回一片地图和一只精灵。' },
        { who: 'fog', t: '宝藏是我的！你们永远找不到最后一片。' }
      ],
      beats: [
        {
          title: '变色的藏宝图', place: '变色花丛',
          lines: [
            { who: 'li', t: '第一片地图藏在变色花丛里，得说出颜色它才出现。' },
            { who: 'sp', t: '花朵现在是 purple，等一会儿会变成什么？' }
          ],
          clear: { who: 'sp', t: '地图显形了，第一条线索在树下。' }
        },
        {
          title: '地图上的位置', place: '大石头旁',
          lines: [
            { who: 'li', t: '线索说：宝箱在石头的 behind，可石头在哪？' },
            { who: 'sp', t: 'on、under、behind、next to……你听清了吗？' }
          ],
          clear: { who: 'sp', t: '找到石头啦，宝箱就在它后面！' }
        },
        {
          title: '守宝人的问题', place: '宝箱前',
          lines: [
            { who: 'li', t: '守宝人要问三个问题，答对了才让路。' },
            { who: 'sp', t: 'What is your name? How old are you? 你来答！' }
          ],
          clear: { who: 'sp', t: '守宝人笑了，把第二片地图交给了你。' }
        },
        {
          title: '水果密码', place: '果园深处',
          lines: [
            { who: 'li', t: '宝箱的锁是水果做的，要把顺序排对。' },
            { who: 'sp', t: 'apple、pear、grape……先放哪一个？' }
          ],
          clear: { who: 'sp', t: '咔哒，锁开了！里面全是金色的果子。' }
        },
        {
          title: '亲戚们的合影', place: '老照片馆',
          lines: [
            { who: 'li', t: '第五片地图藏在一张合影里，照片上的人真多。' },
            { who: 'sp', t: 'uncle、aunt、cousin……你都能认出来吗？' }
          ],
          clear: { who: 'sp', t: '最后一片地图的边角露出来了！' }
        },
        {
          title: '看守宝藏的小狗', place: '宝藏洞口',
          lines: [
            { who: 'li', t: '最后一片地图在小狗窝里，可它不肯让开。' },
            { who: 'sp', t: '它喜欢 dog food，还喜欢听人叫它的名字。' }
          ],
          clear: { who: 'sp', t: '小狗摇着尾巴让开了，宝藏就在眼前！' }
        }
      ],
      finale: [
        { who: 'all', t: '六片地图拼在一起，宝藏是一颗会发光的雪梨种子。' },
        { who: 'li', t: '原来真正的宝藏，是你一路学会的单词和勇气。' },
        { who: 'tree', t: '把种子种下吧，它会和你一起长大。' }
      ]
    },

    '4-1': {
      island: '梦想城',
      intro: [
        { who: 'li', t: '梦想城的职业体验馆全关门了，孩子们站在雾里发呆。' },
        { who: 'li', t: '找到六只精灵，就能让梦想城重新开张。' },
        { who: 'fog', t: '梦想？那么远的东西，不如睡觉。' }
      ],
      beats: [
        {
          title: '入场证', place: '梦想城门口',
          lines: [
            { who: 'li', t: '进城要填一张入场证，精灵是你的登记员。' },
            { who: 'sp', t: 'Name? Age? School? 别紧张，慢慢说。' }
          ],
          clear: { who: 'sp', t: '入场证盖好章啦，梦想城欢迎你！' }
        },
        {
          title: '会移动的房间', place: '魔法公寓',
          lines: [
            { who: 'li', t: '房子里的房间全换了位置，客厅跑到了二楼。' },
            { who: 'sp', t: 'bedroom、kitchen、bathroom……帮我送它们回家。' }
          ],
          clear: { who: 'sp', t: '房间都归位啦，烟囱冒出暖暖的烟。' }
        },
        {
          title: '校园寻路', place: '新学校',
          lines: [
            { who: 'li', t: '新学校太大，精灵在第一节课就迷路了。' },
            { who: 'sp', t: 'library 在 left，playground 在 right，记住了吗？' }
          ],
          clear: { who: 'sp', t: '找到教室啦，还赶上了第一节课。' }
        },
        {
          title: '社团招新', place: '大操场',
          lines: [
            { who: 'li', t: '操场上摆满了社团摊位，每个都想拉你加入。' },
            { who: 'sp', t: 'singing、drawing、reading……你最想试哪个？' }
          ],
          clear: { who: 'sp', t: '你选了最喜欢的社团，眼睛都在发光。' }
        },
        {
          title: '小小设计师', place: '服装工坊',
          lines: [
            { who: 'li', t: '服装店的模特光着身子，得给它们搭一身衣服。' },
            { who: 'sp', t: '一件 red jacket，一条 blue jeans，怎么样？' }
          ],
          clear: { who: 'sp', t: '模特走上台，全场都在鼓掌。' }
        },
        {
          title: '职业体验日', place: '体验中心',
          lines: [
            { who: 'li', t: '最后一关，你要体验一个职业，猜猜精灵想当什么。' },
            { who: 'sp', t: '我穿着白大褂，拿着听诊器。我是 doctor 吗？' }
          ],
          clear: { who: 'sp', t: '猜对啦！梦想城的灯全亮了。' }
        }
      ],
      finale: [
        { who: 'all', t: '六只精灵站在梦想城的钟楼上，向全城挥手。' },
        { who: 'li', t: '职业不是大人的事，你现在就可以开始想象。' },
        { who: 'tree', t: '梦想不用很大，够你往前走一步就好。' }
      ]
    },

    '4-2': {
      island: '四季广场',
      intro: [
        { who: 'li', t: '四季广场的时钟停了，春天也卡在了半路。' },
        { who: 'li', t: '六只精灵各管一段时间，把它们找回来，时间才会走。' },
        { who: 'fog', t: '时间停了，就不用长大。多好。' }
      ],
      beats: [
        {
          title: '画像上的陌生人', place: '肖像长廊',
          lines: [
            { who: 'li', t: '广场上挂着一排画像，可每张脸都被雾抹掉了。' },
            { who: 'sp', t: 'He is tall. She has long hair. 你能猜出是谁吗？' }
          ],
          clear: { who: 'sp', t: '画像恢复了，画里的人朝你眨了眨眼。' }
        },
        {
          title: '停摆的早晨', place: '广场钟楼',
          lines: [
            { who: 'li', t: '时钟停在七点，所有人都还没起床。' },
            { who: 'sp', t: 'get up、brush teeth、have breakfast……先做哪一件？' }
          ],
          clear: { who: 'sp', t: '指针动了，新的一天开始啦。' }
        },
        {
          title: '课程表风暴', place: '学校走廊',
          lines: [
            { who: 'li', t: '课程表被风吹散了，今天的课全乱了。' },
            { who: 'sp', t: '周一有 English，周三有 music……帮我排回去。' }
          ],
          clear: { who: 'sp', t: '课程表贴好了，上课铃准时响起。' }
        },
        {
          title: '爱好交换市集', place: '广场市集',
          lines: [
            { who: 'li', t: '市集上每个人都在交换爱好，精灵却不知道自己爱什么。' },
            { who: 'sp', t: 'reading? dancing? swimming? 你替我选一个吧。' }
          ],
          clear: { who: 'sp', t: '我决定学画画！原来喜欢一件事这么开心。' }
        },
        {
          title: '广场运动会', place: '运动场',
          lines: [
            { who: 'li', t: '运动会开始了，精灵在跑道上紧张得发抖。' },
            { who: 'sp', t: 'run、jump、play football……你为我加油好吗？' }
          ],
          clear: { who: 'sp', t: '它跑完了全程，奖牌在阳光下闪闪发亮。' }
        },
        {
          title: '迟到的生日会', place: '广场中央',
          lines: [
            { who: 'li', t: '最后一关，广场要补办一场生日会，蜡烛还没点。' },
            { who: 'sp', t: 'Happy birthday! 蛋糕、礼物、还有一首歌，准备好了吗？' }
          ],
          clear: { who: 'sp', t: '蜡烛点亮了，时间终于重新走了起来。' }
        }
      ],
      finale: [
        { who: 'all', t: '四季广场的钟声敲响，春夏秋冬在广场上转了一圈。' },
        { who: 'li', t: '你让时间重新流动，也让自己长大了一点点。' },
        { who: 'tree', t: '别急着长大，先把今天过好。' }
      ]
    },

    '5-1': {
      island: '远方车站',
      intro: [
        { who: 'li', t: '远方车站的列车停运了，站台上挤满了回不了家的旅人。' },
        { who: 'li', t: '找回六只精灵，列车才能重新出发。' },
        { who: 'fog', t: '远方有什么好？留在这里，哪儿也别去。' }
      ],
      beats: [
        {
          title: '错乱的时刻表', place: '候车大厅',
          lines: [
            { who: 'li', t: '时刻表上的日期全乱了，列车不知道该哪天开。' },
            { who: 'sp', t: '今天是 May 1st 还是 June 1st？帮我看看车票。' }
          ],
          clear: { who: 'sp', t: '日期对上了，第一班车开始检票。' }
        },
        {
          title: '才艺候车室', place: '候车室舞台',
          lines: [
            { who: 'li', t: '候车室里在办才艺表演，精灵却不敢上台。' },
            { who: 'sp', t: 'I can sing. I can dance. 你觉得我该表演什么？' }
          ],
          clear: { who: 'sp', t: '它上台了，候车室响起了掌声。' }
        },
        {
          title: '旅人的一天', place: '行李寄存处',
          lines: [
            { who: 'li', t: '一位旅人丢了行李，里面装着他一天要用的东西。' },
            { who: 'sp', t: 'toothbrush、towel、homework……哪一件最重要？' }
          ],
          clear: { who: 'sp', t: '行李找回来了，旅人连声道谢。' }
        },
        {
          title: '出发前的清单', place: '检票口',
          lines: [
            { who: 'li', t: '列车要开了，可车票、地图和相机还没收好。' },
            { who: 'sp', t: 'ticket、map、camera，Check! 还差什么？' }
          ],
          clear: { who: 'sp', t: '清单打勾，列车鸣笛出发！' }
        },
        {
          title: '餐车菜单', place: '餐车',
          lines: [
            { who: 'li', t: '餐车飘来香味，精灵饿得趴在桌上。' },
            { who: 'sp', t: 'noodles、rice、juice、tea……你想吃什么？' }
          ],
          clear: { who: 'sp', t: '热腾腾的面端上来，整节车厢都暖了。' }
        },
        {
          title: '假日终点站', place: '终点站',
          lines: [
            { who: 'li', t: '终点站到了，站外就是一年一度的假日集市。' },
            { who: 'sp', t: 'holiday、festival、gift……假日的空气都是甜的。' }
          ],
          clear: { who: 'sp', t: '六只精灵下了车，集市放起了烟花。' }
        }
      ],
      finale: [
        { who: 'all', t: '列车载着旅人驶向远方，六只精灵在站台上挥手。' },
        { who: 'li', t: '远方不是一个地方，是你敢不敢迈出那一步。' },
        { who: 'tree', t: '记得回家的路，也别忘了出发的勇气。' }
      ]
    },

    '5-2': {
      island: '风向岛',
      intro: [
        { who: 'li', t: '风向岛的风向乱了，四季挤在同一天里。' },
        { who: 'li', t: '六只精灵守着六个方向，把它们找回来，风就会重新吹。' },
        { who: 'fog', t: '方向？迷路的人才需要方向。' }
      ],
      beats: [
        {
          title: '同一天的四季', place: '风向广场',
          lines: [
            { who: 'li', t: '早上是 summer，中午下起 snow，下午又开满了 spring 的花。' },
            { who: 'sp', t: '你最喜欢哪个季节？为什么？' }
          ],
          clear: { who: 'sp', t: '风重新排好了队，四季各归其位。' }
        },
        {
          title: '被吹走的计划', place: '风车小屋',
          lines: [
            { who: 'li', t: '精灵写在纸上的周末计划飞走了。' },
            { who: 'sp', t: 'I am going to visit grandma. 你周末打算做什么？' }
          ],
          clear: { who: 'sp', t: '计划找回来了，它认真地折好放进口袋。' }
        },
        {
          title: '一张邀请函', place: '风之邮局',
          lines: [
            { who: 'li', t: '岛上要办一场风之派对，精灵负责发邀请函。' },
            { who: 'sp', t: 'Would you like to come? 你愿意来吗？' }
          ],
          clear: { who: 'sp', t: '邀请函送出去了，派对有了第一位客人。' }
        },
        {
          title: '风里的旅行日记', place: '老灯塔',
          lines: [
            { who: 'li', t: '一位旅行者的日记被风吹散，纸页挂满了树梢。' },
            { who: 'sp', t: '他去过 Beijing，也去过 Shanghai……下一站是哪儿？' }
          ],
          clear: { who: 'sp', t: '日记拼好了，最后一页写着：下一站，家。' }
        },
        {
          title: '大风天的规则', place: '海边',
          lines: [
            { who: 'li', t: '风越吹越大，岛上的孩子还在外面乱跑。' },
            { who: 'sp', t: 'Do not run. Be careful. 快把安全规则说给他们听！' }
          ],
          clear: { who: 'sp', t: '大家都躲好了，风也慢慢小了。' }
        },
        {
          title: '雾中的路牌', place: '回家的小路',
          lines: [
            { who: 'li', t: '最后一关，雾把路牌全遮住了，精灵找不到回家的路。' },
            { who: 'sp', t: 'turn left、go straight、turn right……你带路好吗？' }
          ],
          clear: { who: 'sp', t: '到家啦！六只精灵在门口抱成一团。' }
        }
      ],
      finale: [
        { who: 'all', t: '风向岛的风终于找对了方向，吹散了最后一层雾。' },
        { who: 'li', t: '你看，迷路不可怕，会问路就很了不起。' },
        { who: 'tree', t: '心里有方向，风就会帮你。' }
      ]
    },

    '6-1': {
      island: '时光岛',
      intro: [
        { who: 'li', t: '时光岛的钟摆停了，过去和现在叠在了一起。' },
        { who: 'li', t: '六只精灵守着六段时光，找回它们，时间才会继续走。' },
        { who: 'fog', t: '过去那么好，为什么还要往前走？' }
      ],
      beats: [
        {
          title: '村口的老槐树', place: '小村庄',
          lines: [
            { who: 'li', t: '雾里出现了一个小村庄，村口的老槐树比房子还高。' },
            { who: 'sp', t: '这里没有地铁，只有田埂和炊烟。你愿意住一天吗？' }
          ],
          clear: { who: 'sp', t: '村庄亮起了灯，第一段时光回来了。' }
        },
        {
          title: '森林里的脚印', place: '原始森林',
          lines: [
            { who: 'li', t: '森林深处传来脚步声，一只动物躲在雾后。' },
            { who: 'sp', t: '它有条长尾巴，爱吃 fish。是 fox 还是 tiger？' }
          ],
          clear: { who: 'sp', t: '它走出来啦，原来是一只害羞的 fox。' }
        },
        {
          title: '会说话的照片', place: '老照片馆',
          lines: [
            { who: 'li', t: '墙上挂着一张老照片，照片里的人竟然开口了。' },
            { who: 'sp', t: '他发明了很多东西。Can you guess who he is?' }
          ],
          clear: { who: 'sp', t: '照片里的人笑了，第二段时光亮了起来。' }
        },
        {
          title: '旧相册', place: '老屋阁楼',
          lines: [
            { who: 'li', t: '一本相册从柜子里掉下来，照片散了一地。' },
            { who: 'sp', t: 'Last summer, I went to the beach. 你的去年呢？' }
          ],
          clear: { who: 'sp', t: '相册装好了，每一页都在轻轻发光。' }
        },
        {
          title: '新旧两张地图', place: '小镇街口',
          lines: [
            { who: 'li', t: '同一座小镇，有两张地图：一张很旧，一张很新。' },
            { who: 'sp', t: 'Then there was a river. Now there is a park. 看出变化了吗？' }
          ],
          clear: { who: 'sp', t: '小镇长高了，也长亮了。' }
        },
        {
          title: '灯笼下的团圆', place: '老街上',
          lines: [
            { who: 'li', t: '最后一关，时光岛要过春节，红灯笼挂满了街。' },
            { who: 'sp', t: 'dumplings、red packet、fireworks……年味越来越浓了。' }
          ],
          clear: { who: 'sp', t: '灯笼全亮了，时光重新流动起来。' }
        }
      ],
      finale: [
        { who: 'all', t: '时光岛的钟摆重新摆动，过去和现在握了握手。' },
        { who: 'li', t: '你看见了从前，也更懂现在的自己。' },
        { who: 'tree', t: '记得来路，才走得更远。' }
      ]
    },

    '6-2': {
      island: '毕业星岛',
      intro: [
        { who: 'li', t: '最后一站，毕业星岛。这里的雾最厚，因为每个孩子都在告别。' },
        { who: 'li', t: '找回最后六只精灵，雪梨树就会结出毕业果。' },
        { who: 'fog', t: '毕业就是分开。分开多难过，不如不开始。' }
      ],
      beats: [
        {
          title: '会自己翻页的书', place: '故事书屋',
          lines: [
            { who: 'li', t: '一本故事书在风里自己翻页，每一页都缺一个结尾。' },
            { who: 'sp', t: 'Once upon a time……你能帮我讲下去吗？' }
          ],
          clear: { who: 'sp', t: '故事有了结尾，书页安静地合上了。' }
        },
        {
          title: '生病的小河', place: '星岛河边',
          lines: [
            { who: 'li', t: '岛上的小河变成了灰色，鱼儿都不见了。' },
            { who: 'sp', t: '少扔垃圾，多种 tree。我们能为小河做什么？' }
          ],
          clear: { who: 'sp', t: '河水清了，第一条小鱼跳出了水面。' }
        },
        {
          title: '梦想墙', place: '星岛广场',
          lines: [
            { who: 'li', t: '一面墙上贴满了孩子们的梦想，有一张被雾遮住了。' },
            { who: 'sp', t: 'I want to be a teacher. 你的梦想是什么？' }
          ],
          clear: { who: 'sp', t: '你的梦想贴上去了，墙亮了一整片。' }
        },
        {
          title: '最后一次露营', place: '星空营地',
          lines: [
            { who: 'li', t: '六年级的露营夜，大家围着篝火说起了从前。' },
            { who: 'sp', t: 'I learned to swim last year. 你记得最清楚的一件事是什么？' }
          ],
          clear: { who: 'sp', t: '篝火噼啪作响，那些回忆都被好好收下了。' }
        },
        {
          title: '毕业前的挑战', place: '星岛操场',
          lines: [
            { who: 'li', t: '毕业典礼前，大家决定一起完成健康挑战。' },
            { who: 'sp', t: 'eat well、sleep early、exercise every day。你能坚持吗？' }
          ],
          clear: { who: 'sp', t: '每个人都完成了挑战，脸色红扑扑的。' }
        },
        {
          title: '毕业典礼', place: '星岛礼堂',
          lines: [
            { who: 'li', t: '最后一关。礼堂里坐满了人，雪梨树的果子熟了。' },
            { who: 'sp', t: 'Goodbye, my friend. 但再见，不是再也不见。' }
          ],
          clear: { who: 'sp', t: '六只精灵到齐了，毕业果落进了你的手心。' }
        }
      ],
      finale: [
        { who: 'all', t: '雪梨树开满了花，六只精灵唱起了毕业歌。' },
        { who: 'li', t: '从打招呼到毕业，你走过的每一关，我都记得。' },
        { who: 'tree', t: '孩子，带着你的单词和勇气，去更远的地方吧。我们，还会再见。' }
      ]
    }
  }
};
