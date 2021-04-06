export const fakeUser = {
  photo: '1058018-1605202147364.jpg',
  role: 'user',
  favourites: [
    '5f96f8ace4a805321cb276cd',
    '5f96f8ace4a805321cb276c7',
    '5f96f8ace4a805321cb276d1',
    '5f96f8ace4a805321cb276cb',
    '5f96f8ace4a805321cb276d2',
    '5f96f8ace4a805321cb276cc',
    '5f96f8ace4a805321cb276d3',
    '5f96f8ace4a805321cb276c5',
    '5f96f8ace4a805321cb276c9',
    '5f96f8ace4a805321cb276cf',
    '5f96f8ace4a805321cb276ca',
  ],
  currents: ['5f96f8ace4a805321cb276ca', '5f96f8ace4a805321cb276c8'],
  completed: [
    '5f96f8ace4a805321cb276cc',
    '5f96f8ace4a805321cb276c9',
    '5f96f8ace4a805321cb276cd',
    '5f96f8ace4a805321cb276d1',
    '5f96f8ace4a805321cb276c5',
    '5f96f8ace4a805321cb276cb',
    '5f96f8ace4a805321cb276c7',
    '5f96f8ace4a805321cb276d3',
  ],
  planned: ['5f96f8ace4a805321cb276c5', '5f96f8ace4a805321cb276d2'],
  onHold: [
    '5f96f8ace4a805321cb276cc',
    '5f96f8ace4a805321cb276ca',
    '5f96f8ace4a805321cb276cd',
    '5f96f8ace4a805321cb276d1',
    '5f96f8ace4a805321cb276c7',
    '5f96f8ace4a805321cb276c5',
    '5f96f8ace4a805321cb276d2',
  ],
  dropped: [
    '5f96f8ace4a805321cb276cc',
    '5f96f8ace4a805321cb276c9',
    '5f96f8ace4a805321cb276ce',
  ],
  _id: '5f5210697b01fb26b027f027',
  name: 'Rafaello The Turtle',
  email: 'rafaello@example.com',
  __v: 0,
  passwordChangedAt: '2020-11-12T16:28:36.347Z',
};

export const fakeTitle = {
  onGoing: {
    day: 'sunday',
    time: '8:45 PM',
    emitting: true,
  },
  seasons: [1],
  rating: 9.9,
  description:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adaccusantium expedita neque tempore molestiae vel aliquam, teneturvoluptatum temporibus. Cumque eveniet minus corporis debitis,optio est, earum nisi, natus veniam cupiditate delectus iusto.Odio doloribus adipisci nihil quod numquam quas.',
  genre: ['Triller', 'Drama', 'Supernatural'],
  _id: '5f96f8ace4a805321cb276d3',
  name: 'Death Note',
  episodes: 43,
  aired: 2006,
  class: 'R+',
  dub: true,
  author: 'Koyoharu Gotōge',
  license: 'Wakanim',
  image: 'death-note.jpg',
  slug: 'death-note',
  commentsQuantity: 1,
  id: '5f96f8ace4a805321cb276d3',
};

export const fakeTitle2 = {
  onGoing: {
    day: 'tuesday',
    time: '9:00 PM',
    emitting: true,
  },
  seasons: [1, 2],
  rating: 9.8,
  description:
    'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Adaccusantium expedita neque tempore molestiae vel aliquam, teneturvoluptatum temporibus. Cumque eveniet minus corporis debitis,optio est, earum nisi, natus veniam cupiditate delectus iusto.Odio doloribus adipisci nihil quod numquam quas.',
  genre: ['Seinen', 'Comedy', 'Supernatural', 'Power'],
  _id: '5f96f8ace4a805321cb276ca',
  name: 'One Punch Man',
  episodes: 12,
  aired: 2018,
  class: 'PG',
  dub: true,
  author: 'Koyoharu Gotōge',
  license: 'Wakanim',
  image: 'one-punch-man.jpg',
  slug: 'one-punch-man',
  commentsQuantity: 0,
  id: '5f96f8ace4a805321cb276ca',
};

export const fakeComment = {
  createdAt: '2020-11-24T16:50:01.587Z',
  _id: '5fbd39d6b6ad7420c05d1290',
  comment: 'The Friday 13th',
  title: {
    _id: '5f96f8ace4a805321cb276cc',
    name: 'Bleach',
    image: 'bleach.jpg',
    slug: 'bleach',
    id: '5f96f8ace4a805321cb276cc',
  },
  user: {
    photo: '1058018-1605202147364.jpg',
    _id: '5f5210697b01fb26b027f027',
    name: 'Rafaello The Turtle',
  },
  id: '5fbd39d6b6ad7420c05d1290',
};

export const fakeComment2 = {
  createdAt: '2020-11-22T15:18:36.770Z',
  _id: '5fba8174d2c6980017c998d0',
  comment: 'Коментар до Львова',
  title: {
    _id: '5f96f8ace4a805321cb276d3',
    name: 'Death Note',
    image: 'death-note.jpg',
    slug: 'death-note',
    id: '5f96f8ace4a805321cb276d3',
  },
  user: {
    photo: 'IMG_20201116_105143_571-1605527767103.jpg',
    _id: '5fb268cc91eaf10017f24948',
    name: 'Donatello',
  },
  id: '5fba8174d2c6980017c998d0',
};