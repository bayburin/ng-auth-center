import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatCardModule } from '@angular/material/card';

const modules: any[] = [MatButtonModule, MatDividerModule, MatProgressBarModule, MatCardModule];

@NgModule({
  imports: [...modules],
  exports: [...modules],
})
export class MaterialModule {}
