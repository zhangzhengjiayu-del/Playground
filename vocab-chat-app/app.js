const topics = [
  {
    id: "internet-slang",
    title: "Internet slang / attractiveness",
    cn: "网络梗、颜值和氛围感",
    vibe: "TikTok comments, bestie gossip, describing attractive people",
    words: [
      ["rizz", "撩人魅力、会聊天的吸引力", "He has quiet rizz, not loud rizz."],
      ["rizz someone up", "撩某人", "She accidentally rizzed him up."],
      ["aura", "气场、氛围感", "She walked in with serious aura."],
      ["aura points", "气场分", "That comeback gave you aura points."],
      ["face card", "脸很能打", "Her face card never declines."],
      ["serve", "很会表现、很出片", "That outfit is serving main character."],
      ["slay", "很棒、很杀、太会了", "You slayed that presentation."],
      ["it girl", "很有风格和关注度的女生", "She's an it girl without even trying."],
      ["baddie", "自信、有魅力、会打扮的人", "She looks like a baddie in that jacket."],
      ["pretty boy", "漂亮型帅哥", "He's more pretty boy than tough-guy handsome."],
      ["boy-next-door", "邻家男孩型、舒服耐看的帅", "He's boy-next-door cute."],
      ["low-key cute", "有点可爱、越看越顺眼", "He's low-key cute when he smiles."],
      ["fine", "很性感、很帅/美", "No because he is actually fine."],
      ["stunning", "惊艳的", "She looked stunning in that dress."],
      ["ethereal", "仙气的、不真实的美", "Her makeup looked ethereal."],
      ["drop-dead gorgeous", "美到惊人", "That actress is drop-dead gorgeous."],
      ["golden retriever energy", "阳光、热情、黏人的可爱感", "He has golden retriever energy."],
      ["black cat energy", "冷淡、神秘、酷酷的感觉", "She has black cat energy."],
      ["written by a woman", "像女性理想化写出来的男生", "He listens carefully. He's written by a woman."],
      ["looksmaxxing", "提升外貌管理", "Some looksmaxxing advice is just normal skincare."],
    ],
    starters: [
      "Be honest, is he pretty-boy cute or boy-next-door cute?",
      "Her face card never declines. I need that level of confidence.",
      "He has golden retriever energy, but she has black cat energy. It works.",
    ],
  },
  {
    id: "dating",
    title: "Dating / crushes",
    cn: "暧昧、喜欢的人、恋爱",
    vibe: "bestie chat, crush updates, relationship advice",
    words: [
      ["crush", "喜欢的人", "I think I have a crush on him."],
      ["situationship", "暧昧但没确定关系", "This situationship is confusing me."],
      ["mixed signals", "忽冷忽热的信号", "He's giving me mixed signals."],
      ["chemistry", "来电的感觉", "We have chemistry, but I don't trust it yet."],
      ["commitment", "承诺、确定关系", "He seems scared of commitment."],
      ["ghost", "突然不回消息", "Don't ghost me after saying good morning."],
      ["soft launch", "低调官宣", "She soft-launched her boyfriend."],
      ["love bombing", "过度热情轰炸", "Love bombing feels intense at first."],
      ["deal breaker", "不能接受的点", "Bad communication is a deal breaker."],
      ["standards", "择偶标准", "Having standards is not being picky."],
      ["catch feelings", "动心", "I didn't mean to catch feelings."],
      ["move on", "放下", "I know I should move on."],
    ],
    starters: [
      "Okay, be honest. Is this a crush or am I just bored?",
      "He replies fast, but the messages feel dry. What does that mean?",
      "My standards are higher now, and honestly I like that for me.",
    ],
  },
  {
    id: "gossip",
    title: "Gossip / friend drama",
    cn: "八卦和朋友关系",
    vibe: "group chats, late-night catch-ups, friend drama",
    words: [
      ["tea", "八卦", "I have tea, but promise you won't tell anyone."],
      ["spill", "说出来", "Spill. What happened?"],
      ["drama", "抓马、纠纷", "There is drama in the group chat again."],
      ["awkward", "尴尬的", "The whole thing felt awkward."],
      ["side-eye", "无语地看", "I gave him serious side-eye."],
      ["low-key", "有点、暗暗地", "I'm low-key annoyed."],
      ["high-key", "非常明显地", "I'm high-key invested in this story."],
      ["vibe check", "感觉检查", "That message failed the vibe check."],
      ["fake friend", "假朋友", "A fake friend only shows up when they need something."],
      ["loyal", "讲义气的", "She's loyal, but she can be blunt."],
    ],
    starters: [
      "I have tea, but you need to promise not to judge me.",
      "The group chat has been weird lately. Something is definitely off.",
      "That reply was so passive-aggressive. I need a second opinion.",
    ],
  },
  {
    id: "mbti",
    title: "MBTI / personality",
    cn: "MBTI和人格",
    vibe: "self-intros, group chats, getting closer",
    words: [
      ["personality type", "人格类型", "What's your personality type?"],
      ["introvert", "内向的人", "I'm an introvert but I love deep talks."],
      ["extrovert", "外向的人", "My best friend is a total extrovert."],
      ["social battery", "社交电量", "My social battery is dead today."],
      ["overthinker", "想太多的人", "I'm such an overthinker."],
      ["spontaneous", "随性的", "I wish I were more spontaneous."],
      ["organized", "有条理的", "She is organized even with her feelings."],
      ["emotionally aware", "情绪觉察强的", "He's surprisingly emotionally aware."],
      ["people pleaser", "讨好型人格", "I'm trying not to be a people pleaser."],
      ["boundaries", "边界感", "Healthy boundaries are attractive."],
    ],
    starters: [
      "What's your MBTI? I want to see if it matches your vibe.",
      "Are you more of a planner or a spontaneous person?",
      "My social battery is low, but I still want gossip.",
    ],
  },
  {
    id: "food",
    title: "Food / cafes",
    cn: "美食、咖啡店、奶茶",
    vibe: "daily chat, easy invitations, casual dating",
    words: [
      ["craving", "很想吃", "I'm craving noodles right now."],
      ["comfort food", "治愈食物", "Hot soup is my comfort food."],
      ["overpriced", "太贵不值", "That cafe is cute but overpriced."],
      ["worth it", "值得", "The dessert was expensive but worth it."],
      ["portion", "份量", "The portion is huge."],
      ["reservation", "预订", "Do we need a reservation?"],
      ["split the bill", "AA付款", "Let's split the bill."],
      ["recommendation", "推荐", "Do you have any food recommendations?"],
      ["go-to order", "常点的东西", "My go-to order is iced matcha."],
      ["bubble tea", "奶茶", "Bubble tea fixes my mood."],
    ],
    starters: [
      "What's your go-to bubble tea order?",
      "I need a cafe that is cute but not overpriced.",
      "Let's get comfort food. My brain is tired.",
    ],
  },
  {
    id: "study",
    title: "University stress",
    cn: "学习、作业、考试压力",
    vibe: "classmates, study buddy, exam week",
    words: [
      ["assignment", "作业", "This assignment is taking forever."],
      ["deadline", "截止日期", "The deadline is too close."],
      ["procrastinate", "拖延", "I keep procrastinating."],
      ["burnout", "精疲力尽", "I think I'm close to burnout."],
      ["catch up", "赶上进度", "I need to catch up on lectures."],
      ["revise", "复习", "I should revise before the quiz."],
      ["confusing", "令人困惑的", "This topic is genuinely confusing."],
      ["fall behind", "落后", "I fell behind after missing one lecture."],
      ["study session", "学习局", "Let's do a study session tomorrow."],
      ["pull an all-nighter", "熬通宵", "I don't want to pull an all-nighter."],
    ],
    starters: [
      "I'm behind, but I don't want to panic. Help me make it manageable.",
      "This assignment is making me question my life choices.",
      "Do you want to do a study session and suffer together?",
    ],
  },
  {
    id: "wellbeing",
    title: "Mental health / sleep",
    cn: "心理状态、睡眠、情绪",
    vibe: "warm check-ins, late-night talks, close friends",
    words: [
      ["overwhelmed", "压力大到受不了", "I feel overwhelmed today."],
      ["anxious", "焦虑的", "I'm anxious for no clear reason."],
      ["emotionally drained", "情绪耗尽", "I feel emotionally drained."],
      ["need space", "需要空间", "I need space tonight."],
      ["recharge", "恢复能量", "I need to recharge alone."],
      ["sleep schedule", "作息", "My sleep schedule is ruined."],
      ["self-care", "自我照顾", "Self-care is not always aesthetic."],
      ["vent", "倾诉", "Can I vent for a second?"],
      ["validate", "理解并认可", "I just need someone to validate my feelings."],
      ["take it easy", "放轻松", "Take it easy tonight."],
    ],
    starters: [
      "Can I vent for a second? I don't need advice yet.",
      "My sleep schedule is ruined and my brain feels foggy.",
      "I need a soft night: shower, food, and no stressful messages.",
    ],
  },
];

