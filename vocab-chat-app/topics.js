const entries = (lines) =>
  lines.map((line) => {
    const [term, meaning, example] = line.split("|");
    return { term, meaning, example };
  });

const topic = (group, id, title, cn, vibe, words) => ({
  group,
  id,
  title,
  cn,
  vibe,
  words: entries(words),
});

const sharedVocabulary = {
  daily: entries([
    "catch up|聊聊近况|We need to catch up properly soon.",
    "lately|最近|Lately, I have been tired for no reason.",
    "to be honest|说实话|To be honest, I would stay home tonight.",
    "relatable|很有共鸣的|That is painfully relatable.",
    "low-key|有点、暗暗地|I am low-key excited about it.",
    "fair enough|有道理、可以理解|Fair enough, I would feel the same.",
    "out of nowhere|毫无预兆地|He texted me out of nowhere.",
    "no big deal|没什么大不了|It is no big deal, do not stress.",
    "vibe|感觉、氛围|The cafe has such a calm vibe.",
  ]),
  relationships: entries([
    "have a crush|喜欢上某人|I think I have a crush on him.",
    "make a move|主动出击|Maybe one of you should make a move.",
    "mixed signals|忽冷忽热的信号|He is giving me mixed signals.",
    "emotionally available|情感上愿意投入的|I want someone emotionally available.",
    "reassurance|安慰和确定感|Sometimes I just need a little reassurance.",
    "compatible|合得来的|You can like someone without being compatible.",
    "standards|择偶标准|Having standards is a good thing.",
    "communicate|沟通|You need to communicate instead of guessing.",
    "mutual|双方都有的|The attraction seems mutual.",
  ]),
  pop: entries([
    "obsessed|非常喜欢、上头|I am obsessed with that song.",
    "underrated|被低估的|That album is so underrated.",
    "overhyped|被吹得太过的|I liked it, but it was a little overhyped.",
    "release|发布的新作品|Did you hear the new release?",
    "fanbase|粉丝群体|Her fanbase is huge and loyal.",
    "catchy|朗朗上口的|The chorus is so catchy.",
    "performance|表演、舞台|That performance was unreal.",
    "recommend|推荐|Can you recommend something similar?",
    "spoiler|剧透|Please do not give me any spoilers.",
  ]),
  style: entries([
    "flattering|显身材/显气色的|That colour is really flattering on you.",
    "versatile|百搭的|A black jacket is so versatile.",
    "affordable|价格能接受的|I want something cute but affordable.",
    "splurge|花大钱买喜欢的东西|I might splurge on a good bag.",
    "dupe|平替|I found a dupe for that expensive lip gloss.",
    "put-together|打扮得很精致的|She always looks so put-together.",
    "suit someone|适合某人|That haircut really suits you.",
    "practical|实用的|It is cute, but is it practical?",
    "aesthetic|审美风格、氛围|Her whole room has a soft aesthetic.",
  ]),
  identity: entries([
    "self-aware|有自我觉察的|He is very self-aware for his age.",
    "stereotype|刻板印象|That is such a tired stereotype.",
    "identify with|认同、有共鸣|I really identify with that feeling.",
    "authentic|真实自然的|She feels authentic online.",
    "open-minded|思想开放的|I want friends who are open-minded.",
    "assumption|想当然的判断|Do not make assumptions about people.",
    "supportive|支持、包容的|My friends have been really supportive.",
    "comfortable with|对...感到自在|I am getting more comfortable with myself.",
    "personal|私人的、因人而异的|That choice is very personal.",
  ]),
  campus: entries([
    "workload|学习/工作量|My workload is heavy this week.",
    "manageable|能应付的|It looks manageable if I start today.",
    "stay on top of|跟上、不落下|I am trying to stay on top of my lectures.",
    "contribute|贡献、参与|Everyone needs to contribute to the project.",
    "feedback|反馈|The tutor gave useful feedback.",
    "priority|优先事项|Sleep needs to be a priority too.",
    "realistic|现实可行的|Let us make a realistic plan.",
    "figure out|弄清楚、想办法|I will figure it out step by step.",
    "worthwhile|值得花时间的|The extra practice is worthwhile.",
  ]),
  lifestyle: entries([
    "routine|日常规律|My routine is all over the place.",
    "convenient|方便的|It is convenient but a bit expensive.",
    "decent|不错、够好的|I found a decent place near campus.",
    "worth it|值得|It was expensive, but worth it.",
    "cut back on|减少|I am trying to cut back on takeout.",
    "make time for|腾时间做|I need to make time for exercise.",
    "go-to|首选、常用的|What is your go-to coffee order?",
    "treat yourself|犒劳自己|You should treat yourself after that exam.",
    "on a budget|预算有限|I am travelling on a budget.",
  ]),
};

