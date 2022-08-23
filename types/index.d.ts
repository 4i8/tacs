export = conveyor;
declare function conveyor(): void;
export declare type Events = "add";
declare class conveyor {
  /**
   * @description {callback} - this is $lab function that will be emit when you add data or when you call next
   */
  $lab(callback: (value: string, index: number) => any): void;
  /**
   * @description go to next index if you set timeout use like this : setTimeout(tacs.next, 1000);//second
   */
  next(): void;
  /**
   * @description {data} - add data to the conveyor {data} is an array
   */
  add(data: any): void;
  /**
   * @description {timeout} - sleep the conveyor {timeout} milliseconds later after timeout is over it wil be next automatically
   */
  sleep(timeout: any): void;
  /**
   * @description {event} - add
   * @description {callback} - The events
   * @param {event_} add
   */
  on(event_: Events, callback: any): void;
  /**
   * @description - end the conveyor use this if you use this you can't use next() or any other function
   */
  end(): void;
  /**
   * @description - get Added Data or option
   */
  get(): {
    added: any[];
    option: string;
  };
}
