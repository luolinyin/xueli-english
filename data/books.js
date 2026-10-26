// 12 册课程结构：模块 = 单词 + 句型 + 情景对话 + 语法
// 单词引用 words 字典的键；句子格式 "英|中"
window.BOOKS = [
  // ==================== 一年级上册 ====================
  {
    grade: 1, term: 1, title: '一年级上册', color: '#FF8A65', level: '启蒙',
    modules: [
      {
        name: 'Greetings', zh: '打招呼',
        words: ['hello', 'hi', 'goodbye', 'bye', 'morning', 'afternoon', 'name', 'teacher'],
        sentences: ['Hello! I am Lily.|你好！我是莉莉。', 'Good morning, Miss Li.|早上好，李老师。', 'Goodbye! See you.|再见！回头见。'],
        dialogue: [
          ['Lily', 'Good morning!', '早上好！'],
          ['Tom', 'Good morning! I am Tom.', '早上好！我是汤姆。'],
          ['Lily', 'Hi, Tom. My name is Lily.', '嗨，汤姆。我叫莉莉。'],
          ['Tom', 'Nice to meet you, Lily.', '很高兴认识你，莉莉。'],
          ['Lily', 'Nice to meet you too.', '我也很高兴认识你。'],
          ['Tom', 'Goodbye, Lily!', '再见，莉莉！']
        ],
        grammar: {
          title: 'I am ... 自我介绍',
          note: 'I am 表示「我是」，后面可以接名字。I\'m 是 I am 的缩写。',
          examples: ['I am Lily. = I\'m Lily.|我是莉莉。', 'You are Tom. = You\'re Tom.|你是汤姆。'],
          quiz: [{ q: '这 ___ Lily.', opts: ['am', 'is', 'are'], a: 'is' }]
        }
      },
      {
        name: 'My Classroom', zh: '我的教室',
        words: ['book', 'pen', 'pencil', 'bag', 'ruler', 'desk', 'chair', 'eraser'],
        sentences: ['This is my book.|这是我的书。', 'Open your book, please.|请打开你的书。', 'Show me your pen.|给我看看你的钢笔。'],
        dialogue: [
          ['Miss Li', 'Look! This is a book.', '看！这是一本书。'],
          ['Tom', 'This is a pen.', '这是一支钢笔。'],
          ['Miss Li', 'Show me your pencil, please.', '请给我看看你的铅笔。'],
          ['Tom', 'Here you are.', '给你。'],
          ['Miss Li', 'Thank you. What is this?', '谢谢。这是什么？'],
          ['Tom', 'It is an eraser.', '这是一块橡皮。']
        ],
        grammar: {
          title: 'This is ... 介绍物品',
          note: 'This is 表示「这是……」，用来介绍近处的东西。',
          examples: ['This is a pen.|这是一支钢笔。', 'This is my desk.|这是我的课桌。'],
          quiz: [{ q: 'This ___ my bag.', opts: ['is', 'are', 'am'], a: 'is' }]
        }
      },
      {
        name: 'Colours', zh: '颜色',
        words: ['red', 'yellow', 'blue', 'green', 'black', 'white', 'pink', 'orange'],
        sentences: ['It is red.|它是红色的。', 'I like blue.|我喜欢蓝色。', 'What colour is it?|它是什么颜色？'],
        dialogue: [
          ['Amy', 'What colour is it?', '它是什么颜色？'],
          ['Tom', 'It is red.', '是红色的。'],
          ['Amy', 'Do you like red?', '你喜欢红色吗？'],
          ['Tom', 'Yes, I do. I like red and blue.', '是的。我喜欢红色和蓝色。'],
          ['Amy', 'Look! A yellow bird.', '看！一只黄色的鸟。'],
          ['Tom', 'It is beautiful.', '它很漂亮。']
        ],
        grammar: {
          title: 'What colour ...? 询问颜色',
          note: 'What colour is it? 用来问颜色，回答用 It is + 颜色。',
          examples: ['What colour is your bag? It is blue.|你的书包是什么颜色？蓝色。'],
          quiz: [{ q: 'What colour ___ it?', opts: ['is', 'are', 'do'], a: 'is' }]
        }
      },
      {
        name: 'Numbers', zh: '数字 1-10',
        words: ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'],
        sentences: ['How many pens?|有多少支钢笔？', 'Three pens.|三支钢笔。', 'I am six.|我六岁。'],
        dialogue: [
          ['Dad', 'How many books?', '有多少本书？'],
          ['Lily', 'One, two, three. Three books.', '一、二、三。三本书。'],
          ['Dad', 'How old are you?', '你几岁了？'],
          ['Lily', 'I am six.', '我六岁。'],
          ['Dad', 'Let us count to ten.', '我们数到十吧。'],
          ['Lily', 'One, two ... ten!', '一、二……十！']
        ],
        grammar: {
          title: 'How many ...? 询问数量',
          note: 'How many 后面接可数名词复数，用来问数量。',
          examples: ['How many cats? Two.|有多少只猫？两只。'],
          quiz: [{ q: 'How many ___?', opts: ['pens', 'pen', 'a pen'], a: 'pens' }]
        }
      },
      {
        name: 'My Body', zh: '我的身体',
        words: ['head', 'eye', 'ear', 'nose', 'mouth', 'hand', 'foot', 'face'],
        sentences: ['Touch your nose.|摸摸你的鼻子。', 'This is my face.|这是我的脸。', 'Clap your hands.|拍拍手。'],
        dialogue: [
          ['Teacher', 'Touch your head.', '摸摸你的头。'],
          ['Children', 'Head!', '头！'],
          ['Teacher', 'Touch your nose.', '摸摸你的鼻子。'],
          ['Children', 'Nose!', '鼻子！'],
          ['Teacher', 'Now, touch your ears.', '现在，摸摸你们的耳朵。'],
          ['Children', 'Ears! This is fun.', '耳朵！真好玩。']
        ],
        grammar: {
          title: 'your 和 my 的用法',
          note: 'my 是「我的」，your 是「你的」，后面都要接名词。',
          examples: ['my hand 我的手 / your hand 你的手'],
          quiz: [{ q: 'Touch ___ head.（你的）', opts: ['your', 'my', 'I'], a: 'your' }]
        }
      },
      {
        name: 'Animals', zh: '动物',
        words: ['cat', 'dog', 'bird', 'fish', 'duck', 'pig', 'monkey', 'rabbit'],
        sentences: ['I have a cat.|我有一只猫。', 'Look at the dog.|看那只狗。', 'It is a monkey.|它是一只猴子。'],
        dialogue: [
          ['Lily', 'Look! A cat.', '看！一只猫。'],
          ['Tom', 'I have a dog.', '我有一只狗。'],
          ['Lily', 'Is it big?', '它大吗？'],
          ['Tom', 'No, it is small.', '不，它很小。'],
          ['Lily', 'Look at the monkey!', '看那只猴子！'],
          ['Tom', 'It is funny.', '它真滑稽。']
        ],
        grammar: {
          title: 'I have ... 我拥有',
          note: 'I have 表示「我有」。说别人有时用 She has / He has。',
          examples: ['I have a dog.|我有一只狗。', 'She has a cat.|她有一只猫。'],
          quiz: [{ q: 'I ___ a bird.', opts: ['have', 'has', 'am'], a: 'have' }]
        }
      }
    ]
  },
  // ==================== 一年级下册 ====================
  {
    grade: 1, term: 2, title: '一年级下册', color: '#FF8A65', level: '启蒙',
    modules: [
      {
        name: 'My Family', zh: '我的家人',
        words: ['father', 'mother', 'dad', 'mum', 'brother', 'sister', 'grandpa', 'grandma'],
        sentences: ['This is my father.|这是我的爸爸。', 'Who is she? She is my mother.|她是谁？她是我妈妈。', 'I love my family.|我爱我的家人。'],
        dialogue: [
          ['Amy', 'Who is he?', '他是谁？'],
          ['Tom', 'He is my father.', '他是我爸爸。'],
          ['Amy', 'Who is she?', '她是谁？'],
          ['Tom', 'She is my mother. And this is my sister.', '她是我妈妈。这是我妹妹。'],
          ['Amy', 'Your family is nice.', '你的家人真好。'],
          ['Tom', 'I love my family.', '我爱我的家人。']
        ],
        grammar: {
          title: 'Who is ...? 询问是谁',
          note: 'Who is he/she? 用来问「他/她是谁」，回答用 He/She is ...。',
          examples: ['Who is she? She is my aunt.|她是谁？她是我阿姨。'],
          quiz: [{ q: '___ is he? He is my dad.', opts: ['Who', 'What', 'Where'], a: 'Who' }]
        }
      },
      {
        name: 'Food', zh: '食物',
        words: ['rice', 'noodles', 'egg', 'milk', 'bread', 'cake', 'juice', 'water'],
        sentences: ['I like rice.|我喜欢米饭。', 'Have some milk.|喝点牛奶吧。', 'Do you like cake? Yes, I do.|你喜欢蛋糕吗？是的，我喜欢。'],
        dialogue: [
          ['Mum', 'What would you like for breakfast?', '你早餐想吃什么？'],
          ['Tom', 'I would like some bread and milk.', '我想要面包和牛奶。'],
          ['Mum', 'Here you are.', '给你。'],
          ['Tom', 'Thank you, Mum. Where is my juice?', '谢谢妈妈。我的果汁呢？'],
          ['Mum', 'It is on the table.', '在桌子上。'],
          ['Tom', 'Great! I like it.', '太好了！我喜欢。']
        ],
        grammar: {
          title: 'some 的用法',
          note: 'some 表示「一些」，用在肯定句中，后面接不可数名词或可数名词复数。',
          examples: ['I want some water.|我想要一些水。', 'Have some eggs.|吃些鸡蛋吧。'],
          quiz: [{ q: 'I would like ___ milk.', opts: ['some', 'a', 'many'], a: 'some' }]
        }
      },
      {
        name: 'Toys', zh: '玩具',
        words: ['ball', 'doll', 'car', 'kite', 'robot', 'bear', 'plane', 'boat'],
        sentences: ['I have a ball.|我有一个球。', 'Is it a doll? Yes, it is.|它是娃娃吗？是的。', 'Let us play.|我们一起玩吧。'],
        dialogue: [
          ['Tom', 'Look at my robot!', '看我的机器人！'],
          ['Lily', 'It is cool. I have a kite.', '它真酷。我有一只风筝。'],
          ['Tom', 'Let us fly the kite.', '我们去放风筝吧。'],
          ['Lily', 'Good idea! Where is your ball?', '好主意！你的球在哪里？'],
          ['Tom', 'It is in the box.', '在盒子里。'],
          ['Lily', 'Let us play together.', '我们一起玩吧。']
        ],
        grammar: {
          title: 'Is it ...? 一般疑问句',
          note: '把 is 提到句首变成疑问句，读升调。肯定回答 Yes, it is. 否定回答 No, it isn\'t.',
          examples: ['Is it a car? Yes, it is.|它是小汽车吗？是的。'],
          quiz: [{ q: 'Is it a kite? ___', opts: ['Yes, it is.', 'Yes, it does.', 'No, it is.'], a: 'Yes, it is.' }]
        }
      },
      {
        name: 'Fruits', zh: '水果',
        words: ['apple', 'banana', 'pear', 'orange2', 'grape', 'peach', 'mango', 'watermelon'],
        sentences: ['I like apples.|我喜欢苹果。', 'Here is a pear for you.|给你一个梨。', 'Bananas are yellow.|香蕉是黄色的。'],
        dialogue: [
          ['Grandma', 'Do you like fruit?', '你喜欢水果吗？'],
          ['Lily', 'Yes. I like apples and grapes.', '喜欢。我喜欢苹果和葡萄。'],
          ['Grandma', 'Here is a mango for you.', '给你一个芒果。'],
          ['Lily', 'Thank you, Grandma. It is sweet.', '谢谢奶奶。它很甜。'],
          ['Grandma', 'Eat more fruit. It is good for you.', '多吃水果，对你有好处。'],
          ['Lily', 'I will.', '我会的。']
        ],
        grammar: {
          title: '名词复数',
          note: '表示多个时，名词后面加 -s 或 -es。apple → apples, peach → peaches。',
          examples: ['one apple → two apples', 'a peach → some peaches'],
          quiz: [{ q: '两串葡萄：two ___', opts: ['grapes', 'grape', 'a grape'], a: 'grapes' }]
        }
      },
      {
        name: 'Clothes', zh: '衣服',
        words: ['shirt', 'Tshirt', 'dress', 'skirt', 'shoe', 'sock', 'hat', 'coat'],
        sentences: ['Put on your coat.|穿上你的外套。', 'I like my new dress.|我喜欢我的新裙子。', 'Where are my shoes?|我的鞋子在哪里？'],
        dialogue: [
          ['Mum', 'It is cold. Put on your coat.', '天冷了，穿上外套。'],
          ['Tom', 'Where is my coat?', '我的外套在哪里？'],
          ['Mum', 'It is on the bed.', '在床上。'],
          ['Tom', 'Thank you. What about my hat?', '谢谢。我的帽子呢？'],
          ['Mum', 'Here it is. You look nice.', '在这里。你看起来很棒。'],
          ['Tom', 'I am ready. Let us go!', '我准备好了，我们走吧！']
        ],
        grammar: {
          title: 'Put on 和 wear',
          note: 'put on 强调「穿上」的动作，wear 强调「穿着」的状态。',
          examples: ['Put on your hat.|戴上你的帽子。', 'She wears a red dress.|她穿着红色连衣裙。'],
          quiz: [{ q: '___ your shoes, please.', opts: ['Put on', 'Wear', 'Has'], a: 'Put on' }]
        }
      },
      {
        name: 'Weather', zh: '天气',
        words: ['sunny', 'rainy', 'windy', 'cloudy', 'hot', 'cold', 'warm', 'cool'],
        sentences: ['It is sunny today.|今天是晴天。', 'It is hot in Guangzhou.|广州很热。', 'Is it rainy? No, it is not.|下雨了吗？没有。'],
        dialogue: [
          ['Lily', 'How is the weather today?', '今天天气怎么样？'],
          ['Tom', 'It is sunny and warm.', '晴天，很暖和。'],
          ['Lily', 'Let us go to the park.', '我们去公园吧。'],
          ['Tom', 'Wait! It is cloudy now.', '等等！现在多云了。'],
          ['Lily', 'Take an umbrella with us.', '我们带把伞吧。'],
          ['Tom', 'Good idea. It may rain.', '好主意，可能会下雨。']
        ],
        grammar: {
          title: 'It is + 天气形容词',
          note: '描述天气常用 It is sunny / rainy / windy / cloudy。It 指天气。',
          examples: ['It is windy.|今天有风。', 'It is cold in winter.|冬天很冷。'],
          quiz: [{ q: '___ is sunny today.', opts: ['It', 'He', 'She'], a: 'It' }]
        }
      }
    ]
  },
  // ==================== 二年级上册 ====================
  {
    grade: 2, term: 1, title: '二年级上册', color: '#FFB74D', level: '启蒙',
    modules: [
      {
        name: 'School Things', zh: '学习用品',
        words: ['crayon', 'marker', 'notebook', 'pencil', 'scissors', 'paper', 'sharpener', 'bag'],
        sentences: ['May I use your crayon?|我可以用你的蜡笔吗？', 'Here you are.|给你。', 'Take out your notebook, please.|请拿出你的笔记本。'],
        dialogue: [
          ['Tom', 'May I use your crayon?', '我可以用你的蜡笔吗？'],
          ['Lily', 'Yes, here you are.', '可以，给你。'],
          ['Tom', 'Thank you. Where is my notebook?', '谢谢。我的笔记本在哪里？'],
          ['Lily', 'Is it in your bag?', '在你的书包里吗？'],
          ['Tom', 'Oh, yes! My notebook is here.', '哦，是的！我的笔记本在这。'],
          ['Lily', 'Be careful with the scissors.', '小心剪刀。']
        ],
        grammar: {
          title: 'May I ...? 请求许可',
          note: 'May I ...? 表示礼貌地请求，允许时回答 Sure. / Yes, of course. / Here you are.',
          examples: ['May I use your pen? Here you are.|我可以用你的笔吗？给你。'],
          quiz: [{ q: 'May I use your ruler? ___ Here you are.', opts: ['Sure.', 'No.', 'I am.'], a: 'Sure.' }]
        }
      },
      {
        name: 'Shapes', zh: '形状',
        words: ['circle', 'square', 'triangle', 'star', 'heart', 'big', 'small', 'picture'],
        sentences: ['It is a circle.|它是一个圆形。', 'Draw a big star.|画一颗大星星。', 'What shape is it?|它是什么形状？'],
        dialogue: [
          ['Teacher', 'What shape is this?', '这是什么形状？'],
          ['Lily', 'It is a circle.', '这是一个圆形。'],
          ['Teacher', 'Look at this picture. How many squares?', '看这幅图。有多少个正方形？'],
          ['Lily', 'One, two, three squares.', '一、二、三个正方形。'],
          ['Teacher', 'Now draw a big triangle.', '现在画一个大三角形。'],
          ['Lily', 'Done! It looks like a house.', '画好了！它看起来像房子。']
        ],
        grammar: {
          title: '形容词修饰名词',
          note: '形容词放在名词前面：a big star（一颗大星星）、a small circle（一个小圆）。',
          examples: ['a big square 一个大正方形', 'a small heart 一颗小心形'],
          quiz: [{ q: '一颗小星星：a ___ star', opts: ['small', 'big', 'shape'], a: 'small' }]
        }
      },
      {
        name: 'Numbers 11-20', zh: '数字 11-20',
        words: ['eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen', 'twenty'],
        sentences: ['How many birds? Twelve.|有多少只鸟？十二只。', 'I can count to twenty.|我能数到二十。', 'Fifteen and five is twenty.|十五加五等于二十。'],
        dialogue: [
          ['Teacher', 'Let us count the books.', '我们来数书吧。'],
          ['Tom', 'Eleven, twelve ... there are thirteen books.', '十一、十二……有十三本书。'],
          ['Teacher', 'How many crayons?', '有多少支蜡笔？'],
          ['Tom', 'Sixteen crayons.', '十六支蜡笔。'],
          ['Teacher', 'Very good. Can you count to twenty?', '很好。你能数到二十吗？'],
          ['Tom', 'Yes! Twenty!', '能！二十！']
        ],
        grammar: {
          title: '十几的数字规律',
          note: '13-19 大多以 -teen 结尾：four → fourteen, six → sixteen。',
          examples: ['fourteen 14 / sixteen 16 / nineteen 19'],
          quiz: [{ q: '15 的英文是 ___', opts: ['fifteen', 'fiveteen', 'fifty'], a: 'fifteen' }]
        }
      },
      {
        name: 'Pets', zh: '宠物',
        words: ['pet', 'puppy', 'kitten', 'goldfish', 'rabbit', 'turtle', 'parrot', 'cute'],
        sentences: ['I have a puppy.|我有一只小狗。', 'It is very cute.|它非常可爱。', 'I feed my goldfish every day.|我每天喂我的金鱼。'],
        dialogue: [
          ['Amy', 'Do you have a pet?', '你有宠物吗？'],
          ['Tom', 'Yes, I have a puppy.', '有，我有一只小狗。'],
          ['Amy', 'What does it look like?', '它长什么样？'],
          ['Tom', 'It is small and white. It is very cute.', '它又小又白，非常可爱。'],
          ['Amy', 'I have a goldfish.', '我有一条金鱼。'],
          ['Tom', 'Let us feed our pets together.', '我们一起喂宠物吧。']
        ],
        grammar: {
          title: '一般疑问句 Do you ...?',
          note: 'Do you have a pet? 用来询问对方，肯定回答 Yes, I do.，否定回答 No, I don\'t.',
          examples: ['Do you have a cat? Yes, I do.|你有猫吗？有。'],
          quiz: [{ q: 'Do you have a pet? ___', opts: ['Yes, I do.', 'Yes, I am.', 'Yes, it is.'], a: 'Yes, I do.' }]
        }
      },
      {
        name: 'Actions', zh: '动作',
        words: ['run', 'jump', 'walk', 'swim', 'sing', 'dance', 'read', 'write'],
        sentences: ['I can run.|我会跑。', 'Can you swim? Yes, I can.|你会游泳吗？会。', 'Let us sing and dance.|我们一起唱歌跳舞吧。'],
        dialogue: [
          ['Lily', 'Can you swim?', '你会游泳吗？'],
          ['Tom', 'Yes, I can. I swim every Sunday.', '会。我每个星期天游泳。'],
          ['Lily', 'I can sing and dance.', '我会唱歌跳舞。'],
          ['Tom', 'Can you run fast?', '你能跑得快吗？'],
          ['Lily', 'No, I cannot. But I can jump high!', '不能。但我能跳得很高！'],
          ['Tom', 'Let us play and jump together.', '我们一起玩、一起跳吧。']
        ],
        grammar: {
          title: 'Can you ...? 能力询问',
          note: 'can 表示「会、能」，后面直接跟动词原形。回答 Yes, I can. / No, I can\'t.',
          examples: ['Can you sing? Yes, I can.|你会唱歌吗？会。'],
          quiz: [{ q: 'Can you dance? No, I ___', opts: ['cannot', 'can', 'am not'], a: 'cannot' }]
        }
      },
      {
        name: 'My Home', zh: '我的家',
        words: ['bedroom', 'kitchen', 'bathroom', 'living', 'bed', 'sofa', 'table', 'door'],
        sentences: ['This is my bedroom.|这是我的卧室。', 'Mum is in the kitchen.|妈妈在厨房。', 'Where is Dad? He is in the living room.|爸爸在哪里？他在客厅。'],
        dialogue: [
          ['Tom', 'This is my home.', '这是我家。'],
          ['Amy', 'It is big and nice.', '又大又漂亮。'],
          ['Tom', 'This is the living room. Dad is on the sofa.', '这是客厅。爸爸在沙发上。'],
          ['Amy', 'Where is the kitchen?', '厨房在哪里？'],
          ['Tom', 'Next to the bathroom.', '在浴室旁边。'],
          ['Amy', 'I like your home.', '我喜欢你的家。']
        ],
        grammar: {
          title: 'Where is ...? 问位置',
          note: 'Where is + 人/物，用来问位置。回答常用 in / on / under。',
          examples: ['Where is the cat? It is under the table.|猫在哪？在桌子下面。'],
          quiz: [{ q: 'Where ___ Mum? She is in the kitchen.', opts: ['is', 'are', 'do'], a: 'is' }]
        }
      }
    ]
  },
  // ==================== 二年级下册 ====================
  {
    grade: 2, term: 2, title: '二年级下册', color: '#FFB74D', level: '启蒙',
    modules: [
      {
        name: 'Days of the Week', zh: '星期',
        words: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'today'],
        sentences: ['What day is it today?|今天星期几？', 'It is Monday.|今天星期一。', 'I go to school on Friday.|我星期五上学。'],
        dialogue: [
          ['Amy', 'What day is it today?', '今天星期几？'],
          ['Tom', 'It is Wednesday.', '星期三。'],
          ['Amy', 'What class do we have today?', '我们今天有什么课？'],
          ['Tom', 'We have English and music.', '我们有英语课和音乐课。'],
          ['Amy', 'What day do you like best?', '你最喜欢哪一天？'],
          ['Tom', 'Saturday! I can play all day.', '星期六！我可以玩一整天。']
        ],
        grammar: {
          title: '星期名称要大写',
          note: '星期几的首字母必须大写：Monday、Tuesday、Sunday。',
          examples: ['on Monday 在星期一', 'on Sunday 在星期日'],
          quiz: [{ q: '正确写法是 ___', opts: ['Friday', 'friday', 'FRIDAY'], a: 'Friday' }]
        }
      },
      {
        name: 'Jobs', zh: '职业',
        words: ['doctor', 'nurse', 'driver', 'farmer', 'cook', 'policeman', 'student', 'worker'],
        sentences: ['My father is a doctor.|我爸爸是医生。', 'What does she do? She is a nurse.|她是做什么的？她是护士。', 'I want to be a cook.|我想成为厨师。'],
        dialogue: [
          ['Tom', 'What does your father do?', '你爸爸做什么工作？'],
          ['Lily', 'He is a doctor.', '他是医生。'],
          ['Tom', 'My father is a driver.', '我爸爸是司机。'],
          ['Lily', 'What do you want to be?', '你想成为什么？'],
          ['Tom', 'I want to be a cook.', '我想成为厨师。'],
          ['Lily', 'I want to be a teacher!', '我想成为老师！']
        ],
        grammar: {
          title: 'What does he do? 询问职业',
          note: '问职业用 What does he/she do?，回答 He/She is a + 职业。',
          examples: ['What does your mother do? She is a nurse.|你妈妈做什么？她是护士。'],
          quiz: [{ q: 'What ___ your father do?', opts: ['does', 'do', 'is'], a: 'does' }]
        }
      },
      {
        name: 'Transport', zh: '交通工具',
        words: ['bus', 'bike', 'taxi', 'train', 'ship', 'subway', 'plane', 'walk'],
        sentences: ['I go to school by bus.|我坐公交车上学。', 'Let us take the subway.|我们坐地铁吧。', 'My father goes to work by car.|我爸爸开车上班。'],
        dialogue: [
          ['Lily', 'How do you go to school?', '你怎样去上学？'],
          ['Tom', 'I go to school by bus.', '我坐公交车上学。'],
          ['Lily', 'I walk to school. It is near.', '我走路上学，很近。'],
          ['Tom', 'How does your dad go to work?', '你爸爸怎样去上班？'],
          ['Lily', 'He goes by subway.', '他坐地铁。'],
          ['Tom', 'The subway is fast.', '地铁很快。']
        ],
        grammar: {
          title: 'by + 交通工具',
          note: 'by bus / by bike / by subway 表示交通方式，中间不加 a 或 the。',
          examples: ['by train 坐火车', 'on foot 步行'],
          quiz: [{ q: '我坐地铁：by ___', opts: ['subway', 'a subway', 'the subways'], a: 'subway' }]
        }
      },
      {
        name: 'Nature', zh: '大自然',
        words: ['sun', 'moon', 'star', 'tree', 'flower', 'river', 'mountain', 'sky'],
        sentences: ['The sun is hot.|太阳很热。', 'Look at the flowers.|看那些花。', 'The sky is blue.|天空是蓝色的。'],
        dialogue: [
          ['Grandpa', 'Look at the sky. What can you see?', '看天空。你能看到什么？'],
          ['Lily', 'I can see the sun and birds.', '我能看到太阳和鸟。'],
          ['Grandpa', 'What about at night?', '那晚上呢？'],
          ['Lily', 'I can see the moon and stars.', '我能看到月亮和星星。'],
          ['Grandpa', 'And the mountain near the river?', '还有河边的山？'],
          ['Lily', 'Yes! It is beautiful.', '是的！它很美。']
        ],
        grammar: {
          title: 'the 的用法',
          note: 'the 表示特指。the sun、the moon 是世界上独一无二的事物，前面用 the。',
          examples: ['the sun 太阳 / the sky 天空'],
          quiz: [{ q: '___ moon is bright tonight.', opts: ['The', 'A', 'An'], a: 'The' }]
        }
      },
      {
        name: 'Feelings', zh: '情绪',
        words: ['happy', 'sad', 'angry', 'tired', 'hungry', 'thirsty', 'scared', 'excited'],
        sentences: ['I am happy today.|我今天很开心。', 'Are you tired? Yes, I am.|你累了吗？是的。', 'Do not be sad.|不要难过。'],
        dialogue: [
          ['Mum', 'You look tired. Are you OK?', '你看起来很累。你还好吗？'],
          ['Tom', 'I am tired and hungry.', '我又累又饿。'],
          ['Mum', 'Have some bread and milk.', '吃点面包喝点牛奶吧。'],
          ['Tom', 'Thank you, Mum. I feel happy now.', '谢谢妈妈。我现在感觉开心了。'],
          ['Mum', 'Why were you sad this morning?', '你今天早上为什么难过？'],
          ['Tom', 'I lost my pen. But I found it!', '我丢了钢笔。但我找到了！']
        ],
        grammar: {
          title: 'Are you ...? 询问感受',
          note: 'Are you happy? 用来询问感受，回答 I am. 或 I am not.',
          examples: ['Are you hungry? Yes, I am.|你饿了吗？是的。'],
          quiz: [{ q: 'Are you happy? ___', opts: ['Yes, I am.', 'Yes, I do.', 'Yes, it is.'], a: 'Yes, I am.' }]
        }
      },
      {
        name: 'Festivals', zh: '节日',
        words: ['festival', 'birthday', 'gift', 'card', 'party', 'lantern', 'cake', 'mooncake'],
        sentences: ['Happy birthday to you!|祝你生日快乐！', 'Here is a gift for you.|给你一份礼物。', 'We eat mooncakes at Mid-Autumn Festival.|中秋节我们吃月饼。'],
        dialogue: [
          ['Amy', 'Happy birthday, Tom!', '生日快乐，汤姆！'],
          ['Tom', 'Thank you, Amy!', '谢谢你，艾米！'],
          ['Amy', 'Here is a gift for you.', '这是给你的礼物。'],
          ['Tom', 'A toy car! I like it. Let us have some cake.', '一辆玩具车！我喜欢。我们吃点蛋糕吧。'],
          ['Amy', 'Which festival do you like best?', '你最喜欢哪个节日？'],
          ['Tom', 'The Spring Festival. I get lucky money!', '春节。我可以拿到压岁钱！']
        ],
        grammar: {
          title: '节日名称首字母大写',
          note: 'Spring Festival、Mid-Autumn Festival、Christmas 等节日名称，每个词首字母都要大写。',
          examples: ['Spring Festival 春节', 'Children\'s Day 儿童节'],
          quiz: [{ q: '正确写法是 ___', opts: ['Spring Festival', 'spring festival', 'Spring festival'], a: 'Spring Festival' }]
        }
      }
    ]
  },
  // ==================== 三年级上册 ====================
  {
    grade: 3, term: 1, title: '三年级上册', color: '#9CCC65', level: '基础',
    modules: [
      {
        name: 'Greetings', zh: '问候',
        words: ['hello', 'hi', 'good', 'morning', 'afternoon', 'nice', 'meet', 'fine'],
        sentences: ['Hello! I am Danny.|你好！我是丹尼。', 'Nice to meet you.|很高兴见到你。', 'How are you? I am fine, thank you.|你好吗？我很好，谢谢。'],
        dialogue: [
          ['Danny', 'Good morning. I am Danny.', '早上好，我是丹尼。'],
          ['Janet', 'Good morning, Danny. I am Janet.', '早上好，丹尼。我是珍妮特。'],
          ['Danny', 'Nice to meet you, Janet.', '很高兴认识你，珍妮特。'],
          ['Janet', 'Nice to meet you too. How are you?', '我也很高兴认识你。你好吗？'],
          ['Danny', 'I am fine, thank you. And you?', '我很好，谢谢。你呢？'],
          ['Janet', 'I am fine, too.', '我也很好。']
        ],
        grammar: {
          title: 'How are you? 问候',
          note: 'How are you? 回答 I am fine / OK / very well, thank you.',
          examples: ['How are you? Not bad, thanks.|你好吗？不错，谢谢。'],
          quiz: [{ q: 'How are you? ___', opts: ['I am fine, thank you.', 'I am nine.', 'Nice to meet you.'], a: 'I am fine, thank you.' }]
        }
      },
      {
        name: 'Introductions', zh: '介绍他人',
        words: ['this', 'that', 'my', 'your', 'father', 'mother', 'friend', 'boy'],
        sentences: ['This is my father.|这是我爸爸。', 'Is this your mother? Yes, it is.|这是你妈妈吗？是的。', 'That is my friend.|那是我的朋友。'],
        dialogue: [
          ['Janet', 'Danny, this is my father.', '丹尼，这是我爸爸。'],
          ['Danny', 'Nice to meet you, Mr White.', '很高兴认识您，怀特先生。'],
          ['Mr White', 'Nice to meet you too, Danny.', '我也很高兴认识你，丹尼。'],
          ['Danny', 'Who is that boy?', '那个男孩是谁？'],
          ['Janet', 'He is my friend, Ben.', '他是我的朋友本。'],
          ['Danny', 'Let us say hello to him.', '我们去跟他打个招呼吧。']
        ],
        grammar: {
          title: 'this 和 that',
          note: 'this 指近处的人或物，that 指远处的人或物。',
          examples: ['This is my book. That is your book.|这是我的书，那是你的书。'],
          quiz: [{ q: '___ is my friend near me.', opts: ['This', 'That', 'These'], a: 'This' }]
        }
      },
      {
        name: 'Body', zh: '身体',
        words: ['face', 'eye', 'ear', 'nose', 'mouth', 'arm', 'leg', 'shoulder'],
        sentences: ['This is my face.|这是我的脸。', 'Touch your head.|摸摸你的头。', 'I have two eyes and one nose.|我有两只眼睛和一个鼻子。'],
        dialogue: [
          ['Miss Li', 'Look at the picture. What is this?', '看图。这是什么？'],
          ['Ben', 'It is a face.', '这是一张脸。'],
          ['Miss Li', 'What can you see on the face?', '在脸上你能看到什么？'],
          ['Ben', 'Two eyes, one nose and one mouth.', '两只眼睛、一个鼻子和一张嘴巴。'],
          ['Miss Li', 'Touch your shoulder with your hand.', '用手摸摸你的肩膀。'],
          ['Ben', 'Like this? It is easy!', '这样吗？太简单了！']
        ],
        grammar: {
          title: 'have 和 has',
          note: 'I / You / We / They 用 have；He / She / It 用 has。',
          examples: ['I have long hair. She has short hair.|我有长头发。她有短头发。'],
          quiz: [{ q: 'She ___ big eyes.', opts: ['has', 'have', 'is'], a: 'has' }]
        }
      },
      {
        name: 'Family', zh: '家庭',
        words: ['girl', 'man', 'woman', 'lady', 'grandpa', 'grandma', 'who', 'he'],
        sentences: ['Is this a boy? No, it is not.|这是男孩吗？不是。', "Who's that lady? She is my grandmother.|那位女士是谁？她是我奶奶。", 'He is my brother.|他是我哥哥。'],
        dialogue: [
          ['Janet', 'Look at this photo. Who is that lady?', '看这张照片。那位女士是谁？'],
          ['Danny', 'She is my grandmother.', '她是我奶奶。'],
          ['Janet', 'And who is that man?', '那个男人是谁？'],
          ['Danny', 'He is my grandpa.', '他是我爷爷。'],
          ['Janet', 'Is this girl your sister?', '这个女孩是你妹妹吗？'],
          ['Danny', 'No, she is my cousin.', '不，她是我表妹。']
        ],
        grammar: {
          title: 'Who 引导的特殊疑问句',
          note: 'Who is that man? 询问人是谁。不能说 What is that man?',
          examples: ['Who is she? She is my teacher.|她是谁？她是我的老师。'],
          quiz: [{ q: '___ is that woman? She is my aunt.', opts: ['Who', 'What', 'Where'], a: 'Who' }]
        }
      },
      {
        name: 'Toys', zh: '玩具',
        words: ['ball', 'doll', 'kite', 'car', 'plane', 'balloon', 'teddy', 'what'],
        sentences: ['What is this? It is a ball.|这是什么？是一个球。', 'Is it a cat? No, it is a doll.|它是猫吗？不，是娃娃。', 'I have a new kite.|我有一个新风筝。'],
        dialogue: [
          ['Ben', 'What is this?', '这是什么？'],
          ['Janet', 'It is a teddy bear.', '这是一只泰迪熊。'],
          ['Ben', 'It is cute! Is it your toy?', '真可爱！这是你的玩具吗？'],
          ['Janet', 'Yes. And this is my new kite.', '是的。这是我的新风筝。'],
          ['Ben', 'Let us fly the kite in the park.', '我们去公园放风筝吧。'],
          ['Janet', 'Great! I will bring my ball too.', '太好了！我也带上我的球。']
        ],
        grammar: {
          title: 'What is this? 询问物品',
          note: 'What is this? 回答 It is a ...。What are these? 回答 They are ...',
          examples: ['What are these? They are dolls.|这些是什么？是娃娃。'],
          quiz: [{ q: 'What is this? ___ a balloon.', opts: ['It is', 'They are', 'She is'], a: 'It is' }]
        }
      },
      {
        name: 'Colours', zh: '颜色',
        words: ['colour', 'red', 'yellow', 'blue', 'green', 'brown', 'purple', 'know'],
        sentences: ['What colour is it? It is yellow.|它是什么颜色？黄色。', 'I know all the colours.|我认识所有的颜色。', 'The sky is blue and the grass is green.|天空是蓝色的，草是绿色的。'],
        dialogue: [
          ['Miss Li', 'What colour is the sky?', '天空是什么颜色？'],
          ['Ben', 'It is blue.', '蓝色。'],
          ['Miss Li', 'What colour is the grass?', '草是什么颜色？'],
          ['Ben', 'It is green.', '绿色。'],
          ['Miss Li', 'Look at this flower. What colour is it?', '看这朵花。它是什么颜色？'],
          ['Ben', 'It is purple! I know all the colours.', '紫色！我认识所有颜色。']
        ],
        grammar: {
          title: '形容词作表语',
          note: '颜色词放在 is/are 后面描述事物：The sky is blue.',
          examples: ['The leaves are green.|叶子是绿色的。', 'My bag is brown.|我的包是棕色的。'],
          quiz: [{ q: 'The sky ___ blue.', opts: ['is', 'are', 'am'], a: 'is' }]
        }
      }
    ]
  },
  // ==================== 三年级下册 ====================
  {
    grade: 3, term: 2, title: '三年级下册', color: '#9CCC65', level: '基础',
    modules: [
      {
        name: 'Colours', zh: '颜色与喜好',
        words: ['like', 'black', 'white2', 'orange2', 'pink', 'grey', 'monkey', 'panda'],
        sentences: ['I like red.|我喜欢红色。', "It's a brown monkey.|它是一只棕色的猴子。", 'My favourite colour is pink.|我最喜欢的颜色是粉色。'],
        dialogue: [
          ['Janet', 'Do you like the black jacket?', '你喜欢这件黑色夹克吗？'],
          ['Danny', 'No, I like the white one.', '不，我喜欢白色的那件。'],
          ['Janet', 'What is your favourite colour?', '你最喜欢什么颜色？'],
          ['Danny', 'My favourite colour is orange.', '我最喜欢的颜色是橙色。'],
          ['Janet', 'Look at the panda! It is black and white.', '看那只熊猫！它是黑白相间的。'],
          ['Danny', 'It is so cute.', '它太可爱了。']
        ],
        grammar: {
          title: 'favourite 的用法',
          note: 'favourite 表示「最喜欢的」，前面常与 my/your 连用，后面接名词。',
          examples: ['My favourite food is noodles.|我最喜欢的食物是面条。'],
          quiz: [{ q: 'My favourite ___ is blue.', opts: ['colour', 'apple', 'girl'], a: 'colour' }]
        }
      },
      {
        name: 'Positions', zh: '位置',
        words: ['where', 'in', 'on', 'under', 'behind', 'box', 'bed', 'chair'],
        sentences: ["Where's my car? It's under the chair.|我的车在哪？在椅子下面。", 'Is it in your bag? Yes, it is.|它在你的书包里吗？是的。', 'The cat is on the bed.|猫在床上。'],
        dialogue: [
          ['Mum', 'Where is your school bag?', '你的书包在哪里？'],
          ['Danny', 'It is on the chair.', '在椅子上。'],
          ['Mum', 'Where are your shoes?', '你的鞋在哪里？'],
          ['Danny', 'They are under the bed.', '在床底下。'],
          ['Mum', 'And your ball?', '你的球呢？'],
          ['Danny', 'It is in the box behind the door.', '在门后面的盒子里。']
        ],
        grammar: {
          title: '方位介词 in / on / under',
          note: 'in 在里面，on 在上面（接触），under 在下面。',
          examples: ['in the box 在盒子里', 'on the desk 在桌上', 'under the chair 在椅子下'],
          quiz: [{ q: 'The cat is ___ the box.（在盒子里）', opts: ['in', 'on', 'under'], a: 'in' }]
        }
      },
      {
        name: 'Personal Information', zh: '个人信息',
        words: ['birthday2', 'happy', 'old', 'telephone', 'number', 'present', 'cake', 'age'],
        sentences: ['Happy birthday! How old are you? I am nine.|生日快乐！你多大了？我九岁。', 'May I have your telephone number?|可以告诉我你的电话号码吗？', 'Here is a present for you.|这是给你的礼物。'],
        dialogue: [
          ['Janet', 'Happy birthday, Danny! How old are you?', '生日快乐，丹尼！你几岁了？'],
          ['Danny', 'I am nine.', '我九岁。'],
          ['Janet', 'Here is a present for you.', '这是给你的礼物。'],
          ['Danny', 'Thank you! May I have your telephone number?', '谢谢！可以给我你的电话号码吗？'],
          ['Janet', 'Sure. It is 138 0000 1234.', '当然，是138 0000 1234。'],
          ['Danny', 'Let us cut the birthday cake!', '我们来切生日蛋糕吧！']
        ],
        grammar: {
          title: 'How old are you?',
          note: 'How old are you? 询问年龄，回答 I am + 数字（+ years old）。',
          examples: ['How old is he? He is ten.|他多大了？十岁。'],
          quiz: [{ q: 'How old ___ you?', opts: ['are', 'is', 'do'], a: 'are' }]
        }
      },
      {
        name: 'Fruits', zh: '水果',
        words: ['grape', 'strawberry', 'lemon', 'watermelon', 'some2', 'sweet', 'pear', 'apple'],
        sentences: ['May I have some grapes?|我可以吃一些葡萄吗？', 'Apples are good for us.|苹果对我们有好处。', 'Strawberries are sweet.|草莓很甜。'],
        dialogue: [
          ['Danny', 'Mum, may I have some grapes?', '妈妈，我可以吃些葡萄吗？'],
          ['Mum', 'Yes. Here you are. Do you want a strawberry?', '可以，给你。你想要草莓吗？'],
          ['Danny', 'Yes, please. I love sweet fruit.', '好的。我喜欢甜的水果。'],
          ['Mum', 'Eat some apples too. They are good for you.', '也吃点苹果，对你有好处。'],
          ['Danny', 'The lemon is very sour!', '这个柠檬太酸了！'],
          ['Mum', 'Haha, yes. Eat the watermelon instead.', '哈哈，是啊。那吃西瓜吧。']
        ],
        grammar: {
          title: 'be good for 对……有益',
          note: 'be good for 表示「对……有好处」，主语不同时 be 要变化。',
          examples: ['Vegetables are good for us.|蔬菜对我们有好处。'],
          quiz: [{ q: 'Fruit is good ___ us.', opts: ['for', 'to', 'at'], a: 'for' }]
        }
      },
      {
        name: 'Relatives', zh: '亲戚',
        words: ['uncle', 'aunt', 'cousin', 'baby', 'family', 'people', 'cute', 'man'],
        sentences: ['Who is this cute boy? He is my cousin.|这个可爱的男孩是谁？他是我表弟。', 'How many people are there in your family? Five.|你家有几口人？五口。', 'This is my aunt.|这是我阿姨。'],
        dialogue: [
          ['Janet', 'Danny, who is this cute baby?', '丹尼，这个可爱的宝宝是谁？'],
          ['Danny', 'She is my cousin.', '她是我表妹。'],
          ['Janet', 'Is that lady your mother?', '那位女士是你妈妈吗？'],
          ['Danny', 'No, she is my aunt.', '不，她是我阿姨。'],
          ['Janet', 'How many people are there in your family?', '你家有几口人？'],
          ['Danny', 'Five. My parents, my grandpa, my cousin and me.', '五口。我父母、我爷爷、我表妹和我。']
        ],
        grammar: {
          title: 'How many people 疑问句',
          note: 'How many people are there ...? 问人数。注意 people 本身就是复数。',
          examples: ['How many people are there? Four.|有多少人？四个。'],
          quiz: [{ q: 'How many ___ are there?', opts: ['people', 'peoples', 'a people'], a: 'people' }]
        }
      },
      {
        name: 'Pets', zh: '宠物',
        words: ['pet', 'rabbit', 'parrot', 'goldfish', 'lovely', 'short', 'long', 'jump'],
        sentences: ["They're lovely.|它们很可爱。", 'I know a short poem.|我会一首短诗。', 'The rabbit has long ears.|兔子有长耳朵。'],
        dialogue: [
          ['Ben', 'Look at my new pet!', '看我的新宠物！'],
          ['Janet', 'What is it?', '它是什么？'],
          ['Ben', 'It is a rabbit. It has long ears.', '它是一只兔子，有长长的耳朵。'],
          ['Janet', 'They are lovely. Can it jump?', '它们很可爱。它会跳吗？'],
          ['Ben', 'Yes, it can jump high. My parrot can talk too.', '会，它能跳得很高。我的鹦鹉还会说话。'],
          ['Janet', 'You have so many pets!', '你有好多宠物！']
        ],
        grammar: {
          title: 'They are 和 It is',
          note: '单数用 It is，复数用 They are。',
          examples: ['It is a rabbit.|它是一只兔子。', 'They are lovely.|它们很可爱。'],
          quiz: [{ q: '___ are my pets.', opts: ['They', 'It', 'He'], a: 'They' }]
        }
      }
    ]
  },
  // ==================== 四年级上册 ====================
  {
    grade: 4, term: 1, title: '四年级上册', color: '#4DB6AC', level: '基础',
    modules: [
      {
        name: 'Personal Information', zh: '个人信息',
        words: ['tall', 'short', 'thin', 'fat', 'pretty', 'handsome', 'hair', 'look'],
        sentences: ["She's a lovely girl.|她是一个可爱的女孩。", 'She looks cute.|她看起来很可爱。', 'He is tall and thin.|他又高又瘦。'],
        dialogue: [
          ['Ben', 'Who is that tall boy?', '那个高个子男孩是谁？'],
          ['Janet', 'He is my cousin. He is tall and thin.', '他是我表弟。他又高又瘦。'],
          ['Ben', 'And the girl with long hair?', '那个长头发的女孩呢？'],
          ['Janet', 'That is Amy. She looks pretty.', '那是艾米。她看起来真漂亮。'],
          ['Ben', 'The man next to her is handsome.', '她旁边那个男人很英俊。'],
          ['Janet', 'Yes, he is her father.', '是的，他是她爸爸。']
        ],
        grammar: {
          title: 'look + 形容词',
          note: 'look 作系动词，后面接形容词，表示「看起来……」。',
          examples: ['She looks happy.|她看起来很开心。', 'It looks nice.|它看起来不错。'],
          quiz: [{ q: 'She ___ cute.', opts: ['looks', 'look', 'looking'], a: 'looks' }]
        }
      },
      {
        name: 'My House', zh: '我的房子',
        words: ['house', 'garden2', 'window2', 'floor', 'wall', 'colour', 'study', 'door'],
        sentences: ["It's a colourful house.|它是一座色彩丰富的房子。", 'Our house has a big garden.|我们的房子有一个大花园。', 'There are two bedrooms.|有两间卧室。'],
        dialogue: [
          ['Amy', 'Welcome to my house!', '欢迎来我家！'],
          ['Ben', 'Wow, it is a colourful house.', '哇，这是一座色彩丰富的房子。'],
          ['Amy', 'There is a big garden behind it.', '房子后面有一个大花园。'],
          ['Ben', 'How many rooms are there?', '有多少个房间？'],
          ['Amy', 'Four. A living room, a kitchen, a study and two bedrooms.', '四个。客厅、厨房、书房和两间卧室。'],
          ['Ben', 'I like your house. It is warm.', '我喜欢你的房子，很温馨。']
        ],
        grammar: {
          title: 'There is 和 There are',
          note: 'There is 接单数，There are 接复数。',
          examples: ['There is a garden.|有一个花园。', 'There are two windows.|有两扇窗。'],
          quiz: [{ q: 'There ___ two bedrooms.', opts: ['are', 'is', 'have'], a: 'are' }]
        }
      },
      {
        name: 'My School', zh: '我的学校',
        words: ['classroom', 'library', 'playground', 'hall2', 'computer', 'blackboard', 'office', 'subject'],
        sentences: ['Welcome to our school.|欢迎来到我们学校。', 'Is there a library? Yes, there is.|有图书馆吗？有。', 'The playground is very big.|操场非常大。'],
        dialogue: [
          ['Miss Li', 'Welcome to our school, Ben.', '欢迎来到我们学校，本。'],
          ['Ben', 'Thank you. Is there a library?', '谢谢。有图书馆吗？'],
          ['Miss Li', 'Yes, there is. It is next to the hall.', '有。在礼堂旁边。'],
          ['Ben', 'What is that big room?', '那个大房间是什么？'],
          ['Miss Li', 'It is the computer room.', '是电脑室。'],
          ['Ben', 'Your playground is so big!', '你们的操场真大！']
        ],
        grammar: {
          title: 'Is there ...? 询问存在',
          note: 'Is there a ...? 回答 Yes, there is. / No, there isn\'t.',
          examples: ['Is there a park near here? No, there isn\'t.|这附近有公园吗？没有。'],
          quiz: [{ q: 'Is there a hall? ___', opts: ['Yes, there is.', 'Yes, it is.', 'Yes, there are.'], a: 'Yes, there is.' }]
        }
      },
      {
        name: 'Activities', zh: '课余活动',
        words: ['free', 'activity', 'play2', 'draw', 'read', 'music', 'watch', 'football'],
        sentences: ['What do you do when you have free time?|你空闲时做什么？', 'I usually play football.|我通常踢足球。', 'I like drawing and reading.|我喜欢画画和阅读。'],
        dialogue: [
          ['Amy', 'What do you do in your free time?', '你空闲时做什么？'],
          ['Ben', 'I usually play football. What about you?', '我通常踢足球。你呢？'],
          ['Amy', 'I like drawing and watching TV.', '我喜欢画画和看电视。'],
          ['Ben', 'Can you play the piano?', '你会弹钢琴吗？'],
          ['Amy', 'Yes. I practise every day.', '会。我每天练习。'],
          ['Ben', 'Let us play music together after school.', '放学后我们一起玩音乐吧。']
        ],
        grammar: {
          title: 'What do you do ...? 询问活动',
          note: 'What do you do in your free time? 回答 I usually / often + 动词。',
          examples: ['What do you do on Sunday? I often read books.|你星期天做什么？我经常看书。'],
          quiz: [{ q: 'What ___ you do in your free time?', opts: ['do', 'does', 'are'], a: 'do' }]
        }
      },
      {
        name: 'Clothes', zh: '衣服',
        words: ['dress2', 'jacket2', 'trousers', 'shorts', 'sweater', 'uniform2', 'wear', 'new'],
        sentences: ["What's your dress like? It's red and long.|你的裙子是什么样的？红色的长裙。", 'Have you got a dress? Yes, I have.|你有连衣裙吗？有。', 'We wear uniforms at school.|我们在学校穿校服。'],
        dialogue: [
          ['Amy', 'What is your dress like?', '你的连衣裙是什么样的？'],
          ['Janet', 'It is red and long. I like it very much.', '红色的，很长。我非常喜欢。'],
          ['Amy', 'I have a new jacket.', '我有一件新夹克。'],
          ['Janet', 'It is nice. Do you like my sweater?', '真好看。你喜欢我的毛衣吗？'],
          ['Amy', 'Yes. Let us wear our new clothes to the party.', '喜欢。我们穿新衣服去聚会吧。'],
          ['Janet', 'Great idea!', '好主意！']
        ],
        grammar: {
          title: 'What is it like? 询问样子',
          note: 'What is ... like? 用来问「……是什么样的」。',
          examples: ['What is your bag like? It is big and blue.|你的包什么样？又大又蓝。'],
          quiz: [{ q: 'What is your coat ___?', opts: ['like', 'likes', 'look'], a: 'like' }]
        }
      },
      {
        name: 'Occupations', zh: '职业',
        words: ['cook2', 'teacher2', 'doctor2', 'nurse2', 'driver', 'policeman', 'fireman', 'job'],
        sentences: ['What does he do? He is a cook.|他是做什么的？他是厨师。', 'What can your father do? He can drive.|你爸爸会做什么？他会开车。', 'My mother is a nurse.|我妈妈是护士。'],
        dialogue: [
          ['Ben', 'What does your father do?', '你爸爸做什么工作？'],
          ['Amy', 'He is a policeman. What about your father?', '他是警察。你爸爸呢？'],
          ['Ben', 'He is a cook. He can cook delicious food.', '他是厨师。他会做美味的食物。'],
          ['Amy', 'What does your mother do?', '你妈妈做什么？'],
          ['Ben', 'She is a nurse. She helps sick people.', '她是护士。她帮助病人。'],
          ['Amy', 'What a great job!', '多好的工作！']
        ],
        grammar: {
          title: 'a / an 的用法',
          note: 'a 用在辅音音素前，an 用在元音音素前：a cook, an engineer。',
          examples: ['a driver 一位司机', 'an artist 一位艺术家'],
          quiz: [{ q: 'My mother is ___ nurse.', opts: ['a', 'an', 'the'], a: 'a' }]
        }
      }
    ]
  },
  // ==================== 四年级下册 ====================
  {
    grade: 4, term: 2, title: '四年级下册', color: '#4DB6AC', level: '基础',
    modules: [
      {
        name: 'People', zh: '人物描写',
        words: ['kind', 'strong', 'clever', 'funny', 'quiet', 'friendly', 'glasses', 'tall2'],
        sentences: ['He looks like a cook.|他看起来像个厨师。', 'She is very kind.|她非常和善。', 'She is a quiet girl.|她是一个安静的女孩。'],
        dialogue: [
          ['Janet', 'Who is your English teacher?', '你的英语老师是谁？'],
          ['Ben', 'Miss Wang. She is young and kind.', '王老师。她年轻又和善。'],
          ['Janet', 'Does she wear glasses?', '她戴眼镜吗？'],
          ['Ben', 'Yes, she does. She is also very funny.', '是的。她也很风趣。'],
          ['Janet', 'Is she tall?', '她高吗？'],
          ['Ben', 'She is short, but she looks strong.', '她不高，但看起来很结实。']
        ],
        grammar: {
          title: '描述外貌和性格',
          note: '外貌：tall, thin, pretty；性格：kind, clever, funny, quiet。',
          examples: ['He is strong and friendly.|他强壮又友好。'],
          quiz: [{ q: 'She is very ___. She helps others.', opts: ['kind', 'tall', 'loud'], a: 'kind' }]
        }
      },
      {
        name: 'Daily Routine', zh: '日常作息',
        words: ['early2', 'breakfast', 'lunch3', 'dinner3', 'homework', 'sleep2', 'wash2', 'time'],
        sentences: ["It's time to get up.|该起床了。", 'When do you have class? At eight.|你什么时候上课？八点。', 'I go to bed at nine.|我九点睡觉。'],
        dialogue: [
          ['Mum', 'It is seven. It is time to get up.', '七点了，该起床了。'],
          ['Tom', 'OK, Mum. What is for breakfast?', '好的，妈妈。早餐吃什么？'],
          ['Mum', 'Bread and milk. Wash your face first.', '面包和牛奶。先洗脸。'],
          ['Tom', 'I have class at eight. I must go now.', '我八点上课，得走了。'],
          ['Mum', 'Do not forget your homework.', '别忘了你的作业。'],
          ['Tom', 'I will be home at five and finish it.', '我五点回家就做完。']
        ],
        grammar: {
          title: 'What time ...? 询问时间',
          note: 'What time is it? 回答 It is + 时间。用 at + 时间表示「在……时候」。',
          examples: ['What time do you get up? At six.|你几点起床？六点。'],
          quiz: [{ q: 'I have lunch ___ twelve.', opts: ['at', 'in', 'on'], a: 'at' }]
        }
      },
      {
        name: 'Days of the Week', zh: '星期与课程',
        words: ['Monday', 'Tuesday2', 'Wednesday', 'Thursday2', 'Friday', 'Saturday2', 'Sunday', 'class'],
        sentences: ['What day is it today? It is Wednesday.|今天星期几？星期三。', 'What do you usually do on Sunday?|你星期日通常做什么？', 'We have Maths on Monday.|我们星期一有数学课。'],
        dialogue: [
          ['Janet', 'What classes do we have on Monday?', '我们星期一有什么课？'],
          ['Ben', 'We have Chinese, Maths and English.', '我们有语文、数学和英语。'],
          ['Janet', 'What about Thursday?', '星期四呢？'],
          ['Ben', 'We have music and art. I love those classes.', '我们有音乐和美术。我喜欢这些课。'],
          ['Janet', 'What day do you like best?', '你最喜欢哪一天？'],
          ['Ben', 'Friday! Because the weekend is coming.', '星期五！因为周末要来了。']
        ],
        grammar: {
          title: 'on + 星期',
          note: '在具体的某一天用介词 on：on Monday、on Sunday morning。',
          examples: ['We have music on Friday.|我们星期五有音乐课。'],
          quiz: [{ q: 'We have art ___ Thursday.', opts: ['on', 'in', 'at'], a: 'on' }]
        }
      },
      {
        name: 'Hobbies', zh: '爱好',
        words: ['hobby', 'collect', 'stamp', 'photo', 'ride', 'draw', 'music', 'like'],
        sentences: ['What is your hobby? I like taking photos.|你的爱好是什么？我喜欢拍照。', 'I often fly a kite in the park.|我经常在公园放风筝。', 'Let us go shopping this weekend.|这个周末我们去购物吧。'],
        dialogue: [
          ['Ben', 'What is your hobby, Janet?', '珍妮特，你的爱好是什么？'],
          ['Janet', 'I like taking photos. Look at my photos.', '我喜欢拍照。看我的照片。'],
          ['Ben', 'They are beautiful! I collect stamps.', '真漂亮！我收集邮票。'],
          ['Janet', 'How many stamps do you have?', '你有多少张邮票？'],
          ['Ben', 'About fifty. And I like riding my bike.', '大约五十张。我还喜欢骑自行车。'],
          ['Janet', 'Let us ride bikes together this Sunday.', '这个星期天我们一起骑车吧。']
        ],
        grammar: {
          title: 'like + 动词 -ing',
          note: '表达爱好时用 like doing sth.：like swimming、like taking photos。',
          examples: ['I like reading.|我喜欢阅读。'],
          quiz: [{ q: 'I like ___ photos.', opts: ['taking', 'take', 'takes'], a: 'taking' }]
        }
      },
      {
        name: 'Sports', zh: '运动',
        words: ['basketball', 'badminton', 'tennis', 'volleyball', 'skate', 'swim2', 'team', 'fun'],
        sentences: ['It looks fun.|看起来很有趣。', 'Can you play basketball? Yes, I can.|你会打篮球吗？会。', 'I am in the school football team.|我在校足球队。'],
        dialogue: [
          ['Tom', 'Can you play basketball?', '你会打篮球吗？'],
          ['Amy', 'Yes, I can. But I am not good at it.', '会，但打得不太好。'],
          ['Tom', 'Let us play together. It looks fun.', '我们一起打吧，看起来很有趣。'],
          ['Amy', 'I also like badminton and tennis.', '我还喜欢羽毛球和网球。'],
          ['Tom', 'I am in the school football team.', '我在校足球队。'],
          ['Amy', 'Wow, you must be very good!', '哇，你一定很棒！']
        ],
        grammar: {
          title: 'play + 运动',
          note: 'play 后接球类运动时不加 the：play football。接乐器要加 the：play the piano。',
          examples: ['play basketball 打篮球', 'play the violin 拉小提琴'],
          quiz: [{ q: 'Let us play ___.', opts: ['basketball', 'the basketball', 'a basketball'], a: 'basketball' }]
        }
      },
      {
        name: 'Celebrations', zh: '庆祝与日期',
        words: ['January', 'February', 'March', 'April', 'May', 'June', 'born', 'famous'],
        sentences: ['I was born in January.|我出生在一月。', 'Christmas is coming.|圣诞节快到了。', 'When is your birthday? In May.|你的生日是什么时候？五月。'],
        dialogue: [
          ['Janet', 'When is your birthday, Ben?', '本，你的生日是什么时候？'],
          ['Ben', 'It is in March. What about yours?', '三月。你的呢？'],
          ['Janet', 'I was born in May. Look, Children\'s Day is in June.', '我出生在五月。看，儿童节在六月。'],
          ['Ben', 'Yes! We have a party at school.', '对！我们在学校有聚会。'],
          ['Janet', 'Guangzhou is famous for its food.', '广州以美食闻名。'],
          ['Ben', 'We should celebrate with a big meal.', '我们应该大吃一顿来庆祝。']
        ],
        grammar: {
          title: 'in + 月份',
          note: '月份前面用 in：in January。具体的某一天用 on：on May 1st。',
          examples: ['My birthday is in June.|我的生日在六月。'],
          quiz: [{ q: 'Children\'s Day is ___ June.', opts: ['in', 'on', 'at'], a: 'in' }]
        }
      }
    ]
  },
  // ==================== 五年级上册 ====================
  {
    grade: 5, term: 1, title: '五年级上册', color: '#64B5F6', level: '提高',
    modules: [
      {
        name: 'Routines and Dates', zh: '作息与日期',
        words: ['date', 'July', 'August', 'September', 'October', 'November', 'December', 'first'],
        sentences: ["What's the date today? It's September 1st.|今天几号？九月一日。", 'My birthday is on October 3rd.|我的生日是十月三日。', 'What time do you get up? At half past six.|你几点起床？六点半。'],
        dialogue: [
          ['Ben', 'What is the date today?', '今天几号？'],
          ['Amy', 'It is October 3rd. Oh, it is your birthday!', '十月三日。哦，这是你的生日！'],
          ['Ben', 'Yes! I was born in October.', '对！我出生在十月。'],
          ['Amy', 'What time do you get up every day?', '你每天几点起床？'],
          ['Ben', 'At half past six. The summer holiday starts in July.', '六点半。暑假七月开始。'],
          ['Amy', 'Happy birthday! Let us have a party in December too.', '生日快乐！十二月我们也办个派对。']
        ],
        grammar: {
          title: '日期表达：序数词',
          note: '日期用序数词：1st (first)、2nd (second)、3rd (third)、4th (fourth)。',
          examples: ['September 1st 九月一日', 'October 3rd 十月三日'],
          quiz: [{ q: '十月一日：October ___', opts: ['1st', '1th', 'one'], a: '1st' }]
        }
      },
      {
        name: 'Abilities', zh: '能力',
        words: ['well', 'fast', 'high2', 'hard', 'cook3', 'draw', 'speak2', 'swim3'],
        sentences: ['I can swim very well.|我游泳游得很好。', 'He can run fast and jump high.|他跑得快，跳得高。', 'Can you speak English? Yes, a little.|你会说英语吗？会一点。'],
        dialogue: [
          ['Amy', 'Can you swim?', '你会游泳吗？'],
          ['Ben', 'Yes, I can swim very well.', '会，我游得很好。'],
          ['Amy', 'Can you speak English?', '你会说英语吗？'],
          ['Ben', 'Yes, a little. I practise every day.', '会一点。我每天练习。'],
          ['Amy', 'You can also cook and draw very well.', '你做饭和画画也很好。'],
          ['Ben', 'Haha, I try my best.', '哈哈，我尽力而为。']
        ],
        grammar: {
          title: '方式副词',
          note: 'well、fast、high、hard 放在动词后，说明「做得怎么样」。',
          examples: ['She sings well.|她唱得好。', 'He runs fast.|他跑得快。'],
          quiz: [{ q: 'He swims very ___.', opts: ['well', 'good', 'nice'], a: 'well' }]
        }
      },
      {
        name: 'Daily Life', zh: '家务与日常',
        words: ['busy', 'clean', 'wash', 'help', 'housework', 'cook3', 'dinner2', 'water2'],
        sentences: ['What are you doing? I am cleaning the room.|你在做什么？我在打扫房间。', 'Mum is cooking dinner in the kitchen.|妈妈在厨房做晚饭。', 'I often help with the housework.|我经常帮忙做家务。'],
        dialogue: [
          ['Mum', 'You look busy, Amy.', '艾米，你看起来很忙。'],
          ['Amy', 'I am cleaning my room.', '我在打扫房间。'],
          ['Mum', 'Thank you. I am cooking dinner.', '谢谢。我在做晚饭。'],
          ['Amy', 'Can I help you with the housework?', '我可以帮你做家务吗？'],
          ['Mum', 'Yes. Please water the flowers.', '可以，请给花浇水。'],
          ['Amy', 'OK. I will wash the dishes after dinner too.', '好的，晚饭后我还洗碗。']
        ],
        grammar: {
          title: '现在进行时',
          note: 'be + 动词 -ing 表示正在进行的动作：I am cleaning.',
          examples: ['He is cooking.|他在做饭。', 'They are playing.|他们在玩。'],
          quiz: [{ q: 'Mum ___ dinner now.', opts: ['is cooking', 'cooks', 'cook'], a: 'is cooking' }]
        }
      },
      {
        name: 'Travel', zh: '旅行',
        words: ['travel2', 'visit2', 'ticket2', 'map2', 'beach2', 'museum2', 'trip2', 'photo2'],
        sentences: ['Where are you going? To the museum.|你要去哪里？去博物馆。', 'Let us go to the beach by train.|我们坐火车去海滩吧。', 'Have a good trip!|旅途愉快！'],
        dialogue: [
          ['Ben', 'Where are you going this weekend?', '这个周末你去哪里？'],
          ['Amy', 'We are going to the museum.', '我们要去博物馆。'],
          ['Ben', 'How do you go there?', '你们怎么去？'],
          ['Amy', 'By subway. Then we visit the beach.', '坐地铁。然后我们去海滩。'],
          ['Ben', 'Take some photos for me!', '帮我拍些照片！'],
          ['Amy', 'Sure. Have a good trip!', '当然。祝你旅途愉快！']
        ],
        grammar: {
          title: 'be going to 表计划',
          note: 'be going to + 动词原形 表示将要或计划做的事。',
          examples: ['We are going to visit the museum.|我们要去参观博物馆。'],
          quiz: [{ q: 'We ___ going to the beach.', opts: ['are', 'is', 'am'], a: 'are' }]
        }
      },
      {
        name: 'Foods and Drinks', zh: '食物与饮料',
        words: ['hamburger2', 'sandwich', 'chicken2', 'vegetable', 'soup', 'tea2', 'coffee', 'delicious'],
        sentences: ['What would you like? I would like a sandwich.|你想要什么？我想要一个三明治。', 'The soup is delicious.|这汤很美味。', 'Eat more vegetables. They are healthy.|多吃蔬菜，它们很健康。'],
        dialogue: [
          ['Waiter', 'What would you like?', '您想要什么？'],
          ['Ben', 'I would like a sandwich and some soup.', '我想要一个三明治和一些汤。'],
          ['Waiter', 'Would you like something to drink?', '想喝点什么吗？'],
          ['Ben', 'A cup of tea, please.', '请来一杯茶。'],
          ['Waiter', 'The chicken is delicious. Would you like some?', '鸡肉很美味，要来点吗？'],
          ['Ben', 'No, thank you. I would like more vegetables.', '不用了，谢谢。我想要些蔬菜。']
        ],
        grammar: {
          title: 'Would you like ...? 礼貌邀请',
          note: 'Would you like 后接名词或 to do。肯定回答 Yes, please.，否定回答 No, thanks.',
          examples: ['Would you like some tea? Yes, please.|你想来点茶吗？好的。'],
          quiz: [{ q: 'Would you like ___ soup?', opts: ['some', 'any', 'a'], a: 'some' }]
        }
      },
      {
        name: 'Holidays', zh: '假日',
        words: ['holiday', 'festival2', 'mooncake', 'picnic', 'camping', 'plan2', 'firework', 'lantern'],
        sentences: ['What are you going to do for the holiday?|假期你打算做什么？', 'We are going to have a picnic.|我们打算去野餐。', 'We eat mooncakes at Mid-Autumn Festival.|中秋节我们吃月饼。'],
        dialogue: [
          ['Amy', 'What are you going to do for the holiday?', '假期你打算做什么？'],
          ['Ben', 'We are going camping.', '我们打算去露营。'],
          ['Amy', 'Sounds fun! We are going to have a picnic.', '听起来很有趣！我们打算去野餐。'],
          ['Ben', 'We will eat mooncakes at Mid-Autumn Festival.', '中秋节我们会吃月饼。'],
          ['Amy', 'I love the lanterns, too.', '我也喜欢灯笼。'],
          ['Ben', 'Let us make plans together.', '我们一起做个计划吧。']
        ],
        grammar: {
          title: 'What are you going to do?',
          note: '问将来的打算，用 be going to 提问，回答也用 be going to。',
          examples: ['What are you going to do? I am going to swim.|你打算做什么？我打算去游泳。'],
          quiz: [{ q: 'What ___ you going to do?', opts: ['are', 'do', 'is'], a: 'are' }]
        }
      }
    ]
  },
  // ==================== 五年级下册 ====================
  {
    grade: 5, term: 2, title: '五年级下册', color: '#64B5F6', level: '提高',
    modules: [
      {
        name: 'Seasons', zh: '季节',
        words: ['spring2', 'summer2', 'autumn', 'winter2', 'season2', 'snow3', 'leaf', 'weather2'],
        sentences: ['Which season do you like best? Spring.|你最喜欢哪个季节？春天。', 'It is cool and the leaves fall in autumn.|秋天很凉爽，叶子会落下。', 'It never snows in Guangzhou.|广州从不下雪。'],
        dialogue: [
          ['Ben', 'Which season do you like best?', '你最喜欢哪个季节？'],
          ['Amy', 'I like spring best. The flowers are beautiful.', '我最喜欢春天。花很美。'],
          ['Ben', 'I like winter. But it never snows in Guangzhou.', '我喜欢冬天。但广州从不下雪。'],
          ['Amy', 'Summer is too hot here.', '这里夏天太热了。'],
          ['Ben', 'Autumn is cool. The leaves turn yellow.', '秋天很凉爽，树叶变黄。'],
          ['Amy', 'Yes, autumn is a nice season too.', '是的，秋天也不错。']
        ],
        grammar: {
          title: 'Which ... do you like best?',
          note: 'Which ... like best? 询问最喜欢哪一个。',
          examples: ['Which colour do you like best? Blue.|你最喜欢哪个颜色？蓝色。'],
          quiz: [{ q: 'Which season ___ you like best?', opts: ['do', 'are', 'does'], a: 'do' }]
        }
      },
      {
        name: 'Plans', zh: '将来计划',
        words: ['tomorrow', 'next2', 'plan2', 'prepare2', 'arrive', 'start3', 'will', 'soon2'],
        sentences: ['What are you going to do tomorrow?|你明天打算做什么？', 'I am going to see a film.|我打算去看电影。', 'We are going to practise English next week.|下周我们打算练习英语。'],
        dialogue: [
          ['Tom', 'What are you going to do tomorrow?', '你明天打算做什么？'],
          ['Amy', 'I am going to see a film with my family.', '我打算和家人看电影。'],
          ['Tom', 'When does it start?', '电影什么时候开始？'],
          ['Amy', 'It starts at three. We will arrive early.', '三点开始。我们会早点到。'],
          ['Tom', 'Good. I will practise English tomorrow.', '好的。我明天要练英语。'],
          ['Amy', 'We can practise together next week.', '下周我们可以一起练。']
        ],
        grammar: {
          title: 'will + 动词原形',
          note: 'will 表示将来会发生的事，后面接动词原形。',
          examples: ['I will visit my grandma tomorrow.|我明天会去看奶奶。'],
          quiz: [{ q: 'I ___ come back soon.', opts: ['will', 'am', 'do'], a: 'will' }]
        }
      },
      {
        name: 'Invitations', zh: '邀请',
        words: ['invite2', 'would', 'come2', 'join', 'sure', 'sorry2', 'busy', 'free'],
        sentences: ['Would you like to come to my party?|你愿意来我的派对吗？', 'Sure, I would love to.|当然，我很愿意。', 'Sorry, I am busy that day.|抱歉，那天我很忙。'],
        dialogue: [
          ['Amy', 'Would you like to come to my party on Saturday?', '你愿意来参加我星期六的派对吗？'],
          ['Ben', 'Sure, I would love to.', '当然，我很乐意。'],
          ['Amy', 'Can you join us, Janet?', '珍妮特，你能来吗？'],
          ['Janet', 'Sorry, I am busy that day.', '抱歉，那天我很忙。'],
          ['Amy', 'Are you free on Sunday?', '你星期天有空吗？'],
          ['Janet', 'Yes! I will come then.', '有空！那我那时候来。']
        ],
        grammar: {
          title: 'Would you like to ...? 邀请',
          note: '接受：Sure, I\'d love to. 拒绝：Sorry, I\'m busy. / I\'d love to, but ...',
          examples: ['Would you like to join us? Sorry, I am busy.|你愿意加入我们吗？抱歉，我很忙。'],
          quiz: [{ q: 'Would you like to come? ___', opts: ['Sure, I\'d love to.', 'Yes, I am.', 'No, I don\'t.'], a: 'Sure, I\'d love to.' }]
        }
      },
      {
        name: 'Travel', zh: '旅行经历',
        words: ['trip2', 'visit2', 'photo2', 'travel2', 'city2', 'capital', 'famous', 'ticket3'],
        sentences: ['I went to Beijing last summer.|去年夏天我去了北京。', 'We visited the Great Wall.|我们参观了长城。', 'I took many photos there.|我在那里拍了许多照片。'],
        dialogue: [
          ['Ben', 'Where did you go last summer?', '去年夏天你去了哪里？'],
          ['Amy', 'I went to Beijing with my parents.', '我和父母去了北京。'],
          ['Ben', 'Did you visit the Great Wall?', '你们参观长城了吗？'],
          ['Amy', 'Yes! I took many photos there.', '去了！我在那里拍了很多照片。'],
          ['Ben', 'Beijing is the capital of China.', '北京是中国的首都。'],
          ['Amy', 'Yes. It is a famous city.', '是的。它是一座著名的城市。']
        ],
        grammar: {
          title: '一般过去时（规则动词）',
          note: '描述过去的事，动词用过去式：visit → visited，trip 用 have a trip。',
          examples: ['I visited my aunt yesterday.|我昨天去看望了阿姨。'],
          quiz: [{ q: 'We ___ the museum last week.', opts: ['visited', 'visit', 'visiting'], a: 'visited' }]
        }
      },
      {
        name: 'Safety', zh: '安全',
        words: ['careful2', 'dangerous2', 'cross', 'road', 'traffic2', 'stop', 'sign', 'rule'],
        sentences: ['Be careful! The light is red.|小心！红灯了。', 'We must wait for the green light.|我们必须等绿灯。', 'Do not play on the road.|不要在路上玩。'],
        dialogue: [
          ['Dad', 'Stop! The traffic light is red.', '停！红灯了。'],
          ['Ben', 'Why must we stop?', '为什么我们必须停？'],
          ['Dad', 'It is dangerous to cross now.', '现在过马路很危险。'],
          ['Ben', 'Look! The light is green now.', '看！现在是绿灯了。'],
          ['Dad', 'Yes. Look left and right first.', '是的。先左右看看。'],
          ['Ben', 'I will follow the traffic rules.', '我会遵守交通规则。']
        ],
        grammar: {
          title: 'must 表示必须',
          note: 'must 后面接动词原形，表示「必须」。',
          examples: ['We must wait.|我们必须等待。'],
          quiz: [{ q: 'We ___ follow the rules.', opts: ['must', 'are', 'do'], a: 'must' }]
        }
      },
      {
        name: 'Directions', zh: '问路与方向',
        words: ['turn2', 'straight2', 'near2', 'between2', 'bank', 'hospital', 'left', 'right2'],
        sentences: ['Excuse me, where is the hospital?|打扰一下，医院在哪里？', 'Go straight and turn left.|直走然后左转。', 'It is next to the bank.|它在银行旁边。'],
        dialogue: [
          ['Ben', 'Excuse me, where is the hospital?', '打扰一下，医院在哪里？'],
          ['Woman', 'Go straight and turn left at the bank.', '直走，在银行处左转。'],
          ['Ben', 'Is it far?', '远吗？'],
          ['Woman', 'No, it is near. It is between the bank and the park.', '不远，很近。在银行和公园之间。'],
          ['Ben', 'Thank you very much.', '非常感谢。'],
          ['Woman', 'You are welcome.', '不客气。']
        ],
        grammar: {
          title: 'Turn left / right',
          note: '指路常用 Go straight. Turn left/right. It is next to ...',
          examples: ['Turn right at the corner.|在拐角处右转。'],
          quiz: [{ q: 'Go ___, then turn left.', opts: ['straight', 'straightly', 'straights'], a: 'straight' }]
        }
      }
    ]
  },
  // ==================== 六年级上册 ====================
  {
    grade: 6, term: 1, title: '六年级上册', color: '#9575CD', level: '提高',
    modules: [
      {
        name: 'Country Life', zh: '城乡生活',
        words: ['countryside', 'city3', 'village2', 'field', 'fresh', 'quiet', 'noisy', 'air'],
        sentences: ['Life in the countryside is quiet.|乡村生活很安静。', 'The air is fresh and clean.|空气新鲜又干净。', 'The city is more noisy than the village.|城市比村庄更嘈杂。'],
        dialogue: [
          ['Ben', 'Where are you going this weekend?', '这个周末你去哪里？'],
          ['Amy', 'To my grandpa\'s village in the countryside.', '去乡下爷爷的村子。'],
          ['Ben', 'What is it like?', '那里什么样？'],
          ['Amy', 'It is quiet and the air is fresh.', '很安静，空气很新鲜。'],
          ['Ben', 'Is it different from the city?', '和城市不一样吗？'],
          ['Amy', 'Yes. The city is busy and noisy.', '是的。城市忙碌又嘈杂。']
        ],
        grammar: {
          title: '比较级（一）',
          note: '形容词比较级常用 -er：warmer、quieter，比较用 than。',
          examples: ['The city is busier than the village.|城市比乡村更忙碌。'],
          quiz: [{ q: 'The air here is ___ than in the city.', opts: ['fresher', 'fresh', 'freshest'], a: 'fresher' }]
        }
      },
      {
        name: 'Animals', zh: '野生动物',
        words: ['animal2', 'elephant', 'giraffe', 'tiger2', 'dangerous3', 'wild2', 'protect', 'forest'],
        sentences: ['The elephant is bigger than the tiger.|大象比老虎大。', 'Giraffes have long necks.|长颈鹿有长脖子。', 'We should protect wild animals.|我们应该保护野生动物。'],
        dialogue: [
          ['Amy', 'Look at the giraffes! They have long necks.', '看那些长颈鹿！它们的脖子很长。'],
          ['Ben', 'The elephant is bigger than the tiger.', '大象比老虎大。'],
          ['Amy', 'Are tigers dangerous?', '老虎危险吗？'],
          ['Ben', 'Yes. We must be careful.', '是的，我们必须小心。'],
          ['Amy', 'Wild animals need a home in the forest.', '野生动物需要森林里的家。'],
          ['Ben', 'We should protect them.', '我们应该保护它们。']
        ],
        grammar: {
          title: '比较级（二）：特殊变化',
          note: 'big → bigger（双写末尾辅音），good → better，many → more。',
          examples: ['The elephant is bigger than the tiger.|大象比老虎大。'],
          quiz: [{ q: 'The elephant is ___ than the dog.', opts: ['bigger', 'big', 'biggest'], a: 'bigger' }]
        }
      },
      {
        name: 'Famous People', zh: '名人故事',
        words: ['famous', 'scientist', 'writer', 'inventor', 'invent', 'discover2', 'hero', 'brave'],
        sentences: ['Who was Edison? He was a great inventor.|爱迪生是谁？他是一位伟大的发明家。', 'Lu Xun was a famous writer.|鲁迅是一位著名作家。', 'She became a scientist when she grew up.|她长大后成为了科学家。'],
        dialogue: [
          ['Miss Li', 'Who is this famous man?', '这位著名的人物是谁？'],
          ['Ben', 'He is Edison. He was a great inventor.', '他是爱迪生。他是一位伟大的发明家。'],
          ['Miss Li', 'What did he invent?', '他发明了什么？'],
          ['Ben', 'He invented the light bulb.', '他发明了电灯。'],
          ['Miss Li', 'Who is a hero in your heart?', '你心中的英雄是谁？'],
          ['Ben', 'Lu Xun. He was a brave writer.', '鲁迅。他是一位勇敢的作家。']
        ],
        grammar: {
          title: '一般过去时（不规则动词）',
          note: 'is → was, become → became, invent → invented, write → wrote。',
          examples: ['Edison was an inventor. He invented the light bulb.|爱迪生是发明家，他发明了电灯。'],
          quiz: [{ q: 'Lu Xun ___ a famous writer.', opts: ['was', 'is', 'were'], a: 'was' }]
        }
      },
      {
        name: 'Past Experiences', zh: '过去的经历',
        words: ['yesterday', 'ago', 'went', 'saw', 'ate', 'had', 'told', 'last'],
        sentences: ['What did you do yesterday?|你昨天做了什么？', 'I went to the park and saw many flowers.|我去了公园，看到了许多花。', 'We had a great time last weekend.|上周末我们玩得很开心。'],
        dialogue: [
          ['Amy', 'What did you do yesterday?', '你昨天做了什么？'],
          ['Ben', 'I went to the museum with my family.', '我和家人去了博物馆。'],
          ['Amy', 'What did you see?', '你们看到了什么？'],
          ['Ben', 'We saw many old things. Then we had lunch.', '我们看到很多古老的东西，然后吃了午饭。'],
          ['Amy', 'Did you buy anything?', '你们买了什么吗？'],
          ['Ben', 'Yes, I bought a book. I told Mum about the trip.', '是的，我买了一本书。我给妈妈讲了这次旅行。']
        ],
        grammar: {
          title: '一般过去时的疑问句',
          note: 'Did you ...? 用助动词 did 提问，动词还原为原形。',
          examples: ['Did you go to the park? Yes, I did.|你去公园了吗？是的。'],
          quiz: [{ q: '___ you see the film yesterday?', opts: ['Did', 'Do', 'Are'], a: 'Did' }]
        }
      },
      {
        name: 'Changes', zh: '今昔变化',
        words: ['change2', 'before', 'now', 'different2', 'same', 'past3', 'grow', 'tall2'],
        sentences: ['I was short before, but now I am tall.|我以前很矮，但现在很高。', 'Guangzhou has changed a lot.|广州变化很大。', 'There were no tall buildings then.|那时没有高楼。'],
        dialogue: [
          ['Grandpa', 'Look at this old photo of Guangzhou.', '看这张广州的老照片。'],
          ['Ben', 'There were no tall buildings then.', '那时没有高楼。'],
          ['Grandpa', 'Yes. Things are different now.', '是的。现在不一样了。'],
          ['Ben', 'The city has changed a lot.', '城市变化很大。'],
          ['Grandpa', 'You have changed too. You grew taller.', '你也变了，长高了。'],
          ['Ben', 'But my love for Guangzhou is the same!', '但我对广州的爱是一样的！']
        ],
        grammar: {
          title: 'was / were 与一般过去时',
          note: '过去存在用 There was / There were。now 与 past、before 常用于对比。',
          examples: ['There was a small school before.|以前有一所小学校。'],
          quiz: [{ q: 'There ___ no tall buildings then.', opts: ['were', 'are', 'is'], a: 'were' }]
        }
      },
      {
        name: 'Festivals', zh: '传统节日',
        words: ['festival2', 'mooncake', 'lantern', 'dragon', 'celebrate2', 'firework', 'special', 'fortune'],
        sentences: ['How do you celebrate Dragon Boat Festival?|你们怎样庆祝端午节？', 'We eat rice dumplings and watch dragon boat races.|我们吃粽子，看龙舟赛。', 'Halloween is on October 31st.|万圣节在十月三十一日。'],
        dialogue: [
          ['Ben', 'How do you celebrate the Dragon Boat Festival?', '你们怎么庆祝端午节？'],
          ['Amy', 'We eat rice dumplings and watch dragon boat races.', '我们吃粽子，看龙舟赛。'],
          ['Ben', 'I love the lanterns at Mid-Autumn Festival.', '我喜欢中秋节的灯笼。'],
          ['Amy', 'We eat mooncakes and watch fireworks.', '我们吃月饼、看烟花。'],
          ['Ben', 'Every festival is special.', '每个节日都很特别。'],
          ['Amy', 'Yes. They bring good fortune and joy.', '是的，它们带来好运和欢乐。']
        ],
        grammar: {
          title: 'How do you celebrate ...?',
          note: '询问庆祝方式：How do you celebrate + 节日？回答 We + 动词。',
          examples: ['How do you celebrate the Spring Festival?|你们怎么庆祝春节？'],
          quiz: [{ q: 'How do you ___ your birthday?', opts: ['celebrate', 'celebrates', 'celebrating'], a: 'celebrate' }]
        }
      }
    ]
  },
  // ==================== 六年级下册 ====================
  {
    grade: 6, term: 2, title: '六年级下册', color: '#9575CD', level: '提高',
    modules: [
      {
        name: 'Stories', zh: '故事',
        words: ['story2', 'once2', 'queen2', 'prince', 'princess', 'magic2', 'palace2', 'end'],
        sentences: ['Once upon a time, there was a king.|从前，有一位国王。', 'The princess lived in a big castle.|公主住在一座大城堡里。', 'In the end, they lived happily.|最后，他们幸福地生活着。'],
        dialogue: [
          ['Ben', 'Let me tell you a story.', '我给你讲个故事。'],
          ['Amy', 'Once upon a time?', '从前？'],
          ['Ben', 'Yes. There was a princess in a big palace.', '对。从前有一位公主住在大宫殿里。'],
          ['Amy', 'Was there a prince?', '有王子吗？'],
          ['Ben', 'Yes. The prince and the princess became friends.', '有。王子和公主成了朋友。'],
          ['Amy', 'In the end?', '最后呢？'],
          ['Ben', 'In the end, they lived happily.', '最后，他们幸福地生活着。']
        ],
        grammar: {
          title: 'Once upon a time 讲故事',
          note: '讲故事常用 Once upon a time 开头，用一般过去时叙述。',
          examples: ['Once upon a time, there was a queen.|从前有一位王后。'],
          quiz: [{ q: 'Once upon a time, there ___ a king.', opts: ['was', 'is', 'are'], a: 'was' }]
        }
      },
      {
        name: 'Nature', zh: '保护环境',
        words: ['nature2', 'environment', 'earth2', 'pollution2', 'rubbish2', 'recycle2', 'save3', 'energy'],
        sentences: ['We should save water and energy.|我们应该节约水和能源。', 'Do not throw rubbish on the ground.|不要把垃圾扔在地上。', 'Let us plant more trees.|我们多种些树吧。'],
        dialogue: [
          ['Ben', 'The environment is getting worse.', '环境越来越差了。'],
          ['Amy', 'Yes. We should protect the earth.', '是的。我们应该保护地球。'],
          ['Ben', 'What can we do?', '我们能做什么？'],
          ['Amy', 'We can recycle paper and bottles.', '我们可以回收纸张和瓶子。'],
          ['Ben', 'And we should save water and energy.', '还要节约水和能源。'],
          ['Amy', 'Let us plant more trees this spring.', '这个春天我们多种些树吧。']
        ],
        grammar: {
          title: 'should 提建议',
          note: 'We should + 动词原形 表示「应该做某事」。',
          examples: ['We should protect the environment.|我们应该保护环境。'],
          quiz: [{ q: 'We ___ protect the earth.', opts: ['should', 'are', 'do'], a: 'should' }]
        }
      },
      {
        name: 'Jobs and Dreams', zh: '职业与梦想',
        words: ['dream2', 'pilot2', 'astronaut', 'scientist', 'reporter', 'future2', 'wish', 'university'],
        sentences: ['What do you want to be in the future?|你将来想做什么？', 'I want to be an astronaut.|我想成为一名宇航员。', 'I hope my dream will come true.|我希望我的梦想能实现。'],
        dialogue: [
          ['Miss Li', 'What do you want to be in the future, Ben?', '本，你将来想做什么？'],
          ['Ben', 'I want to be an astronaut.', '我想成为一名宇航员。'],
          ['Miss Li', 'Why?', '为什么？'],
          ['Ben', 'I want to travel in space.', '我想去太空旅行。'],
          ['Miss Li', 'What about you, Amy?', '艾米，你呢？'],
          ['Amy', 'I want to be a scientist and work for the earth.', '我想成为科学家，为地球工作。']
        ],
        grammar: {
          title: 'want to be 表达梦想',
          note: 'want to be + 职业，表示「想成为……」。',
          examples: ['She wants to be a pilot.|她想成为飞行员。'],
          quiz: [{ q: 'I want to ___ a doctor.', opts: ['be', 'am', 'is'], a: 'be' }]
        }
      },
      {
        name: 'Past Experiences', zh: '难忘经历',
        words: ['trip2', 'wonderful4', 'learnt', 'enjoy2', 'bought', 'took', 'won', 'lost2'],
        sentences: ['Where did you go last holiday?|上个假期你去了哪里？', 'I visited Hong Kong and bought some gifts.|我去了香港，买了一些礼物。', 'It was a wonderful trip.|那是一次精彩的旅行。'],
        dialogue: [
          ['Amy', 'Where did you go last holiday?', '上个假期你去了哪里？'],
          ['Ben', 'I went to Hong Kong with my family.', '我和家人去了香港。'],
          ['Amy', 'What did you do there?', '你们在那里做了什么？'],
          ['Ben', 'I visited some places and bought gifts.', '我参观了一些地方，还买了礼物。'],
          ['Amy', 'Did you enjoy the trip?', '你喜欢这次旅行吗？'],
          ['Ben', 'Yes, it was wonderful. We took many photos.', '是的，太棒了。我们拍了很多照片。']
        ],
        grammar: {
          title: '不规则动词过去式',
          note: 'buy → bought, take → took, learn → learnt, win → won, lose → lost, enjoy → enjoyed。',
          examples: ['I took photos. He bought a gift.|我拍了照片。他买了礼物。'],
          quiz: [{ q: 'I ___ a lot from the trip.', opts: ['learnt', 'learn', 'learns'], a: 'learnt' }]
        }
      },
      {
        name: 'Keeping Healthy', zh: '保持健康',
        words: ['healthy2', 'exercise', 'vegetable2', 'sleep4', 'early3', 'habit', 'unhealthy', 'less'],
        sentences: ['We should exercise every day.|我们应该每天锻炼。', 'Eat less junk food.|少吃垃圾食品。', 'Going to bed early is a good habit.|早睡是一个好习惯。'],
        dialogue: [
          ['Doctor', 'You look tired, Ben. What is wrong?', '本，你看起来很累。怎么了？'],
          ['Ben', 'I sleep late. I do not like vegetables.', '我睡得很晚。我不喜欢蔬菜。'],
          ['Doctor', 'You should exercise every day and eat more vegetables.', '你应该每天锻炼，多吃蔬菜。'],
          ['Ben', 'Is junk food bad for me?', '垃圾食品对我有害吗？'],
          ['Doctor', 'Yes. Eat less junk food and sleep early.', '是的。少吃垃圾食品，早点睡。'],
          ['Ben', 'I will keep a good habit. Thank you, Doctor.', '我会养成好习惯。谢谢医生。']
        ],
        grammar: {
          title: '动名词作主语',
          note: 'Going to bed early 是动名词短语，作主语时谓语用单数 is。',
          examples: ['Doing exercise is good.|做运动有好处。'],
          quiz: [{ q: '___ to bed early is a good habit.', opts: ['Going', 'Go', 'Goes'], a: 'Going' }]
        }
      },
      {
        name: 'Graduation', zh: '毕业',
        words: ['graduate', 'miss3', 'memory2', 'proud2', 'together3', 'remember4', 'future2', 'grade'],
        sentences: ['We will graduate from primary school soon.|我们很快就要从小学毕业了。', 'I will miss my teachers and friends.|我会想念我的老师和朋友。', 'Let us keep in touch forever.|让我们永远保持联系。'],
        dialogue: [
          ['Miss Li', 'You will graduate from primary school soon.', '你们很快就要小学毕业了。'],
          ['Ben', 'I will miss you and all my friends.', '我会想念您和所有朋友。'],
          ['Miss Li', 'I am proud of all of you.', '我为你们所有人感到自豪。'],
          ['Amy', 'These six years are great memories.', '这六年是美好的回忆。'],
          ['Ben', 'Let us remember every happy day together.', '让我们记住一起度过的每个快乐日子。'],
          ['Miss Li', 'Keep in touch after you leave. Good luck!', '离开后保持联系。祝你们好运！']
        ],
        grammar: {
          title: '一般将来时复习',
          note: '表达将来用 will + 动词原形，或 be going to + 动词原形。',
          examples: ['We will graduate soon. We are going to have a party.|我们很快毕业。我们要办个聚会。'],
          quiz: [{ q: 'I ___ miss my friends.', opts: ['will', 'am', 'do'], a: 'will' }]
        }
      }
    ]
  }
];
