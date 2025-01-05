/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
    namespace NodeJS {
      interface Global {
        _mongoClientPromise: Promise<any>;
      }
    }
  
    var _mongoClientPromise: Promise<any>;
  }
  
  export {};
  