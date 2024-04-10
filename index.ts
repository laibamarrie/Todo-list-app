#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

// Initialize an empty array to store shopping items

let todos: string[] = [
  "Body mist",
  "Scrunchies",
  "Tote bag",
  "Rice",
  "Shampoo",
  "Foundation",
  "jewelry",
  "Shoes",
];

// Function to display all shopping items

function readTodos() {
  console.log(chalk.bold.magenta("Your Shopping List:"));
  let index = 0;
  while (index < todos.length) {
    const item = todos[index];
    console.log(`${chalk.cyan(index + 1)}. ${chalk.blue(item)}`);
    index++;
  }
}

// Function to add a new shopping item

async function addTodo() {
  const todoQuestion = await inquirer.prompt([
    {
      name: "newItem",
      type: "input",
      message: "What item would you like to include in your shopping list?",
    },
  ]);
  todos.push(todoQuestion.newItem);
  console.log(
    chalk.green("Successfully added the item to your shopping list!")
  );
}

// Function to update an existing shopping item

async function updateTodo() {
  readTodos();
  const itemsToUpdate = await inquirer.prompt([
    {
      name: "index",
      type: "input",
      message: "Please provide the index of the item you wish to update.",
    },
  ]);

  const updatedItem = await inquirer.prompt([
    {
      name: "updatedContent",
      type: "input",
      message: "Please enter the updated content for the item:",
    },
  ]);

  todos[itemsToUpdate.index - 1] = updatedItem.updatedContent;
  console.log(chalk.blueBright("Item updated successfully!"));
}

// Function to delete a shopping item

async function deleteTodo() {
  readTodos();
  const itemToDelete = await inquirer.prompt([
    {
      name: "index",
      type: "input",
      message: "Please provide the index of the item you'd like to remove:",
    },
  ]);

  todos.splice(itemToDelete.index - 1, 1);
  console.log(chalk.red("The item has been successfully removed!"));
}

// Main loop

async function main() {
  let condition = true;
  while (condition) {
    const action = await inquirer.prompt([
      {
        name: "choice",
        type: "list",
        message: "Choose an action:",
        choices: ["Add", "Read", "Update", "Delete", "Exit"],
      },
    ]);

    if (action.choice === "Add") {
      await addTodo();
    } else if (action.choice === "Read") {
      readTodos();
    } else if (action.choice === "Update") {
      await updateTodo();
    } else if (action.choice === "Delete") {
      await deleteTodo();
    } else if (action.choice === "Exit") {
      condition = false;
    } else {
      console.log("Invalid choice. Please try again.");
    }
  }
}

// Call the main function to start the program

main();
