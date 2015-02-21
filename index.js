(function(logSender) {
    "use strict";
    var rabbit = require("node-rabbitmq");

    function buildLog(type, message) {
        return {
            messageType: "logging",
            logType: type,
            logMessage: message
        };
    }

    function sendLog(log) {
    	rabbit.sendJson(log);
    }

    logSender.info = function(message) {
    	var log = buildLog("Info", message);
    	sendLog(log);
    };

    logSender.warn = function(message) {
    	var log = buildLog("Warn", message);
    	sendLog(log);
    };

    logSender.debug = function(message) {
    	var log = buildLog("Debug", message);
    	sendLog(log);
    };

    logSender.error = function(message) {
    	var log = buildLog("Error", message);
    	sendLog(log);
    };

})(module.exports);
