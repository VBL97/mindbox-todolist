import { Flex, Checkbox, List } from "antd";
import { Task } from "@/types";

import "./task-item.scss";

interface TaskItemProps {
  task: Task;
  onTaskChangeState: (key: number, value: boolean) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskChangeState }) => {
  const { isCompleted, name, key } = task;

  return (
    <List.Item>
      <Flex
        className={`task-item ${isCompleted ? "task-item_completed" : ""}`}
        gap="small"
      >
        <Checkbox
          checked={isCompleted}
          onChange={event => onTaskChangeState(key, event.target.checked)}
        />
        <span className="task-item__name">{name}</span>
      </Flex>
    </List.Item>
  );
};

export default TaskItem;
