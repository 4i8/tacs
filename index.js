const events = require("events");
const contains = require("object-contains");
class Conveyor {
  constructor(key = false) {
    this.$Events = new events.EventEmitter();
    this.Extension = {
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
    process.conveyor = process.conveyor || {};
    if (process.conveyor[key])
      throw new Error(
        `Conveyor is already exist ! use getConveyor("${key}") method`
      );
    this.$Events.setMaxListeners(0);
    this.$Events.on("back$lab", (res) => {
      if (this.Extension.treasure.length > 0) {
        setTimeout(() => {
          this.$Events.emit(
            "$lab",
            res,
            this.Extension.index,
            this.Extension.trash.includes(this.Extension.index)
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
    if (this.Extension.kill)
      throw new Error("Conveyor is kill ! you should create new Conveyor");
    if (this.Extension.running)
      throw new Error(
        "Conveyor is already running ! you should create new Conveyor"
      );
    this.Extension.decrease = this.Extension.treasure.length;
    this.Extension.running = true;
    this.$Events.on("$lab", callback);
  }
  /**
   * @description - go to next index
   */
  next() {
    return new Promise((resolve, reject) => {
      if (this.Extension.kill)
        return reject(
          new Error("Conveyor is kill ! you should create new Conveyor")
        );
      if (this.Extension.sleep) return;
      const i = this.Extension.decrease--;
      if (i == 0) this.Extension.decrease = 0;
      if (this.Extension.index == this.Extension.treasure.length - 1) {
        resolve(this.Extension.treasure[this.Extension.index]);
        this.Extension.light = true;
        setTimeout(() => {
          this.$Events.emit("end", this.Extension.treasure);
        }, 1);
        return;
      }
      this.Extension.index++;
      this.Extension.light = false;
      setTimeout(() => {
        this.Extension.option = this.Extension.treasure[this.Extension.index];
        this.$Events.emit(
          "back$lab",
          this.Extension.treasure[this.Extension.index]
        );
        resolve(this.Extension.treasure[this.Extension.index]);
      }, 1);
    });
  }
  /**
   * @description {element} - push element to the conveyor {element} is an array
   */
  push(element) {
    return new Promise((resolve, reject) => {
      if (this.Extension.kill)
        return reject(
          new Error("Conveyor is kill ! you should create new Conveyor")
        );
      if (element.length == 0 && typeof element === "object") return;
      this.Extension.treasure = this.Extension.treasure.concat(element);
      this.Extension.decrease = element.length;
      // if ( this.Extension.sleep) return reject(new Error("Conveyor is sleeping !"));
      if (!this.Extension.start && this.Extension.index == 0) {
        setTimeout(() => {
          this.$Events.emit(
            "back$lab",
            this.Extension.treasure[this.Extension.index]
          );
          resolve(this.Extension.treasure[this.Extension.index]);
        }, 1);
        this.Extension.start = true;
      } else if (this.Extension.light) {
        this.Extension.index++;
        setTimeout(() => {
          this.$Events.emit(
            "back$lab",
            this.Extension.treasure[this.Extension.index]
          );
          resolve(this.Extension.treasure[this.Extension.index]);
        }, 200);
      }
      setTimeout(() => {
        this.$Events.emit("push", element);
      }, 1);
      resolve(element);
    });
  }
  /**
   * @description {timeout} - sleep the conveyor {timeout} milliseconds later after timeout is over it wil be next automatically
   */
  sleep(timeout) {
    if (!timeout) return;
    this.Extension.sleep = true;
    setTimeout(() => {
      if (this.Extension.sleep) {
        this.Extension.sleep = false;
        this.next();
      }
    }, timeout);
  }
  /**
   * @description { this.$Events} -  push - end
   * @description {callback} - The events
   * @param {event_} push
   */
  on(event_, callback) {
    if (["push", "end"].includes(event_)) {
      this.$Events.on(event_, callback);
    } else {
      throw new Error("Event is not found ! use push or end !");
    }
  }
  /**
   * @description - kill the conveyor use this if you use this you can't use next() or any other function
   */
  kill() {
    setTimeout(() => {
      this.$Events.emit("end", this.Extension.treasure);
    }, 1);
    this.Extension.kill = true;
    setTimeout(() => {
      this.$Events.removeAllListeners();
    }, 1000);
    return;
  }
  /**
   * @description - get Pushed Data or option or remove or exist
   */
  get(element) {
    return {
      pushed: [...this.Extension.treasure],
      option: `${this.Extension.option}`,
      remove: () => {
        this.Extension.treasure.filter((value, index) => {
          const Primitive = contains(value, element)
            ? index
            : value == element
            ? index
            : false;
          if (!Primitive) return;
          if (
            typeof element === "number" ? value == element : index == Primitive
          ) {
            this.Extension.trash.push(index);
          }
        });
      },
      exist: () => {
        return this.Extension.treasure
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
