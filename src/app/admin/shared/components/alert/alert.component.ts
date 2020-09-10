import { Subscription } from 'rxjs';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { AlertService } from '../../services/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit, OnDestroy {

  @Input() delay = 4000
  public text: string
  public type ='success'
  alertSub:Subscription

  constructor(private alertService: AlertService) { }

  ngOnInit(){
    this.alertSub = this.alertService.alert$.subscribe(alert => {
      this.text = alert.text
      this.type = alert.type
      const timeOut = setTimeout(()=>{
        clearTimeout(timeOut)
        this.text = ''
      }, this.delay)
    })
  }
  ngOnDestroy(){
    if (this.alertSub) {
      this.alertSub.unsubscribe()
    }
  }

}
