
export interface Task {
  id?: string; // El ID de Firebase, lo dejamos opcional con el '?'

  projectId: string;
  employeeId: string;
}
