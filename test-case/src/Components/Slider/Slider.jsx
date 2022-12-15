import React, { PureComponent } from "react";
import { ReactComponent as CartVector } from "../../pics/slider-vector.svg";
import { Arrows, Box, Right, Image, Slide } from "./Slider.styled";

export default class Slider extends PureComponent {
  state = {
    current: 0,
  };

  nextSlide = () => {
    const { current } = this.state;
    const newCurrent =
      current === this.props.item.gallery.length - 1 ? 0 : current + 1;
    this.setState({ current: newCurrent });
  };

  prevSlide = () => {
    const { current } = this.state;
    const newCurrent =
      current === 0 ? this.props.item.gallery.length - 1 : current - 1;
    this.setState({ current: newCurrent });
  };

  render() {
    return (
      <Slide>
        {this.props.item.gallery.length > 1 ? (
          <Arrows>
            <Box onClick={this.prevSlide}>
              <CartVector />
            </Box>
            <Box onClick={this.nextSlide}>
              <CartVector style={{transform:"rotate(180deg)", marginLeft:"8px"}}/>
            </Box>
          </Arrows>
        ) : null}
        {this.props.item.gallery.map((slide, index) => {
          return (
            <div key={index}>
              {index === this.state.current && <Image src={slide} alt="" />}
            </div>
          );
        })}
      </Slide>
    );
  }
}
