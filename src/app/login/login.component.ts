import { Component, OnInit } from '@angular/core';
import {LoginService} from './login.service';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	email:any
  password:any
	userDetails:any
  constructor(private loginService : LoginService,
  	private router: Router) { }

  ngOnInit() {
  }

  login(){

    
console.log("Hello login");
// alert("Login successful");


  	let data={email:this.email,password:this.password}
  	this.loginService.backOfficeLogin(data)
  	.subscribe(result=>{
      console.log(result);
  		this.userDetails=result.data;
  		localStorage.setItem('token', this.userDetails['token']);
      
        localStorage.setItem('uid', this.userDetails['user']._id);
        localStorage.setItem('email', this.userDetails['user'].email);
        localStorage.setItem('firstName', this.userDetails['user'].firstName);
        localStorage.setItem('pid', this.userDetails['user'].profile);
        localStorage.setItem('isActive',this.userDetails['user'].isActive);
        localStorage.setItem('isStaff',this.userDetails['user'].isStaff);
        localStorage.setItem('isAdmin',this.userDetails['user'].isadmin);
        this.router.navigate(['./rawnews']).catch(error => {
          console.error('Error during navigation:', error);
          // Handle the navigation error
        });
        
  	})
  }

}
