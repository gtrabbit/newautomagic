import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { TitleCaseService } from './title-case.service';
import { LoginService } from './login.service';
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
import { AddRankService } from './add-rank.service';
import { DisplayLinksComponent } from './display-links/display-links.component';
import { AssociateRankComponent } from './associate-rank/associate-rank.component';
import { NaviComponent } from './navi/navi.component';
import { ExhibitIndexBuilderComponent } from './exhibit-index-builder/exhibit-index-builder.component';
import { PbfComponent } from './admin/pbf/pbf.component';
import { ScraperComponent } from './admin/scraper/scraper.component';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { AccountsComponent } from './admin/accounts/accounts.component';
import { MergeifsComponent } from './admin/mergeifs/mergeifs.component';
import { PaperExhibitComponent } from './exhibit-index-builder/paper-exhibit/paper-exhibit.component';
import { DbWipeComponent } from './db-wipe/db-wipe.component';


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
    AddIFLinkComponent,
    DisplayLinksComponent,
    AssociateRankComponent,
    NaviComponent,
    ExhibitIndexBuilderComponent,
    PbfComponent,
    ScraperComponent,
    AdminPanelComponent,
    AccountsComponent,
    MergeifsComponent,
    PaperExhibitComponent,
    DbWipeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [ TitleCaseService, AddRankService, LoginService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
