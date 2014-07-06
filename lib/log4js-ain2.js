var log4js = require('log4js')
var SysLogger = require('ain2');


// From ain2 file
var Severity = {
    emerg:  0,
    alert:  1,
    crit:   2,
    err:    3,
    warn:   4,
    notice: 5,
    info:   6,
    debug:  7
};


var levels = {}
levels[log4js.levels.ALL] = Severity['debug'];
levels[log4js.levels.TRACE] = Severity['debug'];
levels[log4js.levels.DEBUG] = Severity['debug'];
levels[log4js.levels.INFO] = Severity['info'];
levels[log4js.levels.WARN] = Severity['warn'];
levels[log4js.levels.ERROR] = Severity['err'];
levels[log4js.levels.FATAL] = Severity['crit'];


function getSyslogLevel(level) {
	return level && levels[level] ? levels[level] : levels[log4js.levels.ERROR];
}

/**
* SYSLOG appender
* 
*
* @param config appender configuration data
* @param layout a function that takes a logevent and returns a string (defaults to basicLayout). 
*/
function syslogAin2Appender(config, layout) {

	var ourLayout = function (loggingEvent) {
		e = loggingEvent;
		e.data = e.categoryName + ' - ' + e.data;

    	return log4js.layouts.messagePassThroughLayout(e);
	}

	var layout = config && config.layout ? config.layout : ourLayout; 

	var sysLog = new SysLogger(config);

	return function(loggingEvent) {		
		sysLog.send(layout(loggingEvent), getSyslogLevel(loggingEvent.level))
	};
}

function configure(config, options) {
	var layout;
	if (config.layout) {
		layout = log4js.layouts.layout(config.layout.type, config.layout);
	}
	return syslogAin2Appender(config, layout);
}

exports.name = "log4js-ain2";
exports.appender = syslogAin2Appender;
exports.configure = configure;

