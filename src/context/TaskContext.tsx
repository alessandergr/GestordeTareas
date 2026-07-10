import React, { createContext, ReactNode, useReducer } from 'react';
import { Task } from '../models/Task';

// Tarea predefinida
const tareasIniciales: Task[] = [
  {
    id: '1',
    titulo: 'Comprar ingredientes',
    descripcion: 'Comprar los ingredientes para la cena.',
  },
];

// Tipos de acciones
type Action =
  | { type: 'AGREGAR'; payload: Task }
  | { type: 'EDITAR'; payload: Task }
  | { type: 'ELIMINAR'; payload: string };

// Reducer
function reducer(tareas: Task[], accion: Action): Task[] {
  switch (accion.type) {
    case 'AGREGAR':
      return [...tareas, accion.payload];

    case 'EDITAR':
      return tareas.map((tarea) =>
        tarea.id === accion.payload.id ? accion.payload : tarea
      );

    case 'ELIMINAR':
      return tareas.filter((tarea) => tarea.id !== accion.payload);

    default:
      return tareas;
  }
}

// Tipo del contexto
interface TaskContextType {
  tareas: Task[];
  agregarTarea: (tarea: Task) => void;
  editarTarea: (tarea: Task) => void;
  eliminarTarea: (id: string) => void;
}

export const TaskContext = createContext<TaskContextType | null>(null);

// Props
interface Props {
  children: ReactNode;
}

export function TaskProvider({ children }: Props) {
  const [tareas, dispatch] = useReducer(reducer, tareasIniciales);

  const agregarTarea = (tarea: Task) =>
    dispatch({ type: 'AGREGAR', payload: tarea });

  const editarTarea = (tarea: Task) =>
    dispatch({ type: 'EDITAR', payload: tarea });

  const eliminarTarea = (id: string) =>
    dispatch({ type: 'ELIMINAR', payload: id });

  return (
    <TaskContext.Provider
      value={{ tareas, agregarTarea, editarTarea, eliminarTarea }}
    >
      {children}
    </TaskContext.Provider>
  );
}