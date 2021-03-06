var Releases = function () {
  this.before(require('../helpers/passport').requireAuth);
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Release.all(function(err, releases) {
      self.respond({params: params, releases: releases});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);
   
    params.userId = this.session.get('userId');
    console.log(params.userId);    
    var self = this
      , release = geddy.model.Release.create(params);

    if (!release.isValid()) {
      params.errors = release.errors;
      self.transfer('add');
    }

    release.save(function(err, data) {
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

    geddy.model.Release.first(params.id, function(err, release) {
      if (!release) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, release: release.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Release.first(params.id, function(err, release) {
      if (!release) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, release: release});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;
    
    geddy.model.Release.first(params.id, function(err, release) {
      release.updateProperties(params);
      if (!release.isValid()) {
        params.errors = release.errors;
        self.transfer('edit');
      }

      release.save(function(err, data) {
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

    geddy.model.Release.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Releases = Releases;
