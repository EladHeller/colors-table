import { fromFetch } from 'rxjs/fetch';
import {
  catchError,
  switchMap, throwError,
} from 'rxjs';
import type { IColorsDataLayer } from './types';

export default function ColorsDataLayer(): IColorsDataLayer {
  const colors$ = fromFetch('http://localhost:3000/colors').pipe(
    switchMap((response) => {
      if (response.ok) {
        return response.json();
      }
      return throwError(() => new Error(`Failed with status '${response.status} ${response.statusText}'`));
    }),
    catchError((err) => throwError(() => new Error(`Failed to load colors: ${err.message}`))),
  );

  return {
    colors$,
  };
}
