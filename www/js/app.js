// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'babydata' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'babydata.services' is found in services.js
// 'babydata.controllers' is found in controllers.js

var db = null;
var agreement = false;

angular.module('babydata', ['ionic', 'babydata.controllers', 'babydata.factory', 'babydata.services', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $rootScope) {  
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    //     if(window.cordova) {
    //   // App syntax
    //   db = $cordovaSQLite.openDB(name:"baby.db");
    // } else {
    //   // Ionic serve syntax
    //   db = window.openDatabase("baby.db", "1.0", "Baby Data", -1);
    // }
    // var query = "CREATE TABLE IF NOT EXISTS account (id integer primary key, email text, birthday text, invitecode text)";    
    // $cordovaSQLite.execute(db, query);
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('privacy', {
    url: '/privacy',
    templateUrl: 'templates/privacy.html',
    controller: 'PrivacyCtrl'  
  })

  // setup an abstract state for the tabs directive
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  
  // Each tab has its own nav history stack:

  .state('tab.new', {
    url: '/new',
    views: {
      'tab-new': {
        templateUrl: 'templates/tab-new.html',
        controller: 'NewCtrl'
      }
    }
  })

  .state('tab.modal', {
    url: '/modal',
    views: {
      'tab-modal': {
        templateUrl: 'templates/modal.html',
        controller: 'ModalCtrl'
      }
    }
  })

  .state('tab.records', {
      url: '/records',
      views: {
        'tab-records': {
          templateUrl: 'templates/tab-records.html',
          controller: 'RecordsCtrl'
        }
      }
    })
    .state('tab.record-detail', {
      url: '/records/:recId',
      views: {
        'tab-records': {
          templateUrl: 'templates/record-detail.html',
          controller: 'RecordDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/new');

});
