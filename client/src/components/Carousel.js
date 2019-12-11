import React, { Component } from "react";
import '../stylesheets/carousel.css';
// import '../index.css';
class Carousel extends Component {
  state = {
    currentImage: 0,
    images: null,
    imageRotationTimer: null,
  }

  componentDidMount() {
    const [...images] = document.querySelector('.slider').children;
    if (this.props.images.length > 1) {
      this.imageRotationTimer = setInterval(this.showNextImage, 8000);
      this.setState({
        images: images,
        imageRotationTimer: this.imageRotationTimer,
      })
    }
  }

  componentWillUnmount() {
    clearInterval(this.imageRotationTimer);
  }

  showNextImage = () => {
    this.state.images[this.state.currentImage].classList.remove('active');
  
    if(this.state.currentImage < this.state.images.length - 1) {
      this.state.currentImage += 1;
    } else {
      this.state.currentImage = 0;
    }
  
    this.state.images[this.state.currentImage].classList.add('active');
    // console.log(this.state.currentImage);
  }

  showPreviousImage = () => {
    this.state.images[this.state.currentImage].classList.remove('active');
  
    if(this.state.currentImage > 0) {
      this.state.currentImage -= 1;
    } else {
      this.state.currentImage = this.state.images.length - 1;
    }
  
    this.state.images[this.state.currentImage].classList.add('active');
    console.log('carousel current Image:', this.state.currentImage);
  }

  handleKeyPress = (e) => {
    e = e || window.event;
    
    if (e.keyCode == '37') {
      this.showPreviousImage();
    } else if (e.keyCode == '39') {
      this.showNextImage();
    }
  }

  render() {
    return (
      <div className="carousel-container" onKeyPress={this.handleKeyPress}>
      {this.props.images.length > 1 &&
        <button className="arrow previous carousel-btn" onClick={this.showPreviousImage}>
                <span>
                  <i className="ion-arrow-left-c">←</i>
                </span>
                </button>
                }
        <section className="slider">
        {this.props.images.map((image, index) => {
            if (index === 0) {
              return <img src={image} className="active carousel-img" key={index} />
            }
            return <img src={image} key={index} className="carousel-img" />
          })}
        </section>
        {this.props.images.length > 1 &&
            <button className="next arrow carousel-btn" onClick={this.showNextImage}>
              <span>
                <i className="ion-arrow-right-c">→</i>
              </span> 
            </button>
                }
      </div>
    )
  }
}

export default Carousel;