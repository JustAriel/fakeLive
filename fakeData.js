const fakeUsers = [
  { fakeUsername: 'john2453', id: 1, chat: [] },
  { fakeUsername: 'alice123', id: 2, chat: [] },
  { fakeUsername: 'emma567', id: 3, chat: [] },
  { fakeUsername: '🔱', id: 4, chat: [] },
  { fakeUsername: 'sophie456', id: 5, chat: [] },
  { fakeUsername: 'pro gamer', id: 6, chat: [] },
  { fakeUsername: 'nuh uhhhh', id: 7, chat: [] },
  { fakeUsername: 'R.I.P', id: 8, chat: [] },
  { fakeUsername: 'Mich2010', id: 9, chat: [] },
  { fakeUsername: 'Real', id: 10, chat: [] },
  { fakeUsername: '🎀🎀🎀', id: 11, chat: [] },
  { fakeUsername: 'ethan852', id: 12, chat: [] },
  { fakeUsername: 'user02938472', id: 13, chat: [] },
  { fakeUsername: 'noah357', id: 14, chat: [] },
  { fakeUsername: 'Someone', id: 15, chat: [] },
  { fakeUsername: 'Lo-Gan', id: 16, chat: [] },
  { fakeUsername: '❤️‍🔥AVA🔥', id: 17, chat: [] },
  { fakeUsername: 'user1938279', id: 18, chat: [] },
  { fakeUsername: 'XxX_Oliver_XxX', id: 19, chat: [] },
  { fakeUsername: 'Sophia💋', id: 20, chat: [] },
];

export const ChatMessages = [
  '🔥 Woah that was lit',
  'Keep crushing it',
  'Hows everyone doing? 😊',
  'Cheers from India 🇮🇳',
  'Youve got some 🔥 content',
  'Nah that was epic ngl',
  'Can I get a virtual autograph???????',
  "😂😂😂😂😂",
  "💀💀💀💀💀",
  "💀",
  "😂",
  "🔥",
  "🔥🔥🔥🔥🔥",
  "FIRSTTTTT",
  "sup bro",
  "Follow me back plz",
  "No way u said that💀😂",
  "here before its getting banned lol",
  "how did he get so many viewers huh",
  "STOP TF SPAMMing!!!!!1",
  "whats ur insta?",
  "ig?",
  "lambo or posrche",
  "name a coutry for an edit",
  "Русскоязычные?",
  "can somebody explain what mog means",
  "whats happening",
  "Why there is so many people with the same pfp.",
  "private chat??",
  "Follow @zexick in TikTok!"
];

export const randomPfp = [
  require('../images/NPF.jpg'),
  require('../images/RPFP1.jpeg'),
  require('../images/RPFP2.jpg'),
  require('../images/RPFP3.jpeg'),
  require('../images/RPFP4.jpeg'),
  require('../images/RPFP5.jpeg'),
  require('../images/RPFP6.jpg'),
  require('../images/RPFP7.jpeg'),
  require('../images/RPFP8.jpg'),
  require('../images/RPFP9.jpg'),
  require('../images/RPFP10.jpeg'),
  require('../images/RPFP11.jpeg'),
]

export const getFakeComment = () => {
  const randomUser = fakeUsers[Math.floor(Math.random() * fakeUsers.length)];
  const randomMessage = ChatMessages[Math.floor(Math.random() * ChatMessages.length)];
  const randomPfp = getRandomProfilePicture();

  return { user: randomUser.fakeUsername, message: randomMessage, pfp: randomPfp };
};

export const getRandomProfilePicture = () => {
  const randomNumber = Math.floor(Math.random() * randomPfp.length);
  return randomPfp[randomNumber];
};
