exports.NetworkRequestManager = class NetworkRequestManager {
  constructor(page) {
    this.page = page;
    this.pendingRequests = new Set();
    this.requestStarted = (request) => this.pendingRequests.add(request);
    this.requestFinished = (request) => this.pendingRequests.delete(request);
  }
  
  async registerEventListeners() {
    this.page.on('request', this.requestStarted.bind(this));
    this.page.on('requestfinished', this.requestFinished.bind(this));
    this.page.on('requestfailed', this.requestFinished.bind(this));
  }
  
  async waitForAllNetworkRequests(waitFor = 10000) {
    await Promise.race([
      new Promise((resolve) => {
        const interval = setInterval(() => {
          if (this.pendingRequests.size === 0) {
            clearInterval(interval);
            resolve();
          }
        }, 100);
      }),
      new Promise((resolve) => setTimeout(resolve, waitFor)),
    ]);
  
    this.page.off('request', this.requestStarted);
    this.page.off('requestfinished', this.requestFinished);
    this.page.off('requestfailed', this.requestFinished);
  }
  
  async waitForDOMStability(timeout = 500) {
    let timer;
    let observer;
  
    return new Promise((resolve) => {
      timer = setTimeout(() => {
        observer.disconnect();
        resolve();
      }, timeout);
  
      observer = new MutationObserver(() => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          observer.disconnect();
          resolve();
        }, timeout);
      });
  
      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });
    });
  }
};
  