if (!('initialized' in localStorage)) {
  localStorage['initialized'] = true;

  var colors = {
   'pastels': [
      '#66c2a5',
      '#fc8d62',
      '#8da0cb',
      '#e78ac3',
      '#a6d854'
    ],
    'purple green': [
      '#7b3294',
      '#c2a5cf',
      '#f7f7f7',
      '#a6dba0',
      '#008837'
    ],
    'orange purple': [
      '#e66101',
      '#fd8863',
      '#f7f7f7',
      '#b2abd2',
      '#5e3c99'
    ],
    'soft reds': [
      '#fef0d9',
      '#fdcc8a',
      '#fc8d59',
      '#e34a33',
      '#b30000'
    ],
    'teals': [
      '#f6eff7',
      '#bdc9e1',
      '#67a9cf',
      '#1c9099',
      '#016c59'
    ],
    'grayscale': [
      '#f7f7f7',
      '#cccccc',
      '#969696',
      '#636363',
      '#252525'
    ]
  }
  _(colors).each(function(v,k) {
  Palettes.create({
    name: k,
    colors: v
  })
  });
}
