import { extendObservable } from "mobx";

/**
 * UserStore
 *
 */

class ViewStore {
  constructor() {
    extendObservable(this, {
      loading: true,
      isShowing: false,
      viewid: 0,
      location: "",
      name: "",
      token: "",
      data: []
    });
  }
}

export default new ViewStore();
