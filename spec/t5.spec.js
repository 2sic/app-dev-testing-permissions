function t5spec(moduleId, appFolder) {
  console.log('stv t5', moduleId, appFolder);

  describe("t5 - Query Tests", function () {

    describe("t5.1 - query without permissions - anon and registered should not be able to query", function () {

      beforeEach(function () {
        // override alert dialog for tests
        window.alertShown = false;
        window.alert = function (msg) {
          console.log(msg); // do something with the message
          window.alertShown = msg;
        };

      });

      var query = "t51";

      it("read query", (done) => {
        $2sxc(moduleId).webApi.get('app/' + appFolder + '/query/' + query, null, null, true)
          .always(function (data) {

            if (data && data.ListContent && data.ListContent.length > 0) {
              itemsCount = data.ListContent.length;
            } else {
              itemsCount = 0;
            }
            console.log('stv itemsCount ' + query, itemsCount);
            switch (username) {
              case users.SuperUser: // Host user
                expect(itemsCount).toBeGreaterThan(0);
                break;
              case users.PapaSmurf: // Administrator
                expect(itemsCount).toBe(0);
                break;
              case users.AppSmurf: // Smurfs group
                expect(data.status).toBe(401);
                break;
              case users.Smurfette: // Smurfs group
                expect(data.status).toBe(401);
                break;
              case users.Gargamel: // Bad Guys group
                expect(data.status).toBe(401);
                break;
              case users.Hulk: // Registered user
                expect(data.status).toBe(401);
                break;
              case users.Anonymous: // without user
              default:
                expect(data.status).toBe(401);
            }
            done();
          });
      });

    });

    describe("t5.2 - query with a group-permissions, that should be able to read, anon not", function () {

      beforeEach(function () {
        // override alert dialog for tests
        window.alertShown = false;
        window.alert = function (msg) {
          console.log(msg); // do something with the message
          window.alertShown = msg;
        };

      });

      var query = "t52";

      it("read items", (done) => {
        $2sxc(moduleId).webApi.get('app/' + appFolder + '/query/' + query, null, null, true)
          .always(function (data) {

            if (data && data.ListContent && data.ListContent.length > 0) {
              itemsCount = data.ListContent.length;
            } else {
              itemsCount = 0;
            }

            console.log('stv itemsCount ' + query, itemsCount);
            switch (username) {
              case users.SuperUser: // Host user
                expect(itemsCount).toBeGreaterThan(0);
                break;
              case users.PapaSmurf: // Administrator
                expect(itemsCount).toBe(0);
                break;
              case users.AppSmurf: // Smurfs group
                expect(itemsCount).toBeGreaterThan(0);
                break;
              case users.Smurfette: // Smurfs group
                expect(itemsCount).toBeGreaterThan(0);
                break;
              case users.Gargamel: // Bad Guys group
                expect(data.status).toBe(401);
                break;
              case users.Hulk: // Registered user
                expect(data.status).toBe(401);
                break;
              case users.Anonymous: // without user
              default:
                expect(data.status).toBe(401);
            }
            done();
          });
      });

    });

    describe("t5.3 - public query (anon-read)", function () {

      beforeEach(function () {
        // override alert dialog for tests
        window.alertShown = false;
        window.alert = function (msg) {
          console.log(msg); // do something with the message
          window.alertShown = msg;
        };

      });

      var query = "t53";

      it("read items", (done) => {
        $2sxc(moduleId).webApi.get('app/' + appFolder + '/query/' + query, null, null, true)
          .always(function (data) {

            if (data && data.ListContent && data.ListContent.length > 0) {
              itemsCount = data.ListContent.length;
            } else {
              itemsCount = 0;
            }

            console.log('stv itemsCount ' + query, itemsCount);
            switch (username) {
              case users.SuperUser: // Host user
                expect(itemsCount).toBeGreaterThan(0);
                break;
              case users.PapaSmurf: // Administrator
                expect(itemsCount).toBeGreaterThan(0);
                break;
              case users.AppSmurf: // Smurfs group
                expect(itemsCount).toBeGreaterThan(0);
                break;
              case users.Smurfette: // Smurfs group
                expect(itemsCount).toBeGreaterThan(0);
                break;
              case users.Gargamel: // Bad Guys group
                expect(itemsCount).toBeGreaterThan(0);
                break;
              case users.Hulk: // Registered user
                expect(itemsCount).toBeGreaterThan(0);
                break;
              case users.Anonymous: // without user
              default:
                expect(itemsCount).toBeGreaterThan(0);
            }
            done();
          });
      });

    });

  });

};