import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private dbPath = 'employees';

  constructor(private firestore: Firestore, private injector: Injector) {}

  getAll(): Observable<any[]> {
    return runInInjectionContext(this.injector, () => {
      const colRef = collection(this.firestore, this.dbPath);
      const q = query(colRef);
      return collectionData(q, { idField: 'id' });
    });
  }


  create(data: Employee) {
    const colRef = collection(this.firestore, this.dbPath);
    return addDoc(colRef, data);
  }

  update(id: string, data: Employee) {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data as any);
  }

  // 4. BORRAR (DELETE)
  delete(id: string) {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}
