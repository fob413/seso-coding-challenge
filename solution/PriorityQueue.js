/** Class representing a Priority Queue */
class PriorityQueue {
    /**
     * Initialize a priority queue
     * @param compareFunction - Comparator function to calculate the priority of an item
     */
    constructor(compareFunction) {
        this.compareFunction = compareFunction;
        this.queue = [];
    }

    /**
     * Add an item to the queue based on priority
     * @param item - The item being added to the queue
     */
    enqueue (item) {
        this.queue.push(item);
        this.bubbleUp(this.queue.length - 1);
    }

    /**
     * Remove an item from the top of the queue
     * @returns {object} - The removed item from the queue
     */
    dequeue () {
        if (this.isEmpty()) {
            return null;
        }

        return this.queue.shift();
    }

    /**
     * Updates the position of the given item's index to maintain priority
     * @param index - The position of the item to be adjusted
     */
    bubbleUp (itemIndex) {
        while (itemIndex > 0) {
            const itemParentIndex = itemIndex - 1;

            if (this.compareFunction(this.queue[itemIndex], this.queue[itemParentIndex])) {
                this.swap(itemIndex, itemParentIndex);
                itemIndex = itemParentIndex;
            } else break;
        }
    }

    /**
     * Swap items in the queue
     * @param i - index position
     * @param j - index position
     */
    swap (i, j) {
        [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
    }

    /**
     * Checks if queue is empty
     * @returns {boolean}
     */
    isEmpty () {
        return this.queue.length === 0;
    }

    /**
     * Get the length of the queue
     * @returns {number}
     */
    length () {
        return this.queue.length;
    }

    /**
     * Get the first item in the queue
     * @returns {null|object} item in the queue
     */
    front () {
        if (this.isEmpty()) return null;
        return this.queue[0];
    }
}

module.exports = PriorityQueue;
