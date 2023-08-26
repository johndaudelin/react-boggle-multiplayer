import React from "react";
import SelectTheme from "../containers/SelectTheme";
import ErrorBar from "../containers/ErrorBar";
import Header from "../containers/Header";
import LogoSection from "../containers/LogoSection";
import WelcomeScreen from "../containers/WelcomeScreen";
import PlayOnlineScreen from "../containers/PlayOnlineScreen";
import WaitingScreen from "../containers/WaitingScreen";
import GameScreen from "../containers/GameScreen";
import FinishedScreen from "../containers/FinishedScreen";
import SocketContext from "../socket-context";
import BuyMeACoffee from "../containers/BuyMeACoffee";
import "../../stylesheets/index.scss";

class ContentScreen extends React.Component {
  constructor(props) {
    super(props);

    this.startGame = this.startGame.bind(this);
    this.startSinglePlayerGame = this.startSinglePlayerGame.bind(this);
    this.leaveGame = this.leaveGame.bind(this);
    this.enterMultiMode = this.enterMultiMode.bind(this);
    this.exitMultiMode = this.exitMultiMode.bind(this);
  }

  componentDidMount() {
    this.props.socket.on("UPDATE_ROOM_INFO", (roomData) => {
      this.props.updateRoom(roomData);
    });

    this.props.socket.on("SEND_FINAL_USERNAME", (userName) => {
      this.props.changeUserName(userName);
    });

    this.props.socket.on("SEND_ERROR", (error) => {
      this.props.changeError(error);
    });
  }

  componentWillUnmount() {
    this.leaveGame();
  }

  startGame() {
    this.props.socket.emit("START_GAME");
  }

  startSinglePlayerGame() {
    if (this.props.mode === "multi" || this.props.mode === "welcome") {
      this.props.changeMode("single");
    } else {
      this.props.initializeTimer();
    }
  }

  enterMultiMode() {
    if (this.props.mode === "welcome") {
      this.props.changeMode("multi");
    } else {
      console.log(
        "WARNING: tried entering 'multi' mode when mode was not currently 'welcome'"
      );
    }
  }

  exitMultiMode() {
    if (this.props.mode === "multi") {
      this.props.changeMode("welcome");
    } else {
      console.log(
        "WARNING: tried exiting 'multi' mode when mode was not currently 'multi'"
      );
    }
  }

  leaveGame() {
    if (this.props.mode === "multi") {
      this.props.socket.emit("LEAVE_ROOM");
      this.props.updateRoom(null);
    }
    this.props.changeMode("welcome");
  }

  render() {
    return (
      <div className={`${this.props.theme}App`}>
        <ErrorBar />
        <div className="normalContent">
          <SelectTheme />
          <BuyMeACoffee />
          <div>
            <Header />
            {this.props.mode === "welcome" ? (
              <WelcomeScreen
                startSinglePlayerGame={this.startSinglePlayerGame}
                enterMultiMode={this.enterMultiMode}
              />
            ) : this.props.mode === "multi" ? (
              !this.props.room ? (
                <PlayOnlineScreen exitMultiMode={this.exitMultiMode} />
              ) : this.props.room.waitingForPlayers ? (
                <WaitingScreen
                  startGame={this.startGame}
                  leaveGame={this.leaveGame}
                />
              ) : this.props.room.activeGame ? (
                <GameScreen leaveGame={this.leaveGame} />
              ) : (
                <FinishedScreen
                  startGame={this.startGame}
                  leaveGame={this.leaveGame}
                />
              )
            ) : this.props.singlePlayer.timer > -1 ? (
              <GameScreen leaveGame={this.leaveGame} />
            ) : (
              <FinishedScreen
                startGame={this.startSinglePlayerGame}
                leaveGame={this.leaveGame}
              />
            )}
          </div>
          <LogoSection />
        </div>
      </div>
    );
  }
}

export default function (props) {
  return (
    <SocketContext.Consumer>
      {(socket) => <ContentScreen {...props} socket={socket} />}
    </SocketContext.Consumer>
  );
}
