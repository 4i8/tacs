declare module "tacs" {
  export type Events = "push" | "end";
  export class Conveyor {
    constructor(key: string[]);
    /**
     * @description {callback} - this is $lab function that will be emit when you push element or when you call next
     */
    $lab(
      callback: (element: string, index: number, remove: boolean) => any
    ): void;
    /**
     * @description go to next index
     */
    next(): Promise<void>;
    /**
     * @description {element} - push element to the conveyor {element} is an array
     */
    push(element: any): Promise<void>;
    /**
     * @description {timeout} - sleep the conveyor {timeout} milliseconds later after timeout is over it wil be next automatically
     */
    sleep(timeout: any): void;
    /**
     * @description {event} - push - end
     * @description {callback} - The events
     */
    on(event_: Events, callback: (element: string[]) => any): void;
    /**
     * @description - kill the conveyor use this if you use this you can't use next() or any other function
     */
    kill(): void;
    /**
     * @description - get Pushed Data or option or remove or exist
     */
    get(element: string[]): {
      pushed: any[];
      option: string;
      remove(): any;
      exist(): boolean;
    };
  }
  /**
   *
   * @param key - the key of the conveyor
   * @param upsert - if you want to create a new conveyor if it doesn't exist
   */
  export function getConveyor(
    key: string[],
    upsert: boolean
  ): {
    /**
     * @description {callback} - this is $lab function that will be emit when you push element or when you call next
     */
    $lab(
      callback: (element: string, index: number, remove: boolean) => any
    ): void;
    /**
     * @description go to next index
     */
    next(): Promise<void>;
    /**
     * @description {element} - push element to the conveyor {element} is an array
     */
    push(element: any): Promise<void>;
    /**
     * @description {timeout} - sleep the conveyor {timeout} milliseconds later after timeout is over it wil be next automatically
     */
    sleep(timeout: any): void;
    /**
     * @description {event} - push - end
     * @description {callback} - The events
     */
    on(event_: Events, callback: (element: string[]) => any): void;
    /**
     * @description - kill the conveyor use this if you use this you can't use next() or any other function
     */
    kill(): void;
    /**
     * @description - get Pushed Data or option or remove or exist
     */
    get(element: string[]): {
      pushed: any[];
      option: string;
      remove(): any;
      exist(): boolean;
    };
  };
}
