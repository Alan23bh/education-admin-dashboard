// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-student-profile',
//   imports: [],
//   templateUrl: './student-profile.html',
//   styleUrl: './student-profile.scss',
// })
// export class StudentProfile {

// }
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-student-profile',
  standalone: true,
  imports: [],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.scss',
})
export class StudentProfile {
  id = 'unknown';

  constructor(private route: ActivatedRoute) {
    this.id = this.route.snapshot.paramMap.get('id') ?? 'unknown';
  }
}
