describe("t11 - content-type without permissions", function () {
  // this creates a demo-item for creating new data
  function createDemoItem() {
    return {
      Title: 'New \'' + entityType + '\' from ' + (new Date()).toISOString()
    }
  }



  var player;
  var song;

  beforeEach(function () {
    player = new Player();
    song = new Song();

    // override alert dialog for tests
    window.alertShown = false;
    window.alert = function(msg) {
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



  it("should be able to play a Song", function () {
    player.play(song);
    expect(player.currentlyPlayingSong).toEqual(song);

    //demonstrates use of custom matcher
    expect(player).toBePlaying(song);
  });

  describe("when song has been paused", function () {
    beforeEach(function () {
      player.play(song);
      player.pause();
    });

    it("should indicate that the song is currently paused", function () {
      expect(player.isPlaying).toBeFalsy();

      // demonstrates use of 'not' with a custom matcher
      expect(player).not.toBePlaying(song);
    });

    it("should be possible to resume", function () {
      player.resume();
      expect(player.isPlaying).toBeTruthy();
      expect(player.currentlyPlayingSong).toEqual(song);
    });
  });

  // demonstrates use of spies to intercept and test method calls
  it("tells the current song if the user has made it a favorite", function () {
    spyOn(song, 'persistFavoriteStatus');

    player.play(song);
    player.makeFavorite();

    expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
  });

  //demonstrates use of expected exceptions
  describe("#resum1e", function () {
    it("should throw an exception if song is already playing", function () {
      player.play(song);

      expect(function () {
        player.resume();
      }).toThrowError("song is already playing");
    });
  });
});
