import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { of } from 'rxjs';
import { GenericService } from '../../generic/generic.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let mockGenericService: jasmine.SpyObj<GenericService>;

  beforeEach(async () => {
    mockGenericService = jasmine.createSpyObj(['get', 'delete']);

    await TestBed.configureTestingModule({
      providers: [
        { provide: GenericService, useValue: mockGenericService }
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getContacts on ngOnInit', () => {
    mockGenericService.get.and.returnValue(of({ content: [], totalPages: 0 }));
    fixture.detectChanges();

    expect(mockGenericService.get).toHaveBeenCalled();
  });
});