const els = {
  topicSelect: document.querySelector("#topicSelect"),
  moodSelect: document.querySelector("#moodSelect"),
  dailyBtn: document.querySelector("#dailyBtn"),
  randomBtn: document.querySelector("#randomBtn"),
  topicTitle: document.querySelector("#topicTitle"),
  topicVibe: document.querySelector("#topicVibe"),
  dailyBadge: document.querySelector("#dailyBadge"),
  wordList: document.querySelector("#wordList"),
  starterList: document.querySelector("#starterList"),
  chatLog: document.querySelector("#chatLog"),
  messageInput: document.querySelector("#messageInput"),
  sendBtn: document.querySelector("#sendBtn"),
  promptOutput: document.querySelector("#promptOutput"),
  copyPromptBtn: document.querySelector("#copyPromptBtn"),
  toast: document.querySelector("#toast"),
  tabs: {
    words: document.querySelector("#wordsTab"),
    chat: document.querySelector("#chatTab"),
    prompt: document.querySelector("#promptTab"),
  },
  views: {
    words: document.querySelector("#wordsView"),
    chat: document.querySelector("#chatView"),
    prompt: document.querySelector("#promptView"),
  },
};

const dailyIndex = Math.floor(Date.now() / 86400000) % topics.length;
let activeTopicId = localStorage.getItem("vocab-chat:topic") || topics[dailyIndex].id;

