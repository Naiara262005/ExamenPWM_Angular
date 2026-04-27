import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// TODO: [EXAMEN] 1. Importar los 3 servicios reales aquí cuando los crees
import { BaseRelacionalService } from '../../services/base-relacional.service'; // Ej: GradeService
import { BaseService as ServicioPadre1 } from '../../services/base.service'; // Ej: StudentService as ServicioPadre1
import { BaseService as ServicioPadre2 } from '../../services/base.service'; // Ej: SubjectService as ServicioPadre2

@Component({
  selector: 'app-base-relacional',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './base-relacional.html'
})
export class BaseRelacional implements OnInit {
  
  miFormulario: FormGroup;
  
  listaRelaciones: any[] = []; // Ej: listaGrades
  listaPadre1: any[] = [];     // Ej: listaStudents
  listaPadre2: any[] = [];     // Ej: listaSubjects
  
  idEnEdicion: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private relacionService: BaseRelacionalService, // private relacionService: GradeService,
    private padre1Service: ServicioPadre1, // private padre1Service: ServicioPadre1, 
    private padre2Service: ServicioPadre2  //  private padre2Service: ServicioPadre2 
  ) {
    // TODO: [EXAMEN] 2. Cambiar los nombres de los controles por los del examen (Ej: studentId, subjectId, grade)
    this.miFormulario = this.fb.group({
      fk_padre1: ['', [Validators.required]], // studentId: ['', [Validators.required]],
      fk_padre2: ['', [Validators.required]], // subjectId: ['', [Validators.required]],
      campo_extra: ['', [Validators.required]]  // grade: ['', [Validators.required]] 
    });
  }

  ngOnInit(): void {
    // Cargar las listas para los desplegables
    this.padre1Service.getAll().subscribe(data => this.listaPadre1 = data);
    this.padre2Service.getAll().subscribe(data => this.listaPadre2 = data);

    // Cargar la tabla principal
    this.relacionService.getAll().subscribe(datos => {
      this.listaRelaciones = datos.map(item => {
        // TODO: [EXAMEN] 3. Asegúrate de que item.fk_padre1 y s.nombre coinciden con tus modelos
        const p1 = this.listaPadre1.find(s => s.id === item.fk_padre1); // const p1 = this.listaStudents.find(s => s.id === item.studentId);
        const p2 = this.listaPadre2.find(s => s.id === item.fk_padre2); // const p2 = this.listaSubjects.find(s => s.id === item.subjectId);
        
        return { 
          ...item, 
          nombre_padre1: p1 ? p1.nombre : '...', // studentName: p1 ? p1.name : '...',
          nombre_padre2: p2 ? p2.nombre : '...'  // subjectName: p2 ? p2.name : '...'
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
