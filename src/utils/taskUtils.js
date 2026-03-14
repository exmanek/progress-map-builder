//Rekurencyjnie update taskow

export const updateNodeRecursive = (tasks, targetId, action) => {
  return tasks.map(task => {
    if (task.id === targetId) {
      if (action.type === 'TOGGLE') {
        const newState = !task.completed;
        const toggleAll = (nodes, status) => nodes?.map(n => ({
          ...n, completed: status, subtasks: toggleAll(n.subtasks, status)
        }));
        return { ...task, completed: newState, subtasks: toggleAll(task.subtasks, newState) };
      }
      if (action.type === 'RENAME') return { ...task, text: action.newName };
    }
    
    if (task.subtasks) {
      return { ...task, subtasks: updateNodeRecursive(task.subtasks, targetId, action) };
    }
    return task;
  });
};

//usuwanie zadan

export const deleteNodeRecursive = (tasks, targetId) => {
  return tasks
    .filter(task => task.id !== targetId)
    .map(task => ({
      ...task,
      subtasks: task.subtasks ? deleteNodeRecursive(task.subtasks, targetId) : []
    }));
};

//dodawanie dziecka do zadania

export const addNodeRecursive = (tasks, parentId, newText) => {
  return tasks.map(task => {
    if (task.id === parentId) {
      const newNode = {
        id: Date.now(),
        text: newText,
        completed: false,
        subtasks: []
      };
      return { ...task, subtasks: [...(task.subtasks || []), newNode] };
    }
    if (task.subtasks) {
      return { ...task, subtasks: addNodeRecursive(task.subtasks, parentId, newText) };
    }
    return task;
  });
};