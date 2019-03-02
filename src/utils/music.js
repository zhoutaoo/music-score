/**
 * 简谱唱名与音名对照表
 */
const tones = {
  '1': { song: 'do', syllable: 'C' },
  '2': { song: 're', syllable: 'D' },
  '3': { song: 'mi', syllable: 'E' },
  '4': { song: 'fa', syllable: 'F' },
  '5': { song: 'sol', syllable: 'G' },
  '6': { song: 'la', syllable: 'A' },
  '7': { song: 'si', syllable: 'B' }
}
/**
* 和弦级数对应和弦索引
*/
const chordSeries = { '1': 0, '2m': 1, '3m': 2, '4': 3, '5': 4, '6m': 5, '7dim': 6 }
/**
* 大调和弦对照表
*/
const chords = {
  'C#': ['C#', 'D#m', 'E#m', 'F#', 'G#', 'A#m', 'B#dim'],
  'F#': ['F#', 'G#m', 'A#m', 'B', 'C#', 'D#m', 'E#dim'],
  'B': ['B', 'C#m', 'D#m', 'E', 'F#', 'G#m', 'A#dim'],
  'E': ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'],
  'A': ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'],
  'D': ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'],
  'G': ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'],
  'C': ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'],
  'F': ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'],
  'Bb': ['Bb', 'Cm', 'Dm', 'Eb', 'F', 'Gm', 'Adim'],
  'Eb': ['Eb', 'Fm', 'Gm', 'Ab', 'Bb', 'Cm', 'Ddim'],
  'Ab': ['Ab', 'Bbm', 'Cm', 'Db', 'Eb', 'Fm', 'Gdim'],
  'Db': ['Db', 'Ebm', 'Fm', 'Gb', 'Ab', 'Bbm', 'Cdim'],
  'Gb': ['Gb', 'Abm', 'Bbm', 'C', 'Db', 'Ebm', 'Fbdim'],
  'Cb': ['Cb', 'Dbm', 'Ebm', 'Fb', 'Gb', 'Abm', 'Bbdim']

}

export function getTone(number) {
  return tones[number]
}

export function getChords(chord, number) {
  const seriesIndex = chordSeries[number]
  return chords[chord][seriesIndex]
}
