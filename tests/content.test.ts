import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";

const pagePath = new URL("../src/pages/index.astro", import.meta.url);

describe("public page content", () => {
  it("does not expose the private estimate workspace", async () => {
    const page = await readFile(pagePath, "utf8");
    expect(page).not.toContain("estimates.proangleconstructionpa.com");
    expect(page).not.toContain("pro-angle-estimates");
  });

  it("contains the required direct contact actions and preview disclosure", async () => {
    const page = await readFile(pagePath, "utf8");
    expect(page).toContain("tel:+14404293474");
    expect(page).toContain("proangleconstruction@gmail.com");
    expect(page).toContain("branded placeholders, not photographs");
  });
});

