import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Employees } from './components/base/employees';
import { Projects } from './components/base/projects';
import { Tasks } from './components/base/tasks';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Employees, Projects, Tasks],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('proyecto-base-examen');
}
