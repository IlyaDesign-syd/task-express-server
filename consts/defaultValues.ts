import { TaskColumn } from "../types/Task.types";

export const DEFAULT_TASK_COLS: TaskColumn[] = [
  {
    columnId: "todo",
    columnName: "To Do",
    taskList: [],
  },
  {
    columnId: "in-progress",
    columnName: "In Progress",
    taskList: [],
  },
  {
    columnId: "done",
    columnName: "Done",
    taskList: [],
  },
];