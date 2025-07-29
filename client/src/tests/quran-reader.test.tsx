import { render, screen } from "@testing-library/react";
import React from "react";
import QuranReader from "../components/surah/QuranReader";
import * as api from "../lib/api-client";

jest.mock("../lib/api-client");

describe("QuranReader", () => {
  test("renders surah title", async () => {
    const mockSurah = {
      id: 1,
      revelation_place: "Mecca",
      revelation_order: 5,
      name_simple: "Al-Fatihah",
      name_arabic: "الفاتحة",
      name_complex: "Al-Fatihah",
      verses_count: 1,
      translated_name: { name: "The Opener", language_name: "english" },
    } as api.Surah;

    const mockVerses = [
      {
        id: 1,
        verse_key: "1:1",
        text_uthmani: "بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ",
        verse_number: 1,
        translations: [],
        audio: null,
      },
    ] as api.Verse[];

    (api.getSurah as jest.Mock).mockResolvedValue(mockSurah);
    (api.getVerses as jest.Mock).mockResolvedValue(mockVerses);

    render(<QuranReader surahId={1} />);

    const header = await screen.findByText("Al-Fatihah");
    expect(header).toBeInTheDocument();
  });
});
