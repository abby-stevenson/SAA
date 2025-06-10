package model;

/**
 * Represents a course offered at a university or institution.
 * Provides basic information such as course number, title, and credit value.
 */
public interface ICourse {

  /**
   * Returns the unique identifier or code for the course.
   * For example: "CS3500" or "EECE4512".
   *
   * @return the course number as a String
   */
  String getCourseNumber();

  /**
   * Returns the full title or name of the course.
   * For example: "Object-Oriented Design" or "Digital Systems Design".
   *
   * @return the course title as a String
   */
  String getCourseTitle();

  /**
   * Returns the number of credit hours the course is worth.
   * This is typically a value like 3.0 or 4.0.
   *
   * @return the number of credits as a double
   */
  double getCredits();
}
