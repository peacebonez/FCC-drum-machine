import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

class App extends React.Component {
  state = {
    active: null,
    volume: 0.5,
    pitch: 1,
  };

  playAudio = (e) => {
    console.log("PLAYAUDIO EVENT:", e);
    let sample = document.getElementById(e);
    sample.currentTime = 0;

    //set volume of sample
    sample.volume = this.state.volume;

    //set pitch of sample
    sample.playbackRate = this.state.pitch;

    sample.play();
  };

  handleClick = (e) => {
    console.log(e);
    console.log("value:", e.target.value);
    this.playAudio(e.target.name);
    this.setState(
      { active: e.target.value },
      () => (document.querySelector("#display").innerText = this.state.active) //set the LED display
    );
  };

  handleKeyDown = (e) => {
    // console.log(e);

    let keys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];
    // let keys = ["q", "w", "e", "a", "s", "d", "z", "x", "c"];
    let myKey = e.key.toUpperCase();
    //only execute when specific keys are pressed
    if (keys.indexOf(myKey) === -1) return;
    let instrument = document.querySelector("#" + myKey).innerText;
    console.log(myKey);
    this.playAudio(myKey);
    this.setState(
      { active: instrument },
      () => (document.querySelector("#display").innerText = instrument)
    );
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
  }

  handleVolume = (e) => {
    this.setState(
      { volume: e.target.value * 0.01 },
      () =>
        //Set the LED display
        (document.querySelector("#display").innerText =
          Math.round(this.state.volume * 100) + "%")
    );
  };

  handlePitch = (e) => {
    this.setState({ pitch: e.target.value });
  };

  // MAIN RENDERING
  render() {
    const { active, volume, pitch } = this.state;
    return (
      <div id="drum-machine" tabIndex={0}>
        <div id="wrapper-main">
          <DrumPad btnClick={(e) => this.handleClick(e)} instrument={active} />
          <div className="container-mods">
            <Volume onChange={this.handleVolume} volume={volume} />
            <div className="container-led-pitch">
              <SampleDisplay
                instrument={active}
                volume={`${Math.round(volume * 100)}%`}
                pitch={pitch}
              />
              <PitchShift pitch={pitch} onChange={this.handlePitch} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const DrumPad = ({ btnClick }) => {
  return (
    <div className="container-drum-pad">
      <div className="row-top">
        <DrumPadBtn
          id="Q"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Toms/36[kb]dissonant_tom.aif.mp3"
          instrument="Tom"
        />
        <DrumPadBtn
          id="W"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Weird%20and%20Interesting%20Hits/40[kb]analogue_bubble.aif.mp3"
          instrument="Pop"
        />
        <DrumPadBtn
          id="E"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Rides/87[kb]cleanride.aif.mp3"
          instrument="Ride"
        />
      </div>
      <div className="row-mid">
        <DrumPadBtn
          id="A"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Snares/26[kb]clapsnare.aif.mp3"
          instrument="Snare"
        />
        <DrumPadBtn
          id="S"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Claps/34[kb]brightclap.aif.mp3"
          instrument="Clap"
        />
        <DrumPadBtn
          id="D"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/27[kb]ec-hat040.wav.mp3"
          instrument="Hi-Hat"
        />
      </div>
      <div className="row-bottom">
        <DrumPadBtn
          id="Z"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/61[kb]bunchakiks18.wav.mp3"
          instrument="Kick"
        />
        <DrumPadBtn
          id="X"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Kicks/67[kb]808sub.aif.mp3"
          instrument="Boom"
        />
        <DrumPadBtn
          id="C"
          btnClick={btnClick}
          src="https://sampleswap.org/samples-ghost/DRUMS%20(SINGLE%20HITS)/Hats/39[kb]707-ohh.aif.mp3"
          instrument="Open-Hat"
        />
      </div>
    </div>
  );
};

const DrumPadBtn = ({ id, btnClick, src, instrument }) => {
  return (
    <button
      className="drum-pad"
      name={id}
      id={`drum-pad-${id}`}
      onClick={btnClick}
      value={instrument}
    >
      <audio className="clip" src={src} type="audio/mpeg" id={id}>
        {instrument}
      </audio>
      {id}
    </button>
  );
};

const Volume = ({ volume, onChange }) => {
  return (
    <div>
      <input
        type="range"
        orient="vertical"
        id="volume-bar"
        value={volume * 100}
        onChange={onChange}
      ></input>
    </div>
  );
};

const SampleDisplay = ({ pitch }) => {
  return (
    <div className="container-display">
      <h1 id="display">{pitch}</h1>
    </div>
  );
};

const PitchShift = ({ pitch, onChange }) => {
  return (
    <div className="container-pitch">
      <input
        id="pitch-bar"
        type="range"
        step={0.01}
        min={0.5}
        max={2}
        value={pitch}
        onChange={onChange}
      ></input>
      <label id="label-pitch">Pitch</label>
    </div>
  );
};

ReactDOM.render(<App />, document.querySelector("#root"));
