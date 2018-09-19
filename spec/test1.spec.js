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
          if (username) {
            expect(data).toBeNull();
          } else {
            // expect(window.alertShown).toAlertShown();
            // Permission denied. required permissions for this type are not given
            expect(data.status).toBe(403);
          }
          done();
        });
    });

  });

};