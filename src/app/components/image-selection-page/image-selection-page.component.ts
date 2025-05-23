import { Component, OnInit } from '@angular/core';
import { EditionService } from '../../services/edition.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { MultilinguismService } from '../../services/multilinguism.service';
import { ConfigurationService } from "../../services/configuration.service";
import { Observable } from "rxjs";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { DialogModifyColorInsideComponent } from "../dialog-modify-color-inside/dialog-modify-color-inside.component";
import { DialogModifyColorBorderComponent } from "../dialog-modify-color-border/dialog-modify-color-border.component";
import { BoardService } from "../../services/board.service";
import {SearchPictoInLibraryService} from "../../services/search-picto-in-library.service";

@Component({
  selector: 'app-image-selection-page',
  templateUrl: './image-selection-page.component.html',
  styleUrls: ['./image-selection-page.component.css'],
  providers: [Ng2ImgMaxService]
})
export class ImageSelectionPageComponent implements OnInit {

  /**
   * the current list of images related to the chose image library search section
   * (the image list resulting in the research in the mullbery library)
   */
  imageList: { lib, word }[];

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  wordList: string[] = [];

  constructor(public multilinguism: MultilinguismService,
    public ng2ImgMaxService: Ng2ImgMaxService,
    public editionService: EditionService,
    public configurationService: ConfigurationService,
    public boardService: BoardService,
    public searchPictoInLibrary: SearchPictoInLibraryService,
    public dialog: MatDialog) {
    this.searchPictoInLibrary.searchInLib(this.editionService.imageTextField);
  }

  ngOnInit() {

    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

    if (this.editionService.defaultBorderColor != undefined) {
      this.editionService.curentBorderColor = this.editionService.defaultBorderColor;
    }
    if (this.editionService.defaultInsideColor != undefined) {
      this.editionService.curentColor = this.editionService.defaultInsideColor;
    }

  }

  /**
   * Set the current preview imageUrl according to the given file 'file' and close the chooseImage panel
   * if the initial image is bigger than 1000*1000 the the image is reduced
   *
   * @param file, a file element
   */
  previewFile(file) {
    this.editionService.imageURL = 'assets/icons/load.gif';
    if (file.length === 0) {
      return;
    }
    const mimeType = file[0].type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();

    this.ng2ImgMaxService.resize([file[0]], 1000, 1000).subscribe(result => {
      reader.readAsDataURL(result);
      reader.onload = () => {
        this.editionService.imageURL = reader.result;
        // this.choseImage = false;
      };
    }, () => {
      reader.readAsDataURL(file[0]);
      reader.onload = () => {
        this.searchPictoInLibrary.previewWithURL(reader.result);
      };
    });
  }

  getThumbnailPreviewLibrary(elt: { lib, word }) {
    if (elt.lib === 'mulberry') {
      return 'url(\'assets/libs/mulberry-symbols/EN-symbols/' + elt.word + '.svg\')';
    } else if (elt.lib === 'arasaacNB') {
      return 'url(\'assets/libs/FR_Noir_et_blanc_pictogrammes/' + elt.word + '.png\')';
    } else if (elt.lib === 'arasaacColor') {
      return 'url(\'assets/libs/FR_Pictogrammes_couleur/' + elt.word + '.png\')';
    }
  }

  /*s can be 'inside' or 'border', used to open the corresponding color picker popup  */
  openDialogModifyInside() {
    this.dialog.open(DialogModifyColorInsideComponent, {
      height: '50%',
      width: '60%'
    });
  }

  openDialogModifyBorder() {
    this.dialog.open(DialogModifyColorBorderComponent, {
      height: '50%',
      width: '60%'
    });
  }

  private _filter(value: string): string[] {
    if (value.length > 1) {
      this.wordList = this.searchPictoInLibrary.searchInLib(value)[0];
      this.imageList = this.searchPictoInLibrary.searchInLib(value)[1];
      this.editionService.imageTextField = value;
      return this.wordList;
    }
  }
}
