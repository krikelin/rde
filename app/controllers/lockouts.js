var Lockouts = function () {
  this.before(require('../helpers/passport').requireAuth);
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Lockout.all(function(err, lockouts) {
      self.respond({params: params, lockouts: lockouts});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);
    params.userId = this.session.get('userId');
    var self = this
      , lockout = geddy.model.Lockout.create(params);

    if (!lockout.isValid()) {
      params.errors = lockout.errors;
      self.transfer('add');
    }

    lockout.save(function(err, data) {
      if (err) {
        params.errors = err;
        self.transfer('add');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

  this.show = function (req, resp, params) {
    var self = this;

    geddy.model.Lockout.first(params.id, function(err, lockout) {
      if (!lockout) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, lockout: lockout.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Lockout.first(params.id, function(err, lockout) {
      if (!lockout) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, lockout: lockout});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Lockout.first(params.id, function(err, lockout) {
      lockout.updateProperties(params);
      if (!lockout.isValid()) {
        params.errors = lockout.errors;
        self.transfer('edit');
      }

      lockout.save(function(err, data) {
        if (err) {
          params.errors = err;
          self.transfer('edit');
        } else {
          self.redirect({controller: self.name});
        }
      });
    });
  };

  this.destroy = function (req, resp, params) {
    var self = this;

    geddy.model.Lockout.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Lockouts = Lockouts;
