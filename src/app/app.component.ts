import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { interval, Observable, Subject, Subscription, timer } from 'rxjs';
import { map, filter, switchMap, take, distinctUntilChanged, debounceTime, tap, catchError } from 'rxjs/operators'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('arrow') arrow!: ElementRef;
  public title = 'RxJs';

  constructor(
    private renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    this.startClock();
  }

/**
 * timer() - каждую секунду генирирует значение
 * map() - преобразовывает в секунды
 */
  public startClock() {
    timer(0,1000).pipe( map(time => time * 360/60)).subscribe({
      next: position => {
        this.renderer.setStyle(this.arrow.nativeElement, 'transform', `rotateZ(${position}deg`)
      },
      error: () => {}
    })
  }

}



