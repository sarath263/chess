import React from "react";
import "./css/Square.css";
import classNames from "classnames";
export default class Square extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dragging: false,
      mouseDown: false,
      boundingBox: {}
    };
  }

  componentDidMount() {
    const coordinates = {
      top: this.squareDiv.offsetTop,
      bottom: this.squareDiv.offsetHeight + this.squareDiv.offsetTop,
      left: this.squareDiv.offsetLeft,
      right: this.squareDiv.offsetWidth + this.squareDiv.offsetLeft
    };
    this.props.updateOffset(coordinates);
    this.setState({ boundingBox: coordinates });
  }

  render() {
    //console.log(this.props.coOrdinates.x);
    let PATH = false;
    if (this.props.path) {
      this.props.path.forEach((k, i) => {
        if (
          k.x === this.props.coOrdinates.x &&
          k.y === this.props.coOrdinates.y
        ) {
          PATH = true;
        }
      });
    }
    let DRAGGED = false;
    let DRAGGED_OVER = false;
    if (this.props.dragging) {
      if (
        this.props.mouseCoordinates.x > this.state.boundingBox.left &&
        this.props.mouseCoordinates.x < this.state.boundingBox.right &&
        this.props.mouseCoordinates.y > this.state.boundingBox.top &&
        this.props.mouseCoordinates.y < this.state.boundingBox.bottom
      ) {
        DRAGGED_OVER = true;
      } else {
        DRAGGED_OVER = false;
      }
      if (this.props.piece !== 0 && this.props.piece !== "0") {
        if (
          this.props.draggedCoordinates.x > this.state.boundingBox.left &&
          this.props.draggedCoordinates.x < this.state.boundingBox.right &&
          this.props.draggedCoordinates.y > this.state.boundingBox.top &&
          this.props.draggedCoordinates.y < this.state.boundingBox.bottom
        ) {
          DRAGGED = true;
        } else {
          DRAGGED = false;
        }
      }
    }
    let pieceClass = "";
    let colorClass = "";
    if (!isNaN(parseInt(this.props.piece))) {
      pieceClass = "";
    } else {
      const symbol = this.props.piece.toUpperCase();
      switch (symbol) {
        case "P":
          pieceClass = "-pawn";
          break;
        case "R":
          pieceClass = "-rook";
          break;
        case "N":
          pieceClass = "-knight";
          break;
        case "B":
          pieceClass = "-bishop";
          break;
        case "K":
          pieceClass = "-king";
          break;
        case "Q":
          pieceClass = "-queen";
          break;
        default:
          pieceClass = "";
          break;
      }
      if (this.props.piece === this.props.piece.toUpperCase()) {
        colorClass = "-white";
      } else if (this.props.piece !== this.props.piece.toUpperCase()) {
        colorClass = "-black";
      }
    }

    let className = classNames("Square", `Square${pieceClass}${colorClass}`, {
      "Square-black": this.props.black,
      "Square-dragged": this.state.dragging,
      "Square-hovered": DRAGGED_OVER,
      "Square-dragged": DRAGGED,
      "Square-path": PATH
    });

    return (
      <div
        className={className}
        ref={div => {
          this.squareDiv = div;
        }}
      />
    );
  }
}