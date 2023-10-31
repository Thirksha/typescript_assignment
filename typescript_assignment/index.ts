// Define the Payload interface
interface Payload {
    massKg: number;
}

// Astronaut class implementing the Payload interface
class Astronaut implements Payload {
    massKg: number;
    name: string;

    constructor(massKg: number, name: string) {
        this.massKg = massKg;
        this.name = name;
    }
}

// Cargo class implementing the Payload interface
class Cargo implements Payload {
    massKg: number;
    material: string;

    constructor(massKg: number, material: string) {
        this.massKg = massKg;
        this.material = material;
    }
}

// Rocket class
class Rocket {
    name: string;
    totalCapacityKg: number;
    cargoItems: Cargo[] = [];
    astronauts: Astronaut[] = [];

    constructor(name: string, totalCapacityKg: number) {
        this.name = name;
        this.totalCapacityKg = totalCapacityKg;
    }

    // Method to calculate the sum of masses of items
    sumMass(items: Payload[]): number {
        return items.reduce((acc, item) => acc + item.massKg, 0);
    }

    // Method to calculate current mass of the rocket
    currentMassKg(): number {
        return this.sumMass(this.astronauts) + this.sumMass(this.cargoItems);
    }

    // Method to check if an item can be added to the rocket
    canAdd(item: Payload): boolean {
        return this.currentMassKg() + item.massKg <= this.totalCapacityKg;
    }

    // Method to add cargo to the rocket
    addCargo(cargo: Cargo): boolean {
        if (this.canAdd(cargo)) {
            this.cargoItems.push(cargo);
            return true;
        }
        return false;
    }

    // Method to add astronaut to the rocket
    addAstronaut(astronaut: Astronaut): boolean {
        if (this.canAdd(astronaut)) {
            this.astronauts.push(astronaut);
            return true;
        }
        return false;
    }
}

// Run a simulation
// Create cargo and astronauts
const cargo1 = new Cargo(500, "Food Supplies");
const cargo2 = new Cargo(200, "Scientific Equipment");

const astronaut1 = new Astronaut(75, "John Doe");
const astronaut2 = new Astronaut(68, "Jane Smith");

// Create a rocket with a total capacity of 1000 Kg
const rocket = new Rocket("Saturn V", 1000);

// Check if cargo can be added and log the result
const isCargo1Added = rocket.addCargo(cargo1);
console.log("Cargo1 added successfully: " + isCargo1Added);

// Check if astronaut can be added and log the result
const isAstronaut1Added = rocket.addAstronaut(astronaut1);
console.log("Astronaut1 added successfully: " + isAstronaut1Added);
const isAstronaut2Added = rocket.addAstronaut(astronaut2);
console.log("Astronaut2 added successfully: " + isAstronaut2Added);

// Check if cargo2 can be added and log the result
const isCargo2Added = rocket.addCargo(cargo2);
console.log("Cargo2 added successfully: " + isCargo2Added);

// Print the current total mass of the rocket
console.log("Current rocket mass: " + rocket.currentMassKg() + " Kg");

