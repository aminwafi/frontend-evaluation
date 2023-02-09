import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

export class University {
    name: string;
    url: Array<string>;
    domain: Array<string>;
    
    uni: Array<any>;

    public getName() {
        return this.name;
    }

    public getUrl() {
        return this.url;
    }

    public getDomain() {
        return this.domain;
    }

    public getUni() {
        return this.uni;
    }

    convertToReadable(): any {
        var transformedData: any = [];

        // EXTRACT ALL VALUES FROM DOMAIN AND WEB PAGES ARRAY AND ASSIGN TO NAME
        this.uni.forEach((details: any)=> {
            var data: any = {}; // name = mit,
            if (details.domains.length > 0) {
                const combination = details.domains.flatMap((domain: any) => details.web_pages.map((page: any) => { return { name: details.name, url: page, domain: domain } }));
                
                combination.forEach((combo: any) => {
                    transformedData.push(combo);
                });
            }

            else if (details.web_pages.length > 0) {
                const combination = details.web_pages.flatMap((domain: any) => details.domains.map((page: any) => { return { name: details.name, url: page, domain: domain } }));
                
                combination.forEach((combo: any) => {
                    transformedData.push(combo);
                });
            }

            else {
                data.name   = details.name;
                data.domain = details.domain[0];
                data.url    = details.web_pages[0];

                transformedData.push(data);
            }
        });

        // ANOTHER FILTER, TO REMOVE SIMILAR ENTITIES
        transformedData = transformedData.filter((uni: any, index: any) => {
            return index === transformedData.findIndex((obj: any) => obj.name === uni.name && obj.url === uni.url && obj.domain === uni.domain)
        });

        const parsedData = this.cleanUrl(transformedData);
        return parsedData;
    }

    cleanUrl(transformedData: any): any {
        transformedData.forEach((details: any) => {
            if (details.url.slice(0, 5) === 'http:') {
                details.url = details.url.slice(7);
            } else if (details.url.slice(0, 5) === 'https') {
                details.url = details.url.slice(8);
            }

            details.url = details.url[details.url.length - 1] === '/' ? details.url.substring(0, details.url.length - 1) : details.url;
        });

        return transformedData;
    }
}

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
                for (var i in res.json) {
                    var uni: University = new University();
                    Object.assign(uni, res.json[i]);
                }
                
                var u: University = new University();
                u.uni = res.json;

                const data = u.convertToReadable();
                this.dataSource = new MatTableDataSource(data);
            }
        }, (err: any) => {
            console.log(err);
            alert(`Something went wrong. Please try again later.`)
        });
    }

    search(query: any) {
        var queryValue = (query.target as HTMLInputElement).value;

        this.dataSource.filter = queryValue;
    }
}
