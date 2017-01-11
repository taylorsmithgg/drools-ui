import { Component, ViewChild } from '@angular/core';
import { Http } from '@angular/http';

import {DataSet, Network} from 'vis';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('editor') editor;
  title = 'app works!';
  attribute = {};
  schema = {"type":"object", "title":"Facts"};
  myStartVal = undefined;
  record = {};
  queue = [];
  index = -1;
  indexEdge = 1;
  editedQuery = {};
  nodes: DataSet<any>;
  edges: DataSet<any>;
  network: Network;
  url = "http://127.0.0.1:80/";
  text = "";

  constructor(private http: Http){

  }

  log(data){
    this.text = data;
  }

  onRecordChange(record: Object) {
    this.record = record;
  }

  reset(){
    this.queue = [];
    this.index = this.queue.length - 1;
    this.indexEdge = 1;

    // $("#counter").text((index + 1) + " / " + queue.length);

    // create a network
    var container = document.getElementById('mynetwork');

    var x = - container.clientWidth / 2 + 10;
    var y = - container.clientHeight / 2 + 10;
    var step = 70;
//        nodes.push({id: 1, x: x, y: y, label: 'Rule', group: 'rule', value: 1, fixed: true, physics:false});
//        nodes.push({id: 2, x: x, y: y + step, label: 'Fact Type', group: 'facttype', value: 1, fixed: true,  physics:false});
//        nodes.push({id: 3, x: x, y: y + 2 * step, label: 'Fact Instance', group: 'factinstance', value: 1, fixed: true,  physics:false});
//        nodes.push({id: 1003, x: x, y: y + 3 * step, label: 'Computer', group: 'desktop', value: 1, fixed: true,  physics:false});
//        nodes.push({id: 1004, x: x, y: y + 4 * step, label: 'Smartphone', group: 'mobile', value: 1, fixed: true,  physics:false});

    // create an array with nodes
    this.nodes = new DataSet([
    {id:0, label : "User", color : 'pink', shape : 'icon', group : 'users', title : "42"},
      //{id: 1, x: x, y: y, label: 'Rule', group: 'rule', color : 'orange', shape : 'box', value: 1, fixed: true, physics:false},
      //{id: 2, x: x, y: y + step, label: 'Fact Type', group: 'facttype', color : 'red', shape : 'box', value: 1, fixed: true,  physics:false},
      //{id: 3, x: x, y: y + 2 * step, label: 'Fact Instance', group: 'factinstance', color : 'blue', shape : 'box', value: 1, fixed: true,  physics:false}
    ]);

    // create an array with edges
    this.edges = new DataSet([]);

    var data = {
        nodes: this.nodes,
        edges: this.edges
    };

    var options = {
      interaction:{hover:true},
      height: '90%',
      groups: {
        users: {
          shape: 'icon',
          icon: {
            face: 'Ionicons',
            code: '\uf47e',
            size: 50,
            color: '#aa00ff'
          }
        }
      }
    };

    this.network = new Network(container, data, options);
    this.network.on("click", function (params) {
        params.event = "[original event]";
        document.getElementById('eventSpan').innerHTML = '<h4>Node: ' + params.nodes + '</h4>' + this.nodes.get(params.nodes)[0].title;
    });
  }

  compileDrl(){

    // reset data and graph
    this.reset();
    // $('#theTabs a[data-target="#drl"]').tab('show');
    // $('#firebtn').addClass("disabled");

    this.schema = {"type":"object", "title":"Facts"};

		this.http.post(this.url+'rest/drools/drlCompile', {data: btoa(this.text)}).subscribe(
      result => {
        console.log(result);
      },
      err => {
        console.log(err);
      }
    );

    //
		// res.success(function(data, status, headers, config) {
    //         //console.log(data);
    //         if (data.success) {
    //             $scope.myStartVal = undefined;
    //             $scope.mySchema = data.jsonSchema;
    //             $('#theTabs a[data-target="#facts"]').tab('show');
    //             $('#firebtn').removeClass("disabled");
    //         }
		// });
    //
		// res.error(function(data, status, headers, config) {
    //         console.log(data);
		// });
  }

  fireDrl(){
    var dataObj = {
            data : "",
    };

    var res = this.http.post(this.url+'rest/drools/drlFire', dataObj);

    // res.success(function(data, status, headers, config) {
    //     console.log(data);
    //
    // });
    // res.error(function(data, status, headers, config) {
    //     console.log(data);
    // });
  }

  saveDrl(){
    // var res = this.http.post(url+'rest/context');
    //
    // res.success(function(data, status, headers, config) {
    //     console.log(data);
    //     if (data.result) {
    //         $location.path('/'+data.contextId)
    //     }
    // });
    // res.error(function(data, status, headers, config) {
    //     console.log(data);
    // });
  }


}
