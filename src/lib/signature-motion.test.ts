import { describe, expect, it } from "vitest";
import { approach, clampUnit, signaturePose } from "./signature-motion";

describe("cinematic signature motion", () => {
  it("is independent of display refresh rate over equal elapsed time", () => {
    function simulate(hz: number) {
      let value = 0;
      for (let frame = 0; frame < hz; frame++) value = approach(value, 1, 1 / hz);
      return value;
    }
    expect(simulate(60)).toBeCloseTo(simulate(120), 12);
    expect(simulate(60)).toBeCloseTo(simulate(144), 12);
  });
  it("clamps progress and pointer inputs and supports reversible poses", () => {
    expect(clampUnit(-1)).toBe(0);
    expect(clampUnit(2)).toBe(1);
    expect(signaturePose(-1, 5, -5)).toEqual(signaturePose(0, 1, -1));
    expect(signaturePose(1, 0, 0).separation).toBeGreaterThan(signaturePose(0, 0, 0).separation);
    let forward = 0;
    for (let i = 0; i < 120; i++) forward = approach(forward, 1, 1 / 60);
    expect(forward).toBeCloseTo(1, 6);
    for (let i = 0; i < 120; i++) forward = approach(forward, 0, 1 / 60);
    expect(forward).toBeCloseTo(0, 6);
    expect(approach(1, 0, 0.1)).toBeLessThan(1);
  });
});
