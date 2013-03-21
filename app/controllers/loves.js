var Loves = function () {
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;

    geddy.model.Lofe.all(function(err, loves) {
      self.respond({params: params, loves: loves});
    });
  };

  this.add = function (req, resp, params) {
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);

    var self = this
      , lofe = geddy.model.Lofe.create(params);

    if (!lofe.isValid()) {
      params.errors = lofe.errors;
      self.transfer('add');
    }

    lofe.save(function(err, data) {
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

    geddy.model.Lofe.first(params.id, function(err, lofe) {
      if (!lofe) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, lofe: lofe.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Lofe.first(params.id, function(err, lofe) {
      if (!lofe) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, lofe: lofe});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Lofe.first(params.id, function(err, lofe) {
      lofe.updateProperties(params);
      if (!lofe.isValid()) {
        params.errors = lofe.errors;
        self.transfer('edit');
      }

      lofe.save(function(err, data) {
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

    geddy.model.Lofe.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Loves = Loves;
