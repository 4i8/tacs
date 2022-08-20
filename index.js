const events = require("events");
function conveyor() {
  var option = false;
  let ClientData = [];
  let index = 0;
  let extension = {
    light: false,
    end: false,
    running: false,
    sleep: false,
    decrease: false,
    start: false,
  };
  let event = new events.EventEmitter();
  event.setMaxListeners(0);
  event.on("back$lab", (res) => {
    if (ClientData.length > 0) {
      event.emit("$lab", res);
    }
  });
  /**
   * @description {callback} - this is $lab function that will be called when you add data or when you call next
   */
  this.$lab = function (callback) {
    if (extension.end) return console.error(new Error("Conveyor is end !"));
    if (extension.running)
      return console.error(new Error("Conveyor is already running !"));
    extension.decrease = ClientData.length;
    extension.running = true;
    event.on("$lab", callback);
  };
  /**
   * @description {timeout} - go to next index if you use {timeout} milliseconds later after timeout is over it will be continue
   */
  this.next = function (timeout = 1) {
    if (extension.end) return console.error(new Error("Conveyor is end !"));
    if (extension.sleep) return; //Conveyor is sleeping !
    const i = extension.decrease--;
    if (i == 0) extension.decrease = 0;
    if (index == ClientData.length - 1) {
      extension.light = true;
      return;
    }
    index++;
    extension.light = false;
    setTimeout(
      () => {
        option = ClientData[index];
        event.emit("back$lab", ClientData[index]);
      },
      timeout ? timeout : 200
    );
    return;
  };
  /**
   * @description {data} - add data to the conveyor {data} is an array
   */
  this.add = function (data) {
    if (extension.end) return console.error(new Error("Conveyor is end !"));
    if (data.length == 0 && typeof data !== "string") return;
    ClientData = ClientData.concat(data);
    extension.decrease = data.length;
    if (!extension.start && index == 0) {
      event.emit("back$lab", ClientData[index]);
      extension.start = true;
    } else if (extension.light) {
      index++;
      setTimeout(() => {
        event.emit("back$lab", ClientData[index]);
      }, 200);
    }
    setTimeout(() => {
      event.emit("add", data);
    }, 1);
  };
  /**
   * @description {timeout} - sleep the conveyor {timeout} milliseconds later after timeout is over it wil be next automatically
   */
  this.sleep = function (timeout) {
    if (!timeout) return;
    extension.sleep = true;
    setTimeout(() => {
      if (extension.sleep) {
        extension.sleep = false;
        this.next();
      }
    }, timeout);
  };
  /**
   * @description {event} - add
   * @description {callback} - The events
   * @param {event_} add
   */
  this.on = function (event_, callback) {
    if (["add"].includes(event_)) {
      event.on(event_, callback);
    } else {
      event.on(event_, "Event is not found !");
    }
  };
  /**
   * @description - restart the conveyor use this and it will restart from the first index
   */
  this.restart = function () {
    if (extension.end) return console.error(new Error("Conveyor is end !"));
    this.add(ClientData);
  };
  /**
   * @description - end the conveyor use this if you use this you can't use next() or any other function
   */
  this.end = function () {
    extension.end = true;
    event.removeAllListeners();
    return;
  };
  /**
   * @description - get Added Data or option
   */
  this.get = () => {
    return { added: [...ClientData], option: `${option}` };
  };
}
module.exports = conveyor;
