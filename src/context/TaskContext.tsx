import React, { createContext, useReducer } from 'react';
import { Task } from '../models/Task';

//Tarea predefinida we//
const tareasIniciales: Task[] = [
  {
    id: '1',
    titulo: 'Comprar ingredientes',
    descripcion: 'Comprar los ingredientes para la cena.',
  },
];

//Nuestro cerebro, es que hace que el CRUD funcione//
function reducer(tareas: Task[], accion: any) {
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
//este viene en null pero luego se llena
export const TaskContext = createContext<any>(null);

//es una caja de la cual podemos agarrar funciones
export function TaskProvider({ children }: any) {
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