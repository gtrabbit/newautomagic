import { Component } from '@angular/core';
import { FormatRanksService} from './format-ranks.service';
import { RankingService } from './ranking.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ FormatRanksService, RankingService ]
})
export class AppComponent {
  title = 'AutoMagic';
}
