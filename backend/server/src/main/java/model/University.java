package model;

import java.util.Objects;

/**
 * Represents a university in the study abroad system.
 * Contains basic identifying and location information about the institution.
 */
public class University {
  private String universityId;   // Unique identifier for the university
  private String name;           // Name of the university
  private String city;           // City where the university is located
  private String country;        // Country where the university is located
  private String continent;      // Continent where the university is located
  private String description;    // Optional description or summary of the university

  /**
   * Constructs a University instance with the given details.
   *
   * @param universityId unique ID for the university
   * @param name name of the university
   * @param city city where the university is located
   * @param country country of the university
   * @param continent continent of the university
   * @param description textual description of the university
   */
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

  /**
   * Returns the unique identifier of the university.
   *
   * @return university ID
   */
  public String getUniversityId() { return universityId; }

  /**
   * Returns the name of the university.
   *
   * @return university name
   */
  public String getName() { return name; }

  /**
   * Returns the city where the university is located.
   *
   * @return city name
   */
  public String getCity() { return city; }

  /**
   * Returns the country where the university is located.
   *
   * @return country name
   */
  public String getCountry() { return country; }

  /**
   * Returns the continent where the university is located.
   *
   * @return continent name
   */
  public String getContinent() { return continent; }

  /**
   * Returns the description of the university.
   *
   * @return textual description
   */
  public String getDescription() { return description; }

  /**
   * Returns a string representation of the university, excluding the description.
   *
   * @return formatted string summarizing the university's identity
   */
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

  /**
   * Checks equality based on the university ID.
   *
   * @param obj the object to compare
   * @return true if the university IDs match; false otherwise
   */
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

  /**
   * Returns a hash code based on the university ID.
   *
   * @return hash code of the university
   */
  @Override
  public int hashCode() {
    return Objects.hash(universityId);
  }
}
