import { useState } from "react";
import { TaskItem } from "./taskItem";

export function TopicItem({ topic, onToggle, onDelete, onRename, onAddSubtask, addTask, onRemoveTopic, onRenameTopic }) {
  const [taskText, setTaskText] = useState("");
  const [isEditing, setIsEditing] = useState(false);

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
        {isEditing ? (
          <input 
            autoFocus
            className="topic-rename-input"
            value={topic.name}
            onChange={(e) => onRenameTopic(topic.id, e.target.value)}
            onBlur={() => setIsEditing(false)}
            onKeyDown={(e) => e.key === 'Enter' && setIsEditing(false)}
          />
        ) : (
          <h2 onDoubleClick={() => setIsEditing(true)}>
            {topic.name} 
            <div className="topic-actions">
              <span className={`badge ${progress === 100 ? 'completed' : ''}`}>{progress}%</span>
              <button
                className="remove-topic-btn" 
                onClick={() => {
                  const confirmDelete = window.confirm(`Czy napewno chcesz usunąć temat "${topic.name}"?`)

                  if(confirmDelete){
                    onRemoveTopic(topic.id)
                  }
                }}
                title="Usuń cały temat"
              >
                ×
              </button>
            </div>
          </h2>
        )}
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