import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Country, PaginatedResponse } from '../models/countries.interface';
import { Observable, map, tap } from 'rxjs';

const COUNTRIES = gql`
  {
    countries {
      name
      capital
      currency
      emoji
      phone
      continent {
        name
      }
    }
  }
`;

const COUNTRY = gql`
  query GetCountry($ID: ID!){
    country(code: $ID) {
      name
      capital
      currencies
      awsRegion
      native
      phone
      states {
        name
      }
    }
  }
`;

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  constructor(private apollo: Apollo) {}

  getCountries(): Observable<Country[]> {
    return this.apollo
      .watchQuery<any>({
        query: COUNTRIES,
      })
      .valueChanges.pipe(map((result) => result.data.countries));
  }

  getCountry(countryCode: string): Observable<Country> {
    return this.apollo
      .watchQuery<any>({
        query: COUNTRY,
        variables: {
          code: countryCode,
        },
      })
      .valueChanges.pipe(
        map((result) => result.data.country)
      );
  }
}
