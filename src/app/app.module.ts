import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TitleCaseService } from './title-case.service';
import { AppComponent } from './app.component';
import { ProfileSearchComponent } from './profile-search/profile-search.component';
import { SearchComponent } from './search/search.component';
import { AddIFComponent } from './add-if/add-if.component';
import { HeaderComponent } from './header/header.component';
import { FirstPanelComponent } from './first-panel/first-panel.component';
import { PaperComponent } from './paper/paper.component';
import { AddPaperComponent } from './add-paper/add-paper.component';
import { RankComponent } from './rank/rank.component';
import { EditJournalComponent } from './edit-journal/edit-journal.component';
import { TopCitedComponent } from './top-cited/top-cited.component';
import { DisplayRankingComponent } from './display-ranking/display-ranking.component';
import { AddIFLinkComponent } from './add-iflink/add-iflink.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileSearchComponent,
    SearchComponent,
    AddIFComponent,
    HeaderComponent,
    FirstPanelComponent,
    PaperComponent,
    AddPaperComponent,
    RankComponent,
    EditJournalComponent,
    TopCitedComponent,
    DisplayRankingComponent,
    AddIFLinkComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ TitleCaseService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
