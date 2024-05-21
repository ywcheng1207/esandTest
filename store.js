const store = {
  state: {
    count: 0,
    text: "milkmidi",
    someData: ["vue", "react"]
  },
  setState: (fnOrState) => {
    const newState =
      typeof fnOrState === "function"
        ? fnOrState(store.state)
        : fnOrState;
    store.state = {
      ...store.state,
      ...newState
    };
    store.listeners.forEach((listener) => {
      listener();
    });
  },
  listeners: new Set(),
  // subscribe：當state改變會觸發這個callback
  subscribe: (callback) => {
    store.listeners.add(callback);
    return () => {
      store.listeners.delete(callback);
    };
  },
  // getSnapshot：用來取得store裡面的state
  getSnapshot: () => store.state
};
export default store;