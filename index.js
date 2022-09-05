const events = require("events");
const contains = require("object-contains");
function conveyor() {
  let extension = {
    light: false,
    kill: false,
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
      setTimeout(() => {
        event.emit(
          "$lab",
          res,
          extension.index,
          extension.trash.includes(extension.index)
        );
      }, 1);
    }
  });
  /**
   * @description {callback} - this is $lab function that will be called when you add element or when you call next
   */
  this.$lab = function (callback) {
    if (extension.kill)
      return console.error(
        new Error("Conveyor is kill ! you should create new conveyor")
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
   * @description - go to next index
   */
  this.next = function () {
    return new Promise((resolve, reject) => {
      if (extension.kill) return reject(new Error("Conveyor is kill ! you should create new conveyor"));
      if (extension.sleep) return; //Conveyor is sleeping !
      const i = extension.decrease--;
      if (i == 0) extension.decrease = 0;
      if (extension.index == extension.treasure.length - 1) {
        extension.light = true;
        setTimeout(() => {
          event.emit("end", extension.treasure);
        }, 1);
        return;
      }
      extension.index++;
      extension.light = false;
      setTimeout(() => {
        extension.option = extension.treasure[extension.index];
        event.emit("back$lab", extension.treasure[extension.index]);
        resolve(extension.treasure[extension.index]);
      }, 1);
    });
  };
  /**
   * @description {element} - add element to the conveyor {element} is an array
   */
  this.add = function (element) {
    return new Promise((resolve, reject) => {
      if (extension.kill) return reject(new Error("Conveyor is kill ! you should create new conveyor"));
      if (element.length == 0 && typeof element === "object") return;
      extension.treasure = extension.treasure.concat(element);
      extension.decrease = element.length;
      if (extension.sleep) return; //Conveyor is sleeping !
      if (!extension.start && extension.index == 0) {
        setTimeout(() => {
          event.emit("back$lab", extension.treasure[extension.index]);
          resolve(extension.treasure[extension.index]);
        }, 1);
        extension.start = true;
      } else if (extension.light) {
        extension.index++;
        setTimeout(() => {
          event.emit("back$lab", extension.treasure[extension.index]);
          resolve(extension.treasure[extension.index]);
        }, 200);
      }
      setTimeout(() => {
        event.emit("add", element);
      }, 1);
      resolve(element);
    });
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
   * @description - kill the conveyor use this if you use this you can't use next() or any other function
   */
  this.kill = function () {
    setTimeout(() => {
      event.emit("end", extension.treasure);
    }, 1);
    extension.kill = true;
    setTimeout(() => {
      event.removeAllListeners();
    }, 1000);
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
          if (
            typeof element === "number" ? value == element : index == Primitive
          ) {
            extension.trash.push(index);
          }
        });
      },
      exist: () => {
        return extension.treasure
          .map((value, index) => {
            if (typeof element === "object" && contains(value, element)) {
              return true;
            } else if (value === element) {
              return true;
            }
          })
          .includes(true)
          ? true
          : false;
      },
    };
  };
}
module.exports = conveyor;
