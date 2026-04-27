import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

// TODO: [EXAMEN] Importar tu modelo aquí el día del examen. 
// Ejemplo: import { Student } from '../models/student.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  // TODO: [EXAMEN] Cambiar 'coleccion_base' por el nombre real de la colección en Firestore (ej: 'students')
  private dbPath = 'coleccion_base';

  constructor(private firestore: Firestore, private injector: Injector) {}

  // 1. LEER TODOS (READ)
  // TODO: [EXAMEN] Cambiar 'any[]' por tu modelo (ej: Student[])
  getAll(): Observable<any[]> {
    return runInInjectionContext(this.injector, () => {
      const colRef = collection(this.firestore, this.dbPath);
      const q = query(colRef);
      return collectionData(q, { idField: 'id' });
    });
  }

  // 2. CREAR (CREATE)
  // TODO: [EXAMEN] Cambiar 'any' por tu modelo (ej: Student)
  create(data: any) {
    const colRef = collection(this.firestore, this.dbPath);
    return addDoc(colRef, data);
  }

  // 3. ACTUALIZAR (UPDATE)
  // TODO: [EXAMEN] Cambiar 'any' por tu modelo (ej: Student)
  update(id: string, data: any) {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data);
  }

  // 4. BORRAR (DELETE)
  delete(id: string) {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}
