import { useState } from "react";

function App() {
  //Dane apk
  const [topics, setTopics] = useState([
    { 
      id: 1, 
      name: 'Matematyka', 
      tasks: [
        { id: 101, text: 'Funkcje', completed: false },
        { id: 102, text: 'Pochodne', completed: false },
        { id: 103, text: 'Ciągi', completed: false }
      ] 
    },
    { 
      id: 2, 
      name: 'React Basics', 
      tasks: [
        { id: 201, text: 'useState', completed: true },
        { id: 202, text: 'Props', completed: false }
      ] 
    }
  ])

  //logika apk
  const toggleTask = (topicId, taskId) => {
    const updatedTopics = topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          tasks: topic.tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
          )
        };
      }
      return topic;
    });
    setTopics(updatedTopics);
  };

  return (
    <>
    <h1>Progress Map Builder</h1>

    {topics.map((topic) => {
      const total = topic.tasks.length;
      const done = topic.tasks.filter(t => t.completed).length;
      const percent = Math.round((done / total) * 100);
      return (
        <div className="topic" key={topic.id}><span>{topic.name} - {percent}%</span>
          {topic.tasks.map((task) => (
            <div key={task.id}>
              <input type="checkbox" 
              checked={task.completed}
              onChange={() => toggleTask(topic.id, task.id)}></input>
              <span>
                {task.text}
              </span>
            </div>
          ))}
        </div>
      );
    })}
    </>
  )
}

export default App;
