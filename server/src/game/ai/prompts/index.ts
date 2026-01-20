export {
  tricksterMonkeyPrompt,
  type TricksterMonkeyInput,
  type TricksterMonkeyOutput,
  validateTricksterInput,
  formatTricksterOutput,
} from './trickster-monkey.js';
export {
  strategistApePrompt,
  type StrategistApeInput,
  type StrategistApeOutput,
  validateStrategistInput,
  formatStrategistOutput,
} from './strategist-ape.js';
export {
  speedyGibbonPrompt,
  type SpeedyGibbonInput,
  type SpeedyGibbonOutput,
  validateSpeedyInput,
  formatSpeedyOutput,
} from './speedy-gibbon.js';
export {
  guardianGorillaPrompt,
  type GuardianGorillaInput,
  type GuardianGorillaOutput,
  guardianGorillaSystemPrompt,
  validateGuardianInput,
  formatGuardianOutput,
} from './guardian-gorilla.js';
export {
  wildcardLemurPrompt,
  type WildcardLemurInput,
  type WildcardLemurOutput,
  wildcardLemurSystemPrompt,
  validateLemurInput,
  formatLemurOutput,
} from './wildcard-lemur.js';
export {
  mentorOrangutanPrompt,
  type MentorOrangutanInput,
  type MentorOrangutanOutput,
  mentorOrangutanSystemPrompt,
  validateMentorInput,
  formatMentorOutput,
} from './mentor-orangutan.js';
export {
  championChimpPrompt,
  type ChampionChimpInput,
  type ChampionChimpOutput,
  championChimpSystemPrompt,
  validateChampionInput,
  formatChampionOutput,
} from './champion-chimp.js';

export interface PersonalityPromptConfig {
  name: string;
  systemPrompt: string;
}
