exports.SOCKET_EVENTS = {
  // client --> server
  START_ROOM: 'START_ROOM',
  JOIN_ROOM: 'JOIN_ROOM',
  LEAVE_ROOM: 'LEAVE_ROOM',
  START_GAME: 'START_GAME',
  ADD_WORD_SCORE: 'ADD_WORD_SCORE',
  // server --> client
  UPDATE_ROOM_INFO: 'UPDATE_ROOM_INFO',
  TIMER_UPDATE: 'TIMER_UPDATE',
  END_GAME: 'END_GAME'
}

exports.TILES = [
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

exports.sampleGameState = {
  rooms: [
    {
      name: 'DaudRoom',
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
  ]
}
