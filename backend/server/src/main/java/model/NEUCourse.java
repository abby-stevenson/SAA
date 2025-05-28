package model;

public class NEUCourse implements ICourse {
  private String courseNumber;
  private String courseTitle;
  private String courseDescription;
  private int credits;

  public NEUCourse(String courseNumber, String courseTitle,
                   String courseDescription, int credits) {
    this.courseNumber = courseNumber;
    this.courseTitle = courseTitle;
    this.courseDescription = courseDescription;
    this.credits = credits;
  }

  @Override
  public String getCourseNumber() {
    return courseNumber;
  }

  @Override
  public String getCourseTitle() {
    return courseTitle;
  }

  @Override
  public int getCredits() {
    return credits;
  }

  // Additional getters
  public String getCourseDescription() {
    return courseDescription;
  }
}
