# React Native Task

## Overview
This project is a **React Native application** that consists of three main tasks:

1. **To-Do List App** - A task management system that allows users to add, retrieve, update, and delete tasks.
2. **Fetch and Display API Data** - Fetches posts from an external API and displays them in a list.
3. **Navigation** - Implements navigation between the To-Do List and API data display screens.

## Features

### Task 1: To-Do List App
- Uses a state management library (**Context API**)
- Stores tasks locally using **AsyncStorage**
- Features **error handling** and **input validation**
- UI components:
  - **TextInput** for task entry
  - **Add Task Button**
  - **Clear Button**
  - **FlatList** for displaying tasks
  - **Task Items** with edit, complete, and delete buttons
- Clean and simple UI design with clear labels

### Task 2: Fetch and Display Data from an API
- Uses **Axios** to get data from:
  - **Endpoint**: `https://jsonplaceholder.typicode.com/posts`
- Implements **loading indicator** using `ActivityIndicator`
- Handles errors gracefully and displays appropriate messages
- UI components:
  - **FlatList** for displaying posts
  - **Post Items** displaying title and body
  - **Loading Spinner** for better user experience

### Task 3: Navigation
- Uses **React Navigation** for smooth navigation between screens
- Includes a **navigation header** with buttons or tabs
- Provides a **clear and responsive UI** for switching between screens

### Task 4: Logical Reasoning and Algorithm
- Implements a function in JavaScript to identify the longest substring within a given string that contains no repeating characters.
- This task is a standalone algorithmic challenge independent of the main app.
- The function should:
  - Accept a single string as input.
  - Return the longest substring without repeating characters.
  - Optimize for efficiency.
- Example:
  ```js
  console.log(longestUniqueSubstring("pwwkew")); // Output: "wke"
  ```
- The function is stored in `src/screens/Task4.js`.
- To run the function, navigate to its location and execute:
  ```sh
  cd src/screens
  node Task4.js
  ```


## Installation and Setup

### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- React Native CLI or Expo CLI
- Android Studio/Xcode (for emulator)

### Steps to Run the Project
1. Clone the repository:
   ```sh
   git clone https://github.com/Pooja-Gajjar06/TodoAppDemo.git
   cd TodoAppDemo
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Metro Bundler:
   ```sh
   npx react-native start
   ```
4. Run the app on an emulator or device:
   ```sh
   npx react-native run-android  # For Android
   npx react-native run-ios      # For iOS
   ```

## Technologies Used
- **React Native** for building the app
- **AsyncStorage** for local storage
- **Context API** for state management
- **React Navigation** for screen navigation
- **Axios** for API requests

