'use strict';

var core = require('../core');

require('./common');

var torrent, start, end, raw;

core.on('setup', function (data) {
  torrent = data;
  start = 0;
  end = undefined;
  raw = undefined;
});

core.on('part', function (part) {
  if(!part.match) {
    return;
  }

  if(part.match.index === 0) {
    start = part.match[0].length;

    return;
  }

  if(!end || part.match.index < end) {
    end = part.match.index;
  }
});

core.on('common', function () {
  var raw = end ? torrent.name.substr(start, end - start).split('(')[0] : torrent.name;
  var clean = raw;

  // clean up title
  clean = raw.replace(/^ -/, '');

  if(clean.indexOf(' ') === -1 && clean.indexOf('.') !== -1) {
    clean = clean.replace(/\./g, ' ');
  }

  clean = clean.replace(/_/g, ' ');
  clean = clean.replace(/([\(_]|- )$/, '').trim();

  // attempt to fix title ending
  if (["[", "]", ",", ".", "{", "}"].indexOf(clean.substr(-1)) !== -1) {
      clean = clean.substr(0, clean.length - 1);
  }

  clean = clean.trim();

  // GameOfThrones => Game Of Thrones (& ignore single uppercase cases like "Gamer")
  if (clean.indexOf(" ") === -1 && ((clean.length - 1) - clean.substr(1).replace(/[A-Z]/g, '').length) >= 1) {
      clean = clean.replace(/[A-Z]/g, function(m) { return " " + m;}).trim()
  }

  core.emit('part', {
    name: 'title',
    raw: raw,
    clean: clean
  });
});
