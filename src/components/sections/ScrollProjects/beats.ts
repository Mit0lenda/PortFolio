/**
 * Timing spec for the pinned sequence, as fractions (0..1) of the total pin
 * duration (PIN_DURATION_VH, see data.ts). Mirrors the approved storyboard
 * 1:1 — 4 stable read-states per project (enter/read/reveal/result), not a
 * crossfade-everything reframe. Change PIN_DURATION_VH to retime the whole
 * thing; these fractions stay the same.
 */
export type BeatRange = [number, number];

export type ProjectBeats = {
  enter: BeatRange;
  read: BeatRange;
  reveal: BeatRange;
  result: BeatRange;
};

export const PROJECT_BEATS: [ProjectBeats, ProjectBeats, ProjectBeats] = [
  { enter: [0.07, 0.12], read: [0.12, 0.23], reveal: [0.23, 0.305], result: [0.305, 0.343] },
  { enter: [0.378, 0.428], read: [0.428, 0.538], reveal: [0.538, 0.613], result: [0.613, 0.651] },
  { enter: [0.686, 0.736], read: [0.736, 0.846], reveal: [0.846, 0.921], result: [0.921, 0.959] },
];

export const CUT_BEATS: [BeatRange, BeatRange] = [
  [0.343, 0.378],
  [0.651, 0.686],
];

export const RELEASE_BEAT: BeatRange = [0.959, 1];

/**
 * Which project is "active" at a given scroll progress (0..1) — ticks over
 * at the same cut-midpoint the visual swap happens at, not an even 1/3
 * split. Shared by the progress-bar label and the jump-to-next-project
 * button so they never disagree.
 */
export function getActiveIndex(progress: number): number {
  let activeIdx = 0;
  for (let c = 0; c < CUT_BEATS.length; c++) {
    if (progress >= CUT_BEATS[c][0] + (CUT_BEATS[c][1] - CUT_BEATS[c][0]) * 0.5) {
      activeIdx = c + 1;
    }
  }
  return activeIdx;
}
