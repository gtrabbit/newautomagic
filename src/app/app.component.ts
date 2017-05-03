import { Component } from '@angular/core';
import { FormatRanksService} from './format-ranks.service';
import { RankingService } from './ranking.service';
import { DeleteEntryService } from './delete-entry.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ FormatRanksService, RankingService, DeleteEntryService ]
})
export class AppComponent {
  title = 'Title';
}
