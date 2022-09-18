import { Component, ViewChild, ElementRef, Renderer2, OnInit } from '@angular/core';
import { interval, Observable, of, Subject, Subscription, timer } from 'rxjs';
import { map, filter, switchMap, take, distinctUntilChanged, debounceTime, tap, catchError } from 'rxjs/operators'
import { ApiService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('arrow') arrow!: ElementRef;
  public title = 'RxJs';
  public allPosts: any;

  constructor(
    private renderer: Renderer2,
    private apiService: ApiService,
  ) {}

  ngOnInit(): void {
    this.startClock();
    this.getAllPosts();
  }

/**
 * timer() - каждую секунду генирирует значение
 * map() - Применяет заданную функцию (time * 360/60) к каждому значению, испускаемому исходным Observable, и выдает результирующие значения как Observable.
 * в данном случае, преобразовывает в секунды.
 */
  public startClock(): any {
    timer(0,1000).pipe( map(time => time * 360/60)).subscribe({
      next: position => {
        this.renderer.setStyle(this.arrow.nativeElement, 'transform', `rotateZ(${position}deg`)
      },
      error: () => {}
    })
  }

  public getAllPosts(): any {
    this.apiService.getAllPosts().pipe(
      map(posts => posts.map()),
      tap(posts => { console.log(`p`,posts)}),
      filter(posts => posts.userId === 1) // Отфильтруйте элементы, испускаемые исходным Observable, испуская только те, которые удовлетворяют указанному значению.
      // distinctUntilChanged() Возвращает результат Observable, который испускает все значения, переданные исходным наблюдаемым объектом, 
      // если они отличаются по сравнению с последним значением, испускаемым наблюдаемым результатом
    ).subscribe({
      next: posts => {
        console.log(posts)
        this.allPosts = posts;
      },
      error: () => {}
    })
  }

}



