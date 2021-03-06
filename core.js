'use strict';

var EventEmitter = require('events').EventEmitter;

var Core = function() {
  EventEmitter.call(this);

  var parts;

  this.getParts = function() {
      // movie name may be only a year
      if (parts.title == "" && typeof parts.year !== "undefined") {
          parts.title = parts.year.toString();
      }
    return parts;
  };

  this.on('setup', function () {
    parts = {};
  });

  this.on('part', function (part) {
    parts[part.name] = part.clean;
  });
};

Core.prototype = Object.create(EventEmitter.prototype);
Core.prototype.constructor = EventEmitter;

Core.prototype.exec = function(name) {
  this.emit('setup', {
    name: name
  });
  this.emit('start');
  this.emit('end');

  return this.getParts();
};

module.exports = new Core();
