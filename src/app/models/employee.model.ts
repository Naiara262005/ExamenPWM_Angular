// TODO: [EXAMEN]
// 1. Renombrar este archivo a algo como 'student.model.ts'
// 2. Renombrar la interfaz 'BaseEntity' al nombre real (ej: 'Student')

export interface Employee {
  id?: string; // El ID de Firebase, lo dejamos opcional con el '?'
  // Ejemplos:
  name: string;
  email: string;
  // description: string;
  // grade: number;
}
