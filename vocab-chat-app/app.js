import { getTopicWords, topicGroups, topics } from "./topics.js";
import {
  containsChinese,
  makeBuddyReply,
  polishEnglish,
  translateChinese,
  welcomeMessage,
} from "./chat-engine.js";

const storage = {
  topic: "vocab-chat:topic",
  mood: "vocab-chat:mood",
  chats: "vocab-chat:chats:v2",
};

const els = {
  topicSelect: document.querySelector("#topicSelect"),
  moodSelect: document.querySelector("#moodSelect"),
  dailyBtn: document.querySelector("#dailyBtn"),
  randomBtn: document.querySelector("#randomBtn"),
  topicCount: document.querySelector("#topicCount"),
  topicTitle: document.querySelector("#topicTitle"),
  topicVibe: document.querySelector("#topicVibe"),
  wordCount: document.querySelector("#wordCount"),
  chatMoodLabel: document.querySelector("#chatMoodLabel"),
  chatLog: document.querySelector("#chatLog"),
  composer: document.querySelector("#composer"),
  messageInput: document.querySelector("#messageInput"),
  wordList: document.querySelector("#wordList"),
  toast: document.querySelector("#toast"),
  tabs: {
    chat: document.querySelector("#chatTab"),
    words: document.querySelector("#wordsTab"),
  },
  views: {
    chat: document.querySelector("#chatView"),
    words: document.querySelector("#wordsView"),
  },
};

const dailyIndex = Math.floor(Date.now() / 86400000) % topics.length;
let activeTopicId = localStorage.getItem(storage.topic) || topics[dailyIndex].id;
let activeMood = localStorage.getItem(storage.mood) || "small-talk";
let chats = readChats();

setup();

function setup() {
  populateTopicSelect();
  els.topicSelect.value = activeTopicId;
  els.moodSelect.value = activeMood;
  els.topicCount.textContent = topics.length + " topics";

  els.topicSelect.addEventListener("change", () => setTopic(els.topicSelect.value));
  els.moodSelect.addEventListener("change", () => {
    activeMood = els.moodSelect.value;
    localStorage.setItem(storage.mood, activeMood);
    render();
  });
  els.dailyBtn.addEventListener("click", () => setTopic(topics[dailyIndex].id));
  els.randomBtn.addEventListener("click", () => {
    const next = topics[Math.floor(Math.random() * topics.length)];
    setTopic(next.id);
    toast("New topic: " + next.title);
  });
  els.composer.addEventListener("submit", (event) => {
    event.preventDefault();
    sendMessage();
  });
  els.messageInput.addEventListener("input", resizeComposer);
  els.messageInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  });
  Object.entries(els.tabs).forEach(([name, button]) => {
    button.addEventListener("click", () => showView(name));
  });

  render();
  resizeComposer();
}

function populateTopicSelect() {
  for (const group of topicGroups) {
    const optionGroup = document.createElement("optgroup");
    optionGroup.label = group.label;

    for (const item of group.topics) {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.title + " - " + item.cn;
      optionGroup.appendChild(option);
    }

    els.topicSelect.appendChild(optionGroup);
  }
}

function activeTopic() {
  return topics.find((item) => item.id === activeTopicId) || topics[dailyIndex];
}

function setTopic(id) {
  activeTopicId = id;
  localStorage.setItem(storage.topic, id);
  els.topicSelect.value = id;
  render();
}

function render() {
  const current = activeTopic();
  const words = getTopicWords(current);

  els.topicTitle.textContent = current.title + " - " + current.cn;
  els.topicVibe.textContent = current.vibe;
  els.wordCount.textContent = words.length + " words";
  els.chatMoodLabel.textContent = moodLabel(activeMood);
  renderWords(words);
  ensureChat(current);
  renderChat();
}

function renderWords(words) {
  els.wordList.replaceChildren(
    ...words.map((word) => {
      const card = document.createElement("article");
      card.className = "word-card";

      const term = document.createElement("strong");
      term.textContent = word.term;
      const meaning = document.createElement("span");
      meaning.textContent = word.meaning;
      const example = document.createElement("p");
      example.textContent = word.example;

      card.append(term, meaning, example);
      return card;
    }),
  );
}

