/*
 * Copyright 2015 MarkLogic Corporation
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

var winston = require('winston');
var PosixSyslog = require('winston-posix-syslog').PosixSyslog;

function LoggerFactory(identity, levels, options) {
  this.identity = identity;
  
  var syslog = new PosixSyslog({ identity: this.identity });
  var log = new winston.Logger({
    levels: LoggerFactory.levels,
    level: 'debug',
    transports: [syslog, new (winston.transports.Console)( {colorize: true} )]
  });

  // This looks to be the only way to effectively let the level threshold
  // TODO: Parameterize this
  log.transports.console.level  =  'debug';
  log.transports.posixSyslog.level = 'notice';

  this.logger = log;
}
// winston.config.syslog.levels is backwards (Huh?!)
// <https://github.com/flatiron/winston/commit/651b13e1952cbfc312bd72d26684c7ad552af00f>
// console.dir(winston.config.syslog.levels);
// { 
//   emerg: 0,
//   alert: 1,
//   crit: 2,
//   error: 3,
//   warning: 4,
//   notice: 5,
//   info: 6,
//   debug: 7 
// }
LoggerFactory.levels = {
  //'emergency': 7, // Not supported, at least on OS X
  'alert':       6,
  'crit':        5,
  'error':       4,
  'warn':        3,
  'notice':      2,
  'info':        1,
  'debug':       0
};

module.exports.LoggerFactory = LoggerFactory;