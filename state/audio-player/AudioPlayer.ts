interface State {
  pause: () => void;
  play: () => void;
  next: () => void;
  previous: () => void;
}

class PausedState implements State {
  private player: AudioPlayer;

  constructor(player: AudioPlayer) {
    this.player = player;
  }

  pause() {}

  play() {
    this.player.changeState(new PlayingState(this.player));
  }

  next() {
    this.player.changeState(new PlayingState(this.player));
  }

  previous() {
    this.player.changeState(new PlayingState(this.player));
  }

  toString() {
    return "PAUSED";
  }
}

class ReadyState implements State {
  private player: AudioPlayer;

  constructor(player: AudioPlayer) {
    this.player = player;
  }

  pause() {}

  play() {
    this.player.changeState(new PlayingState(this.player));
  }

  next() {
    this.player.changeState(new PlayingState(this.player));
  }

  previous() {
    this.player.changeState(new PlayingState(this.player));
  }

  toString() {
    return "READY";
  }
}

class PlayingState implements State {
  public name = "PLAYING";
  private player: AudioPlayer;

  constructor(player: AudioPlayer) {
    this.player = player;
  }

  pause() {
    this.player.changeState(new PausedState(this.player));
  }

  play() {}

  next() {}

  previous() {}

  toString() {
    return "PLAYING";
  }
}

export default class AudioPlayer {
  private state: State;

  constructor() {
    this.state = new ReadyState(this);
  }

  changeState(state: State) {
    this.state = state;
  }

  isPlaying() {
    return this.state.toString() === "PLAYING";
  }

  pause() {
    // code associated with the action
    this.state.pause();
  }

  play() {
    // code associated with the action
    this.state.play();
  }

  next() {
    // code associated with the action
    this.state.next();
  }

  previous() {
    // code associated with the action
    this.state.previous();
  }
}
