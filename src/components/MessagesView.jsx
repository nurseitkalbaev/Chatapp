import React, { Component } from "react";
import ReactDOM from "react-dom";
import "./MessagesView.css";
import messageImg from "./img/message.png";
import up from "./img/up.png";
import dogImg from "./img/no-message.png";
import userIcon1 from "./img/icons/user-icons/nurseit.png";

class MessagesView extends Component {
  constructor() {
    super();
    this.state = {
      writing: "",
      hasMsgs: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop + node.clientHeight >= NodeList.scrollHeight;
  }
  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }
  onChange = (e) => {
    // console.log("wrote", e.target.value);
    this.setState({ writing: e.target.value });
  };

  clearOnChange = () => {
    this.setState({ writing: "" });
  };

  sendBtn = () => {
    if (this.state.writing === "") {
      throw this.error;
    } else {
      this.props.sendBtn(this.state.writing);
      this.setState({ hasMsgs: true });
      this.clearOnChange();
    }
  };
  handleSubmit(e) {
    e.preventDefault();
    if (this.state.writing === "") {
      throw this.error;
    } else {
      this.props.sendBtn(this.state.writing);
      this.setState({ hasMsgs: true });
      this.clearOnChange();
    }
  }

  render() {
    const myId = 17;
    const messages = this.props.msgsList.results;
    this.props.sendMsg("msg");
    const avatar = <img className="icon-img" src={userIcon1} alt="user icon" />;
    return (
      // <!--       <div className="chat-empty">
      //         <div className="rectangle-copy ">
      //           <img src={dogImg} class="no-Message" />

      //           <div className="start-messaging-agen">
      //             Start messaging agents, sellers, or even your friends -->

      <React.Fragment>
        <React.Fragment>
          {!this.state.hasMsgs && (
            <div className="chat-empty">
              <div className="rectangle-copy-empty">
                <img src={dogImg} class="no-Message" />
                <div className="start-messaging-agen-empty">
                  Start messaging agents, sellers, or even your friends
                </div>
                <form onSubmit={this.handleSubmit} className="rectangle">
                  <div className="up">
                    <img src={up} className="up" />
                  </div>
                  <input
                    placeholder="Write a message"
                    type="text"
                    className="write-a-message"
                    value={this.state.writing}
                    onChange={this.onChange}
                  />
                  <div className="sendBtn" onClick={this.sendBtn}>
                    <img src={messageImg} />
                  </div>
                </form>
              </div>
            </div>
          )}
        </React.Fragment>
        <React.Fragment>
          {this.state.hasMsgs && (
            <div className="chat-full">
              <div className="rectangle-copy">
                <div className="start-messaging-agen">
                  {messages.map((msg) => {
                    return (
                      <React.Fragment>
                        <div class="avatar">
                          {msg.id !== myId ? avatar : null}
                        </div>

                        <div
                          className={msg.id === myId ? "my-msg" : "their-msg"}
                        >
                          {msg.content}
                        </div>
                      </React.Fragment>
                    );
                  })}
                </div>
                <form onSubmit={this.handleSubmit} className="rectangle">
                  <div className="up">
                    <img src={up} className="up" />
                  </div>
                  <input
                    placeholder="Write a message"
                    type="text"
                    className="write-a-message"
                    value={this.state.writing}
                    onChange={this.onChange}
                  />
                  <div className="sendBtn" onClick={this.sendBtn}>
                    <img src={messageImg} />
                  </div>
                </form>
              </div>
            </div>
          )}
        </React.Fragment>
      </React.Fragment>
    );
  }
}

export default MessagesView;
