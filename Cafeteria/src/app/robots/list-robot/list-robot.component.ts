import { Component } from '@angular/core';
import { Robots } from '../robots';
import { ServiceRobotsService } from '../service-robots.service';

@Component({
  selector: 'app-list-robot',
  templateUrl: './list-robot.component.html',
  styles: [
  "node_modules/bootstrap/dist/css/bootstrap.min.css",
]})
export class ListRobotComponent {
robots: Robots[] = [];

constructor(
  private robotService: ServiceRobotsService
) {}

ngOnInit() {
  // this.robots = [
  //   { idRobot: 1, alias: 'Robot Test 1' },
  //   { idRobot: 2, alias: 'Robot Test 2' },
  // ];
  this.loadRobots()
  }

loadRobots() {
  this.robotService.getRobots().subscribe((data: Robots[]) => {
    console.log('Respuesta del servicio:', data);
    this.robots = data; // <- asegúrate de acceder al array real
    console.log(this.robots)
  });
}
}
