# parse-torrent-name [![Build Status](https://travis-ci.org/tetreum/parse-torrent-name.svg?branch=master)](https://travis-ci.org/tetreum/parse-torrent-name)

Parses torrent file name of a movie or TV show.
Updated version of https://github.com/jzjzjzj/parse-torrent-name

Being used in https://github.com/tetreum/media-identifier

**Possible parts extracted:**

- audio
- codec
- container
- episode
- episodeName
- excess
- extended
- garbage
- group
- hardcoded
- language
- proper
- quality
- region
- repack
- resolution
- season
- title
- website
- widescreen
- year

## Install:
```bash
$ npm install git+https://git@github.com/tetreum/parse-torrent-name.git
```

## Usage:
```javascript
var ptn = require('parse-torrent-name');

ptn('The.Staying.Alive.S05E02.720p.HDTV.x264-KILLERS[rartv]');
/*
{ season: 5,
  episode: 2,
  resolution: '720p',
  quality: 'HDTV',
  codec: 'x264',
  group: 'KILLERS[rartv]',
  title: 'The Staying Alive' }
*/

ptn('Captain Russia The Summer Soldier (2014) 1080p BrRip x264 - YIFY');
/*
{ year: 2014,
  resolution: '1080p',
  quality: 'BrRip',
  codec: 'x264',
  group: 'YIFY',
  title: 'Captain Russia The Summer Soldier' }
*/

ptn('AL.288-1.2014.HC.HDRip.XViD.AC3-juggs[ETRG]');
/*
{ year: 2014,
  quality: 'HDRip',
  codec: 'XViD',
  audio: 'AC3',
  group: 'juggs[ETRG]',
  hardcoded: true,
  title: 'AL 288-1' }
*/
```
