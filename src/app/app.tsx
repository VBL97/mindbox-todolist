import { Card, Flex, Divider } from "antd";
import { useState } from "react";
import CreateForm from "@/createForm/creareFrom";
import ControlPanel, { TaskFilter } from "@/controlPanel/controlPanel";
import { Task } from "@/types";
import ItemList from "@/itemList/taskList";
import TaskItem from "@/taskItem/taskItem";
import EmptyTasks from "@/emptyTasks/emptyTasks";

import "./app.scss";

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskFilter, setTaskFilter] = useState<TaskFilter>(TaskFilter.all);

  const addTask = (taskName: string) => {
    setTasks(oldTasks => [
      ...oldTasks,
      { name: taskName, key: new Date().getMilliseconds() },
    ]);
  };

  const handleTaskChangeState = (key: number, value: boolean) => {
    setTasks(oldTasks => {
      return oldTasks.map(task => {
        if (task.key === key) {
          return { ...task, isCompleted: value };
        }

        return task;
      });
    });
  };

  const handleClearCompleted = () => {
    setTasks(oldTasks => {
      return oldTasks.filter(task => !task.isCompleted);
    });
  };

  const activeTasks = tasks.filter(task => !task.isCompleted);
  const activeTasksCount = activeTasks.length;
  const hasCompletedTasks = tasks.length !== activeTasksCount;

  const getFilteredTask = () => {
    if (taskFilter === TaskFilter.all) {
      return tasks;
    }

    if (taskFilter === TaskFilter.active) {
      return activeTasks;
    }

    return tasks.filter(task => task.isCompleted);
  };

  const filteredTasks = getFilteredTask();

  return (
    <Flex className="app" justify="center" align="center">
      <Card
        styles={{ body: { padding: 0 } }}
        className="card"
        variant="borderless"
      >
        <CreateForm addTask={addTask} />

        <Divider className="divider" />

        <ItemList
          items={filteredTasks}
          renderFunc={task => (
            <TaskItem task={task} onTaskChangeState={handleTaskChangeState} />
          )}
          emptyText={<EmptyTasks filter={taskFilter} />}
        />

        <Divider className="divider" />

        {tasks.length ? (
          <ControlPanel
            activeTasksCount={activeTasksCount}
            taskFilter={taskFilter}
            hasCompletedTasks={hasCompletedTasks}
            onFilterChange={setTaskFilter}
            onClearCompleted={handleClearCompleted}
          />
        ) : null}
      </Card>
    </Flex>
  );
};

export default App;
