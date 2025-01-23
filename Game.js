

let dice = Math.floor(Math.random() * 6) + 1;

let dice20 = Math.floor(Math.random() * 20) + 1;

let playerName = prompt("Podaj swoje imię", "Bubol")

const eQItems = [ 
{knife: 
    {damage: 2,
    times: 2,
    cost: 1}
}, 
{sword: 
    {damage: 4,
    times: 1,
    cost: 2}
},
{battleAxe: 
    {damage: 5,
    times: 2,
    cost: 3}
},
{legendarySword: 
    {damage: 6,
    times: 4,
    cost: 1,
    healthOnUse: 2}
},
{shield: 
    {damage: 0,
    times: 1,
    cost: 1}
},
{staff: 
    {damage: 10,
    times: 1,
    cost: 3}
},
{magicznaKula: {
    damage: 20,
    times: 4,
    cost: 1}
}

]


const pickle = {
    healthOnUse: 2
}

const merchant = {
    talk: "Gadanie",
    shop: [eQItems[6], pickle],
    leave: rollDice
}


let chest = [5, {legendarySword: eQItems[3]}, "Rubbish", {pickle: pickle}, {battleAxe: eQItems[2]}, {shield:eQItems[4]}];

const classes = [
    {
        className: "Rogue",
        weapon: eQItems[0],
        health: 125,
        actions: 4,
        luck: 5,
        backpack: ["key"],
    },
    {
        className: "Knight",
        weapon: eQItems[1],
        health: 175,
        actions: 5,
        luck: 2,
        backpack: [eQItems[4]],
    },
    {
        className: "Mage",
        weapon: eQItems[5],
        health: 100,
        actions: 4,
        luck: 3,
        backpack: [eQItems[3]],
    }
]

let kill = 0;

let leave = false;

let attempts = 0;

let wybierzKlase = prompt("Choose Class: Knight, Rogue or Mage", "Mage")

while (wybierzKlase !== classes[0].className || classes[1].className || classes[2].className) {
    if (wybierzKlase === classes[0].className) {
        console.log(`You are ${classes[0].className} and your name is ${playerName}`)
        break;
    } else if (wybierzKlase === classes[1].className) {
        console.log(`You are ${classes[1].className} and your name is ${playerName}`)
        break;
    } else if (wybierzKlase === classes[2].className) {
        console.log(`You are ${classes[2].className} and your name is ${playerName}`)
        break;
    }
    
    if (attempts < 5) {
        attempts++
        wybierzKlase = prompt("It has to be Knight, Rogue or Mage")
    }
    else if (attempts >= 5 && attempts <= 15) {
        attempts++
        wybierzKlase = prompt("Omg dude! Knight, Rogue or Mage!")
    } else  if (attempts > 15) {
        attempts++
        wybierzKlase = prompt("DUDE!")
    }
}

let chosenOne;

if (wybierzKlase === classes[0].className) {
    chosenOne = classes[0];
} else if (wybierzKlase === classes[1].className) {
    chosenOne = classes[1];
} else {
    chosenOne = classes[2]
}

let frags = [];

let coin;

let reward = [];

let player = {
    name: playerName,
    money: parseInt(10 + kill + reward),
    class: wybierzKlase,
    weapon: chosenOne.weapon,
    health: chosenOne.health,
    actions: chosenOne.actions,
    luck: chosenOne.luck,
    backpack: chosenOne.backpack
}

let monsters = [];

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// List of different monster names
const monsterNames = [
  "Gargoyle",
  "Dragon",
  "Vampire",
  "Werewolf",
  "Banshee",
  "Kraken",
  "Sphinx",
  "Minotaur",
  "Hydra",
  "Cyclops",
  "Golem",
  "Giant"
  // Add more monster names as needed
];


// Flag to keep track if the Kraken has been created
let krakenCreated = false;

// Generating 50 different monsters
for (let i = 0; i < monsterNames.length; i++) {
  let monsterName = monsterNames[getRandomNumber(0, monsterNames.length - 1)];
  let health = getRandomNumber(1, 50);
  let damage = getRandomNumber(1, 30);

  // Check if the monster is a dragon and has less than 25 health
  if (monsterName === "Dragon" && health < 25) {
    monsterName = "Small Dragon";
    // Limiting damage for Small Dragon
    damage = Math.min(damage, 15);
  }

  // Check if the monster is a Kraken and if Kraken hasn't been created yet
  if (monsterName === "Kraken" && !krakenCreated) {
    // Cap health and damage for Kraken
    health = 50;
    damage = 30;
    krakenCreated = true; // Set flag to true after creating Kraken
  }
  
  if (krakenCreated === true) {
    monsterNames.remove("Kraken")
  }

  let monster = {
    monsterName: monsterName,
    health: health,
    damage: damage
  };
  monsters.push(monster);
}

