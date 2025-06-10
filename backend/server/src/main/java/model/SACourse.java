package model;

/**
 * Represents a study abroad (SA) course that can be mapped to a Northeastern University (NEU) course.
 * Contains both host university and NEU-specific course information.
 * Implements the ICourse interface.
 */
public class SACourse implements ICourse {
  private String universityId;            // Unique ID for the host university
  private String hostCourseNumber;        // Course number at the host university
  private String hostCourseName;          // Course title at the host university
  private String hostCourseDescription;   // Description of the host university course
  private String neuCourseNumber;         // NEU-equivalent course number
  private String term;                    // Term the course is offered (e.g., "Fall 2023")
  private double credits;                 // NEU credit equivalency
  private int taken;                      // Number of students who have taken this course
  private String universityName;          // Name of the host university
  private String universityCity;          // City where the university is located
  private String universityCountry;       // Country where the university is located

  /**
   * Constructs a SACourse with both host and NEU course metadata.
   *
   * @param universityId unique identifier for the university
   * @param hostCourseNumber course number at the host institution
   * @param hostCourseName course title at the host institution
   * @param hostCourseDescription course description from the host
   * @param nuCourseNumber equivalent NEU course number
   * @param term academic term when the course is offered
   * @param credits NEU credit value for this course
   * @param taken number of times this course has been taken by NEU students
   * @param universityName name of the host university
   * @param universityCity city of the host university
   * @param universityCountry country of the host university
   */
  public SACourse(String universityId, String hostCourseNumber, String hostCourseName,
                  String hostCourseDescription, String nuCourseNumber,
                  String term, double credits, int taken, String universityName, String universityCity,
                  String universityCountry) {
    this.universityId = universityId;
    this.hostCourseNumber = hostCourseNumber;
    this.hostCourseName = hostCourseName;
    this.hostCourseDescription = hostCourseDescription;
    this.neuCourseNumber = nuCourseNumber;
    this.term = term;
    this.credits = credits;
    this.taken = taken;
    this.universityName = universityName;
    this.universityCity = universityCity;
    this.universityCountry = universityCountry;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String getCourseNumber() {
    return neuCourseNumber;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public String getCourseTitle() {
    return hostCourseName;
  }

  /**
   * {@inheritDoc}
   */
  @Override
  public double getCredits() {
    return credits;
  }

  // Additional accessors

  /**
   * Returns the unique ID of the host university.
   *
   * @return university ID
   */
  public String getUniversityId() { return universityId; }

  /**
   * Returns the course number from the host university.
   *
   * @return host course number
   */
  public String getHostCourseNumber() { return hostCourseNumber; }

  /**
   * Returns the description of the host university course.
   *
   * @return host course description
   */
  public String getHostCourseDescription() { return hostCourseDescription; }

  /**
   * Returns the academic term during which this course is offered.
   *
   * @return course term
   */
  public String getTerm() { return term; }

  /**
   * Returns how many students have previously taken this course.
   *
   * @return count of students who took the course
   */
  public int getTaken() { return taken; }

  /**
   * Returns the name of the host university.
   *
   * @return university name
   */
  public String getUniversityName() { return universityName; }

  /**
   * Returns the city where the host university is located.
   *
   * @return university city
   */
  public String getUniversityCity() { return universityCity; }

  /**
   * Returns the country where the host university is located.
   *
   * @return university country
   */
  public String getUniversityCountry() { return universityCountry; }

  /**
   * Increments the number of times this course has been taken.
   */
  public void incrementTaken() { this.taken++; }
}
