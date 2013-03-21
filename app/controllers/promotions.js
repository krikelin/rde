
var Promotions = function () {
  this.before(require('../helpers/passport').requireAuth);
  this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

  this.index = function (req, resp, params) {
    var self = this;
    
    geddy.model.Promotion.all({datePromoted: '', userId: self.session.get('userId')}, {sort: {datePromoted: 'desc'}}, function(err, submissions) {
      geddy.model.Promotion.all({not: {datePromoted: ''}, userId: self.session.get('userId')}, {sort: {dateSubmitted: 'desc'}}, function(err, secured) {
        self.respond({params: params, promotions: {submissions: submissions, secured: secured}});
      })
    });
  };

  this.add = function (req, resp, params) {
    
    this.respond({params: params});
  };

  this.create = function (req, resp, params) {
    params.id = params.id || geddy.string.uuid(10);
    params.userId = this.session.get('userId');
    var self = this
      , promotion = geddy.model.Promotion.create(params);

    if (!promotion.isValid()) {
      params.errors = promotion.errors;
      self.transfer('add');
    }

    promotion.save(function(err, data) {
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
    
    geddy.model.Promotion.first(params.id, function(err, promotion) {
      if (!promotion) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, promotion: promotion.toObj()});
      }
    });
  };

  this.edit = function (req, resp, params) {
    var self = this;

    geddy.model.Promotion.first(params.id, function(err, promotion) {
      if (!promotion) {
        var err = new Error();
        err.statusCode = 400;
        self.error(err);
      } else {
        self.respond({params: params, promotion: promotion});
      }
    });
  };

  this.update = function (req, resp, params) {
    var self = this;

    geddy.model.Promotion.first(params.id, function(err, promotion) {
      promotion.updateProperties(params);
      if (!promotion.isValid()) {
        params.errors = promotion.errors;
        self.transfer('edit');
      }

      promotion.save(function(err, data) {
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

    geddy.model.Promotion.remove(params.id, function(err) {
      if (err) {
        params.errors = err;
        self.transfer('edit');
      } else {
        self.redirect({controller: self.name});
      }
    });
  };

};

exports.Promotions = Promotions;
