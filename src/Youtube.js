import React, { Component } from "react";
//https://www.googleapis.com/youtube/v3/search?key=&channelId=&part=snippet,id&order=date&maxResult=10
// const API = "AIzaSyAfttMa4wLwklNqdzH1UMPqTMxKOv0H0dE";
// const channel_id = "UCXgGY0wkgOzynnHvSEVmE3A";
// var mresult = 2;
// var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channel_id}&part=snippet,id&order=date&maxResults=${mresult}`;

class Youtube extends Component {
  constructor(props) {
    super(props);
    this.state = {
      t_result: 1,
      result: [],
    };
    // this.clicked = this.clicked.bind(this);
  }
  clicked = () => {
    fetch(
      `https://www.googleapis.com/youtube/v3/search?key=AIzaSyAfttMa4wLwklNqdzH1UMPqTMxKOv0H0dE&channelId=UCXgGY0wkgOzynnHvSEVmE3A&part=snippet,id&order=date&maxResults=${this.state.t_result}`
    )
      .then((Response) => Response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        const result = responseJson.items.map(
          (obj) => "https://www.youtube.com/embed/" + obj.id.videoId
        );
        this.setState({ result });
        console.log(result);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  componentDidMount() {
    this.clicked();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.state.t_result !== prevState.t_result) {
      this.clicked();
    }
  }
  render() {
    return (
      <div>
        {/* <button onClick={this.clicked} className="button">
          Get Youtube videos
        </button> */}
        <button
          className="button"
          onClick={() => {
            this.setState({ t_result: this.state.t_result + 1 });
          }}
        >
          +
        </button>
        <label>{this.state.t_result}</label>
        <button
          className="button"
          onClick={() => {
            if (this.state.t_result === 0) {
              this.setState({ t_result: 0 });
            } else {
              this.setState({
                t_result: this.state.t_result - 1,
              });
            }
          }}
        >
          -
        </button>

        {this.state.result.map((link, i) => {
          console.log(link);
          const frame = (
            <div className="youtube" key={i}>
              <iframe
                width="560"
                height="315"
                src={link}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          );
          return frame;
        })}

        {this.frame}
      </div>
    );
  }
}

export default Youtube;
