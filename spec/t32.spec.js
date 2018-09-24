function t32spec(moduleId, appFolder, entityType) {
  console.log('stv t32', moduleId, appFolder, entityType);

  describe("t32 - content-type with \"registered\" create permissions, and owner edit / delete permissions", function () {
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
      $2sxc(moduleId).webApi.post('app/' + appFolder + '/content/' + entityType, {}, createDemoItem(), true)
        .always(function (data) {
          switch (username) {
            case users.SuperUser: // Host user
              expect(data).toBeNull();
              break;
            case users.PapaSmurf: // Administrator
              expect(data).toBeNull();
              break;
            case users.AppSmurf: // Smurfs group
              expect(data).toBeNull();
              break;
            case users.Smurfette: // Smurfs group
              expect(data).toBeNull();
              break;
            case users.Gargamel: // Bad Guys group
            expect(data).toBeNull();
              break;
            case users.Hulk: // Registered user
            expect(data).toBeNull();
              break;
            case users.Anonymous: // without user
            default:
              expect(data.status).toBe(401);
          }
          done();
        });
    });

    var itemsCount = 0
    var item2Delete;

    it("read items", (done) => {
      $2sxc(moduleId).webApi.get('app/' + appFolder + '/content/' + entityType, null, null, true)
        .always(function (data) {

          if (data && data.length > 0) {
            itemsCount = data.length;
            item2Delete = data[itemsCount - 1];
          } else {
            itemsCount = 0;
            item2Delete = null;
          }

          console.log('stv itemsCount ' + entityType, itemsCount);
          switch (username) {
            case users.SuperUser: // Host user
              expect(itemsCount).toBeGreaterThan(0);
              break;
            case users.PapaSmurf: // Administrator
              expect(itemsCount).toBeGreaterThan(0);
              break;
            case users.AppSmurf: // Smurfs group
              expect(itemsCount).toBe(0);
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

    it("delete item", (done) => {
      if (item2Delete == null) {

        // nothing to delete
        expect(item2Delete).toBeNull();
        done();

      } else {

        $2sxc(moduleId).webApi.delete('app/' + appFolder + '/content/' + entityType + '/' + item2Delete.Id, null, null, true)
          .always(function (data) {
            switch (username) {
              case users.SuperUser: // Host user
                expect(data).toBeUndefined();
                break;
              case users.PapaSmurf: // Administrator
                expect(data).toBeUndefined();
                break;
              case users.AppSmurf: // Smurfs group
                expect(data.length).toBe(0);
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

      }

    });

  });

};