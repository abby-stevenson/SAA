package studyabroad;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import com.mongodb.client.model.Sorts;
import com.mongodb.client.model.Updates;
import model.User;
import org.bson.Document;
import org.mindrot.jbcrypt.BCrypt;
import java.util.*;
import model.SACourse;
import model.University;

import static com.mongodb.client.model.Filters.eq;

/**
 * SAADAO is a Data Access Object (DAO) for managing study abroad-related data
 * including universities, study abroad courses, NEU equivalents, and user favorites.
 *
 * It connects to a MongoDB instance and provides methods to query, insert, and update data.
 */
public class SAADAO {

  // Connection URI to MongoDB. This should ideally be stored in a config file or environment variable for security.
  private static final String DB_URI = "mongodb://root:123@localhost:27018/?authSource=admin";

  // Name of the MongoDB database used for Study Abroad data.
  private static final String DB_NAME = "StudyAbroadDB";


  // MongoDB collections representing different data categories
  private MongoCollection<Document> universities;
  private MongoCollection<Document> saCourses;
  private MongoCollection<Document> users;

  // Database and client instances for managing MongoDB connection
  private MongoDatabase database;
  private MongoClient client;


  /**
   * Initializes the SAADAO and loads the MongoDB.
   */
  public SAADAO() {
    this.client = MongoClients.create(DB_URI);
    this.database = client.getDatabase(DB_NAME);

    this.universities = database.getCollection("universities", Document.class);
    this.saCourses = database.getCollection("sacourses", Document.class);
    this.neuCourses = database.getCollection("neucourses", Document.class);
    this.users = database.getCollection("users");
  }

  /**
   * Returns a university by name.
   * @param name represents the university name.
   * @return
   */
  public List<University> getUniByName(String name) {
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities.find(eq("Name", name));

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }


  /**
   * Returns a university by id.
   * @param id represents the university id.
   * @return the university
   */
  public List<University> getUniByID(String id) {
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities.find(eq("University ID Code", Integer.valueOf(id)));

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }


  /**
   * @param continent represents the continent a student is searching through.
   * @return a list of universities on that continent.
   */
  public List<University> getUniByContinent(String continent) {

    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities
        .find(eq("Continent", continent)); // Assumes 'location' is the city field


    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }

  /**
   * Retrieves a list of universities located in the specified country.
   *
   * @param country The name of the country to filter universities by.
   * @return A list of University objects that are located in the given country.
   */
  public List<University> getUniByCountry(String country) {

    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities
        .find(eq("Country", country)); // Assumes 'location' is the city field

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }

  /**
   * Gets all universities from the database, limited to the first 20 for efficiency.
   * @return A list of University objects.
   */
  public List<University> getUniByCity(String city) {
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities
        .find(eq("City", city)); // Assumes 'location' is the city field

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }


  public List<University> getUniByNEUCourse(String course) {
    List<University> results = new ArrayList<>();
    /**
     * Get courses with equivalence. Then get uni id from courses. Then display unis from universities.
     */

    FindIterable<Document> docs = saCourses
        .find(eq("NU Course Number", course));

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }


  /**
   * Retrieves a list of universities that offer a study abroad course
   * equivalent to the specified NU course.
   *
   * @param course The NU course number.
   * @return A list of universities offering the specified NU-equivalent course.
   */
  public List<University> getUniBySACourse(String course) {
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = saCourses
        .find(eq("neuCourse", course));

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }

  /**
   * Retrieves the first 20 universities from the database.
   *
   * @return A list of up to 20 University objects.
   */
  public List<University> getAllUni() {
    List<University> results = new ArrayList<>();
    FindIterable<Document> first20 = universities
        .find()
        .limit(20);
    for (Document doc : first20) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }

  /**
   * Sorts a list of university IDs based on their "Courseload Credit" field in ascending order.
   *
   * @param universityIds A list of university document IDs to sort.
   * @return A list of university IDs sorted by credit limit.
   */
  public List<String> sortUniByCreditLimit(List<String> universityIds) {
    ArrayList<String> results = new ArrayList<>();
    FindIterable<Document> matchingUnis = universities
            .find(Filters.in("_id", universityIds))  // Find documents with IDs in the provided list
            .sort(Sorts.ascending("Courseload Credit"));  // Sort by Courseload Credit ascending
    for (Document doc : matchingUnis) {
      results.add(doc.getString("_id"));  // Extract and add the University ID
    }

    return results;
  }

