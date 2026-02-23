import { useState } from "react";

function TopicItem({ topic, toggleTask, addTask }) {
  // To jest ten "prywatny pilot" do inputa - tylko dla TEGO tematu
  const [taskText, setTaskText] = useState("");

  const total = topic.tasks.length;
  const done = topic.tasks.filter(t => t.completed).length;
  const percent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="topic">
      <span className="topicText">{topic.name} - {percent}%</span>
      
      {topic.tasks.map((task) => (
        <div key={task.id}>
          <input 
            type="checkbox" 
            checked={task.completed}
            onChange={() => toggleTask(topic.id, task.id)} 
          />
          <span>{task.text}</span>
        </div>
      ))}

      <div className="add-task-section">
        <input 
          value={taskText} 
          onChange={(e) => setTaskText(e.target.value)} 
          placeholder="Nowe zadanie"
        />
        <button onClick={() => {
          addTask(topic.id, taskText);
          setTaskText("");
        }}>
          Dodaj zadanie
        </button>
      </div>
    </div>
  );
}

function App() {
  const [newTopicName, setNewTopicName] = useState("");
  const [newTaskName, setNewTaskName] = useState("");

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
    const updatedTopics = topics.map(topic => { //nowa tablica trzymajaca zaktualizowane tematy
      if (topic.id === topicId) { //poprawnosc zmiennej
        return {
          ...topic, // robimy kopie tematu
          tasks: topic.tasks.map(task => //kolejny map w srodku tematu
            task.id === taskId ? { ...task, completed: !task.completed } : task //jesli tak to tworzymy kopie tego taska i odwracamy stan completed
          )
        };
      }
      return topic;
    });
    setTopics(updatedTopics);
  };

  //DODAWANIE TEMATOW

  const addTopic = () =>{
    if(newTopicName.trim() === "") return

    const newTopic = {
      id: Date.now(),
      name: newTopicName,
      tasks: []
    }

    setTopics([...topics, newTopic])
    setNewTopicName("")
  }

  //DODAWANIE TASKOW

  const addTask = (topicId, text) => {
    if (text.trim() === "") return;
    const updatedTopics = topics.map(topic => {
      if (topic.id === topicId) {
        return { 
          ...topic, 
          tasks: [...topic.tasks, { id: Date.now(), text: text, completed: false }] 
        };
      }
      return topic;
    });
    setTopics(updatedTopics);
  };

  return (
    <>
      <h1>Progress Map Builder</h1>
      <input 
        value={newTopicName} 
        onChange={(e) => setNewTopicName(e.target.value)} 
        placeholder="Nowy temat"
      />
      <button onClick={addTopic}>Dodaj Temat</button>

      {/* wywolanie komponentu */}

      {topics.map((topic) => (
        <TopicItem 
          key={topic.id} 
          topic={topic} 
          toggleTask={toggleTask} 
          addTask={addTask} 
        />
      ))}
    </>
  );
}

//test 

export default App;
