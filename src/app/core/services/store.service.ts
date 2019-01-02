import {
  AngularFirestore,
  DocumentChangeAction
} from '@angular/fire/firestore';
import {
  Injectable,
  Inject
} from '@angular/core';
import {
  IFileTypes
} from '../interfaces/files';
import {
  Observable
} from 'rxjs';
import {
  map
} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  getCollection<T>(module: IFileTypes): Observable<T[]> {
    const collection = this.db.collection(module);
    return collection.snapshotChanges()
      .pipe(
        map((arr: DocumentChangeAction<T>[]) => arr.map(
          (snap: DocumentChangeAction<T>) => {
            // console.log(snap.payload.doc);
            const data = { ...snap.payload.doc.data(), id: snap.payload.doc.id };
            console.log(data);
            return snap.payload.doc.data() as T;
          }
        )));
}

updateDocument(id: string) {
  console.log('not init');
}

constructor(
  private db: AngularFirestore,
) {}


}
