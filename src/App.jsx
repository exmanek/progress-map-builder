import { useState } from "react";

function TopicItem({ topic, toggleTask, toggleSubtask, addTask }) {
  // To jest ten "prywatny pilot" do inputa - tylko dla TEGO tematu
  const [taskText, setTaskText] = useState("")

  const calculateProgress = (items) => {
    if (!items || items.length === 0) return 0;
    const completedCount = items.filter(i => i.completed).length;
    return Math.round((completedCount / items.length) * 100); 
  };

  const topicPercent = calculateProgress(topic.tasks);

  return (
    <div className="topic">
      <span className="topicText">{topic.name} - {topicPercent}%</span>
      
      {topic.tasks.map((task) => {
        const hasSubtasks = task.subtasks && task.subtasks.length > 0;
        const taskPercent = hasSubtasks ? calculateProgress(task.subtasks) : (task.completed ? 100 : 0);
        
        return (
          <div key={task.id} className="task-group" style={{ marginLeft: '20px', marginBottom: '10px' }}>
            <div className="main-task">
              <input 
                type="checkbox" 
                checked={hasSubtasks ? taskPercent === 100 : task.completed}
                onChange={() => toggleTask(topic.id, task.id)} 
              />
              {/* TUTAJ: Usunięte procenty, zostało samo pogrubione zadanie */}
              <strong>{task.text}</strong>
            </div>

            {/* Wyświetlanie podzadań */}
            {hasSubtasks && (
              <div className="subtasks" style={{ marginLeft: '30px' }}>
                {task.subtasks.map(sub => (
                  <div key={sub.id}>
                    <input 
                      type="checkbox" 
                      checked={sub.completed}
                      onChange={() => toggleSubtask(topic.id, task.id, sub.id)}
                    />
                    <span>{sub.text}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })} {/* <--- Tu brakowało poprawnego domknięcia mapy i nawiasu */}

      <div className="add-task-section">
        <input 
          value={taskText} 
          onChange={(e) => setTaskText(e.target.value)} 
          placeholder="Nowe zadanie" 
        />
        <button onClick={() => { addTask(topic.id, taskText); setTaskText(""); }}>
          Dodaj
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
        { id: 101, text: 'Funkcje', completed: false, subtasks: [
          {id: 10101, text: 'Siema', completed: false },
          {id: 10102, text: 'zad2', completed: false }] },
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
    setTopics(topics.map(topic => {
      if (topic.id !== topicId) return topic;
      return {
        ...topic,
        tasks: topic.tasks.map(task => {
          if (task.id !== taskId) return task;
          const newState = !task.completed;
          const updatedSubtasks = task.subtasks ? task.subtasks.map(s => ({...s, completed: newState})) : [];
          return { ...task, completed: newState, subtasks: updatedSubtasks };
        })
      };
    }));
  };

  const toggleSubtask = (topicId, taskId, subtaskId) => {
    setTopics(topics.map(topic => {
      if (topic.id !== topicId) return topic;
      return {
        ...topic,
        tasks: topic.tasks.map(task => {
          if (task.id !== taskId) return task;
          const updatedSubtasks = task.subtasks.map(sub => 
            sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
          );
          return { ...task, subtasks: updatedSubtasks };
        })
      };
    }));
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

const calculateProgress = (task) => {
  if (!task.subtasks || task.subtasks.length === 0) {
    return task.completed ? 100 : 0;
  }
  
  const completedCount = task.subtasks.filter(st => st.completed).length;
  return Math.round((completedCount / task.subtasks.length) * 100);
};

return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>Progress Map Builder</h1>
      <input value={newTopicName} onChange={(e) => setNewTopicName(e.target.value)} placeholder="Nowy temat" />
      <button onClick={addTopic}>Dodaj Temat</button>

      {topics.map((topic) => (
        <TopicItem 
          key={topic.id} 
          topic={topic} 
          toggleTask={toggleTask} 
          toggleSubtask={toggleSubtask}
          addTask={addTask} 
        />
      ))}
    </div>
  );
}

//test 

export default App;
