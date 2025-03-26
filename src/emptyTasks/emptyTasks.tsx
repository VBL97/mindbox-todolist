import { TaskFilter } from "@/controlPanel/controlPanel";
import { Empty } from "antd";

interface EmptyTasksProps {
  filter: TaskFilter;
}

const EmptyTasks: React.FC<EmptyTasksProps> = ({ filter }) => {
  const descriptionTaskType = filter === TaskFilter.all ? " " : ` ${filter} `;
  const description = `No${descriptionTaskType}task data`;

  return (
    <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={description} />
  );
};

export default EmptyTasks;
