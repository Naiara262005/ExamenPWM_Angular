import { Injectable, Injector, runInInjectionContext } from '@angular/core';
import { Firestore, collection, collectionData, addDoc, doc, updateDoc, deleteDoc, query } from '@angular/fire/firestore';
import { Observable } from 'rxjs';


import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  private dbPath = 'proyects';

  constructor(private firestore: Firestore, private injector: Injector) {}

  getAll(): Observable<any[]> {
    return runInInjectionContext(this.injector, () => {
      const colRef = collection(this.firestore, this.dbPath);
      const q = query(colRef);
      return collectionData(q, { idField: 'id' });
    });
  }


  create(data: Project) {
    const colRef = collection(this.firestore, this.dbPath);
    return addDoc(colRef, data);
  }

  update(id: string, data: Project) {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return updateDoc(docRef, data as any);
  }

  // 4. BORRAR (DELETE)
  delete(id: string) {
    const docRef = doc(this.firestore, `${this.dbPath}/${id}`);
    return deleteDoc(docRef);
  }
}
