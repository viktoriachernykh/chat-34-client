import React from "react";

class App extends React.Component {
  state = {
    messages: []
  };

  stream = new EventSource(`http://localhost:4000/stream`);

  componentDidMount() {
    this.stream.onmessage = event => {
      // console.log("event test", event.data); // looks like array but NO IT'S NOT, it's just a string
      const parsed = JSON.parse(event.data);
      this.setState({ messages: parsed });
      // console.log(parsed); // now it's array of objects
    };
  }

  render() {
    return (
      <div>
        <h1>Messages</h1>
        {!this.state.messages && "Loading..."}
        {this.state.messages &&
          this.state.messages.map(m => <p key={m.id}>{m.text}</p>)}
      </div>
    );
  }
}

export default App;