  /**
   * Retrieves all study abroad courses from the database.
   *
   * @return A list of SACourse objects.
   */
  public List<SACourse> getAllSACourses() {
    List<SACourse> results = new ArrayList<>();
    FindIterable<Document> docs = saCourses
        .find();
    for (Document doc : docs) {
      results.add(documentToSACourse(doc));
    }

    return results;
  }

  /**
   * Finds all study abroad courses that are mapped to a specific NU course.
   *
   * @param neuCourseNumber The NU course number.
   * @return A list of matching SACourse objects.
   */
  public List<SACourse> findSACoursesByNEUCourse(String neuCourseNumber) {
    List<SACourse> results = new ArrayList<>();
    FindIterable<Document> docs = saCourses.find(eq("NU Course Number", neuCourseNumber));

    for (Document doc : docs) {
      results.add(documentToSACourse(doc));
    }

    return results;
  }


  /**
   * Converts a MongoDB document into a University object.
   *
   * @param doc The MongoDB document representing a university.
   * @return A University object.
   */
  private University documentToUniversity(Document doc) {
    String id = doc.getInteger("University ID Code").toString(); // Correct handling for ObjectId
    String name = doc.getString("Name");
    String city = doc.getString("City");
    String country = doc.getString("Country");
    String continent = doc.getString("Continent");
    String description = doc.getString("Description");

    return new University(id, name, city, country, continent, description);
  }

  /**
   * Converts a MongoDB document into a SACourse object, including university info.
   *
   * @param doc The MongoDB document representing a study abroad course.
   * @return A SACourse object.
   */
  private SACourse documentToSACourse(Document doc) {
    int ID = doc.getInteger("University ID");
    University correspondingUni = getUniByID(Integer.toString(ID)).get(0);
    return new SACourse(
        Integer.toString(ID),
        castIntToString(doc),
        doc.getString("Host Course Name"),
        doc.getString("Host Course Description"),
        doc.getString("NU Course Number"),
        doc.getString("Term"),
        Optional.ofNullable(doc.get("Credits"))
            .filter(val -> val instanceof Number)
            .map(val -> ((Number) val).doubleValue())
            .orElse(0.0),
        doc.getInteger("Taken", 0),
        correspondingUni.getName(),
            correspondingUni.getCity(),
            correspondingUni.getCountry());
  }

  /**
   * Retrieves all users stored in the database along with their saved courses.
   *
   * @return A list of User objects.
   */
  public List<User> getAllUsers() {
    List<User> users = new ArrayList<>();
    MongoCollection<Document> usersCollection = database.getCollection("users");
    for (Document doc : usersCollection.find()) {
      User user = new User();
      user.setName(doc.getString("name"));
      user.setEmail(doc.getString("email"));
      user.setPassword(doc.getString("password"));
      user.setYear(doc.getString("year"));
      user.setMajor(doc.getString("major"));

      // Parse savedCourses
      List<SACourse> savedCourses = new ArrayList<>();
      List<Document> courseDocs = (List<Document>) doc.get("savedCourses");
      if (courseDocs != null) {
        for (Document courseDoc : courseDocs) {
          SACourse course = new SACourse(
              String.valueOf(courseDoc.get("University ID")),
              courseDoc.getString("Host Course Number"),
              courseDoc.getString("Host Course Name"),
              courseDoc.getString("Host Course Description"),
              courseDoc.getString("NU Course Number"),
              courseDoc.getString("Term"),
              castCreditsToDouble(courseDoc),
              courseDoc.getInteger("Taken"),
              "", "", "" 
          );
          savedCourses.add(course);
        }
      }
      user.setSavedCourses(savedCourses);

      users.add(user);
    }
    return users;
  }

  /**
   * Inserts a new user into the database after validating their email and hashing the password.
   *
   * @param user The User object to insert.
   * @throws IllegalArgumentException If email is invalid or already exists.
   */
  public void insertUser(User user) {
    // Validate email format using a regex
    if (!user.getEmail().matches("^[^@\\s]+@[a-zA-Z0-9]+\\.(com|edu)$")) {
      throw new IllegalArgumentException("Invalid email format. Only .com or .edu emails are allowed.");
    }

    var usersCollection = database.getCollection("users");

    // Check for duplicate email
    Document existingUser = usersCollection.find(new Document("email", user.getEmail())).first();
    if (existingUser != null) {
      throw new IllegalArgumentException("A user with this email already exists.");
    }

    String hashedPassword = BCrypt.hashpw(user.getPassword(), BCrypt.gensalt());


    // Proceed with insertion
    Document doc = new Document("name", user.getName())
        .append("email", user.getEmail())
        .append("password", hashedPassword)
        .append("year", user.getYear())
        .append("major", user.getMajor())
        .append("savedCourses", new ArrayList<>())
        .append("recentlyViewedCourses", new ArrayList<>());

    usersCollection.insertOne(doc);
  }

