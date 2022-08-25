const events = require("events");
const contains = require("object-contains");
function conveyor() {
  let extension = {
    light: false,
    end: false,
    running: false,
    sleep: false,
    decrease: false,
    start: false,
    trash: [],
    index: 0,
    treasure: [],
    option: false,
  };
  let event = new events.EventEmitter();
  event.setMaxListeners(0);
  event.on("back$lab", (res) => {
    if (extension.treasure.length > 0) {
      event.emit(
        "$lab",
        res,
        extension.treasure.indexOf(res),
        extension.trash.includes(extension.treasure.indexOf(res))
      );
    }
  });
  /**
   * @description {callback} - this is $lab function that will be called when you add element or when you call next
   */
  this.$lab = function (callback) {
    if (extension.end)
      return console.error(
        new Error("Conveyor is end ! you should create new conveyor")
      );
    if (extension.running)
      return console.error(
        new Error(
          "Conveyor is already running ! you should create new conveyor"
        )
      );
    extension.decrease = extension.treasure.length;
    extension.running = true;
    event.on("$lab", callback);
  };
  /**
   * @description - go to next index if you want set timeout use like this : setTimeout(tacs.next, 1000);//second
   */
  this.next = function () {
    if (extension.end) return console.error(new Error("Conveyor is end !"));
    if (extension.sleep) return; //Conveyor is sleeping !
    const i = extension.decrease--;
    if (i == 0) extension.decrease = 0;
    if (extension.index == extension.treasure.length - 1) {
      extension.light = true;
      event.emit("end", extension.treasure);
      return;
    }
    extension.index++;
    extension.light = false;
    setTimeout(() => {
      extension.option = extension.treasure[extension.index];
      event.emit("back$lab", extension.treasure[extension.index]);
    }, 1);
    return;
  };
  /**
   * @description {element} - add element to the conveyor {element} is an array
   */
  this.add = function (element) {
    if (extension.end) return console.error(new Error("Conveyor is end !"));
    if (element.length == 0 && typeof element !== "string") return;
    extension.treasure = extension.treasure.concat(element);
    extension.decrease = element.length;
    if (extension.sleep) return; //Conveyor is sleeping !
    if (!extension.start && extension.index == 0) {
      event.emit("back$lab", extension.treasure[extension.index]);
      extension.start = true;
    } else if (extension.light) {
      extension.index++;
      setTimeout(() => {
        event.emit("back$lab", extension.treasure[extension.index]);
      }, 200);
    }
    setTimeout(() => {
      event.emit("add", element);
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
   * @description {event} -  add - end
   * @description {callback} - The events
   * @param {event_} add
   */
  this.on = function (event_, callback) {
    if (["add", "end"].includes(event_)) {
      event.on(event_, callback);
    } else {
      event.on(event_, "Event is not found !");
    }
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
   * @description - get Added Data or option or remove or exist
   */
  this.get = (element) => {
    return {
      added: [...extension.treasure],
      option: `${extension.option}`,
      remove: () => {
        extension.treasure.filter((value, index) => {
          const Primitive = contains(value, element)
            ? index
            : value == element
            ? index
            : false;
          if (index == Primitive) {
            extension.trash.push(index);
          }
        });
      },
      exist: () => {
        return extension.treasure.find((value, index) => {
          return contains(value, element)
            ? index
            : value == element
            ? index
            : false;
        })
          ? true
          : false;
      },
    };
  };
}
module.exports = conveyor;
