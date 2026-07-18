const chinesePattern = /[\u3400-\u9fff]/;

const exactChinese = [
  ["我不知道聊什么", "I never know what to talk about, but I want to get better at small talk."],
  ["我最近很累", "I've been really tired lately."],
  ["我想睡觉", "I just want to sleep."],
  ["我有点尴尬", "I feel a little awkward."],
  ["我觉得他很帅", "I think he's really attractive."],
  ["我觉得她很美", "I think she's gorgeous."],
  ["我不想出门", "I don't feel like going out."],
  ["我想和你聊天", "I want to talk to you."],
  ["你今天怎么样", "How has your day been?"],
  ["我不知道", "I don't know, honestly."],
];

const correctionRules = [
  [/\bi am agree\b/gi, "I agree"],
  [/\bi very like\b/gi, "I really like"],
  [/\bmore better\b/gi, "better"],
  [/\bdiscuss about\b/gi, "discuss"],
  [/\bpeople is\b/gi, "people are"],
  [/\bthey is\b/gi, "they are"],
  [/\bhe don't\b/gi, "he doesn't"],
  [/\bshe don't\b/gi, "she doesn't"],
  [/\bi have went\b/gi, "I have gone"],
  [/\bI am boring\b/g, "I am bored"],
];

const moodOpeners = {
  "small-talk": ["Okay, easy question.", "Let us keep it light.", "That is a perfect small-talk answer."],
  bestie: ["Wait, I actually get you.", "Okay bestie, that is so real.", "No because I would feel the same."],
  casual: ["Yeah, that makes sense.", "Honestly, I get what you mean.", "That sounds fair."],
  gossip: ["Okay, I am listening.", "Wait, tell me more.", "That sounds a little suspicious, not going to lie."],
  flirty: ["Okay, there might be a little chemistry there.", "That is cute, actually.", "I would be curious too."],
  study: ["That makes sense. Let us keep the English natural.", "You explained that clearly.", "That is a useful way to put it."],
};

const moodQuestions = {
  "small-talk": ["What was the best small part of your day?", "What is one thing you are looking forward to this week?", "What have you been into lately?"],
  bestie: ["What happened next?", "Be honest, how do you actually feel about it?", "What would you say if you were not overthinking it?"],
  casual: ["What is the main reason you feel that way?", "Has it been on your mind for long?", "What would make it better?"],
  gossip: ["What did they say after that?", "Do you think they meant it that way?", "What is your honest read on the situation?"],
  flirty: ["Do you think the feeling is mutual?", "What was the moment that made you notice them?", "Would you want them to make a move?"],
  study: ["Can you add one more detail?", "What is the hardest part for you?", "What would be a realistic next step?"],
};

export function containsChinese(text) {
  return chinesePattern.test(text);
}

export function polishEnglish(text) {
  let polished = text.trim().replace(/\s+/g, " ");

  for (const [pattern, replacement] of correctionRules) {
    polished = polished.replace(pattern, replacement);
  }

  polished = polished.replace(/(^|[.!?]\s+)([a-z])/g, (match, prefix, letter) => prefix + letter.toUpperCase());
  polished = polished.replace(/\bi\b/g, "I");

  if (polished && !/[.!?]$/.test(polished)) {
    polished += ".";
  }

  return polished;
}

export function translateChinese(text, activeTopic) {
  const exact = exactChinese.find(([source]) => text.includes(source));
  if (exact) return exact[1];

  const title = activeTopic.title.toLowerCase();
  const openers = [
    [/(我觉得|我感觉)/, "I feel like"],
    [/(我喜欢|我很喜欢)/, "I really like"],
    [/(我不喜欢|我不太喜欢)/, "I am not really into"],
    [/(我想聊|我想说)/, "I want to talk about"],
    [/(最近)/, "Lately, I have been thinking about"],
    [/(为什么)/, "Why do you think"],
    [/(怎么)/, "How do you feel about"],
  ];

  const match = openers.find(([pattern]) => pattern.test(text));
  if (match && match[1].startsWith("Why")) return match[1] + " " + title + "?";
  if (match && match[1].startsWith("How")) return match[1] + " " + title + "?";
  if (match) return match[1] + " " + title + ".";
  return "I want to talk about " + title + ", but I am not sure how to say everything in English yet.";
}

function pick(values, seed) {
  return values[Math.abs(seed) % values.length];
}

export function makeBuddyReply({ text, activeTopic, mood, messageCount }) {
  const word = activeTopic.words[messageCount % activeTopic.words.length];
  const opener = pick(moodOpeners[mood] || moodOpeners.casual, messageCount);
  const question = pick(moodQuestions[mood] || moodQuestions.casual, messageCount + text.length);
  return opener + " A useful phrase here is " + word.term + " (" + word.meaning + "). " + question;
}

export function welcomeMessage(activeTopic, mood) {
  if (mood === "small-talk") {
    return "Hey, I am Mia. We can start with " + activeTopic.title + ", but there is no pressure to be interesting. What was one small thing that happened today?";
  }

  return "Hey, I am Mia. " + activeTopic.title + " is today's topic. Tell me whatever is on your mind, in Chinese or English.";
}
