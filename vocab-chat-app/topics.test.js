import { describe, expect, it } from "vitest";
import { getTopicWords, topics } from "./topics.js";

describe("Vocab Chat topics", () => {
  it("offers a broad topic library", () => {
    expect(topics.length).toBeGreaterThanOrEqual(64);
    expect(topics.map((topic) => topic.id)).toEqual(
      expect.arrayContaining(["zodiac", "fandom", "shopping", "queer-dating", "gay-culture", "uni-life", "travel"]),
    );
  });

  it("gives every topic a useful vocabulary set", () => {
    for (const topic of topics) {
      expect(getTopicWords(topic)).toHaveLength(12);
      expect(getTopicWords(topic).every((word) => word.term && word.meaning && word.example)).toBe(true);
    }
  });
});
