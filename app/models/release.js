var Release = function () {

  this.defineProperties({
    name: {type: 'string', required: true},
    upc: {type: 'string'},
    releaseDate: {type: 'date'},
    image: {type: 'string'}
  });
  this.belongsTo('User');
  this.hasMany('Releases');
  this.hasMany('Promotions');
  /*
  this.property('login', 'string', {required: true});
  this.property('password', 'string', {required: true});
  this.property('lastName', 'string');
  this.property('firstName', 'string');

  this.validatesPresent('login');
  this.validatesFormat('login', /[a-z]+/, {message: 'Subdivisions!'});
  this.validatesLength('login', {min: 3});
  // Use with the name of the other parameter to compare with
  this.validatesConfirmed('password', 'confirmPassword');
  // Use with any function that returns a Boolean
  this.validatesWithFunction('password', function (s) {
      return s.length > 0;
  });

  // Can define methods for instances like this
  this.someMethod = function () {
    // Do some stuff
  };
  */

};

/*
// Can also define them on the prototype
Release.prototype.someOtherMethod = function () {
  // Do some other stuff
};
// Can also define static methods and properties
Release.someStaticMethod = function () {
  // Do some other stuff
};
Release.someStaticProperty = 'YYZ';
*/

Release = geddy.model.register('Release', Release);

