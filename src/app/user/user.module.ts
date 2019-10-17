import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './components/user/user.component';

@NgModule({
  declarations: [UserComponent],
  exports: [UserComponent],
  imports: [CommonModule]
})
export default class UserModule {}
