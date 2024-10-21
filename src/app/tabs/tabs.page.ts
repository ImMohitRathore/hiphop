import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage {
  constructor() {}
  selectedTab: string = 'news'; // Default active tab

  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
