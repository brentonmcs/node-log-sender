(function(logSender) {
    'use strict';
    var rabbit = null;

    logSender.configure = function(rabbitQueue) {
        rabbit = rabbitQueue;
    };

    function buildLog(type, message) {
        return {            
            logType: type,
            logMessage: message,
            logDate: new Date()
        };
    }

    function sendLog(log) {
        rabbit.sendJson(log, 'logging');
    }

    logSender.info = function(message) {
        var log = buildLog('Info', message);
        sendLog(log);
    };

    logSender.warn = function(message) {
        var log = buildLog('Warn', message);
        sendLog(log);
    };

    logSender.debug = function(message) {
        var log = buildLog('Debug', message);
        sendLog(log);
    };

    logSender.error = function(message) {
        var log = buildLog('Error', message);
        rabbit.sendJson({
            messageType: 'error',
            message: message
        });
        sendLog(log);
    };

})(module.exports);
