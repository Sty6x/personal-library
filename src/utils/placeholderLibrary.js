import { uid } from "uid";

export const placeholders = [
  {
    author: "Haruki Murakami",
    title: "Killing Commendatore",
    totalPages: 367,
    currentPage: 0,
    isFinished: false,
    genre: ["Physchological", "Fantasy", "History", "Novel"],
    id: "book1",
    lastUpdated: new Date(),
    notes: [
      {
        id: uid(16),
        contents:
          "“None of us are ever finished. Everyone is always a work in progress.”",
        page: 421,
        zIndex: 0,
        width: 400,
        height: 100,
        styles: {
          backgroundColor: "#C7A2DE",
          textStyles: {
            fill: "#1a1b1d",
            wordWrap: true,
          },
        },
        position: { x: 500, y: 150 },
      },
      {
        id: uid(16),
        contents:
          "“You can have all the desire and ache inside you want, but what you really need is a concrete starting point.”",
        page: 145,
        zIndex: 0,
        width: 400,
        height: 100,
        styles: {
          backgroundColor: "#68DE8C",
          textStyles: {
            fill: "#1a1b1d",
            wordWrap: true,
          },
        },
        position: { x: 300, y: 550 },
      },
      {
        id: uid(16),
        contents:
          "As I gazed at my reflection I wondered, Where am I headed? Before that, though, the question was Where have I come to? Where is this place? No, before that even I needed to ask, Who the hell am I?",
        page: 31,
        zIndex: 0,
        width: 400,
        height: 100,
        styles: {
          backgroundColor: "#DF7868",
          textStyles: {
            fill: "#1a1b1d",
            wordWrap: true,
          },
        },
        position: { x: 100, y: 250 },
      },
      {
        id: uid(16),
        contents:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries",
        page: 152,
        position: { x: 120, y: 320 },
        zIndex: 0,
        height: 100,
        width: 400,
        styles: {
          textStyles: {
            fill: "#1a1b1d",
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
    id: "book2",

    lastUpdated: new Date(),
    notes: [],
  },

  {
    author: "Fyodor Dostoyevsky",
    title: "Crime and Punishment",
    totalPages: 490,
    currentPage: 461,
    isFinished: false,
    genre: ["Novel", "Psychological", "Crime", "Philosophical"],
    id: "book3",

    lastUpdated: new Date(),
    notes: [],
  },

  {
    author: "Anne Frank",
    title: "Diary of a Young Girl",
    totalPages: 365,
    currentPage: 250,
    isFinished: false,
    genre: ["Biography", "Autobiography", "Diary", "Personal Narrative"],

    lastUpdated: new Date(),
    id: "book4",

    notes: [],
  },
  {
    author: "Viktor Frankl",
    title: "Man's Search For Meaning",
    totalPages: 490,
    currentPage: 461,
    isFinished: false,
    genre: ["Biography", "Autobiography", "Personal Narrative"],
    id: "book5",

    lastUpdated: new Date(),
    notes: [],
  },
  {
    author: "Niccolo Machiavelli",
    title: "Prince",
    totalPages: 224,
    currentPage: 51,
    isFinished: false,
    genre: ["Autobiography", "History"],
    id: "book6",

    lastUpdated: new Date(),
    notes: [],
  },
  {
    author: "Osamu Dazai",
    title: "No Longer Human",
    totalPages: 262,
    currentPage: 152,
    isFinished: false,
    genre: ["Novel", "Fiction"],
    id: "book7",

    lastUpdated: new Date(),
    notes: [],
  },
];