// let monsters = [
//     {
//         monsterName: "Gargoyle",
//         health: 8,
//         damage: 2,
//     },
//     {
//         monsterName: "Imp",
//         health: 5,
//         damage: 1,
//     },
//     {
//         monsterName: "Dragon",
//         health: 25,
//         damage: 5,
//     },
//     {
//         monsterName: "Ghoul",
//         health: 7,
//         damage: 1.5,
//     },
//     {
//         monsterName: "Pixie",
//         health: 1,
//         damage: 2,
//     }

    
// ]

let monster = monsters[Math.floor(Math.random() * monsters.length) +1]


let rolls = 0;

let randomNumber = 20;
// let randomNumber = Math.floor(Math.random() * 20) + 1;

let chestDrop = Math.floor(Math.random() * chest.length);

// for (i = randomNumber/2; i <= randomNumber; i *= 2) {

// }

let decision;

let combat; 

let steps = 0;

function rollDice() {
    steps++
    if (randomNumber > 1 && randomNumber < 6 || randomNumber > 7 && randomNumber < 10) {
        monster = monsters[Math.floor(Math.random() * monsters.length)]
        console.log(`${monster.monsterName} is nearby!`)
        rolls++
        document.getElementById("encounter").classList.value = "block"
    } else if (randomNumber === 6) {
        function shuffleArray(array) {
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            return array;
        }
        chest = shuffleArray(chest);
        console.log(`There is a Chest!`)
        decision = prompt("Do you want to open it?")
        if (decision === "Yes") {
        for (let item of chest) {
            if (typeof item === 'number') {
                console.log(`Found ${item} coins!`);
                player.money += item;
                break;
            } else if (typeof item === 'string') {
                console.log(`Found a string: ${item}`);
                if (item === "Rubbish") {
                    player.backpack.push(item);
                }
                break;
            } else if (typeof item === 'object') {
                // Check if the object has a name
                let itemName = Object.keys(item)[0];
                if (itemName) {
                    console.log(`Found an object named ${itemName}:`);
                    console.log(item[itemName]);
                    player.backpack.push(item);
                    break;
                } else {
                    console.log("Found an unnamed object:", item);
                    break;
                }
            } else {
                console.log("Found something else:", item);
                return randomNumber = Math.floor(Math.random() * 20) + 1;
            }
        }
    }   else if (decision === "Break") {
        console.log("You destroyed Chest and acquired Rubbish")
        player.backpack.push("Rubbish")
        return randomNumber = Math.floor(Math.random() * 20) + 1;
    } 
        } else if (randomNumber === 20) {
            console.log("You have encountered a merchant!")
            leaveMerchant()
            leave = true;
        } else {
            console.log("Nothing is there, go further!")
        }
    return randomNumber = Math.floor(Math.random() * 20) + 1;
}

function leaveMerchant() {
                
    let leave = false;

    while (!leave) {
        let decyzja = parseInt(prompt(`What do you want to do next? Here are your options: \n1. Talk (${merchant.talk}) \n2. Shop \n3. Leave`));
        if (!isNaN(decyzja) && decyzja >= 1 && decyzja <= 3) {
            if (decyzja === 3) {
                console.log("Opuszczasz sklep!")
                leave = true;
                randomNumber = Math.floor(Math.random * 20) +1;
                rolls = 0;
                break;
            } else if (decyzja === 2) {
                console.log("Merchant: To są moje towary!");
                console.log("Available items:", merchant.shop);
                for (i = 0; i < merchant.shop[Object.keys(merchant.shop)]; i++) {
                    // weaponDamage = player.weapon[Object.keys(player.weapon)[0]].damage
                    for (const i in merchant) {
                    console.log(`${i}: \n${JSON.stringify(merchant.shop[Object.keys(merchant.shop)])}`);
                    console.log("dupa")
                }
            }
                itemIndex = prompt("Co chcesz kupić?")
                purchaseItem()
                function purchaseItem(player, merchant, itemIndex) {
                    // Check if the item index is valid
                    if (itemIndex >= 0 && itemIndex < merchant.shop.length) {
                        const selectedItem = merchant.shop[itemIndex];
                        const itemCost = selectedItem.cost;
                
                        // Check if the player has enough money to buy the item
                        if (player.money >= itemCost) {
                            // Deduct the item cost from the player's money
                            player.money -= itemCost;
                
                            // Add the purchased item to the player's backpack
                            player.backpack.push(selectedItem);
                
                            // Remove the purchased item from the merchant's shop
                            merchant.shop.splice(itemIndex, 1);
                
                            console.log(`You purchased ${Object.keys(selectedItem)[0]} for ${itemCost} coins.`);
                        } else {
                            console.log("You don't have enough money to buy this item.");
                        }
                    } else {
                        console.log("Invalid item index.");
                    }
                }
            } else if (decyzja === 1) {
                console.log(`Merchant: ${merchant.talk}. Gówno!`);
            } else {
                console.log("Merchant: What do you want to do next?");
            } 
        }
    }
}


