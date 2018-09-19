beforeEach(function () {
  jasmine.addMatchers({
    toBePlaying: function () {
      return {
        compare: function (actual, expected) {
          var player = actual;

          return {
            pass: player.currentlyPlayingSong === expected && player.isPlaying
          };
        }
      };
    },
    toHaveData: function () {
      return {
        compare: function (actual) {
          return {
            pass: actual.length > 0
          };
        }
      };
    },
    toAlertShown: function () {
      return {
        compare: function (actual) {
          var alertShown = window.alertShown;
          window.alertShown = false;
          return {
            pass: !!alertShown
          };
        }
      };
    }
  });
});
