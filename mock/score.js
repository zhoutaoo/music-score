import Mock from 'mockjs'

export default {
  list: () => {
    const items = Mock.mock({
      'items|30': [{
        id: '@id',
        title: '@sentence(10, 20)',
        'status|1': ['published', 'draft', 'deleted'],
        author: 'name',
        display_time: '@datetime',
        pageviews: '@integer(300, 5000)'
      }]
    })
    return {
      code: 20000,
      data: items
    }
  },
  getInfo: () => {
    const scoreInfo = Mock.mock({
      name: '我们的故事',
      author: '当',
      key: 'A',
      beat: 4,
      note: 4,
      velocity: 88,
      doKey: '4s0f',
      sections: [
        {
          chords: ['1', '', '4', '6m'],
          type: 'intro', // chorus/middle/verse/bridge/end
          records: [['!.', 'uu', 'pQ', '/'], ['12', 'ee', 'rr', 'gg']],
          lyric: ['告诉', '我', '你', '']
        },
        {
          chords: ['6m', '', '5/7dim', ''],
          records: [['12', 'we', '22', '33'], ['12', '22', '33', '44']],
          lyric: ['的', '伤', '', '悲']
        },
        {
          chords: ['1', '', '', ''],
          records: [['!.', '', 'pQ', '/'], ['1', '', '', '']],
          lyric: ['告诉', '我', '你', '']
        },
        {
          chords: ['6m', '', '1/3m', ''],
          records: [['1', '', '', ''], ['1', '', '', '']],
          lyric: ['的', '伤', '', '悲']
        },
        {
          chords: ['6m', '', '1/3m', ''],
          type: 'chorus',
          records: [['1', '', '', ''], ['1', '', '', '']],
          lyric: ['的', '伤', '', '悲']
        },
        {
          chords: ['6m', '', '1/3m', ''],
          records: [['1', 'qq', 'a', 'a'], ['1', 'uu', 'ee', 'qq']],
          lyric: ['的', '伤', '', '悲']
        }
      ]
    })
    return {
      code: 20000,
      data: scoreInfo
    }
  }
}
