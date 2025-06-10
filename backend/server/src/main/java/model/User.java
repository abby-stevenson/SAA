package model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

/**
 * Represents a user of the Study Abroad system.
 * Stores personal details, saved courses, and recently viewed courses.
 */
public class User {

  private String name;                       // User's full name
  private String email;                      // User's email address (used for login)
  private String password;                   // User's password (should be hashed in production)
  private String year;                       // User's academic year (e.g., "Junior")
  private String major;                      // User's academic major (e.g., "Computer Engineering")
  private List<SACourse> savedCourses;       // Courses the user has saved
  private List<SACourse> recentlyViewedCourses; // Courses the user has recently viewed

  /**
   * Default constructor initializing empty course lists.
   */
  public User() {
    this.recentlyViewedCourses = new ArrayList<>();
    this.savedCourses = new ArrayList<>();
  }

  /**
   * Constructs a user with the basic required information.
   *
   * @param name user's name
   * @param email user's email
   * @param password user's password
   */
  public User(String name, String email, String password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.recentlyViewedCourses = new ArrayList<>();
    this.savedCourses = new ArrayList<>();
  }

  /**
   * Constructs a user with full profile details.
   *
   * @param name user's name
   * @param email user's email
   * @param password user's password
   * @param year user's academic year
   * @param major user's major
   */
  public User(String name, String email, String password, String year, String major) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.year = year;
    this.major = major;
    this.recentlyViewedCourses = new ArrayList<>();
    this.savedCourses = new ArrayList<>();
  }

  // Getters and Setters

  public String getName() { return name; }
  public void setName(String name) { this.name = name; }

  public String getEmail() { return email; }
  public void setEmail(String email) { this.email = email; }

  public String getPassword() { return password; }
  public void setPassword(String password) { this.password = password; }

  public String getYear() { return year; }
  public void setYear(String year) { this.year = year; }

  public String getMajor() { return major; }
  public void setMajor(String major) { this.major = major; }

  /**
   * Calculates the total number of credit hours from the provided list of saved courses.
   *
   * @param savedCourses the list of courses to sum credits from
   * @return total credit hours
   */
  public double getCreditHours(List<SACourse> savedCourses) {
    double hours = 0;
    for (SACourse savedCourse : savedCourses) {
      hours += savedCourse.getCredits();
    }
    return hours;
  }

  public List<SACourse> getSavedCourses() { return savedCourses; }

  public void setSavedCourses(List<SACourse> savedCourses) { this.savedCourses = savedCourses; }

  /**
   * Adds a course to the user's saved courses list.
   *
   * @param course the course to save
   */
  public void saveCourse(SACourse course) { this.savedCourses.add(course); }

  /**
   * Returns a list of unique university IDs from the user's saved courses.
   *
   * @return list of university IDs with no duplicates
   */
  public List<String> getSavedUniversities() {
    HashSet<String> nonDuplicateUniversities = new HashSet<>();
    for(SACourse course : this.savedCourses) {
      nonDuplicateUniversities.add(course.getUniversityId());
    }
    return new ArrayList<>(nonDuplicateUniversities);
  }

  public List<SACourse> getRecentlyViewedCourses() { return recentlyViewedCourses; }

  public void setRecentlyViewedCourses(List<SACourse> recentlyViewedCourses) {
    this.recentlyViewedCourses = recentlyViewedCourses;
  }

  /**
   * Returns a string summary of the user object.
   *
   * @return formatted string showing user profile details
   */
  @Override
  public String toString() {
    return "User{name='" + name + '\'' +
        ", email='" + email + '\'' +
        ", year='" + year + '\'' +
        ", major='" + major + '\'' +
        ", savedCourses=" + savedCourses +
        '}';
  }
}
