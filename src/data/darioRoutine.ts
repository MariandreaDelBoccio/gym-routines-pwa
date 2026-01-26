import type { Routine } from "../types/routine";

export const darioRoutines: Omit<Routine, "id" | "createdAt" | "updatedAt">[] =
  [
    {
      name: "Día 1 - Piernas",
      description: "",
      exercises: [
        {
          id: "dario-d1-ex-1",
          name: "Sentadillas",
          sets: 3,
          reps: 8,
          weight: 0,
          notes: "Sentarte y pararte de una silla. Sin peso.",
        },
        {
          id: "dario-d1-ex-2",
          name: "Subida de escalon",
          sets: 3,
          reps: 8,
          weight: 0,
          notes:
            "Poner dos discos de 20kg en el suelo uno encima de otro. Subir y bajar 8 veces con cada pierna. Sin peso.",
        },
        {
          id: "dario-d1-ex-3",
          name: "Caminar",
          sets: 1,
          reps: 30,
          weight: 0,
          notes: "Salir a caminar",
        },
      ],
    },
    {
      name: "Día 2 - Pecho",
      description: "",
      exercises: [
        {
          id: "dario-d2-ex-1",
          name: "Press de banca",
          sets: 3,
          reps: 8,
          weight: 2,
          notes:
            "Acostado en el banco, con las mancuernas de 2kg, subir y bajar los brazos.",
        },
        {
          id: "dario-d2-ex-2",
          name: "Remo",
          sets: 3,
          reps: 8,
          weight: 2,
          notes:
            "Con el respaldar del banco un poco inclinado, apoyarse en el respaldar con una mano y con la otra hacer remo.",
        },
        {
          id: "dario-d1-ex-3",
          name: "Caminar",
          sets: 1,
          reps: 30,
          weight: 0,
          notes: "Salir a caminar",
        },
      ],
    },
    {
      name: "Día 3 - Tren superior",
      description: "",
      exercises: [
        {
          id: "dario-d3-ex-1",
          name: "Biceps",
          sets: 3,
          reps: 9,
          weight: 6,
          notes: "Biceps 8 repeticiones con cada brazo con mancuernas de 6kg.",
        },
        {
          id: "dario-d3-ex-2",
          name: "Press hombro",
          sets: 3,
          reps: 8,
          weight: 2,
          notes:
            "De pie, espalda recta, subir los brazos desde los hombres hasta arriba con las mancuernas de 2kg.",
        },
        {
          id: "dario-d1-ex-3",
          name: "Caminar",
          sets: 1,
          reps: 30,
          weight: 0,
          notes: "Salir a caminar",
        },
      ],
    },
  ];