function ensureChat(current) {
  if (chats[current.id]?.length) return;

  chats[current.id] = [
    {
      sender: "buddy",
      text: welcomeMessage(current, activeMood),
      createdAt: Date.now(),
    },
  ];
  writeChats();
}

function renderChat() {
  const currentMessages = chats[activeTopicId] || [];
  const divider = document.createElement("div");
  divider.className = "day-divider";
  divider.textContent = "Today";

  els.chatLog.replaceChildren(
    divider,
    ...currentMessages.map(renderMessage),
  );
  els.chatLog.scrollTop = els.chatLog.scrollHeight;
}

function renderMessage(message) {
  const row = document.createElement("article");
  row.className = "message-row " + message.sender;

  if (message.sender === "buddy") {
    const avatar = document.createElement("span");
    avatar.className = "message-avatar";
    avatar.textContent = "M";
    row.appendChild(avatar);
  }

  const stack = document.createElement("div");
  stack.className = "bubble-stack";
  const bubble = document.createElement("p");
  bubble.className = "bubble";
  bubble.textContent = message.text;
  const time = document.createElement("span");
  time.className = "message-time";
  time.textContent = formatTime(message.createdAt);
  stack.append(bubble, time);
  row.appendChild(stack);

  if (message.note) {
    const note = document.createElement("p");
    note.className = "language-note";
    const label = document.createElement("strong");
    label.textContent = message.note.label + ": ";
    note.append(label, message.note.text);
    row.appendChild(note);
  }

  return row;
}

function sendMessage() {
  const text = els.messageInput.value.trim();
  if (!text) return;

  const current = activeTopic();
  const currentMessages = chats[current.id] || [];
  const note = makeLanguageNote(text, current);

  currentMessages.push({
    sender: "user",
    text,
    note,
    createdAt: Date.now(),
  });
  currentMessages.push({
    sender: "buddy",
    text: makeBuddyReply({
      text: note?.text || text,
      activeTopic: current,
      mood: activeMood,
      messageCount: currentMessages.length,
    }),
    createdAt: Date.now(),
  });

  chats[current.id] = currentMessages.slice(-80);
  writeChats();
  els.messageInput.value = "";
  resizeComposer();
  renderChat();
  showView("chat");
}

function makeLanguageNote(text, current) {
  if (containsChinese(text)) {
    return {
      label: "Natural English",
      text: translateChinese(text, current),
    };
  }

  const polished = polishEnglish(text);
  if (polished !== text) {
    return {
      label: "Quick polish",
      text: polished,
    };
  }

  return null;
}

function showView(name) {
  Object.entries(els.tabs).forEach(([key, button]) => {
    button.classList.toggle("active", key === name);
  });
  Object.entries(els.views).forEach(([key, view]) => {
    view.classList.toggle("active", key === name);
  });
}

function resizeComposer() {
  els.messageInput.style.height = "auto";
  els.messageInput.style.height = Math.min(els.messageInput.scrollHeight, 116) + "px";
}

function moodLabel(mood) {
  const labels = {
    "small-talk": "small talk",
    bestie: "bestie mode",
    casual: "casual mode",
    gossip: "gossip mode",
    flirty: "light crush talk",
    study: "study buddy",
  };
  return labels[mood] || labels.casual;
}

function formatTime(timestamp) {
  return new Intl.DateTimeFormat([], {
    hour: "numeric",
    minute: "2-digit",
  }).format(timestamp);
}

function readChats() {
  try {
    const value = JSON.parse(localStorage.getItem(storage.chats) || "{}");
    return value && typeof value === "object" ? value : {};
  } catch {
    return {};
  }
}

function writeChats() {
  localStorage.setItem(storage.chats, JSON.stringify(chats));
}

function toast(text) {
  els.toast.textContent = text;
  els.toast.classList.add("show");
  window.setTimeout(() => els.toast.classList.remove("show"), 1400);
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  });
}
