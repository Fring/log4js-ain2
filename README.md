# log4js-ain2

An [Ain2][1] based Syslog transport for [log4js-node][0].

## Installation


``` bash  
  $ npm install log4js-ain2
```

## Usage
To use this Syslog transport in [log4js-node][0], you simply need to 'npm install' it and add it as an appender

Configuration file example: 
	{
		"appenders": [
			{
				type: 'log4js-ain2', 
				tag: 'SYSLOG_TAG', 
				facility: 'daemon', 
				hostname: 'SYSLOG_SERVER', 
				port: SYSLOG_PORT
			}
		]
	} 

Code example:

``` js

var log4js = require('log4js');

log4js.configure({
	appenders: [ 
		{ 
			type: 'log4js-ain2', 
			tag: 'SYSLOG_TAG', 
			facility: 'daemon', 
			hostname: 'SYSLOG_SERVER', 
			port: SYSLOG_PORT
		}
	]
});

var logger = log4js.getLogger('log4js-ain2-tester');


logger.trace('trace -Entering cheese testing');
logger.debug('debug - Got cheese.');
logger.info('info - Cheese is Gouda.');
logger.warn('warn - Cheese is quite smelly.');
logger.error('error -Cheese is too ripe!');
logger.fatal('fatal - Cheese was breeding ground for listeria.');

```

 NOTE: Options are passed through to ain2

## Log Levels

This is the mapping from [log4js-node][0] levels to [ain2][1] levels

ALL -> debug
TRACE -> debug
DEBUG -> debug
INFO -> info
WARN -> warn
ERROR -> err
FATAL -> crit

## Syslog (ain2) Configuration

See [ain2][1]


[0]: https://github.com/nomiddlename/log4js-node
[1]: https://github.com/phuesler/ain
