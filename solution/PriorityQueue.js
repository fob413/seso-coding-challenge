class PriorityQueue {
    constructor(compareFunction) {
        this.compareFunction = compareFunction;
        this.queue = [];
    }

    enqueue (item) {
        this.queue.push(item);
        this.bubbleUp(this.queue.length - 1);
    }

    dequeue () {
        if (this.isEmpty()) {
            return null;
        }

        return this.queue.shift();
    }

    bubbleUp (itemIndex) {
        while (itemIndex > 0) {
            const itemParentIndex = itemIndex - 1;

            if (this.compareFunction(this.queue[itemIndex], this.queue[itemParentIndex])) {
                this.swap(itemIndex, itemParentIndex);
                itemIndex = itemParentIndex;
            } else break;
        }
    }

    swap (i, j) {
        [this.queue[i], this.queue[j]] = [this.queue[j], this.queue[i]];
    }

    isEmpty () {
        return this.queue.length === 0;
    }

    length () {
        return this.queue.length;
    }
}

module.exports = PriorityQueue;
