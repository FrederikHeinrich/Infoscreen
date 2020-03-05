import { extendObservable } from "mobx";

/**
 * UserStore
 *
 */

class ViewStore {
  constructor() {
    extendObservable(this, {
      content: []
    });
  }
}

export default new ViewStore();
