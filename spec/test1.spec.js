function t11(moduleId, appFolder, entityType) {
  console.log('stv t11', moduleId, appFolder, entityType);

  describe("t11 - content-type without permissions", function () {
    // this creates a demo-item for creating new data
    function createDemoItem() {
      return {
        Title: 'New \'' + entityType + '\' from ' + (new Date()).toISOString()
      }
    }

    beforeEach(function () {
      // override alert dialog for tests
      window.alertShown = false;
      window.alert = function (msg) {
        console.log(msg); // do something with the message
        window.alertShown = msg;
      };

    });

    it("create new item", (done) => {
      $2sxc(moduleId).webApi.post('app/' + appFolder + '/content/' + entityType, {}, createDemoItem())
        .always(function (data) {
          switch (username) {
            case users.SuperUser: // Host user
              expect(data).toBeNull();
              break;
            case users.PapaSmurf: // Administrator
              expect(data).toBeNull();
              break;
            case users.Smurfette: // Smurfs group
              expect(data.status).toBe(403);
              break;
            case users.Gargamel: // Bad Guys group
              expect(data.status).toBe(403);
              break;
            case users.Hulk: // Registered user
              expect(data.status).toBe(403);
              break;
            case users.Anonymous: // without user
            default:
              expect(data.status).toBe(403);
          }
          done();
        });
    });

  });

};