// // Example usage
// console.log("Player's money before purchase:", player.money);
// console.log("Merchant's shop before purchase:", merchant.shop);

// // // Assuming the player wants to purchase the first item in the shop (index 0)
// // purchaseItem(player, merchant, 0);

// console.log("Player's money after purchase:", player.money);
// console.log("Player's backpack after purchase:", player.backpack);
// console.log("Merchant's shop after purchase:", merchant.shop);




function encounter() {
    if (rolls === 0) {
        console.log("There is nothing to fight jackass.")
    } else {
        // while (monster.health > 0) {
        console.log(`${playerName} fights with ${monster.monsterName}`) 
        let attack = prompt("Zaatakuj");
        if (attack === "Attack") {
            combat = true;
            let weaponDamage = player.weapon[Object.keys(player.weapon)[0]].damage // CHRYSTE PANIE JAK WYCIAGNAC DAMAGE Z OBECNIE UBRANEJ BRONI
            let weaponTimes = player.weapon[Object.keys(player.weapon)[0]].times
            let trueAttack = weaponDamage * weaponTimes;
            while (combat) {
                console.log(`You attacked for ${weaponDamage}, ${weaponTimes} times!`) 
                monster.health -= trueAttack; 
                if (trueAttack < monster.health) {
                    let monsterDamage = monster.damage;
                    player.health -= monsterDamage;
                    console.log(`${monster.monsterName} attacked you for ${monsterDamage}`)
                    attack = prompt("Jeszcze raz");
                } else if (trueAttack >= monster.health) {
                    attack;
                    kill++
                    coin = Math.floor(Math.random() * 100);
                    reward.push(parseInt(coin))
                    player.money += parseInt(kill + reward.pop([0]))
                    randomNumber = 0;
                    rolls = 0;
                    console.log(`You killed ${monster.monsterName}!`)
                    console.log(`You've got ${kill+coin} coins!`)
                    frags.push(monster.monsterName)
                    if (monster.health <= 0) {
                        monster.health = Math.floor(Math.random() * 30) +1;
                    }
                    if (monster.monsterName === "Dragon") {
                        monsters.pop(2)
                    }
                    monster = monsters[Math.floor(Math.random() * monsters.length)]
                    combat = false;
                    break;
                }
                if (player.health <= 0) {
                    console.log("Player is defeated by the monster...");
                    combat = false; // End combat loop
                    break;
                }
            }
            } else if (trueAttack >= monster.health) {
                    attack;
                    kill++
                    player.money += kill
                    randomNumber = 0;
                    rolls = 0;
                    console.log(`You killed ${monster.monsterName}!`)
                    console.log(`You've got ${kill} coins!`)
            } else if (attack === "Run") {
                trueAttack = 0;
                randomNumber = 0;
                rolls = 0;
                console.log("You run away!")
                combat = false;
        }
    }
    document.getElementById("encounter").classList.add("hidden")
}
        // monster = monsters[Math.floor(Math.random() * monsters.length)]
        // if (monster.health <= 0) {
        //     monster.health = Math.floor(Math.random() * 30)
        // }
        // combat = false;

        function chooseWeaponToEquip() {
            console.log("Available Weapons:");
            // Iterate over the backpack and display the weapons available for selection
            player.backpack.forEach((item, index) => {
                if (typeof item === 'object') {
                    let itemName = Object.keys(item)[0];
                    console.log(`${index + 1}: ${itemName}`);
                }
            });
        
            let choice = prompt("Enter the index of the weapon to equip:");
            if (choice === "Cancel") {
                console.log("Canceled.");
                return; // Cancel the function
            }
            choice = parseInt(choice)
            if (!isNaN(choice) && choice >= 1 && choice <= player.backpack.length) {
                // If there is a previously equipped weapon, put it back in the backpack
                if (player.weapon) {
                    player.backpack.push(player.weapon);
                }
                // Equip the chosen weapon and remove it from the backpack
                player.weapon = player.backpack.splice(choice - 1, 1)[0];
                console.log(`You equipped:`, player.weapon);
            } else {
                console.log("Invalid choice!");
            }
        }

            
    




