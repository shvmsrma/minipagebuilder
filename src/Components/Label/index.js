import React, { Component } from "react";
import * as s from "./label.module.scss";
import * as ls from "local-storage";
import * as cx from "classnames";

class Label extends Component {
  constructor(props) {
    super(props);
    this.state = {
      x: 0,
      y: 0,
      tempX: 0,
      tempY: 0,
      label: "This is the text",
      tempLabel: "This is the text",
      labelBorder: false,
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
      label: "This is the text",
      tempLabel: "This is the text",
    });
  }
  changeValue(e, type) {
    if (type === "X") {
      this.setState({ tempX: parseInt(e.currentTarget.value) });
    } else if (type === "Y") {
      this.setState({ tempY: parseInt(e.currentTarget.value) });
    } else if (type === "label") {
      this.setState({ tempLabel: e.currentTarget.value });
    }
  }
  toggleBorder() {
    this.setState({ labelBorder: !this.state.labelBorder });
  }
  onClickSave() {
    const {
      closeAllModals,
      data: { id, showModal },
    } = this.props;
    const { x, y } = this.state;

    const { tempX, tempY, tempLabel } = this.state;
    this.setState({ x: tempX, y: tempY, label: tempLabel });
    closeAllModals();
    let labelArray = ls.get("labels");
    labelArray[id] = {
      x: x,
      y: y,
      id: id,
      showModal: showModal,
    };
    ls.set("labels", labelArray);
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
    const { x, y, label } = this.state;
    const {
      data: { showModal, id },
      closeModal,
      openModal,
    } = this.props;
    console.log("ID", id);
    const LabelClass = cx(s.label, {
      [s.labelBorder]: this.state.labelBorder === true,
    });
    return (
      <>
        <div
          className={LabelClass}
          style={{ position: "absolute", left: x, top: y }}
          onClick={() => this.toggleBorder()}
          onDoubleClick={() => openModal("label", id)}
          draggable={this.state.labelBorder ? true : false}
          onDragEnd={(e) => this.endDrag(e)}
        >
          {label}
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
                <div className={s.formLabel}>Edit Label</div>
                <input
                  type="text"
                  value={this.state.tempLabel}
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
