function t2spec(moduleId, appFolder, entityTypes) {
  console.log('stv t2', moduleId, appFolder, entityTypes);

  describe("t2 - on the full app, user AppSmurf read permissions", function () {
    // this creates a demo-item for creating new data
    function createDemoItem() {
      return {
        Title: 'New by user AppSmurf from ' + (new Date()).toISOString()
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

    entityTypes.forEach(entityType => {

      describe(entityType, function () {

        it("create new item", (done) => {
          $2sxc(moduleId).webApi.post('app/' + appFolder + '/content/' + entityType, {}, createDemoItem(), true)
            .always(function (data) {
              switch (username) {
                case users.AppSmurf: // Smurfs group
                  expect(data.status).toBe(401);
                  break;
                default:
                  expect(null).toBeNull();
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
                case users.AppSmurf: // Smurfs group
                  expect(itemsCount).toBeGreaterThan(0);
                  break;
                case users.Anonymous: // without user
                default:
                  expect(null).toBeNull();
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
                  case users.AppSmurf: // Smurfs group
                    expect(data.status).toBe(401);
                    break;
                  default:
                    expect(null).toBeNull();
                }
                done();
              });

          }

        });

      });

    });

  });

};