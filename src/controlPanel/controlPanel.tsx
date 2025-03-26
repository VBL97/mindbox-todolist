import { Flex, Button, Radio } from "antd";

import "./control-panel.scss";

export enum TaskFilter {
  all = "all",
  active = "active",
  completed = "completed",
}

interface ControlPanelProps {
  activeTasksCount: number;
  taskFilter: TaskFilter;
  hasCompletedTasks: boolean;
  onFilterChange: (filter: TaskFilter) => void;
  onClearCompleted: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  activeTasksCount,
  taskFilter,
  hasCompletedTasks,
  onClearCompleted,
  onFilterChange,
}) => {
  return (
    <Flex className="control-panel" justify="space-between">
      <span>{activeTasksCount} item(s) left</span>

      <Radio.Group
        size="small"
        onChange={event => onFilterChange(event.target.value)}
        value={taskFilter}
      >
        <Radio.Button value={TaskFilter.all}>All</Radio.Button>
        <Radio.Button value={TaskFilter.active}>Active</Radio.Button>
        <Radio.Button value={TaskFilter.completed}>Completed</Radio.Button>
      </Radio.Group>

      <Button
        onClick={onClearCompleted}
        disabled={!hasCompletedTasks}
        size="small"
        type="text"
      >
        Clear completed
      </Button>
    </Flex>
  );
};

export default ControlPanel;
