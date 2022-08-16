import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import {ShareComponent} from './share.component';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {Ng2ImgMaxModule} from 'ng2-img-max';
import {Router} from '@angular/router';
import {RouterTestingModule} from '@angular/router/testing';
import {MatDialogModule} from "@angular/material/dialog";

describe('ShareComponent', () => {
  let component: ShareComponent;
  let fixture: ComponentFixture<ShareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [{
        provide: Router, useClass: class {
          navigate = jasmine.createSpy('navigate');
        }
      }],
      imports: [FormsModule, HttpClientModule, Ng2ImgMaxModule, RouterTestingModule, MatDialogModule],
      declarations: [ShareComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    component.indexedDBacess.loadUsersList();
  });

  /*
  it('import a save',() => {
    const saveZip = new XMLHttpRequest();
    saveZip.open('GET','../../../assets/fileForTest/lifecomp.augcom',true);
    saveZip.send(null);
    component.exploreAugcomZip(saveZip.response);
    expect(component.boardService.board.software).toEqual('LifeCompanion');
  });
   */

  it('import a save unzip',() => {
    const saveZip = new XMLHttpRequest();

    saveZip.open('GET', '../../../assets/fileForTest/lifecompTest.opgf', false);
    saveZip.send(null);

    let tempBoard;
    tempBoard = JSON.parse(saveZip.responseText);
    tempBoard.ElementList.forEach(element => {
      component.checkAndUpdateElementDefaultForm(element);
    });
    component.boardService.board = component.jsonValidator.getCheckedGrid(tempBoard);

    expect(component.boardService.board.software).toEqual('LifeCompanion');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should create the 5 different options components', () => {
  //   const compiled = fixture.debugElement.nativeElement;
  //   const allListElements = compiled.querySelectorAll('.listElement');
  //   expect(allListElements.length).toEqual(3/*6*/);
  //   expect(allListElements[0].textContent).toContain(component.multilinguism.translate('importSave'));
  //   expect(allListElements[1].textContent).toContain(component.multilinguism.translate('importZip'));
  //   expect(allListElements[2].textContent).toContain(component.multilinguism.translate('exportSave'));
  //   expect(allListElements[3].textContent).toContain(component.multilinguism.translate('exportPDF'));
  //   expect(allListElements[4].textContent).toContain(component.multilinguism.translate('importS4Y'));
  //   expect(allListElements[5].textContent).toContain(component.multilinguism.translate('importProloquo'));
  // });


  it('should create the 8 different options components', () => {
    const compiled = fixture.debugElement.nativeElement;
    const allListElements = compiled.querySelectorAll('.listElement');
    expect(allListElements.length).toEqual(8);
    expect(allListElements[0].textContent).toContain(component.multilinguism.translate('importSave'));
    expect(allListElements[1].textContent).toContain(component.multilinguism.translate('importPages'));
    expect(allListElements[2].textContent).toContain(component.multilinguism.translate('import save from snap core first'));
    expect(allListElements[3].textContent).toContain(component.multilinguism.translate('import save from life companion'));
    expect(allListElements[4].textContent).toContain(component.multilinguism.translate('exportPage'));
    expect(allListElements[5].textContent).toContain(component.multilinguism.translate('exportPageAndItsSubset'));
    expect(allListElements[6].textContent).toContain(component.multilinguism.translate('exportSave'));
    expect(allListElements[7].textContent).toContain(component.multilinguism.translate('exportPDF'));
  });
});
