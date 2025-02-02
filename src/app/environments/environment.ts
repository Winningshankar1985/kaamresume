export const environment = {
    production: false
};





//gateway api
// export const baseUrl : string = 'http://localhost'

export const baseUrl: string = 'http://localhost/sidgptphp/';
export const nodeUrl0: string = 'http://localhost:3000/';
export const nodeUrl: string = 'http://localhost:3000/protected/';
export const authapi: string = baseUrl + 'login';
export const generateapi: string = baseUrl + 'form';
export const resumeApi: string = nodeUrl + 'resume';
export const cashfree_return_url = `http://localhost:4200/pro_area/settings/subscriptions`;
export const env_cashfree = "production";
export const settingModuleDomain: any = {
    name: 'localhost',
    http: false
};