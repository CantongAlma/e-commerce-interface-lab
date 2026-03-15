// Problem 1:
function checkVariable(input) {
    switch (typeof input) {
        case 'string':
            return 'string';
        case 'number':
            return 'number';
        case 'boolean':
            return 'boolean';
        case 'bigint':
            return 'bigint';
        case 'object':
            return 'object'; 
        default:
            return typeof input; 
    }
}
console.log(checkVariable("hello"));    
console.log(checkVariable(42));          
console.log(checkVariable(true));        
console.log(checkVariable(123n));        
console.log(checkVariable({}));         
console.log(checkVariable(null));        
console.log(checkVariable(undefined));   

// Problem 2: 
function generateIDs(count) {
    const ids = [];
    for (let i = 0; i < count; i++) {
        if (i === 5) {
            continue;d
        }
        ids.push(`ID-${i}`);
    }
    return ids;
}
console.log(generateIDs(7)); 

// Problem 3: 
function calculateTotal(...numbers) {
    for (let num of numbers) {
        if (typeof num !== 'number' || isNaN(num)) {
            throw new TypeError("Invalid input: All arguments must be numbers");
        }
    }
    return numbers.reduce((sum, num) => sum + num, 0);
}
console.log(calculateTotal(1, 2, 3, 5));  
console.log(calculateTotal(5.5, 2.3));    

// Problem 4:
function getTopScorers(playerList) {
    return playerList
        .filter(player => player.score > 8)     
        .map(player => player.name)             
        .join(', ');                             
}

// Expanded test data (up to 10 players as requested)
const players = [
    {name: "Alexa", score: 11},
    {name: "Bobby", score: 15},
    {name: "Charline", score: 7},
    {name: "Jena", score: 2},
    {name: "Ivan", score: 7},
    {name: "Francine", score: 10},
    {name: "Grace", score: 8},
    {name: "Hans", score: 15},
    {name: "Yvann", score: 5},
    {name: "Jack", score: 9}
];
console.log(getTopScorers(players)); 

// Problem 5:
class Item {
    #discount = 0.1; 
    
    constructor(name, price) {
        this.name = name;
        this.price = price;
    }
    
    get finalPrice() {
        return this.price * (1 - this.#discount);
    }
}
const laptop = new Item("Laptop", 1000);
const phone = new Item("Phone", 500);

console.log(`${laptop.name}: $${laptop.price} -> Final: $${laptop.finalPrice.toFixed(2)}`);
console.log(`${phone.name}: $${phone.price} -> Final: $${phone.finalPrice.toFixed(2)}`);

// Problem 6:
function safeDivide(a, b) {
    try {
        if (b === 0) {
            throw new Error("Cannot divide by zero");
        }
        return a / b; 
    } catch (error) {
        return error.message;  
    } finally {
        console.log("Operation attempted"); 
    }
}
console.log("10 ÷ 2 =", safeDivide(10, 2));    
console.log("10 ÷ 0 =", safeDivide(10, 0));     
console.log("8 ÷ 4 =", safeDivide(8, 4));       