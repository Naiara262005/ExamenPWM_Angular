import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// TODO: [EXAMEN] 1. Importar los 3 servicios reales aquí cuando los crees
import { TaskService } from '../../services/task.service'; // Ej: GradeService
import { EmployeeService as ServicioPadre1 } from '../../services/employee.service'; // Ej: StudentService as ServicioPadre1
import { ProjectService as ServicioPadre2 } from '../../services/project.service'; // Ej: SubjectService as ServicioPadre2

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './tasks.html'
})
export class Tasks implements OnInit {

  miFormulario: FormGroup;

  listaTasks: any[] = []; // Ej: listaGrades
  listaEmployees: any[] = [];     // Ej: listaStudents
  listaProjects: any[] = [];     // Ej: listaSubjects

  idEnEdicion: string | null = null;

  constructor(
    private fb: FormBuilder,
    private relacionService: TaskService,
    private padre1Service: ServicioPadre1,
    private padre2Service: ServicioPadre2
  ) {

    this.miFormulario = this.fb.group({
      projectId: ['', [Validators.required]],
      employeeId: ['', [Validators.required]],
      task: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    // Cargar las listas para los desplegables
    this.padre1Service.getAll().subscribe(data => this.listaEmployees = data);
    this.padre2Service.getAll().subscribe(data => this.listaProjects = data);

    // Cargar la tabla principal
    this.relacionService.getAll().subscribe(datos => {
      this.listaTasks = datos.map(item => {
        // TODO: [EXAMEN] 3. Asegúrate de que item.fk_padre1 y s.nombre coinciden con tus modelos
        const p1 = this.listaEmployees.find(s => s.id === item.projectId);
        const p2 = this.listaProjects.find(s => s.id === item.employeeId);

        return {
          ...item,
          employeeName: p1 ? p1.nombre : '...',
          projectName: p2 ? p2.nombre : '...'
        };
      });
    });
  }
  // nada
  guardar() {
    if (this.miFormulario.invalid) return;
    if (this.idEnEdicion) {
      this.relacionService.update(this.idEnEdicion, this.miFormulario.value);
    } else {
      this.relacionService.create(this.miFormulario.value);
    }
    this.limpiar();
  }
  // nada
  editar(item: any) {
    this.idEnEdicion = item.id;
    this.miFormulario.patchValue(item);
  }
  // nada
  eliminar(id: any) { this.relacionService.delete(id); }
  limpiar() { this.miFormulario.reset(); this.idEnEdicion = null; }
}
