
import { MaterialModule } from 'src/app/material.module';
import { AppSalesOverviewComponent } from '../../components/sales-overview/sales-overview.component';
import { AppYearlyBreakupComponent } from '../../components/yearly-breakup/yearly-breakup.component';
import { AppMonthlyEarningsComponent } from '../../components/monthly-earnings/monthly-earnings.component';
import { AppRecentTransactionsComponent } from '../../components/recent-transactions/recent-transactions.component';
import { AppProductPerformanceComponent } from '../../components/product-performance/product-performance.component';
import { AppBlogCardsComponent } from '../../components/blog-card/blog-card.component';
import { Component, ViewEncapsulation } from '@angular/core';


@Component({
  selector: 'app-starter',
  standalone: true,
  imports: [
    MaterialModule,
    AppSalesOverviewComponent,
    AppYearlyBreakupComponent,
    AppMonthlyEarningsComponent,
    AppRecentTransactionsComponent,
    AppProductPerformanceComponent,
    AppBlogCardsComponent
  ],
  templateUrl: './starter.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class StarterComponent { }