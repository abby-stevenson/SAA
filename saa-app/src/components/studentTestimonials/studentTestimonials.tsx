import './studentTestimonials.css';

interface StudentTestimonialsProps {
  name: string;
  story: string;
  mainImage: string;
  image1: string;
  image2: string;
  image3: string;
  image4: string;
  image5: string;
  image6: string;
}

const StudentTestimonials = ({name, story, mainImage, image1, image2, image3, image4, image5, image6}: StudentTestimonialsProps) => {
  return (
    <div className="testimonial-container">
      

      {/* Top Grid */}
      <div className="testimonial-grid">
        <div className="grid-item main">
          <img src={mainImage} />
        </div>
          {/* Row 1 */}
          <div className="grid-item small" style={{ gridColumn: '3' }}>
            <img src={image1} />
          </div>
          <div className="grid-item small" style={{ gridColumn: '4' }}>
            <img src={image2} />
          </div>
          <div className="grid-item small" style={{ gridColumn: '5' }}>
            <img src={image3} />
          </div>

          {/* Row 2 */}
          <div className="grid-item small" style={{ gridColumn: '3', gridRow: '2' }}>
            <img src={image4} />
          </div>
          <div className="grid-item small" style={{ gridColumn: '4', gridRow: '2' }}>
            <img src={image5} />
          </div>
          <div className="grid-item small" style={{ gridColumn: '5', gridRow: '2' }}>
            <img src={image6} />
          </div>
      </div>

      <div className="story-section">
        <h3 className="story-title">{name}'s Story</h3>
        <span className="story-body">
          {story}
        </span>
      </div>
    </div>
  );
};

export default StudentTestimonials;
