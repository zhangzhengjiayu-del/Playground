import { describe, expect, it } from "vitest";
import {
  containsChinese,
  makeBuddyReply,
  polishEnglish,
  translateChinese,
  welcomeMessage,
} from "./chat-engine.js";
import { topics } from "./topics.js";

const topic = topics.find((item) => item.id === "zodiac");

describe("Vocab Chat local language coach", () => {
  it("spots Chinese and gives a natural English line", () => {
    expect(containsChinese("我最近很累")).toBe(true);
    expect(translateChinese("我最近很累", topic)).toBe("I've been really tired lately.");
  });

  it("makes common English mistakes more natural", () => {
    expect(polishEnglish("i very like this topic")).toBe("I really like this topic.");
    expect(polishEnglish("I am boring")).toBe("I am bored.");
  });

  it("keeps the chat moving with the selected topic and mood", () => {
    expect(welcomeMessage(topic, "small-talk")).toContain("small thing");
    expect(
      makeBuddyReply({
        text: "I love astrology",
        activeTopic: topic,
        mood: "bestie",
        messageCount: 1,
      }),
    ).toContain(topic.words[1].term);
  });
});
