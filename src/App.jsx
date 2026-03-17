import { useState } from "react";

import { updateNodeRecursive, deleteNodeRecursive, addNodeRecursive } from "./utils/taskUtils";

import { TopicItem } from "./components/topicItem"; 
import "./styles/App.css";

function App() {
  const [newTopicName, setNewTopicName] = useState("");

  const [topics, setTopics] = useState([
    { 
      id: 1, 
      name: 'Matematyka', 
      tasks: [
        {
          id: 101, text: 'Funkcje', completed: false, 
          subtasks: [
            { id: 10101, text: 'Liniowe', completed: false, subtasks: [] },
            { id: 10102, text: 'Kwadratowe', completed: false, subtasks: [] }
          ] 
        },
        { id: 102, text: 'Pochodne', completed: false, subtasks: [] }
      ] 
    }
  ]);

  const updateTopicsState = (topicId, transformTasksFn) => {
    setTopics(prevTopics => prevTopics.map(topic => 
      topic.id === topicId 
        ? { ...topic, tasks: transformTasksFn(topic.tasks) } 
        : topic
    ));
  };

  const handleToggle = (topicId, taskId) => {
    updateTopicsState(topicId, (tasks) => 
      updateNodeRecursive(tasks, taskId, { type: 'TOGGLE' })
    );
  };

  const handleRename = (topicId, taskId, newName) => {
    updateTopicsState(topicId, (tasks) => 
      updateNodeRecursive(tasks, taskId, { type: 'RENAME', newName })
    );
  };

  const handleDelete = (topicId, taskId) => {
    updateTopicsState(topicId, (tasks) => 
      deleteNodeRecursive(tasks, taskId)
    );
  };

  const handleAddSubtask = (topicId, parentId, text) => {
    if (!text.trim()) return;
    updateTopicsState(topicId, (tasks) => 
      addNodeRecursive(tasks, parentId, text)
    );
  };

  const addTopic = () => {
    if (!newTopicName.trim()) return;
    const newTopic = {
      id: Date.now(),
      name: newTopicName,
      tasks: []
    };
    setTopics([...topics, newTopic]);
    setNewTopicName("");
  };

  const addMainTask = (topicId, text) => {
    if (!text.trim()) return;
    setTopics(topics.map(topic => 
      topic.id === topicId 
        ? { ...topic, tasks: [...topic.tasks, { id: Date.now(), text, completed: false, subtasks: [] }] }
        : topic
    ));
  };

  return (
    <div className="app-container">
      <h1>Task Manager</h1>
      
      <div className="add-topic-section">
        <input 
          value={newTopicName} 
          onChange={(e) => setNewTopicName(e.target.value)} 
          placeholder="Nowy temat (np. Biologia)" 
        />
        <button onClick={addTopic}>Dodaj Temat</button>
      </div>

      <div className="topics-grid">
        {topics.map((topic) => (
          <TopicItem 
            key={topic.id} 
            topic={topic} 
            onToggle={handleToggle}
            onDelete={handleDelete}
            onRename={handleRename}
            onAddSubtask={handleAddSubtask}
            addTask={addMainTask} 
          />
        ))}
      </div>
    </div>
  );
}

export default App;

// poprawic liczenie procentow
// dodac opis albo zakladke info