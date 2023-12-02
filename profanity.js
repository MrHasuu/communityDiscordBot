import { ProfanityEngine } from "@coffeeandfun/google-profanity-words";

export async function profanityChecker(text) {
  const profanityEngine = new ProfanityEngine();
  const profanityList = await profanityEngine.all();
  const lowercasedText = text.toLowerCase();

  for (const profanity of profanityList) {
    if (profanity !== "" && lowercasedText.includes(profanity)) {
      return true;
    }
  }

  return false;
}
