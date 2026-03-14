# Progress Map Builder

Progress Map Builder is a simple React application that helps organize and visualize progress in learning, projects, or any structured work.

The main idea is to break large goals into smaller **topics, tasks, and subtasks**, making it easier to track progress and manage work.

## Features

- Create multiple **topics** (e.g. Mathematics, Programming, Biology)
- Add **tasks** inside each topic
- Create **nested subtasks**
- Mark tasks as **completed**
- Rename tasks
- Delete tasks
- Tree-based task structure using **recursive functions**

## How It Works

Each topic contains a list of tasks.  
Each task can contain **subtasks**, which can also contain their own subtasks, forming a hierarchical tree structure.

Operations such as:

- toggling completion
- renaming tasks
- deleting tasks
- adding subtasks

are handled by recursive utility functions located in:

`utils/taskUtils.js`

## Tech Stack

- React
- JavaScript
- CSS

## Planned Improvements

- Fix progress percentage calculation
- Add information/help section
- Improve UI and visualization

## Example Use Cases

- Learning roadmap
- Study planning
- Project breakdown
- Skill progression tracking