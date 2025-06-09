package model;
import java.util.Objects;

public class University {
  private String universityId;
  private String name;
  private String city;
  private String country;
  private String continent;
  private String description;

  public University(String universityId, String name, String city, String country,
                    String continent, String description) {
    this.universityId = universityId;
    this.name = name;
    this.city = city;
    this.country = country;
    this.continent = continent;
    this.description = description;
  }

  // Getters
  public String getUniversityId() { return universityId; }
  public String getName() { return name; }
  public String getCity() { return city; }
  public String getCountry() { return country; }
  public String getContinent() { return continent; }
  public String getDescription() { return description; }

  @Override
  public String toString() {
    return "University{" +
        "universityId='" + universityId + '\'' +
        ", name='" + name + '\'' +
        ", city='" + city + '\'' +
        ", country='" + country + '\'' +
        ", continent='" + continent + '\'' +
        '}';
  }

  @Override
  public boolean equals(Object obj) {
    if (obj == this) {
      return true;
    }
    if (obj.getClass() != this.getClass()) {
      return false;
    }
    University u = (University) obj;
    return u.universityId.equals(this.universityId);
  }

  @Override
  public int hashCode() {
    return Objects.hash(universityId);
  }
}
