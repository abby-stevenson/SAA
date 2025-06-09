package model;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;

public class User {

  private String name;
  private String email;
  private String password;
  private String year;
  private String major;
  private List<SACourse> savedCourses;
  private List<SACourse> recentlyViewedCourses;

  public User() {
    this.recentlyViewedCourses = new ArrayList<>();
    this.savedCourses = new ArrayList<>();
  }

  public User(String name, String email, String password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.recentlyViewedCourses = new ArrayList<>();
    this.savedCourses = new ArrayList<>();
  }

  public User(String name, String email, String password, String year, String major) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.year = year;
    this.major = major;
    this.recentlyViewedCourses = new ArrayList<>();
    this.savedCourses = new ArrayList<>();
  }

  // Getters and setters

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

  public double getCreditHours(List<SACourse> savedCourses) {
    double hours = 0;
    for (SACourse savedCourse : savedCourses) {
      hours += savedCourse.getCredits();
    }
    return hours;
  }

  public List<SACourse> getSavedCourses() { return savedCourses; }
  public void setSavedCourses(List<SACourse> savedCourses) { this.savedCourses = savedCourses; }
  public void saveCourse(SACourse course) { this.savedCourses.add(course); }

  public List<String> getSavedUniversities() {
    HashSet<String> nonDuplicateUniversities = new HashSet<>();
    for(SACourse course : this.savedCourses ) {
      nonDuplicateUniversities.add(course.getUniversityId());
    }
    return new ArrayList<>(nonDuplicateUniversities);
  }

  public List<SACourse> getRecentlyViewedCourses() { return recentlyViewedCourses; }

  public void setRecentlyViewedCourses(List<SACourse> recentlyViewedCourses) { this.recentlyViewedCourses = recentlyViewedCourses; }

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
