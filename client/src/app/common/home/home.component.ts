import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    @ViewChild(MatPaginator, { static: false })
    set paginator(value: MatPaginator) {
        if (this.dataSource) {
            this.dataSource.paginator = value;
        }
    }

    @ViewChild(MatSort, { static: false })
    set sort(value: MatSort) {
        if (this.dataSource) {
            this.dataSource.sort = value;
        }
    }

    columns: string[] = ['name', 'url', 'domain'];
    dataSource: any = null;

    constructor(
        private api: ApiService
    ) { }

    ngOnInit(): void {
        this.getAllDetails();
    }

    getAllDetails() {
        this.api.getAllDetails().subscribe((res: any) => {
            if (res.json.length > 0) {
                const data = this.convertJsonToReadable(res.json);
                console.log(data);
                this.dataSource = new MatTableDataSource(data);
            }
        }, (err: any) => {
            console.log(err);
            alert(`Something went wrong. Please try again later.`)
        });
    }

    convertJsonToReadable(uniDets: any): any {
        var transformedData: any[] = [];

        uniDets.forEach((details: any)=> {
            var data = {};
            details.web_pages.forEach((page: any) => {
                details.domains.forEach((domain: any) => {
                    data = {
                        name: details.name,
                        url: page,
                        domain: domain
                    };
                    transformedData.push(data);
                });
            });
        });

        const parsedData = this.cleanUrl(transformedData);
        return parsedData;
    }

    cleanUrl(transformedData: any): any {
        transformedData.forEach((details: any) => {
            if (details.url.slice(0, 5) === 'http:') {
                details.url = details.url.slice(7);
            } else {
                details.url = details.url.slice(8);
            }

            details.url = details.url[details.url.length - 1] === '/' ? details.url.slice(0, -1) : details.url;
        });

        return transformedData;
    }

    search(query: any) {
        var queryValue = (query.target as HTMLInputElement).value;

        this.dataSource.filter = queryValue;
    }

}
