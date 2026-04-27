import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.css'
})
export class Projects implements OnInit {

  miFormulario: FormGroup;
  listaDatos: Project[] = [];

  idEnEdicion: string | null = null;


  constructor(private fb: FormBuilder, private proyectService: ProjectService) {

    this.miFormulario = this.fb.group({

      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {

    this.proyectService.getAll().subscribe(datos => {
      this.listaDatos = datos;
    });

  }

  guardar() {
    if (this.miFormulario.invalid) return;

    if (this.idEnEdicion) {
      this.proyectService.update(this.idEnEdicion, this.miFormulario.value);
    } else {
      this.proyectService.create(this.miFormulario.value);
    }

    this.limpiar();
  }

  // TODO: [EXAMEN] 8. Cambiar 'any' por tu modelo (Ej: item: Student)
  editar(item: any) {
    this.idEnEdicion = item.id;
    this.miFormulario.patchValue(item);
  }

  eliminar(id: any) {
    this.proyectService.delete(id);
  }

  limpiar() {
    this.miFormulario.reset();
    this.idEnEdicion = null;
  }
}
