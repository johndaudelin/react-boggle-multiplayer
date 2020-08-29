export const CUBES = [
  'AAEEGN',
  'ELRTTY',
  'AOOTTW',
  'ABBJOO',
  'EHRTVW',
  'CIMOTU',
  'DISTTY',
  'EIOSST',
  'DELRVY',
  'ACHOPS',
  'HIMNQU',
  'EEINSU',
  'EEGHNW',
  'AFFKPS',
  'HLNNRZ',
  'DEILRX'
]

export const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

export const API_KEY = '7d9f1980-6810-488c-8baf-0e61bd2dd99b'

export const SERVER_ENDPOINT =
  'https://production.d324d45jc784u4.amplifyapp.com:4001'

export const Actions = {
  INITIALIZE_SCORECARD: 'INITIALIZE_SCORECARD',
  INITIALIZE_BOARD: 'INITIALIZE_BOARD',
  INITIALIZE_TIMER: 'INITIALIZE_TIMER',
  DECREASE_TIMER: 'DECREASE_TIMER',
  REMOVE_FROM_CURRENT_WORD: 'REMOVE_FROM_CURRENT_WORD',
  ADD_WORD: 'ADD_WORD',
  CHANGE_CURRENT_WORD: 'CHANGE_CURRENT_WORD',
  RESET_CURRENT_WORD: 'RESET_CURRENT_WORD',
  CHANGE_USERNAME: 'CHANGE_USERNAME',
  UPDATE_ROOM: 'UPDATE_ROOM',
  CHANGE_MODE: 'CHANGE_MODE'
}

export const defaultState = {
  userName: '',
  mode: 'multi',
  scorecard: [],
  currentWord: [],
  singlePlayer: {
    board: [],
    timer: 90
  },
  room: null
}

// For reference only. Not used in game code.
export const sampleState = {
  userName: 'John',
  mode: 'multi',
  scorecard: [
    {
      word: 'cat',
      score: '1'
    },
    {
      word: 'that',
      score: '1'
    },
    {
      word: 'eat',
      score: '1'
    },
    {
      word: 'cheat',
      score: '2'
    }
  ],
  currentWord: [
    [1, 3],
    [0, 7]
  ],
  singlePlayer: {
    timer: 90,
    board: [
      'Z',
      'A',
      'E',
      'H',
      'E',
      'T',
      'C',
      'S',
      'A',
      'X',
      'Y',
      'I',
      'T',
      'H',
      'A',
      'Q'
    ]
  },
  room: {
    name: 'Room1',
    players: [
      {
        name: 'John',
        scorecard: [
          {
            word: 'cat',
            score: '1'
          },
          {
            word: 'that',
            score: '1'
          },
          {
            word: 'eat',
            score: '1'
          },
          {
            word: 'cheat',
            score: '2'
          }
        ]
      },
      {
        name: 'Daniel',
        scorecard: [
          {
            word: 'eat',
            score: '1'
          },
          {
            word: 'ate',
            score: '1'
          }
        ]
      }
    ],
    waitingForPlayers: false,
    activeGame: false,
    timer: 90,
    board: [
      'Z',
      'A',
      'E',
      'H',
      'E',
      'T',
      'C',
      'S',
      'A',
      'X',
      'Y',
      'I',
      'T',
      'H',
      'A',
      'Q'
    ]
  }
}
