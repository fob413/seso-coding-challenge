"use strict";
const PriorityQueue = require("./PriorityQueue");

// Print all entries, across all of the sources, in chronological order.

module.exports = (logSources, printer) => {
  // initialize priority queue to merge logs in chronological order
  const priorityQueue = new PriorityQueue((a, b) => a.log.date < b.log.date);

  // fill priority queue with first log in each logSource (since logSource can be used as a linked list) according to priority (date)
  logSources.forEach((logSources, sourceIndex) => {
    const log = logSources.pop();

    if (log) priorityQueue.enqueue({ log, sourceIndex });
  });

  // merge and print logs in chronological order till all the logSources are drained
  while (!priorityQueue.isEmpty()) {
    const { log, sourceIndex } = priorityQueue.dequeue();
    printer.print(log);

    // get next log from logSource (being used as a linked list)
    const nextLog = logSources[sourceIndex].pop();
    if (nextLog) priorityQueue.enqueue({ log: nextLog, sourceIndex });
  }

  printer.done();
  return console.log("Sync sort complete.");
};
