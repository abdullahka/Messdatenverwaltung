import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'ngx-overview',
  styleUrls: ['./overview.component.css'],
  templateUrl: './overview.component.html',
})
export class OverviewComponent implements OnInit {

  
  private headers = {'Content-Type': 'application/json'};

  private loading: boolean = true;
  private isDetail: boolean = false;

  private rosbagList: any = [];

  private rosbagDetails: any = {};
  private rosbagTopicMeta: any[] = [];
  private topicCount: number = 0;
  private rosbagLength: number = 0;

  constructor(private http:HttpClient){

  }

  async ngOnInit(){
    this.rosbagList = await this.http.get('http://localhost:8000/rosbags/all', { headers: this.headers}).toPromise();

    this.loading = false;
  }

  public async goToRosbag(filename:string){
    console.log(filename);
    this.isDetail = true;
    this.loading = true;

    this.rosbagDetails = await this.http.get('http://localhost:8000/rosbag/'+filename, { headers: this.headers}).toPromise();

    console.log(this.rosbagDetails.topic_meta[1]);
    let topics =  Object.keys(this.rosbagDetails.topic_meta[1])
    this.topicCount = topics.length;
    this.rosbagLength = this.rosbagDetails.duration;

    this.rosbagTopicMeta = [];
    for(let i = 0; i < topics.length; ++i){
      let newRow = {
        'name': topics[i],
        'message_count': this.rosbagDetails.topic_meta[1][topics[i]][1],
        'frequency': this.rosbagDetails.topic_meta[1][topics[i]][3]
      }
      this.rosbagTopicMeta.push(newRow);
    }
    console.log(this.rosbagTopicMeta);
    this.loading = false;
  }

}
