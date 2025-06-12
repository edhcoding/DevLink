import { badWords } from "@/constants/badwords";

// 비속어 필터링 유틸 함수
export default function badWordsFilter(text: string) {
  let filteredText = text;

  badWords.forEach((badWord) => {
    let index = filteredText.toLowerCase().indexOf(badWord.toLowerCase());

    while (index !== -1) {
      // 비속어 *** 치환
      filteredText =
        filteredText.substring(0, index) +
        "***" +
        filteredText.substring(index + badWord.length);
      // 그 다음 비속어 검색
      index = filteredText
        .toLowerCase()
        .indexOf(badWord.toLowerCase(), index + 3);
    }
  });

  return filteredText;
}

export const containsBadWords = (value: string) => {
  return badWords.some((badWord) => value.toLowerCase().includes(badWord));
};
