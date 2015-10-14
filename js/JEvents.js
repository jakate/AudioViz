var JEventsSingl = function(){

    var self = this;
    var listeners = [];

    this.addEventListener = function(caller, eventName, callback){
        listeners.push({
            caller: caller,
            eventName: eventName,
            callback: callback
        });
    };

    this.removeEventListener = function(caller, eventName){
        listeners = _.reject(listeners, function(listener){
            return listener.eventName === eventName && listener.caller === caller;
        });
    };

    this.dispatchEvent = function(eventName, params) {
        var listener = _.each(listeners, function(listener){
            if(listener.eventName === eventName) {
                listener.callback(params);
            }
        });
    };

};

var JEvents = new JEventsSingl();
