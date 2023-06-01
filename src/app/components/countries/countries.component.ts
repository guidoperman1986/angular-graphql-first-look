import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { map, merge } from 'rxjs';
import { Country } from 'src/app/models/countries.interface';
import { CountriesService } from 'src/app/services/countries.service';

@Component({
  selector: 'app-countries',
  templateUrl: './countries.component.html',
  styleUrls: ['./countries.component.scss'],
})
export class CountriesComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) public paginator!: MatPaginator;

  displayedColumns: string[] = [
    'name',
    'capital',
    'currency',
    'emoji',
    'phone',
  ];

  private countriesService = inject(CountriesService);
  pageSize: number = 25;
  countries: Country[] = [];
  totalResults!: number;

  dataSource!: MatTableDataSource<Country>;

  constructor() {}

  ngOnInit(): void {
    this.countriesService.getCountries().subscribe(countries=> {
        this.countries = countries
        this.dataSource = new MatTableDataSource(this.countries) 
        this.dataSource.paginator = this.paginator;
      }
    )

    this.countriesService.getCountry('AR').subscribe(data=>console.log(data))
  }

  ngAfterViewInit(): void {
  }
}
