"use strict";
const PriorityQueue = require("./PriorityQueue");

// Print all entries, across all of the *async* sources, in chronological order.

module.exports = (logSources, printer) => {
  return new Promise(async (resolve, reject) => {
    /// initialize priority queue to merge logs in a chronological order
    const priorityQueue = new PriorityQueue((a, b) => a.log.date < b.log.date);

    /**
     * Asynchronous function to retrieve log from log source and add to priority queue
     * @param logSource
     * @param index
     * @returns {Promise<void>}
     */
    const fetchLog = async (logSource, index) => {
      let log = await logSource.popAsync();

      if (log) {
        priorityQueue.enqueue({ log, sourceIndex: index });
      }
    };

    // asynchronously fetch and add first log in each logSource (since logSource can be used as a linked list) to priority queue
    await Promise.all(logSources.map((logSource, index) => fetchLog(logSource, index)));

    // merrge and print logs in chronological order till all the logSources are drained
    while (!priorityQueue.isEmpty()) {
      const { log, sourceIndex } = priorityQueue.dequeue();
      printer.print(log);

      // get next log from logSource
      const nextLog = await logSources[sourceIndex].popAsync();
      if (nextLog) priorityQueue.enqueue({ log: nextLog, sourceIndex });
    }

    printer.done();
    resolve(console.log("Async sort complete."));
  });
};
