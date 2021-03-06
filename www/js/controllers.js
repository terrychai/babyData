angular.module('babydata.controllers', ['ngCordova'])

.controller('ModalCtrl', function($scope) {

  $scope.hideModal = function() {
    $scope.modalCtrl.hide();
  };
  
  $scope.doSomething = function(item) {
    $scope.modalData.msg = item;
    $scope.modalCtrl.hide();
  };
  
})

.controller('NewCtrl', function($scope, $cordovaCapture, $cordovaCamera, $ionicModal, VideoService) {
  $scope.clip = '';
  $scope.videoPath = "";
  $scope.hasVideo = false;  
  $scope.types = ['Hungry 饿了','Dirty Diaper 尿布脏了','Too Hot 太热了','Too Cold 太冷了','Too gassy 肚子有气'];  

  $ionicModal.fromTemplateUrl('templates/modal.html', function(modal) {
    $scope.modalCtrl = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up',
    focusFirstInput: true
  });

  $scope.modalData = {"msg" : 'Select a reason 选择原因'};

  $scope.openModal = function() {          
    $scope.modalCtrl.show();
  };



  $scope.captureVideo = function() {
    $cordovaCapture.captureVideo().then(function(videoData) {
      console.log("old vpath: "+ $scope.videoPath);      
      setPath(videoData[0].fullPath);
      // var path = videoData[0].fullPath;  
      // var prefix = "file";
      // console.log("file prefix: " + path.substring(0,4) );
      // if (path.substring(0,4) != prefix){
      //   path = "file:/" + path
      // }      
      // $scope.videoPath = path;    
      // $scope.comment = path;  
      // console.log("new vpath: "+$scope.videoPath);

      // VideoService.saveVideo(videoData).success(function(data) {
      //   $scope.clip = data;
      //   $scope.$apply();
      // }).error(function(data) {
      //   console.log('ERROR: ' + data);
      // });
    }, function(err) {
      // An error occurred. Show a message to the user
      console.log(err);
    });
  }

  // Choose Video from Device PhotoLibrary
  $scope.getLibraryVideo = function(){
    var options = {
      quality: 100,
      destinationType: Camera.DestinationType.FILE_URI,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      mediaType:Camera.MediaType.VIDEO
    };

    $cordovaCamera.getPicture(options).then(function(path){
      // Success! Video data is here      
      setPath(path);      
    }, function(err) {
      // An error occurred. Show a message to the user
      console.log(err);
    });
  }

  $scope.upload = function(){
    $clearVideo();
  }

  $scope.cancelUpload = function(){
    clearVideo();
  }

  function setPath(path){
    var prefix = "file";
    var prefix1 = "file://";
    console.log("path prefix: " + path.substring(0,4) );
    if (path.substring(0,4) != prefix){      
      path = "file:" + path;
    }    

    $scope.videoPath = path;    
    // $scope.comment = path;  
    $scope.hasVideo = true;
  }

  function clearVideo(){    
    $scope.hasVideo = false;
    $scope.comment = "";
    $scope.videoPath = "";
    $scope.modalData = {"msg" : 'Select a reason 选择原因'};
  }  

  // $scope.urlForClipThumb = function(clipUrl) {
  //   var name = clipUrl.substr(clipUrl.lastIndexOf('/') + 1);
  //   var trueOrigin = cordova.file.dataDirectory + name;
  //   var sliced = trueOrigin.slice(0, -4);
  //   return sliced + '.png';
  // }
   
  // $scope.showClip = function(clip) {
  //   // console.log('show clip: ' + clip);
  // }
})

.controller('RecordsCtrl', function($scope, Records) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.records = Records.all();
  $scope.remove = function(record) {
    Records.remove(record);
  };
})

.controller('RecordDetailCtrl', function($scope, $stateParams, Records) {
  $scope.record = Records.get($stateParams.recId);
})

.controller('PrivacyCtrl', function($scope, $cordovaSQLite, $stateParams, $location) {
  $scope.agree = function() {
    $location.path("tab/account");
  };
})

.controller('AccountCtrl', function($scope, $cordovaSQLite, $location, $cordovaDevice, DataService) {
  
  initData();
  var uuid = $cordovaDevice.getUUID();
  function initData(){    
    DataService.initDB();
    fetchAccount();
  }   

  function fetchAccount() {    
    DataService.getAccount()
    .then(fetchAccountSuccessCB,fetchAccountErrorCB);
  }

  function fetchAccountSuccessCB(response)
  {
    // $scope.loadingTrackers = false;
    if(response && response.rows && response.rows.length > 0)
    {
      $scope.email = response.rows.item(0).email;                
      $scope.birthday = new Date(response.rows.item(0).birthday);
      $scope.invitecode =  uuid; //response.rows.item(0).invitecode;    
    }
    else {
      $scope.invitecode =  uuid; 
      showMsg("No account info",true);    
    }
  }

  function fetchAccountErrorCB(error)
  {  
    showMsg(error,true);
  }  

  function showMsg(msg, isError){
    // if (isError){
    //   $scope.msgClass = "assertive"
    // }
    // else{
    //  $scope.msgClass = "balanced" 
    // }
    $scope.message=msg;
  }

  function clearMsg(){
    showMsg("",false); 
  }

  $scope.save = function(email, birthday, invitecode) {      
    if((typeof email !== "undefined" && typeof birthday !== "undefined" && typeof invitecode !== "undefined" ) 
      && (email != "" && birthday != "" && invitecode !="")){     
      DataService.saveAccount(email,birthday,invitecode)
          .then(function(response){   
            clearMsg(); 
            $location.path("tab/new");
            // showMsg("account info has been saved",false);            
            // fetchAccount();
          },function(error){
            showMsg(error,true);
          });
    }
    else{      
      showMsg("Please enter all the information above", true);      
    }    
  }
   
});
