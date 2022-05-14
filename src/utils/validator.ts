import nconf from "nconf";

const { antispam } = nconf.get("bot");

export const includesBannedWord = (message: string) => {
  try {
    const text = message?.toLowerCase();
    const words: string[] = antispam.words?.map((v: string) =>
      v?.toLowerCase()
    );

    const isBanned =
      words.includes(text) ||
      words.includes(text.replace("@", "").split(" ").join("")) ||
      words.filter((w) => text.indexOf(w) >= 0).some((w) => w);

    if (isBanned) return true;

    return false;
  } catch (e) {
    return true;
  }
};
