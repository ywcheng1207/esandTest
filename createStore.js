// createStore.js
const createStore = (initialState) => {
  let state = initialState;
  const listeners = new Set();
  const getSnapshot = () => state;
  const setState = (fnOrState) => {
    const newState =
      typeof fnOrState === "function"
        ? fnOrState(state)
        : fnOrState;
    state = {
      ...state,
      ...newState
    };
    listeners.forEach((listener) => listener());
  };
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };
  return {
    getSnapshot,
    setState,
    subscribe
  };
};
export default createStore;