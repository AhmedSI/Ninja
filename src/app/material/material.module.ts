import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTabsModule,MatFormFieldModule,MatTooltipModule,MatListModule,MatExpansionModule,MatButtonModule,MatCheckboxModule,MatSidenavModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule} from '@angular/material';


@NgModule({
  imports: [MatTabsModule,MatFormFieldModule,MatTooltipModule,MatListModule,MatExpansionModule,MatSidenavModule,MatButtonModule, MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule,MatIconModule],
  exports: [MatTabsModule,MatFormFieldModule,MatTooltipModule,MatListModule,MatExpansionModule,MatSidenavModule,MatButtonModule, MatCheckboxModule,MatToolbarModule,MatInputModule,MatProgressSpinnerModule,MatCardModule,MatMenuModule, MatIconModule]  
})
export class MaterialModule { }
