import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTabsModule, MatFormFieldModule, MatTooltipModule, MatListModule, MatExpansionModule, MatButtonModule, MatCheckboxModule, MatSidenavModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule, MatIconModule, MatStepperModule} from '@angular/material';


@NgModule({
  imports: [MatTabsModule, MatFormFieldModule, MatTooltipModule, MatListModule, MatExpansionModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule, MatIconModule, MatStepperModule],
  exports: [MatTabsModule, MatFormFieldModule, MatTooltipModule, MatListModule, MatExpansionModule, MatSidenavModule, MatButtonModule, MatCheckboxModule, MatToolbarModule, MatInputModule, MatProgressSpinnerModule, MatCardModule, MatMenuModule, MatIconModule, MatStepperModule]  
})
export class MaterialModule { }
