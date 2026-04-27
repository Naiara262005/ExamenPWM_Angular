import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// TODO: [EXAMEN] 1. Importar aquí tu servicio y tu modelo reales.
// Ejemplo:
// import { StudentService } from '../../services/student.service';
// import { Student } from '../../models/student.model';

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './base.html',
  styleUrl: './base.css'
})
export class Base implements OnInit {
  
  miFormulario: FormGroup;
  
  // TODO: [EXAMEN] 2. Cambiar 'any' por tu modelo (Ej: Student[])
  listaDatos: any[] = []; 
  
  idEnEdicion: string | null = null;

  // TODO: [EXAMEN] 3. Inyectar tu servicio real en el constructor
  // Ejemplo: constructor(private fb: FormBuilder, private studentService: StudentService) {
  constructor(private fb: FormBuilder) {
    
    // TODO: [EXAMEN] 4. Poner aquí los campos exactos que te pida el examen con sus validaciones
    this.miFormulario = this.fb.group({
      // Ejemplos:
      // name: ['', [Validators.required]],
      // email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {
    // TODO: [EXAMEN] 5. Quitar los comentarios de abajo y usar tu servicio real
    /*
    this.studentService.getAll().subscribe(datos => {
      this.listaDatos = datos;
    });
    */
  }

  guardar() {
    if (this.miFormulario.invalid) return;

    if (this.idEnEdicion) {
      // TODO: [EXAMEN] 6. Descomentar y adaptar para ACTUALIZAR
      // this.studentService.update(this.idEnEdicion, this.miFormulario.value);
    } else {
      // TODO: [EXAMEN] 7. Descomentar y adaptar para CREAR
      // this.studentService.create(this.miFormulario.value);
    }
    
    this.limpiar();
  }

  // TODO: [EXAMEN] 8. Cambiar 'any' por tu modelo (Ej: item: Student)
  editar(item: any) { 
    this.idEnEdicion = item.id;
    this.miFormulario.patchValue(item);
  }

  eliminar(id: any) {
    // TODO: [EXAMEN] 9. Descomentar y usar tu servicio
    // this.studentService.delete(id);
  }

  limpiar() {
    this.miFormulario.reset();
    this.idEnEdicion = null;
  }
}