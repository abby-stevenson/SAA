import React from 'react';
import './studentTestimonials.css';

const StudentTestimonials = () => {
  return (
    <div className="testimonial-container">
      <h2 className="testimonial-heading">Student Testimonials</h2>

      {/* Top Grid */}
      <div className="testimonial-grid">
        <div className="grid-item main">Main</div>
          {/* Row 1 */}
          <div className="grid-item small" style={{ gridColumn: '3' }}></div>
          <div className="grid-item small" style={{ gridColumn: '4' }}></div>
          <div className="grid-item small" style={{ gridColumn: '5' }}></div>

          {/* Row 2 */}
          <div className="grid-item small" style={{ gridColumn: '3', gridRow: '2' }}></div>
          <div className="grid-item small" style={{ gridColumn: '4', gridRow: '2' }}></div>
          <div className="grid-item small" style={{ gridColumn: '5', gridRow: '2' }}></div>
      </div>

      {/* Jane's Story Section */}
      <div className="story-section">
        <h3 className="story-title">Jane’s Story</h3>
        <span className="story-body">
          Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes,
          or even a very very short story. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          Etiam vel magna nec felis fringilla sagittis. Orci varius natoque penatibus et magnis dis
          parturient montes, nascetur ridiculus mus. Cras placerat magna massa, nec rhoncus urna
          accumsan eu. Quisque eu risus non diam consequat auctor. Nam tristique venenatis
          venenatis. Maecenas lobortis nec orci id vestibulum. Vestibulum tellus lectus, vehicula
          nec quam a, posuere malesuada arcu. Vivamus rutrum dignissim ex eu ultrices. Nulla
          molestie tincidunt magna aliquam aliquet. Phasellus pretium sem vel lacus ullamcorper
          sollicitudin. Nunc sit amet diam dui. Praesent semper viverra quam sed pellentesque.
          Donec maximus nisl ut nisl gravida lobortis.
        </span>
      </div>
    </div>
  );
};

export default StudentTestimonials;
