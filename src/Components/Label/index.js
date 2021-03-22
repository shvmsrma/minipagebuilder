import React, { Component } from "react";
import * as s from "./label.module.scss";
class Label extends Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0, tempX: 0, tempY: 0 };
    this.changeValue = this.changeValue.bind(this);
  }
  componentDidMount() {
    const { data } = this.props;
    this.setState({ x: data.x, y: data.y, tempX: data.x, tempY: data.y });
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
  onClickSave() {
    const { closeAllModals } = this.props;

    const { tempX, tempY } = this.state;
    this.setState({ x: tempX, y: tempY });
    closeAllModals();
  }
  endDrag(e) {
    this.setState({
      tempX: e.clientX,
      tempY: e.clientY,
      x: e.clientX,
      y: e.clientY,
    });
  }
  render() {
    const { x, y } = this.state;
    const {
      data: { showModal, id },
      closeModal,
      openModal,
    } = this.props;
    return (
      <>
        <div
          className={s.label}
          style={{ position: "absolute", left: x, top: y }}
          onClick={() => openModal("input", id)}
          draggable
          onDragEnd={(e) => this.endDrag(e)}
        >
          This is a label
        </div>
        {showModal && (
          <div className={s.modal}>
            <div className={s.header}>
              <div className={s.heading}>Edit Label</div>
              <div className={s.close} onClick={() => closeModal("label", id)}>
                X
              </div>
            </div>
            <div className={s.form}>
              <div className={s.formElement}>
                <div className={s.formLabel}>Button Label</div>
                <input
                  type="text"
                  value={this.state.tempbuttonLabel}
                  onChange={(e) => this.changeValue(e, "label")}
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

export default Label;
