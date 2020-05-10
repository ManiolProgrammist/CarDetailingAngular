import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-menu-component',
  templateUrl: './menu-component.component.html',
  styleUrls: ['./menu-component.component.css']
})
export class MenuComponentComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  shouldIShownItem(neededAuth:number):boolean{
    if(this.userService.GetUserRights()>=neededAuth){
    return true;
    }
    return false;
  }
  

}
