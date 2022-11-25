  /**
  * Small ID generator, it uses epoch time as an ID.
  * @return - Returns the new ID to be used by app. 
  */
  export function generateId() {
    const result = Date.now();
    return result;
  }