  /**
   * Converts a MongoDB document into a User object.
   *
   * @param doc The MongoDB document representing a user.
   * @return A User object.
   */
  private User documentToUser(Document doc) {
    User user = new User(
        doc.getString("name"),
        doc.getString("email"),
        doc.getString("password")
    );
    user.setYear(doc.getString("year"));
    user.setMajor(doc.getString("major"));
    return user;
  }

  /**
   * Adds a course to a user's list of favorites if it's not already added.
   *
   * @param userEmail The email of the user.
   * @param hostCourseNumber The host course number to favorite.
   */
  public void addCourseToUserFavorites(String userEmail, String hostCourseNumber) {
    Document courseDoc = saCourses.find(eq("Host Course Number", hostCourseNumber)).first();
    if (courseDoc == null) {
      throw new IllegalArgumentException("No course found with host course number: " + hostCourseNumber);
    }

    Document userDoc = users.find(eq("email", userEmail)).first();
    if (userDoc == null) {
      throw new IllegalArgumentException("No user found with email: " + userEmail);
    }

    List<Document> savedCourses = userDoc.getList("savedCourses", Document.class);
    for (Document savedCourse : savedCourses) {
      String savedHostCourseNumber = savedCourse.getString("Host Course Number");
      if (hostCourseNumber.equals(savedHostCourseNumber)) {
        throw new IllegalStateException("Course already exists in user's favorites: " + hostCourseNumber);
      }
    }


    String universityName = courseDoc.getString("University");

    // Find the university document
    Document universityDoc = universities.find(eq("name", universityName)).first();
    if (universityDoc == null) {
      throw new IllegalArgumentException("No university found with name: " + universityName);
    }

    users.updateOne(
        eq("email", userEmail),
        Updates.push("savedCourses", courseDoc)
    );
 }


  /**
   * Removes a course from a user's list of favorites.
   *
   * @param userEmail The email of the user.
   * @param hostCourseNumber The host course number to remove.
   */
  public void addCourseToUserUnfavorites(String userEmail, String hostCourseNumber) {
    // Find the user
    Document userDoc = users.find(eq("email", userEmail)).first();
    if (userDoc == null) {
        throw new IllegalArgumentException("No user found with email: " + userEmail);
    }

    // Get the savedCourses list
    List<Document> savedCourses = userDoc.getList("savedCourses", Document.class);
    if (savedCourses == null || savedCourses.isEmpty()) {
        throw new IllegalStateException("User has no saved courses.");
    }

    // Check if the course exists in savedCourses
    boolean courseExists = false;
    for (Document savedCourse : savedCourses) {
        String savedHostCourseNumber = savedCourse.getString("Host Course Number");
        if (hostCourseNumber.equals(savedHostCourseNumber)) {
            courseExists = true;
            break;
        }
    }

    if (!courseExists) {
        throw new IllegalStateException("Course not found in user's favorites: " + hostCourseNumber);
    }

    // Remove the course from savedCourses
    users.updateOne(
        eq("email", userEmail),
        Updates.pull("savedCourses", new Document("Host Course Number", hostCourseNumber))
    );

}

  /**
   * Retrieves all study abroad courses offered by a given university.
   *
   * @param universityId The ID of the university.
   * @return A list of SACourse objects associated with that university.
   */
  public List<SACourse> getCoursesByUniversityId(String universityId) {
    List<SACourse> courses = new ArrayList<>();
    FindIterable<Document> docs = saCourses.find(eq("University ID", castStringToInt(universityId)));
    for (Document doc : docs) {
      String hostCourseNumber = castIntToString(doc);
      String hostCourseName = doc.getString("Host Course Name");
      String hostCourseDescription = doc.getString("Host Course Description");
      String neuCourseNumber = doc.getString("NU Course Number");
      String term = doc.getString("Term");
      double credits = castCreditsToDouble(doc);
      int taken = doc.getInteger("Taken", 0);
      String universityName = doc.getString("University Name");
      String universityCity = doc.getString("University City");
      String universityCountry = doc.getString("University Country");

      SACourse course = new SACourse(universityId, hostCourseNumber, hostCourseName,
          hostCourseDescription, neuCourseNumber, term, credits, taken,
          universityName, universityCity, universityCountry);

      courses.add(course);
    }

    return courses;
  }