export const topicGroups = [
  {
    id: "daily",
    label: "Everyday chat",
    topics: [
      topic("daily", "small-talk", "Small talk", "日常破冰", "easy chats when you do not know where to begin", [
        "icebreaker|破冰话题|That question is a good icebreaker.",
        "awkward silence|尴尬的沉默|I hate awkward silence on a first meet-up.",
        "chatty|健谈的|I get chatty once I feel comfortable.",
      ]),
      topic("daily", "weekend", "Weekend plans", "周末怎么过", "plans, rest, and last-minute invitations", [
        "unwind|放松下来|I just want to unwind this weekend.",
        "spontaneous|随性的|I am feeling spontaneous today.",
        "stay in|待在家里|I might stay in and watch a movie.",
      ]),
      topic("daily", "weather", "Weather and seasons", "天气和季节", "light conversation that does not feel dry", [
        "humid|闷热潮湿的|It is so humid today.",
        "breezy|有微风的|It is breezy enough for a walk.",
        "gloomy|阴沉的|The weather has been gloomy all week.",
      ]),
      topic("daily", "sleep", "Sleep and late nights", "睡眠和熬夜", "sleep schedules, tiredness, and bedtime scrolling", [
        "sleep-deprived|缺觉的|I am so sleep-deprived this week.",
        "fall asleep|入睡|I could not fall asleep until 2 a.m.",
        "night owl|夜猫子|I am a night owl, unfortunately.",
      ]),
      topic("daily", "routine", "Daily routine", "日常生活", "busy days, scrolling, and getting things done", [
        "run errands|办琐事|I spent all morning running errands.",
        "productive|高效的|I had a surprisingly productive day.",
        "wind down|慢慢放松|I need time to wind down after class.",
      ]),
      topic("daily", "embarrassing", "Embarrassing moments", "社死瞬间", "funny stories without sounding too serious", [
        "cringe|尴尬到脚趾抠地|That memory still makes me cringe.",
        "mortified|尴尬到不行的|I was absolutely mortified.",
        "laugh it off|一笑而过|You have to laugh it off sometimes.",
      ]),
      topic("daily", "hot-takes", "Hot takes", "有争议的观点", "opinions, debates, and friendly disagreement", [
        "unpopular opinion|不太受欢迎的观点|Unpopular opinion: brunch is overrated.",
        "controversial|有争议的|That is a controversial take.",
        "agree to disagree|保留不同意见|We can agree to disagree.",
      ]),
      topic("daily", "nostalgia", "Nostalgia", "怀旧和童年", "old songs, childhood memories, and throwbacks", [
        "throwback|怀旧的东西|This song is such a throwback.",
        "core memory|重要回忆|That trip is a core memory for me.",
        "remind someone of|让某人想起|That smell reminds me of home.",
      ]),
    ],
  },
  {
    id: "relationships",
    label: "Relationships and friends",
    topics: [
      topic("relationships", "crushes", "Crushes", "喜欢的人", "cute updates, attraction, and overthinking", [
        "butterflies|心动紧张感|I get butterflies when he smiles at me.",
        "flirt|调情、暧昧|Was he flirting or just being friendly?",
        "shoot your shot|勇敢追一次|You should shoot your shot.",
      ]),
      topic("relationships", "dating", "Dating", "约会", "first dates, chemistry, and first impressions", [
        "first impression|第一印象|He made a great first impression.",
        "ask someone out|约某人出去|He finally asked her out.",
        "click|很合拍|We clicked right away.",
      ]),
      topic("relationships", "situationship", "Situationships", "暧昧关系", "undefined relationships and confusing feelings", [
        "undefined|没有定义的|This is so undefined and confusing.",
        "commitment|承诺、确定关系|He seems scared of commitment.",
        "keep options open|保留选择|I think he is keeping his options open.",
      ]),
      topic("relationships", "texting", "Texting styles", "聊天和回消息", "reply times, dry texts, and reading too much into messages", [
        "leave on read|已读不回|He left me on read for six hours.",
        "double-text|连发两条消息|Do not double-text if it makes you anxious.",
        "dry texter|聊天很干的人|He is a dry texter, but nice in person.",
      ]),
      topic("relationships", "red-flags", "Red and green flags", "红旗绿旗", "standards, warning signs, and healthy behaviour", [
        "deal breaker|绝对不能接受的点|Bad communication is a deal breaker for me.",
        "love bombing|过度热情轰炸|Love bombing can feel intense at first.",
        "consistent|稳定可靠的|Consistency is such a green flag.",
      ]),
      topic("relationships", "breakups", "Breakups and exes", "分手和前任", "moving on without making it too heavy", [
        "get over someone|放下某人|It takes time to get over someone.",
        "closure|给自己一个结束|I do not think I need closure anymore.",
        "rebound|分手后的过渡关系|A rebound rarely fixes the real feelings.",
      ]),
      topic("relationships", "friendship", "Close friendships", "好朋友", "trust, support, and keeping friendships strong", [
        "trustworthy|值得信任的|She is one of the most trustworthy people I know.",
        "drift apart|渐渐疏远|We did not fight; we just drifted apart.",
        "dependable|靠得住的|He is quiet but dependable.",
      ]),
      topic("relationships", "friend-drama", "Friend drama", "朋友间的抓马", "gossip, tension, and clearing the air", [
        "gossip|八卦、议论别人|I do not want to turn this into gossip.",
        "passive-aggressive|阴阳怪气的|That message felt passive-aggressive.",
        "clear the air|把话说开|We should clear the air soon.",
      ]),
      topic("relationships", "making-friends", "Making new friends", "交新朋友", "meeting people at uni and feeling less awkward", [
        "introduce yourself|介绍自己|Just introduce yourself and ask a simple question.",
        "mutual friend|共同朋友|We met through a mutual friend.",
        "hit it off|一见如故、很合拍|We really hit it off.",
      ]),
      topic("relationships", "boundaries", "Boundaries", "边界感", "saying no, people-pleasing, and protecting your energy", [
        "people-pleaser|讨好型的人|I am trying not to be a people-pleaser.",
        "compromise|互相让步|Compromise should go both ways.",
        "emotional space|情绪空间|I need a bit of emotional space today.",
      ]),
    ],
  },
  {
    id: "pop",
    label: "Pop culture",
    topics: [
      topic("pop", "celebrity", "Celebrity crushes", "明星和颜值", "celebrity talk, looks, and public image", [
        "celebrity crush|明星喜欢的人|He has been my celebrity crush for years.",
        "public image|公众形象|Her public image feels very polished.",
        "iconic|经典、很有代表性的|That look is iconic.",
      ]),
      topic("pop", "fandom", "Fandom culture", "追星和粉圈", "fan theories, communities, and being a little too invested", [
        "stan|很喜欢并支持某位艺人|I have stanned her since high school.",
        "bias|团里最喜欢的人|Who is your bias in the group?",
        "fan theory|粉丝理论|That fan theory is actually convincing.",
      ]),
      topic("pop", "k-pop", "K-pop", "韩流和偶像", "comebacks, music videos, and performance talk", [
        "comeback|回归新作品|Their comeback is next week.",
        "choreography|编舞|The choreography looks difficult.",
        "teaser|预告片段|The teaser looks expensive.",
      ]),
      topic("pop", "concerts", "Concerts", "演唱会", "tickets, live shows, and post-concert feelings", [
        "venue|演出场地|The venue is close to the station.",
        "setlist|演唱曲目单|I hope this song is on the setlist.",
        "sold out|售罄的|Tickets sold out in minutes.",
      ]),
      topic("pop", "music", "Music taste", "音乐品味", "playlists, lyrics, and songs for every mood", [
        "playlist|歌单|Send me your current playlist.",
        "genre|音乐类型|What genre do you listen to most?",
        "put on repeat|单曲循环|I have had it on repeat all day.",
      ]),
      topic("pop", "movies-tv", "Movies and TV", "电影和电视剧", "shows worth binging and characters worth discussing", [
        "plot|剧情|The plot gets better after episode three.",
        "character arc|角色成长线|Her character arc was amazing.",
        "cliffhanger|悬念结尾|That ending was such a cliffhanger.",
      ]),
      topic("pop", "reality-tv", "Reality TV", "真人秀", "plot twists, guilty pleasures, and late-night watching", [
        "plot twist|反转|I did not see that plot twist coming.",
        "eliminated|被淘汰|I cannot believe she got eliminated.",
        "guilty pleasure|明知一般但爱看的东西|It is my guilty pleasure show.",
      ]),
      topic("pop", "gaming", "Gaming", "游戏", "co-op games, frustrating levels, and game stories", [
        "co-op|合作模式|We should play a co-op game sometime.",
        "grind|反复刷资源升级|I had to grind for hours.",
        "rage quit|气到退出游戏|I almost rage quit.",
      ]),
      topic("pop", "social-media", "Social media", "社交媒体", "posting, feeds, stories, and online habits", [
        "algorithm|推荐算法|My algorithm knows me too well.",
        "scrolling|刷内容|I lost an hour to scrolling again.",
        "go viral|爆火|That video went viral overnight.",
      ]),
    ],
  },
  {
    id: "style",
    label: "Style, beauty, and shopping",
    topics: [
      topic("style", "shopping", "Shopping", "逛街买东西", "trying things on, prices, and whether it is worth buying", [
        "try on|试穿|Can I try this on?",
        "impulse buy|冲动消费|It was such an impulse buy.",
        "on sale|打折的|I only bought it because it was on sale.",
      ]),
      topic("style", "online-shopping", "Online shopping", "网购", "reviews, delivery, and avoiding bad purchases", [
        "add to cart|加入购物车|I added it to my cart and forgot about it.",
        "review|评价|The reviews look promising.",
        "return policy|退货政策|Check the return policy first.",
      ]),
      topic("style", "fashion", "Fashion and outfits", "穿搭", "outfits, trends, and looking good without overthinking", [
        "outfit|整套穿搭|I have no idea what outfit to wear.",
        "dress up|认真打扮|Let us dress up for once.",
        "statement piece|吸睛单品|The jacket is a statement piece.",
      ]),
      topic("style", "skincare", "Skincare", "护肤", "routines, sensitive skin, and products that actually work", [
        "breakout|突然爆痘|I had a breakout this week.",
        "sensitive skin|敏感肌|My skin is really sensitive.",
        "hydrating|补水保湿的|This serum feels hydrating.",
      ]),
      topic("style", "makeup", "Makeup", "化妆", "easy looks, products, and getting ready together", [
        "base makeup|底妆|My base makeup never lasts all day.",
        "shade|色号|Which shade do you use?",
        "touch up|补妆|I need to touch up my lipstick.",
      ]),
      topic("style", "hair", "Hair", "头发", "haircuts, colour, and bad hair days", [
        "trim|修一点头发|I just need a small trim.",
        "layers|层次剪裁|I want soft layers this time.",
        "frizzy|毛躁的|My hair gets frizzy in the rain.",
      ]),
      topic("style", "attractiveness", "Attractiveness and vibes", "颜值和氛围感", "describing people in a natural, respectful way", [
        "good-looking|长得好看的|He is objectively good-looking.",
        "charming|有魅力的|She is more charming than conventionally pretty.",
        "effortless|毫不费力的好看|Her style looks effortless.",
      ]),
      topic("style", "photos", "Photos and posting", "拍照发朋友圈", "taking pictures, posing, and choosing the right post", [
        "candid|自然抓拍|I prefer candid photos.",
        "angle|拍摄角度|That angle is so flattering.",
        "post-worthy|值得发出来的|This one is definitely post-worthy.",
      ]),
      topic("style", "home-aesthetic", "Room aesthetic", "房间布置", "decor, cosy corners, and making a place feel like yours", [
        "cosy|温馨舒服的|I want my room to feel cosy.",
        "cluttered|杂乱的|My desk looks so cluttered.",
        "decorate|布置装饰|I want to decorate without spending much.",
      ]),
    ],
  },
  {
    id: "identity",
    label: "Personality and identity",
    topics: [
      topic("identity", "zodiac", "Zodiac signs", "星座", "fun astrology talk without taking it too seriously", [
        "zodiac sign|星座|What is your zodiac sign?",
        "birth chart|出生星盘|Do you know your birth chart?",
        "Mercury retrograde|水逆|People blame everything on Mercury retrograde.",
      ]),
      topic("identity", "mbti", "MBTI", "MBTI 人格", "personality types, strengths, and social energy", [
        "personality type|人格类型|What is your personality type?",
        "introvert|内向的人|I am an introvert who likes deep talks.",
        "extrovert|外向的人|My friend is a total extrovert.",
      ]),
      topic("identity", "confidence", "Confidence", "自信和自我形象", "self-image, feeling good, and not comparing yourself", [
        "insecure|缺乏自信的|I feel insecure sometimes too.",
        "comparison|比较|Comparison steals so much joy.",
        "own your style|坚持自己的风格|You should own your style.",
      ]),
      topic("identity", "social-battery", "Social battery", "社交电量", "introvert nights, parties, and needing a reset", [
        "social battery|社交电量|My social battery is dead today.",
        "overstimulated|感官和情绪过载的|I get overstimulated in loud places.",
        "alone time|独处时间|I need some alone time to reset.",
      ]),
      topic("identity", "lgbtq", "LGBTQ+ life and culture", "LGBTQ+ 生活和文化", "identity, community, and respectful conversation", [
        "queer|酷儿、非异性恋/非顺性别的统称|Queer is an umbrella term many people use.",
        "community|社群和归属感|Finding community can matter a lot.",
        "ally|支持 LGBTQ+ 的人|A good ally listens and learns.",
      ]),
      topic("identity", "queer-dating", "Queer dating", "同志约会", "dating, attraction, and meeting people safely and naturally", [
        "queer dating|同志约会|Queer dating can feel different in every city.",
        "chemistry|来电的感觉|We had chemistry from the start.",
        "be upfront|一开始就说清楚|It helps to be upfront about what you want.",
      ]),
      topic("identity", "gay-culture", "Gay culture and dating", "男同和同志文化", "identity, community, dating, and everyday conversation", [
        "gay|男同性恋/同性恋|He is gay and very open about it.",
        "dating scene|约会圈子|The dating scene can feel small in some cities.",
        "chosen family|自己选择的亲密支持群体|Friends can become your chosen family.",
      ]),
      topic("identity", "coming-out", "Coming out and support", "出柜和支持", "trust, privacy, and supporting people well", [
        "come out|出柜|Everyone should come out in their own time.",
        "privacy|隐私|Their privacy comes first.",
        "trust someone|信任某人|Only tell people you truly trust.",
      ]),
      topic("identity", "family-values", "Family and values", "家庭和价值观", "growing up, expectations, and what matters to you", [
        "expectation|期待、要求|Family expectations can feel heavy.",
        "independent|独立的|I want to be more independent.",
        "value|重视的原则|I value honesty more than anything.",
      ]),
    ],
  },
  {
    id: "campus",
    label: "University and career",
    topics: [
      topic("campus", "uni-life", "University life", "大学生活", "classes, campus routines, and figuring things out", [
        "lecture|讲座课|I have a lecture at 9 a.m.",
        "tutorial|小班课|My tutorial is actually useful.",
        "campus|校园|I will be on campus all afternoon.",
      ]),
      topic("campus", "assignments", "Assignments", "作业和截止日期", "getting started, staying calm, and finishing work", [
        "deadline|截止日期|The deadline is closer than I thought.",
        "procrastinate|拖延|I keep procrastinating instead of starting.",
        "draft|初稿|I need to finish a rough draft tonight.",
      ]),
      topic("campus", "exams", "Exams and revision", "考试和复习", "study stress, revision, and doing your best", [
        "revise|复习|I need to revise this chapter again.",
        "practice question|练习题|Practice questions help more than rereading.",
        "blank out|脑子一片空白|I always worry that I will blank out.",
      ]),
      topic("campus", "group-projects", "Group projects", "小组作业", "dividing work, unreliable teammates, and getting it done", [
        "divide up|分配任务|Let us divide up the tasks fairly.",
        "pull your weight|做好自己那份工作|Everyone needs to pull their weight.",
        "unresponsive|不回消息的|One teammate has been unresponsive.",
      ]),
      topic("campus", "part-time-work", "Part-time work", "兼职", "shifts, coworkers, and balancing study with money", [
        "shift|一个班次|I have an evening shift tomorrow.",
        "roster|排班表|My roster changes every week.",
        "coworker|同事|My coworkers are really friendly.",
      ]),
      topic("campus", "job-interview", "Job interviews", "求职面试", "introducing yourself and answering confidently", [
        "strength|优势|What would you say is your biggest strength?",
        "experience|经验|I do not have much experience yet.",
        "prepare|准备|I should prepare a few examples.",
      ]),
      topic("campus", "career-plans", "Career plans", "未来工作", "future jobs, uncertainty, and what you want next", [
        "career path|职业方向|I am still figuring out my career path.",
        "opportunity|机会|It could be a good opportunity.",
        "long-term|长期的|I am thinking about my long-term goals.",
      ]),
      topic("campus", "money", "Money and budgeting", "钱和预算", "saving, spending, and student life on a budget", [
        "save up|攒钱|I am saving up for a trip.",
        "expense|开销|Rent is my biggest expense.",
        "financially|经济上|I want to be more financially independent.",
      ]),
      topic("campus", "productivity", "Productivity", "效率和拖延", "study systems, motivation, and getting unstuck", [
        "focus|专注|I cannot focus when my phone is nearby.",
        "break down|拆分成小任务|Break the task down into small steps.",
        "momentum|动力和节奏|Starting is the hardest part; then you get momentum.",
      ]),
      topic("campus", "australia-campus", "Life in Australia", "澳洲上学生活", "campus slang, local routines, and settling in", [
        "uni|大学（澳洲口语）|I am heading to uni now.",
        "arvo|下午（澳洲口语）|Are you free this arvo?",
        "flat white|澳白咖啡|I need a flat white before class.",
      ]),
    ],
  },
  {
    id: "lifestyle",
    label: "Lifestyle and places",
    topics: [
      topic("lifestyle", "food", "Food cravings", "吃什么", "comfort food, takeout, and what you are craving", [
        "craving|很想吃|I am craving noodles right now.",
        "comfort food|治愈食物|Soup is my comfort food.",
        "portion|分量|The portion is huge.",
      ]),
      topic("lifestyle", "cafes", "Cafes and coffee", "咖啡店", "coffee orders, study spots, and cute places", [
        "iced latte|冰拿铁|My usual order is an iced latte.",
        "oat milk|燕麦奶|Can I get that with oat milk?",
        "study spot|学习地点|Do you know a good study spot?",
      ]),
      topic("lifestyle", "cooking", "Cooking", "做饭", "easy meals, recipes, and cooking disasters", [
        "recipe|食谱|I found an easy recipe online.",
        "ingredients|食材|I am missing half the ingredients.",
        "meal prep|提前备餐|I keep saying I will meal prep.",
      ]),
      topic("lifestyle", "fitness", "Fitness", "健身和运动", "exercise, routines, and feeling stronger", [
        "work out|锻炼|I want to work out more consistently.",
        "strength training|力量训练|I have started strength training.",
        "stamina|耐力|My stamina is getting better.",
      ]),
      topic("lifestyle", "travel", "Travel", "旅行", "trip planning, packing, and discovering places", [
        "itinerary|行程安排|Our itinerary is packed.",
        "carry-on|随身行李|I only travel with a carry-on.",
        "explore|探索|I want time to explore on my own.",
      ]),
      topic("lifestyle", "housemates", "Housemates", "室友合租", "chores, shared spaces, and living together", [
        "housemate|合租室友|My housemate is lovely but messy.",
        "chores|家务|We should make a chores schedule.",
        "shared space|公共空间|The kitchen is a shared space.",
      ]),
      topic("lifestyle", "transport", "Public transport", "公共交通", "buses, trains, and being late because of transport", [
        "commute|通勤路程|My commute takes almost an hour.",
        "delayed|延误的|The train is delayed again.",
        "tap on|刷卡进站|Do not forget to tap on.",
      ]),
      topic("lifestyle", "tech", "Tech and apps", "科技和手机", "useful apps, screen time, and annoying glitches", [
        "glitch|小故障|My phone is glitching again.",
        "update|更新|The update changed everything.",
        "screen time|屏幕使用时间|My screen time is embarrassing.",
      ]),
      topic("lifestyle", "holidays", "Holidays and festivals", "节日和假期", "celebrations, traditions, and plans with friends", [
        "celebrate|庆祝|How do you usually celebrate?",
        "tradition|传统|It is a family tradition.",
        "long weekend|小长假|I cannot wait for the long weekend.",
      ]),
      topic("lifestyle", "self-care", "Self-care and reset days", "自我照顾", "rest, emotional wellbeing, and softer routines", [
        "overwhelmed|压力大到受不了|I feel overwhelmed today.",
        "emotionally drained|情绪耗尽|I feel emotionally drained after this week.",
        "reset|重新调整状态|I need a proper reset day.",
      ]),
    ],
  },
];

export const topics = topicGroups.flatMap((group) => group.topics);

export function getTopicWords(activeTopic) {
  return [...activeTopic.words, ...sharedVocabulary[activeTopic.group]];
}
