import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatTreeModule } from '@angular/material/tree';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CdkTreeModule } from '@angular/cdk/tree';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {
  MatTableModule, MatBottomSheetModule, MatSnackBarModule,
  MatNativeDateModule, MatCheckboxModule, MatMenuModule,
  MatButtonToggleModule, MatCardModule, MatDatepickerModule,
  MatDividerModule, MatExpansionModule, MatGridListModule,
  MatListModule, MatPaginatorModule, MatProgressBarModule,
  MatRadioModule, MatRippleModule, MatSelectModule, MatSliderModule,
  MatSlideToggleModule, MatSortModule, MatStepperModule,
  MatTabsModule, MatTooltipModule, MatFormFieldModule,
  MatAutocompleteModule, MatBadgeModule
} from '@angular/material';
import { MatGridListResponsive } from './mat-grid-list-responsive.directive';

@NgModule({
  declarations: [MatGridListResponsive],
  imports: [
    MatInputModule, MatButtonModule, MatSidenavModule,
    MatToolbarModule, MatIconModule, MatDialogModule,
    MatTableModule, MatBottomSheetModule, MatSnackBarModule,
    MatProgressSpinnerModule, MatCheckboxModule, MatMenuModule,
    MatNativeDateModule, MatChipsModule, MatButtonToggleModule,
    MatCardModule, MatDatepickerModule, MatDividerModule,
    MatExpansionModule, MatGridListModule, CdkTreeModule,
    MatListModule, MatPaginatorModule, MatProgressBarModule,
    MatRadioModule, MatRippleModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule, MatSortModule, MatStepperModule,
    MatTabsModule, MatTooltipModule, MatFormFieldModule,
    MatAutocompleteModule, MatTreeModule, FlexLayoutModule,
    MatBadgeModule, FlexLayoutModule, NgxMaterialTimepickerModule,
    NgxMatSelectSearchModule
  ],
  exports: [
    MatInputModule, MatButtonModule, MatSidenavModule,
    MatToolbarModule, MatIconModule, MatDialogModule,
    MatTableModule, MatBottomSheetModule, MatSnackBarModule,
    MatProgressSpinnerModule, MatCheckboxModule, MatMenuModule,
    MatNativeDateModule, MatChipsModule, MatButtonToggleModule,
    MatCardModule, MatDatepickerModule, MatDividerModule,
    MatExpansionModule, MatGridListModule, MatListModule,
    MatPaginatorModule, MatProgressBarModule, MatRadioModule,
    MatRippleModule, MatSelectModule, MatSliderModule,
    MatSlideToggleModule, MatSortModule, MatStepperModule,
    MatTabsModule, MatTooltipModule, MatFormFieldModule,
    MatAutocompleteModule, MatTreeModule, FlexLayoutModule,
    MatBadgeModule, CdkTreeModule, NgxMaterialTimepickerModule,
    NgxMatSelectSearchModule, MatGridListResponsive
  ]
})


export class AngularMaterialModule { }
