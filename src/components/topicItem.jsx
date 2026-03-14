import { useState } from "react";
import { TaskItem } from "./taskItem";

export function TopicItem({ topic, onToggle, onDelete, onRename, onAddSubtask, addTask }) {
  const [taskText, setTaskText] = useState("");

  // Funkcja progresu liczy teraz wszystko w głąb (rekurencyjnie)
  const calculateDeepProgress = (items) => {
    if (!items || items.length === 0) return 0;
    const total = items.length;
    const completed = items.filter(i => {
      if (i.subtasks && i.subtasks.length > 0) {
        return calculateDeepProgress(i.subtasks) === 100;
      }
      return i.completed;
    }).length;
    return Math.round((completed / total) * 100);
  };

  const progress = calculateDeepProgress(topic.tasks);

  return (
    <div className="topic-container">
      <div className="topic-header">
        <h2>{topic.name} <span className="badge">{progress}%</span></h2>
      </div>
      
      <div className="tasks-list">
        {topic.tasks.map((task) => (
          <TaskItem 
            key={task.id} 
            task={task} 
            topicId={topic.id}
            onToggle={onToggle}
            onDelete={onDelete}
            onRename={onRename}
            onAddSubtask={onAddSubtask}
          />
        ))}
      </div>

      <div className="add-main-task">
        <input 
          value={taskText} 
          onChange={(e) => setTaskText(e.target.value)} 
          placeholder="Nowe zadanie główne..." 
        />
        <button onClick={() => { addTask(topic.id, taskText); setTaskText(""); }}>
          Dodaj zadanie
        </button>
      </div>
    </div>
  );
}