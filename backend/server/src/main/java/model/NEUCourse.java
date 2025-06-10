package model;

/**
 * Represents a Northeastern University course with its number, title, description, and credit value.
 * Implements the ICourse interface.
 */
public class NEUCourse implements ICourse {
  private String courseNumber;       // e.g., "CS3500"
  private String courseTitle;        // e.g., "Object-Oriented Design"
  private String courseDescription;  // Detailed course overview
  private double credits;            // e.g., 4.0

  /**
   * Constructs a NEUCourse with the specified number, title, description, and credit value.
   *
   * @param courseNumber the course code (e.g., "CS3500")
   * @param courseTitle the title of the course
   * @param courseDescription a textual summary of the course content
   * @param credits the number of credit hours assigned to the course
   */
  public NEUCourse(String courseNumber, String courseTitle,
                   String courseDescription, double credits) {
    this.courseNumber = courseNumber;
    this.courseTitle = courseTitle;
    this.courseDescription = courseDescription;
    this.credits = credits;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String getCourseNumber() {
    return courseNumber;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String getCourseTitle() {
    return courseTitle;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public double getCredits() {
    return credits;
  }

  /**
   * Returns the course description, which provides a detailed overview of the course content.
   *
   * @return the course description as a String
   */
  public String getCourseDescription() {
    return courseDescription;
  }
}
