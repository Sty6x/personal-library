import { uid } from "uid";

export const placeholders = [
  {
    author: "Haruki Murakami",
    title: "Killing Commendatore",
    totalPages: 367,
    currentPage: 0,
    isFinished: false,
    genre: ["Physchological", "Fantasy", "History", "Novel"],
    link: "book1",
    notes: [
      {
        id: uid(16),
        contents: "This is the contents of the current note on Haruki murakami",
        page: 31,
        zIndex: 0,
        styles: {
          backgroundColor: "#DF7868",
          textStyles: {
            fill: "#1a1b1d",
            wordWrapWidth: 400 - 30,
            wordWrap: true,
          },
        },
        position: { x: 100, y: 250 },
      },
      {
        id: uid(16),
        contents: "Somethin something he said to mr something",
        page: 152,
        position: { x: 120, y: 320 },
        zIndex: 0,
        styles: {
          textStyles: {
            fill: "#1a1b1d",
            wordWrapWidth: 400 - 30,
            wordWrap: true,
          },
          backgroundColor: "#68A5DE",
        },
      },
    ],
  },

  {
    author: "Herman Melville",
    title: "Moby Dick",
    totalPages: 523,
    currentPage: 263,
    isFinished: false,
    genre: ["Epic", "Nautical", "Adventure Fiction"],
    link: "book2",
    notes: [],
  },

  {
    author: "Fyodor Dostoyevsky",
    title: "Crime and Punishment",
    totalPages: 490,
    currentPage: 461,
    isFinished: false,
    genre: ["Novel", "Psychological", "Crime", "Philosophical"],
    link: "book3",
    notes: [],
  },

  {
    author: "Anne Frank",
    title: "Diary of a Young Girl",
    totalPages: 365,
    currentPage: 250,
    isFinished: false,
    genre: ["Biography", "Autobiography", "Diary", "Personal Narrative"],
    link: "book4",

    notes: [],
  },
  {
    author: "Viktor Frankl",
    title: "Man's Search For Meaning",
    totalPages: 490,
    currentPage: 461,
    isFinished: false,
    genre: ["Biography", "Autobiography", "Personal Narrative"],
    link: "book5",

    notes: [],
  },
  {
    author: "Niccolo Machiavelli",
    title: "Prince",
    totalPages: 224,
    currentPage: 51,
    isFinished: false,
    genre: ["Autobiography", "History"],
    link: "book6",

    notes: [],
  },
  {
    author: "Osamu Dazai",
    title: "No Longer Human",
    totalPages: 262,
    currentPage: 152,
    isFinished: false,
    genre: ["Novel", "Fiction"],
    link: "book7",

    notes: [],
  },
];
