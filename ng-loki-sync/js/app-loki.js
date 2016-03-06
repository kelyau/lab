var app = angular.module("app",["lokijs"]);

//angular.bootstrap(document,["app"]);

app.factory("db", function($q,Loki) {
    var _db;
       _db = new Loki("loki-app"); 
    return {
            contacts: "",
            getAll: function(){
                  var self = this;
                  return $q(function (resolve, reject) {
                      var options = {};
                      _db.loadDatabase(options, function() {
                          self.contacts = _db.getCollection("contact") || _db.addCollection("contact");
                          resolve(self.contacts);
                          
                          })
                      })    
                },
            addContact: function(contact) {
                   this.contacts.insert(contact);
                   _db.saveDatabase();
                },
            updateContact: function(contact) {
                   this.contacts.upate(contact);
                   _db.saveDatabase();
                
                },
            deleContact: function(contact) {
                    this.contacts.remove(contact);
                    _db.saveDatabase();
                }    
        }
    });

app.controller("mainCtrl", function($scope,db){
   // db.getAll()
   //   .then(function(res) {
   //       $scope.contact = res;
   //    db.getAll()
   //  );;
   //
   $scope.contacts = db.contacts;

   db.getAll().then(function(res){
       $scope.contacts = db.contacts;
       })
    $scope.lokiModel = {};
    $scope.lokiEvents = {
        submit: function(){
            db.addContact($scope.lokiModel);
            $scope.lokiModel = {};            
            },
        remove: function(item) {
            db.deleContact(item);
            }

        }

  })     
    
   
app.controller("inputCtrl", function(){
    
    })

app.controller("listCtrl", function() {
    
    })

angular.bootstrap(document,["app"]);
