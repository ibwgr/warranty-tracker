class EventHandler {

  constructor() {
    this.addEventListener = this.addEventListener.bind(this);
    this.removeEventListener = this.removeEventListener.bind(this);
    this.fireEvent = this.fireEvent.bind(this);

    this.listeners = {};
  }

  addEventListener(event, callback) {
    let eventListeners = this.listeners[event];

    if (!eventListeners) {
      eventListeners = [];
      this.listeners[event] = eventListeners;
    }

    eventListeners.push(callback);
  }

  removeEventListener(event, callback) {
    const eventListeners = this.listeners[event];

    if (eventListeners) {
      this.listeners[event] = eventListeners.filter((el) => el !== callback);
    }
  }

  fireEvent(event, detail = null) {
    const params = { detail };
    const eventListeners = this.listeners[event];
    if (eventListeners) {
      eventListeners.forEach((callback) => {
        if (typeof callback === 'function') {
          callback(params);
        }
      });
    }
  }
}

export const eventHandler = new EventHandler();
export const event_delete_entry = 'view:deleteEntry';


