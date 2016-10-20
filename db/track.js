const _ = require("lodash")

var tracks = []

class Track {
  constructor ({ url }) {
    this.id = _.uniqueId()
    this.url = url
    this.created_on = new Date()
    this.position = 0
    this.finished = false
  }
}

module.exports = {
  create (track) {
    if (typeof track.url === "undefined") {
      return Promise.reject("url is required to create a track.")
    }
    const newTrack = new Track(track)
    tracks.push(newTrack)
    return Promise.resolve(newTrack)
  },
  read () {
    return Promise.resolve(tracks)
  },
  delete (id) {
    tracks = tracks.filter((t) => t.id !== id)
    return Promise.resolve(id)
  },
}
