const PriorityQueue = require("../solution/PriorityQueue");


const items = [
    { value: 3 },
    { value: 6 },
    { value: 2 },
    { value: 6 }
];

describe("Priority Queue", () => {
    const compareFunction = (a, b) => a.value < b.value;
    const priorityQueue = new PriorityQueue(compareFunction);

    beforeAll(() => items.forEach(item => priorityQueue.enqueue(item)));

    test("should enqueue an item to the queue", () => {
        priorityQueue.enqueue({ value: 7 });

        expect(priorityQueue.length()).toBe(5);
        expect(priorityQueue.isEmpty()).toBeFalsy();
    });

    test("should place queued item in its appropriate position based on priority", () => {
       priorityQueue.enqueue({ value: 1 });

       expect(priorityQueue.front()).toStrictEqual({ value: 1 });
       expect(priorityQueue.isEmpty()).toBeFalsy();
    });

    test("should dequeue an item from the queue", () => {
        const dequeuedItem = priorityQueue.dequeue();

        expect(priorityQueue.length()).toBe(5);
        expect(dequeuedItem).toStrictEqual({ value: 1 });
        expect(priorityQueue.isEmpty()).toBeFalsy();
    });

    test("should be able to give a status if the queue is empty or not", () => {
        priorityQueue.dequeue();
        priorityQueue.dequeue();
        priorityQueue.dequeue();
        priorityQueue.dequeue();
        priorityQueue.dequeue();

        expect(priorityQueue.isEmpty()).toBeTruthy();
        expect(priorityQueue.length()).toBe(0);
    });

    test("should not throw an error when attempting to dequeue an empty queue", () => {
        const dequeuedItem = priorityQueue.dequeue();
        expect(dequeuedItem).toBeNull();
        expect(priorityQueue.length()).toBe(0);
    });
})
