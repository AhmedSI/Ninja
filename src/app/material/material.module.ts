import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSelectModule,MatSnackBarModule,MatAutocompleteModule, MatTabsModule, MatFormFieldModule, MatTooltipModule, MatListModule, MatExpansionModule, MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule, MatIconModule, MatStepperModule} from '@angular/material';


@NgModule({
  imports: [MatSelectModule,MatSnackBarModule,MatAutocompleteModule,MatTabsModule, MatFormFieldModule, MatTooltipModule, MatListModule, MatExpansionModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule, MatIconModule, MatStepperModule],
  exports: [MatSelectModule,MatSnackBarModule,MatAutocompleteModule,MatTabsModule, MatFormFieldModule, MatTooltipModule, MatListModule, MatExpansionModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule, MatIconModule, MatStepperModule]  
})
export class MaterialModule { }
