import { describe, expect, it } from "vitest";
import { portfolioPlaceholders, projects } from "../src/data/projects";

describe("portfolio data boundaries", () => {
  it("keeps placeholders out of completed project records", () => {
    expect(projects).toEqual([]);
    expect(portfolioPlaceholders).toHaveLength(3);
    expect(portfolioPlaceholders.every((item) => item.label === "Project preview")).toBe(true);
  });
});

