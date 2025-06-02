package model;

public class SACourse implements ICourse {
  private String universityId;
  private String hostCourseNumber;
  private String hostCourseName;
  private String hostCourseDescription;
  private String neuCourseNumber;
  private String term;
  private double credits;
  private int taken;
  private String universityName;
  private String universityCity;
  private String universityCountry;

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

  @Override
  public String getCourseNumber() {
    return neuCourseNumber;
  }

  @Override
  public String getCourseTitle() {
    return hostCourseName;
  }

  @Override
  public double getCredits() {
    return credits;
  }

  // Getters (you can add setters if needed)
  public String getUniversityId() { return universityId; }
  public String getHostCourseNumber() { return hostCourseNumber; }
  public String getHostCourseDescription() { return hostCourseDescription; }
  public String getTerm() { return term; }
  public int getTaken() { return taken; }
  public String getUniversityName() { return universityName; }
  public String getUniversityCity() { return universityCity; }
  public String getUniversityCountry() { return universityCountry; }
  public void incrementTaken() { this.taken++; }
}
