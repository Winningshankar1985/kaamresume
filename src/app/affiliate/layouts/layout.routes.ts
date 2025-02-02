import { Routes } from "@angular/router";
import { FullComponent } from "./full.component";



export const layoutRoutes: Routes = [
    // {
    //     path: '',
    //     redirectTo: '/affiliate_area',
    //     pathMatch: 'full'
    // },
    {
        path: '',
        component: FullComponent,
        children: [
            
            {
                path: '',
                loadChildren: ()=> import('../pages/pages.routes').then((m)=>m.PagesRoutes)
            }

        ]
    }
]