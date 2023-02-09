import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
    text: any;

    constructor() { }

    ngOnInit(): void {
        this.text = "Hi, my name is Muhamad Amin Wafi Bin Ahmad Hisamuddin. " +
        "I am currently working at Maybank as a fullstack cloud developer. On a daily basis, I would be mostly focusing into MEAN stack development " +
        "and implementing cloud solutions. To date, I have a year and 2 months experience working in a developer role, and " +
        "contributed over 30 to 40 features for web application and few POCs with cloud development projects. \n\n" +

        "Previously, I was working as a data scientist on a graduate programme for two months, and I had also interned as a software engineer " +
        "that focus mainly on backend and automation. Ideally, I would like to take more opportunities into " +
        "leadership role and specialize in higher priority projects where I can develop new skills, tech stacks, and knowledge on running a successful business along the journey. " +
        "From your company's value and history, I believe, acquiring this role will align with my personal beliefs and goals. \n\n"
    }
}
