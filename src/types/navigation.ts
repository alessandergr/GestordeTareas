import { Task } from '../models/Task';

export type RootStackParamList = {
  Main: undefined;

  TaskForm: {
    isEditing: boolean;
    task?: Task;
  };

  TaskDetail: {
    task: Task;
  };
};

export type BottomTabParamList = {
  Tareas: undefined;
  Ajustes: undefined;
};