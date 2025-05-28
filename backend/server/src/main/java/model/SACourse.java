package model;

public class SACourse implements ICourse {
  private String universityId;
  private String hostCourseNumber;
  private String hostCourseName;
  private String hostCourseDescription;
  private String neuCourseNumber;
  private String term;
  private int credits;
  private int taken;

  public SACourse(String universityId, String hostCourseNumber, String hostCourseName,
                  String hostCourseDescription, String nuCourseNumber,
                  String term, int credits, int taken) {
    this.universityId = universityId;
    this.hostCourseNumber = hostCourseNumber;
    this.hostCourseName = hostCourseName;
    this.hostCourseDescription = hostCourseDescription;
    this.neuCourseNumber = nuCourseNumber;
    this.term = term;
    this.credits = credits;
    this.taken = taken;
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
  public int getCredits() {
    return credits;
  }

  // Getters (you can add setters if needed)
  public String getUniversityId() { return universityId; }
  public String getHostCourseNumber() { return hostCourseNumber; }
  public String getHostCourseDescription() { return hostCourseDescription; }
  public String getTerm() { return term; }
  public int getTaken() { return taken; }
  public void incrementTaken() { this.taken++; }
}