setup();

function setup() {
  els.topicSelect.innerHTML = topics.map((topic) => `<option value="${topic.id}">${topic.title} (${topic.cn})</option>`).join("");
  els.topicSelect.value = activeTopicId;
  els.topicSelect.addEventListener("change", () => {
    activeTopicId = els.topicSelect.value;
    localStorage.setItem("vocab-chat:topic", activeTopicId);
    render();
  });
  els.moodSelect.addEventListener("change", updatePrompt);
  els.dailyBtn.addEventListener("click", () => setTopic(topics[dailyIndex].id));
  els.randomBtn.addEventListener("click", () => setTopic(topics[Math.floor(Math.random() * topics.length)].id));
  els.sendBtn.addEventListener("click", sendMessage);
  els.messageInput.addEventListener("input", updatePrompt);
  els.copyPromptBtn.addEventListener("click", copyPrompt);
  Object.entries(els.tabs).forEach(([name, button]) => button.addEventListener("click", () => showView(name)));
  render();
}

function activeTopic() {
  return topics.find((topic) => topic.id === activeTopicId) || topics[dailyIndex];
}

function setTopic(id) {
  activeTopicId = id;
  els.topicSelect.value = id;
  localStorage.setItem("vocab-chat:topic", id);
  render();
}

function render() {
  const topic = activeTopic();
  els.topicTitle.textContent = `${topic.title} - ${topic.cn}`;
  els.topicVibe.textContent = topic.vibe;
  els.dailyBadge.textContent = `Daily: ${topics[dailyIndex].title}`;
  els.wordList.innerHTML = topic.words.map(renderWord).join("");
  els.starterList.innerHTML = topic.starters.map((starter) => `<button class="starter-btn" type="button" data-starter="${escapeHtml(starter)}">${escapeHtml(starter)}</button>`).join("");
  els.starterList.querySelectorAll("[data-starter]").forEach((button) => {
    button.addEventListener("click", () => {
      els.messageInput.value = button.dataset.starter;
      updatePrompt();
    });
  });
  if (!els.chatLog.children.length) addBubble("buddy", `Today we can talk about ${topic.title}. Pick a starter, or type your own message.`);
  if (!els.messageInput.value.trim()) els.messageInput.value = topic.starters[0];
  updatePrompt();
}

