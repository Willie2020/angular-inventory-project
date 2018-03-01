// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: true,
  firebase
  : {
    apiKey: "AIzaSyAH3_BNrC1Fdck_51y607FMZawA2yVaoDc",
    authDomain: "sfada-55ef2.firebaseapp.com",
    databaseURL: "https://sfada-55ef2.firebaseio.com",
    projectId: "sfada-55ef2",
    storageBucket: "sfada-55ef2.appspot.com",
    messagingSenderId: "152365051586"    // <--- make sure project ID is here 
  }
};
