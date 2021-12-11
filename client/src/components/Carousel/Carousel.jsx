import React from 'react';
import { Carousel } from 'react-bootstrap';
import styles from '../Carousel/Carousel.module.css'

function ControlledCarousel() {
  return (
    <>
      <Carousel className={styles.carousel}>
        <Carousel.Item interval={2500}>
          <img
            className="d-block w-100"
            src="/img/soup-cat.jpg"
            alt="First slide"
          />
          <Carousel.Caption>
            <p>Всегда свежие блюда</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <img
            className="d-block w-100"
            src="/img/salats-cat.jpg"
            alt="Second slide"
          />
          <Carousel.Caption>
            <p>Быстрая достава</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={2500}>
          <img
            className="d-block w-100"
            src="/img/garnish-cat.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
            <p>Высокое качество</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </>
  )
}

export default ControlledCarousel;
