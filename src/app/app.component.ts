import { Component } from '@angular/core';
import { FormatRanksService} from './format-ranks.service';
import { RankingService } from './ranking.service';
import { DeleteEntryService } from './delete-entry.service';
import { GetpdfsService } from './getpdfs.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ FormatRanksService, RankingService, DeleteEntryService, GetpdfsService ]
})
export class AppComponent {
  title = 'AM 2.1';
}
