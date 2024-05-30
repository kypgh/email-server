import EN_int from "./en.json";
import CZ_int from "./cz.json";
import MS_int from "./ms.json";

export const languageConfig = {
  en: EN_int,
  cz: CZ_int,
  ms: MS_int,
};

let languageData = (lan) => {
  return languageConfig[lan];
};

export default languageData;