function showMe() {
    // console.log(player)
    // // for (i = 0; i < size; i++) {
    // //     console.log(Object.values(player));
    // //     for (j = 0; j = size; j++) {
    // //         console.log(Object.keys(player))
    // //     }
    // // }
    for (const property in player) {
        console.log(`${property}: ${JSON.stringify(player[property])}`);
    }
}

function instructions() {
    console.log(`When monster is nearby: Encounter \n"Attack" - to attack \n"Run" - to run away`)
    console.log(`When you encounter a Chest: \n"Yes" \n"No" \n"Break"`)
}




// Perform actions based on user's choice
                // switch (choice) {
                //     case "talk":
                //         console.log(`Merchant: ${merchant.talk}`);
                //         break;
                //     case "shop":
                //         console.log("Merchant: Welcome to my shop!");
                //         console.log("Available items:", merchant.shop);
                //         break;
                //     case "leave":
                //         leave = false;
                //         merchant.leave();
                //         break;
                //     default:
                //         console.log("Merchant: What do you want to do next?");
                //         break;
                // }
    //     if (decision === "Yes") {
    //         if (chest[chestDrop] === Number) {
    //         player.money += chest[chestDrop]
    //         console.log(`You acquired ${chest[chestDrop]} coins!`)
    //         chestDrop = Math.floor(Math.random() * chest.length);
    //         return randomNumber = Math.floor(Math.random() * 20) + 1;
    //     } else {
    //         player.backpack.push(chest[chestDrop])
    //         if (chestDrop === 1) {
    //             console.log(`You acquired Legendary Sword!`)
    //             chestDrop = Math.floor(Math.random() * chest.length);
    //             return randomNumber = Math.floor(Math.random() * 20) + 1;
    //         } else if (chestDrop === 3) {
    //             console.log(`You acquired a pickle!`)
    //             chestDrop = Math.floor(Math.random() * chest.length);
    //             return randomNumber = Math.floor(Math.random() * 20) + 1;
    //         } else if (chestDrop === 4) { 
    //             console.log(`You acquired a Battle Axe!`)
    //             chestDrop = Math.floor(Math.random() * chest.length);
    //             return randomNumber = Math.floor(Math.random() * 20) + 1;
    //         }
    //         chestDrop = Math.floor(Math.random() * chest.length);
    //     }
    //     } else if (decision === "Break") {
    //             console.log("You destroyed Chest and acquired Rubbish")
    //             player.backpack.push("Rubbish")
    //     } else if (decision !== "Yes") {
    //         console.log("You decided not to open Chest and move along.")
    //     }
    //     return randomNumber = Math.floor(Math.random() * 10) + 1;
    // } else {
    //     console.log("Nothing happens, go futher");
    //     return randomNumber = Math.floor(Math.random() * 10) + 1;
    // }
    // while (!leave) {
    //     let decyzja = parseInt(prompt(`What do you want to do next? Here are your options: \n1. Talk (${merchant.talk}) \n2. Shop \n3. Leave`));
    //     // Check if the input is a valid number between 1 and 3
    //     if (!isNaN(decyzja) && decyzja >= 1 && decyzja <= 3) {
    //         decyzja = parseInt(prompt(`Zdecyduj się: \n1. \n2. \n3.`))// Break the loop if the input is valid
    //     }
    //     if (decyzja === 1) {
    //         console.log(`Merchant: ${merchant.talk}. Gówno!`);
    //     } else if (decyzja === 2) {
    //         console.log("Merchant: To są moje towary!");
    //         console.log("Available items:", merchant.shop);
    //     } else if (decyzja === 3) {
    //         // Activate the leave function
    //         merchant.leave();
    //         rolls = 0;
    //         leave = true;
    //         break;
    //         }
    //     else {
    //             console.log("Merchant: What do you want to do next?");  }
    //     }