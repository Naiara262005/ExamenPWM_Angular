import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// Ejemplo:
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './employees.html',
  styleUrl: './employees.css'
})
export class Employees implements OnInit {

  miFormulario: FormGroup;

  listaDatos: Employee[] = [];

  idEnEdicion: string | null = null;


  constructor(private fb: FormBuilder, private employeeService: EmployeeService) {


    this.miFormulario = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos() {

    this.employeeService.getAll().subscribe(datos => {
      this.listaDatos = datos;
    });

  }

  guardar() {
    if (this.miFormulario.invalid) return;

    if (this.idEnEdicion) {
      this.employeeService.update(this.idEnEdicion, this.miFormulario.value);
    } else {
      this.employeeService.create(this.miFormulario.value);
    }

    this.limpiar();
  }

  // TODO: [EXAMEN] 8. Cambiar 'any' por tu modelo (Ej: item: Student)
  editar(item: any) {
    this.idEnEdicion = item.id;
    this.miFormulario.patchValue(item);
  }

  eliminar(id: any) {
    this.employeeService.delete(id);
  }

  limpiar() {
    this.miFormulario.reset();
    this.idEnEdicion = null;
  }
}
