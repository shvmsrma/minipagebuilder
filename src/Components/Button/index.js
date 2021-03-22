import React, { Component } from "react";
import * as s from "./button.module.scss";
class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      tempX: 0,
      tempY: 0,
      buttonLabel: "",
      tempbuttonLabel: "Button",
    };
    this.changeValue = this.changeValue.bind(this);
  }
  componentDidMount() {
    const { data } = this.props;
    this.setState({
      x: data.x,
      y: data.y,
      tempX: data.x,
      tempY: data.y,
      buttonLabel: "Button",
      tempbuttonLabel: "Button",
    });
  }
  changeValue(e, type) {
    if (type === "X") {
      this.setState({ tempX: parseInt(e.currentTarget.value) });
    } else if (type === "Y") {
      this.setState({ tempY: parseInt(e.currentTarget.value) });
    } else if (type === "button") {
      this.setState({ tempbuttonLabel: e.currentTarget.value });
    }
  }

  endDrag(e) {
    this.setState({
      tempX: e.clientX,
      tempY: e.clientY,
      x: e.clientX,
      y: e.clientY,
    });
  }
  onClickSave() {
    const { closeAllModals } = this.props;

    const { tempX, tempY, tempbuttonLabel } = this.state;
    this.setState({ x: tempX, y: tempY, buttonLabel: tempbuttonLabel });
    closeAllModals();
  }
  render() {
    const { x, y, buttonLabel } = this.state;
    console.log(this.state);
    const {
      data: { showModal, id },
      closeModal,
      openModal,
    } = this.props;
    return (
      <>
        <div
          className={s.button}
          style={{ position: "absolute", left: x, top: y }}
          draggable
          onDragEnd={(e) => this.endDrag(e)}
          onClick={() => openModal("button", id)}
        >
          {buttonLabel}
        </div>
        {showModal && (
          <div className={s.modal}>
            <div className={s.header}>
              <div className={s.heading}>Edit Button</div>
              <div className={s.close} onClick={() => closeModal("button", id)}>
                X
              </div>
            </div>
            <div className={s.form}>
              <div className={s.formElement}>
                <div className={s.formLabel}>Button Label</div>
                <input
                  type="text"
                  value={this.state.tempbuttonLabel}
                  onChange={(e) => this.changeValue(e, "button")}
                />
              </div>
              <div className={s.formElement}>
                <div className={s.formLabel}>X</div>
                <input
                  type="text"
                  value={this.state.tempX}
                  onChange={(e) => this.changeValue(e, "X")}
                />
              </div>

              <div className={s.formElement}>
                <div className={s.formLabel}>Y</div>
                <input
                  type="text"
                  value={this.state.tempY}
                  onChange={(e) => this.changeValue(e, "Y")}
                />
              </div>

              <div className={s.formElement}>
                <div
                  className={s.saveButton}
                  onClick={() => this.onClickSave()}
                >
                  Save
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

export default Button;
