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
    {topics.map((topic) => (
        <div key={topic.id}>{topic.name}
          {topic.tasks.map((task) => (
            <div key={task.id}>{task.text}</div>
          ))}
        </div>
    ))}
    </>
  )
}

export default App;