  /**
   * Groups a user's favorited courses by university.
   *
   * @param email The user's email address.
   * @return A map of University to a list of SACourses.
   */
  public Map<University, List<SACourse>> getFavoriteCoursesGroupedByUniversity(String email) {
    Document userDoc = users.find(eq("email", email)).first();

    if (userDoc == null) {
      throw new IllegalArgumentException("User not found.");
    }

    List<Document> savedCoursesDocs = userDoc.getList("savedCourses", Document.class);
    System.out.println("Course length" + savedCoursesDocs.size());
    for (Document d : savedCoursesDocs) {
      System.out.println("Course details" + d.toString());
    }
    Map<University, List<SACourse>> groupedByUniversity = new HashMap<>();


    for (Document doc : savedCoursesDocs) {
      int universityId = doc.getInteger("University ID");
      List<University> uniList = getUniByID(String.valueOf(universityId));
      University uni = uniList.isEmpty() ? null : uniList.get(0);
      System.out.println("\n");
      System.out.println("University found for document is " + uni.getName());

      if (uni == null) continue; // Skip if university can't be found

      SACourse course = new SACourse(
              String.valueOf(universityId),
              castIntToString(doc),
              doc.getString("Host Course Name"),
              doc.getString("Host Course Description"),
              doc.getString("NU Course Number"),
              doc.getString("Term"),
              castCreditsToDouble(doc),
              doc.getInteger("Taken", 0),
              uni.getName(),
              uni.getCity(),
              uni.getCountry()
      );

      ArrayList<SACourse> courses = new ArrayList<>();
      List<SACourse> curCourses = groupedByUniversity.get(uni);
      if (curCourses != null && curCourses.size() > 0) {
        courses.addAll(groupedByUniversity.get(uni));
      }
      courses.add(course);
      groupedByUniversity.put(uni, courses);
    }

    return groupedByUniversity;
  }


  /**
   * Safely retrieves a course number from a document, handling both String and Integer cases.
   *
   * @param doc The MongoDB document containing the course number.
   * @return The course number as a string.
   */
  private String castIntToString(Document doc) {
    String result;
    try  {
      result = doc.getString("Host Course Number");
    } catch (ClassCastException e) {
      result = doc.getInteger("Host Course Number").toString();
    }
    return result;
  }

  /**
   * Safely casts a "Credits" field from a document to a double.
   *
   * @param doc The MongoDB document containing the credits field.
   * @return The credits as a double.
   */
  private double castCreditsToDouble(Document doc) {
    Object creditsObj = doc.get("Credits");

    if (creditsObj instanceof Double) {
      return (Double) creditsObj;
    } else if (creditsObj instanceof Integer) {
      return ((Integer) creditsObj).doubleValue();
    } else {
      throw new IllegalArgumentException("Invalid type for 'Credits': " + creditsObj);
    }
  }

  /**
   * Converts a numeric string to an integer, ensuring it's within a valid range.
   *
   * @param value The string to convert.
   * @return The integer value.
   */
  public int castStringToInt(String value) {
    try {
      int num = Integer.parseInt(value);
      if (num < 1 || num > 100) {
        throw new IllegalArgumentException("Value must be between 1 and 10.");
      }
      return num;
    } catch (NumberFormatException e) {
      throw new IllegalArgumentException("Invalid input: must be a number between 1 and 10.");
    }
  }


  /**
   * Finds and returns a User object based on the user's email.
   *
   * @param email The user's email.
   * @return The User object, or null if not found.
   */
  public User findUserByEmail(String email) {
    Document userDoc = users.find(eq("email", email)).first();
    if (userDoc == null) return null;

    User user = new User();
    user.setEmail(userDoc.getString("email"));
    user.setName(userDoc.getString("name"));
    user.setMajor(userDoc.getString("major"));
    user.setPassword(userDoc.getString("password"));
    return user;
  }

  /**
   * Checks if a specific course is already favorited by the user.
   *
   * @param email The user's email.
   * @param hostCourseTitle The host course title to check.
   * @return True if the course is already in favorites, false otherwise.
   */
public boolean isCourseFavorited(String email, String hostCourseTitle) {

    Document userDoc = users.find(eq("email", email)).first();
    if (userDoc == null) {
        return false;
    }


    List<Document> savedCourses = userDoc.getList("savedCourses", Document.class);


    if (savedCourses == null || savedCourses.isEmpty()) {
        return false;
    }

    for (Document course : savedCourses) {

        //String saved = course.getString("NU Course Number");
        String saved = course.getString("Host Course Name");

        if (saved == null) {
            continue;
        }

        if (hostCourseTitle.equals(saved)) {
            return true;
        }
    }

    return false;
}

}