function renderWord([word, meaning, example]) {
  return `
    <article class="word-card">
      <div>
        <strong>${escapeHtml(word)}</strong>
        <span>${escapeHtml(meaning)}</span>
      </div>
      <p>${escapeHtml(example)}</p>
    </article>
  `;
}

function sendMessage() {
  const text = els.messageInput.value.trim();
  if (!text) return;
  const topic = activeTopic();
  addBubble("user", text);
  addBubble("buddy", makeBuddyReply(topic, text));
  els.messageInput.value = "";
  updatePrompt();
  showView("chat");
}

function makeBuddyReply(topic, text) {
  const picks = topic.words.slice(0, 8).sort(() => Math.random() - 0.5).slice(0, 3);
  const expressions = picks.map(([word, meaning]) => `${word}（${meaning}）`).join(", ");
  const openers = {
    bestie: "Okay wait, this is actually such a bestie topic.",
    casual: "Yeah, I get what you mean.",
    flirty: "Low-key, that sounds like it has a little tension.",
    study: "That makes sense. Let's make it natural but still useful.",
  };
  const opener = openers[els.moodSelect.value] || openers.bestie;
  return `${opener} You could say it with ${expressions}. Your sentence was: "${text}" Now tell me one more detail so we can make it sound more natural.`;
}

function addBubble(type, text) {
  const bubble = document.createElement("div");
  bubble.className = `bubble ${type}`;
  bubble.textContent = text;
  els.chatLog.appendChild(bubble);
  bubble.scrollIntoView({ block: "nearest" });
}

function showView(name) {
  Object.entries(els.tabs).forEach(([key, button]) => button.classList.toggle("active", key === name));
  Object.entries(els.views).forEach(([key, view]) => view.classList.toggle("active", key === name));
}

function updatePrompt() {
  const topic = activeTopic();
  const message = els.messageInput.value.trim() || topic.starters[0];
  const vocabLines = topic.words.map(([word, meaning, example]) => `- ${word} (${meaning}): ${example}`).join("\n");
  els.promptOutput.value = [
    "Please chat with me like a young close friend/bestie, not like a teacher.",
    "Use natural English as the main language and add short Chinese hints in parentheses for useful vocabulary.",
    "Keep the tone casual, warm, and realistic, like two friends texting.",
    `Topic: ${topic.title} (${topic.cn}).`,
    `Mood: ${els.moodSelect.value}.`,
    "Please help me practise these vocabulary items naturally:",
    vocabLines,
    "My message:",
    message,
    "Reply with a friendly answer, ask one natural follow-up question, and include 3-5 useful expressions from the vocabulary.",
  ].join("\n");
}

async function copyPrompt() {
  updatePrompt();
  try {
    await navigator.clipboard.writeText(els.promptOutput.value);
    toast("Prompt copied");
  } catch {
    els.promptOutput.focus();
    els.promptOutput.select();
    toast("Select and copy");
  }
}

function toast(text) {
  els.toast.textContent = text;
  els.toast.classList.add("show");
  setTimeout(() => els.toast.classList.remove("show"), 1300);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
    return entities[char];
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
