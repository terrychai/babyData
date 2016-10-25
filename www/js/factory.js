angular.module('babydata.factory', [])

.factory('Records', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var records = [{
    id: 0,
    name: '饿了',
    lastText: '2016-9-20 10:32:30 AM',
    face: 'img/ben.jpg'
  }, {
    id: 1,
    name: '累了',
    lastText: '2016-9-21 1:32:30 AM',
    face: 'img/max.jpg'
  }, {
    id: 2,
    name: '困了',
    lastText: '2016-9-21 11:32:30 PM',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: '拉肚子',
    lastText: '2016-9-22 9:32:30 AM',
    face: 'img/perry.jpg'
  }, {
    id: 4,
    name: '肚子有气',
    lastText: '2016-9-23 11:12:30 AM',
    face: 'img/mike.jpg'
  }];

  return {
    all: function() {
      return records;
    },
    remove: function(record) {
      records.splice(records.indexOf(record), 1);
    },
    get: function(recId) {
      for (var i = 0; i < records.length; i++) {
        if (records[i].id === parseInt(recId)) {
          return records[i];
        }
      }
      return null;
    }
  };
})

.factory('DataService',['$cordovaSQLite','$ionicPlatform','$q',
  function($cordovaSQLite,$ionicPlatform,$q){
    var db;
    var myAccount;
    var hasAccount = false;
    var hasAgree = false;
    return {
      initDB:initDB,
      getAccount: getAccount,
      saveAccount: saveAccount      
    }

    function initDB() {
      $ionicPlatform.ready(function() {
        console.log("INIT DB ");
          if(window.cordova)
          {
          db = window.sqlitePlugin.openDatabase({name: 'babydata.db', location: 'default'}); 
          // db = $cordovaSQLite.openDatabase("babydata.db");
        }else
        {
          db = window.openDatabase("babydata.db", '1.0', 'babydata DB', -1);
        }
        
        var query = "CREATE TABLE IF NOT EXISTS account (email text, birthday text, invitecode text)";   
        
        runQuery(query,[],function(res) {
          console.log("sqlite init");
        }, function (err) {
          console.log(err);
        });
      }.bind(this));
    }

    function getAccount(){
      var deferred = $q.defer();
      var query = "SELECT * from account";
      runQuery(query,[],function(response){
        //Success Callback
        console.log(response);
        myAccount = response.rows;
        deferred.resolve(response);
      },function(error){
        //Error Callback
        console.log(error);
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function saveAccount(email,birthday,invitecode) {
      deleteAccount();
      console.log('saving account info :'+ email);
      var deferred = $q.defer();
      var query = "INSERT INTO account (email, birthday, invitecode) VALUES (?,?,?)";
      runQuery(query,[email,birthday,invitecode],function(response){
        //Success Callback
        console.log(response);
        deferred.resolve(response);
      },function(error){
        //Error Callback
        console.log(error);
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function deleteAccount() {
      var deferred = $q.defer();
      var query = "DELETE FROM account";
      runQuery(query,[],function(response){
        //Success Callback
        console.log(response);
        deferred.resolve(response);
      },function(error){
        //Error Callback
        console.log(error);
        deferred.reject(error);
      });

      return deferred.promise;
    }

    function runQuery(query,dataArray,successCb,errorCb)
    {
      $ionicPlatform.ready(function() {     
          $cordovaSQLite.execute(db, query,dataArray).then(function(res) {
            successCb(res);
          }, function (err) {
            errorCb(err);
          });
      }.bind(this));
    }
  }
]);