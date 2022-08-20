export = conveyor;
declare function conveyor(): void;
declare class conveyor {
  /**
   * @description - get Added Data or option
   */
  get: () => {
    added: any[];
    option: string;
  };
  /**
   * @description {callback} - The lab function is activated when you add data by calling the function add or when you call the function next
   */
  lab: (callback: any) => void;
  /**
   * @description {event} - add - end
   * @description {callback} - Callback function is activated when you add data or the conveyor is end
   */
  on: (event_: any, callback: any) => void;
  /**
   * @description {timeout} - go to the next data {timeout} milliseconds later after timeout is over
   */
  next: (timeout?: number) => void;
  /**
   * @description {data} - add data to the conveyor {data} is an array
   */
  add: (data: any) => void;
  /**
   * @description - end the conveyor
   */
  end: () => void;
  /**
   * @description {timeout} - sleep the conveyor {timeout} milliseconds later after timeout is over it will be wake up
   */
  sleep: (timeout: any) => void;
  /**
   * @description - restart the conveyor
   */
  restart: () => void;
}
