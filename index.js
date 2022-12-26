const events = require("events");
const contains = require("object-contains");
class Conveyor {
  #extension = {
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
  #event = new events.EventEmitter();
  constructor(key = false) {
    process.conveyor = process.conveyor || {};
    if (process.conveyor[key])
      throw new Error(
        `Conveyor is already exist ! use getConveyor("${key}") method`
      );
    this.#event.setMaxListeners(0);
    this.#event.on("back$lab", (res) => {
      if (this.#extension.treasure.length > 0) {
        setTimeout(() => {
          this.#event.emit(
            "$lab",
            res,
            this.#extension.index,
            this.#extension.trash.includes(this.#extension.index)
          );
        }, 1);
      }
    });
    if (key) {
      process.conveyor[key] = process.conveyor[key] || this;
    }
  }
  /**
   * @description {callback} - this is $lab function that will be called when you push element or when you call next
   */
  $lab(callback) {
    if (this.#extension.kill)
      throw new Error("Conveyor is kill ! you should create new Conveyor");
    if (this.#extension.running)
      throw new Error(
        "Conveyor is already running ! you should create new Conveyor"
      );
    this.#extension.decrease = this.#extension.treasure.length;
    this.#extension.running = true;
    this.#event.on("$lab", callback);
  }
  /**
   * @description - go to next index
   */
  next() {
    return new Promise((resolve, reject) => {
      if (this.#extension.kill)
        return reject(
          new Error("Conveyor is kill ! you should create new Conveyor")
        );
      if (this.#extension.sleep) return;
      const i = this.#extension.decrease--;
      if (i == 0) this.#extension.decrease = 0;
      if (this.#extension.index == this.#extension.treasure.length - 1) {
        resolve(this.#extension.treasure[this.#extension.index]);
        this.#extension.light = true;
        setTimeout(() => {
          this.#event.emit("end", this.#extension.treasure);
        }, 1);
        return;
      }
      this.#extension.index++;
      this.#extension.light = false;
      setTimeout(() => {
        this.#extension.option =
          this.#extension.treasure[this.#extension.index];
        this.#event.emit(
          "back$lab",
          this.#extension.treasure[this.#extension.index]
        );
        resolve(this.#extension.treasure[this.#extension.index]);
      }, 1);
    });
  }
  /**
   * @description {element} - push element to the conveyor {element} is an array
   */
  push(element) {
    return new Promise((resolve, reject) => {
      if (this.#extension.kill)
        return reject(
          new Error("Conveyor is kill ! you should create new Conveyor")
        );
      if (element.length == 0 && typeof element === "object") return;
      this.#extension.treasure = this.#extension.treasure.concat(element);
      this.#extension.decrease = element.length;
      // if ( this.#extension.sleep) return reject(new Error("Conveyor is sleeping !"));
      if (!this.#extension.start && this.#extension.index == 0) {
        setTimeout(() => {
          this.#event.emit(
            "back$lab",
            this.#extension.treasure[this.#extension.index]
          );
          resolve(this.#extension.treasure[this.#extension.index]);
        }, 1);
        this.#extension.start = true;
      } else if (this.#extension.light) {
        this.#extension.index++;
        setTimeout(() => {
          this.#event.emit(
            "back$lab",
            this.#extension.treasure[this.#extension.index]
          );
          resolve(this.#extension.treasure[this.#extension.index]);
        }, 200);
      }
      setTimeout(() => {
        this.#event.emit("push", element);
      }, 1);
      resolve(element);
    });
  }
  /**
   * @description {timeout} - sleep the conveyor {timeout} milliseconds later after timeout is over it wil be next automatically
   */
  sleep(timeout) {
    if (!timeout) return;
    this.#extension.sleep = true;
    setTimeout(() => {
      if (this.#extension.sleep) {
        this.#extension.sleep = false;
        this.next();
      }
    }, timeout);
  }
  /**
   * @description { this.#event} -  push - end
   * @description {callback} - The events
   * @param {event_} push
   */
  on(event_, callback) {
    if (["push", "end"].includes(event_)) {
      this.#event.on(event_, callback);
    } else {
      throw new Error("Event is not found ! use push or end !");
    }
  }
  /**
   * @description - kill the conveyor use this if you use this you can't use next() or any other function
   */
  kill() {
    setTimeout(() => {
      this.#event.emit("end", this.#extension.treasure);
    }, 1);
    this.#extension.kill = true;
    setTimeout(() => {
      this.#event.removeAllListeners();
    }, 1000);
    return;
  }
  /**
   * @description - get Pushed Data or option or remove or exist
   */
  get(element) {
    return {
      pushed: [...this.#extension.treasure],
      option: `${this.#extension.option}`,
      remove: () => {
        this.#extension.treasure.filter((value, index) => {
          const Primitive = contains(value, element)
            ? index
            : value == element
            ? index
            : false;
          if (!Primitive) return;
          if (
            typeof element === "number" ? value == element : index == Primitive
          ) {
            this.#extension.trash.push(index);
          }
        });
      },
      exist: () => {
        return this.#extension.treasure
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
  }
}
function getConveyor(key, upsert) {
  if (!key) throw new Error("key is required !");
  if (!process.conveyor) process.conveyor = {};
  if (key && upsert && !process.conveyor[key]) {
    process.conveyor[key] = new Conveyor(key);
  }
  if (!process.conveyor[key]) throw new Error("Conveyor is not found !");
  return process.conveyor[key];
}
module.exports = {
  Conveyor,
  getConveyor,
};
