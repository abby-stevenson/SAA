package studyabroad;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.model.Filters;

import com.mongodb.client.model.Updates;
import model.User;
import org.bson.Document;
import org.bson.types.ObjectId;


import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import model.SACourse;
import model.University;

import static com.mongodb.client.model.Filters.eq;

/**
 * SAADAO is a Data Access Object (DAO)
 * for managing study abroad resources in a MongoDB database.
 *
 */
public class SAADAO {
  // Note: NEEDS TO BE CHANGED

  private static final String DB_URI = "mongodb://root:123@localhost:27018/?authSource=admin";

  private static final String DB_NAME = "StudyAbroadDB";


  private MongoCollection<Document> universities;
  private MongoCollection<Document> saCourses;
  private MongoCollection<Document> neuCourses;
  private MongoCollection<Document> users;

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
   *
   * @param continent represents the continent a student is searching through.
   * @return a list of universities on that continent.
   */
  public List<University> getUniByContinent(String continent) {
    System.out.println("Continent string" + continent);
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities
        .find(eq("Continent", continent)); // Assumes 'location' is the city field

    System.out.println("Tried to find docs");
    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }



  public List<University> getUniByCountry(String country) {

    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities
        .find(eq("Country", country)); // Assumes 'location' is the city field

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;

  }

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

  public List<University> getUniBySACourse(String course) {
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = saCourses
        .find(eq("neuCourse", course));

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }

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

  public List<SACourse> getAllSACourses() {
    List<SACourse> results = new ArrayList<>();
    FindIterable<Document> docs = saCourses
        .find();
    for (Document doc : docs) {
      results.add(documentToSACourse(doc));
    }

    return results;
  }

  public List<SACourse> findSACoursesByNEUCourse(String neuCourseNumber) {
    List<SACourse> results = new ArrayList<>();
    FindIterable<Document> docs = saCourses.find(eq("NU Course Number", neuCourseNumber));

    for (Document doc : docs) {
      results.add(documentToSACourse(doc));
    }

    return results;
  }

  private University documentToUniversity(Document doc) {
    String id = doc.getInteger("University ID Code").toString(); // Correct handling for ObjectId
    String name = doc.getString("Name");
    String city = doc.getString("City");
    String country = doc.getString("Country");
    String continent = doc.getString("Continent");
    String description = doc.getString("Description");

    return new University(id, name, city, country, continent, description);
  }

  private SACourse documentToSACourse(Document doc) {
    int ID = doc.getInteger("University ID");
    System.out.println("ID" + doc.getInteger("University ID"));
    University correspondingUni = getUniByID(Integer.toString(ID)).get(0);
    System.out.println("Corresponding uni " + correspondingUni.getName());
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
              "", "", "" // if needed, or load from university lookup
          );
          savedCourses.add(course);
        }
      }
      user.setSavedCourses(savedCourses);

      users.add(user);
    }
    return users;
  }

  public boolean verifyUser(String username, String password) {
    if (username == null || password == null || username.trim().isEmpty() || password.trim().isEmpty()) {
      return false;
    }
    // find user
    try {
      Query query = new Query(Criteria.where("email").is(email.toLowerCase())
              .and("password").is(password));
      return database.findOne(query, User.class);

    } catch (Exception e) {
      System.err.println("Error during user authentication: " + e.getMessage());
      return false;
    }
  }

  public void insertUser(User user) {
    // Validate email format using a regex
    if (!user.getEmail().matches("^[^@\\s]+@[a-zA-Z0-9]+\\.com$")) {
      throw new IllegalArgumentException("Invalid email format.");
    }

    var usersCollection = database.getCollection("users");

    // Check for duplicate email
    Document existingUser = usersCollection.find(new Document("email", user.getEmail())).first();
    if (existingUser != null) {
      throw new IllegalArgumentException("A user with this email already exists.");
    }

    // Proceed with insertion
    Document doc = new Document("name", user.getName())
        .append("email", user.getEmail())
        .append("password", user.getPassword())
        .append("year", user.getYear())
        .append("major", user.getMajor())
        .append("savedCourses", new ArrayList<>())
        .append("recentlyViewedCourses", new ArrayList<>());

    usersCollection.insertOne(doc);
  }



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

  public void addCourseToUserFavorites(String userEmail, String hostCourseNumber) {
    // 1. Find the course
    Document courseDoc = saCourses.find(eq("Host Course Number", hostCourseNumber)).first();
    if (courseDoc == null) {
      throw new IllegalArgumentException("No course found with host course number: " + hostCourseNumber);
    }

    // 2. Find the user
    Document userDoc = users.find(eq("email", userEmail)).first();
    if (userDoc == null) {
      throw new IllegalArgumentException("No user found with email: " + userEmail);
    }

    // 3. Check if the user already has this course in their savedCourses
    List<Document> savedCourses = userDoc.getList("savedCourses", Document.class);
    for (Document savedCourse : savedCourses) {
      String savedHostCourseNumber = savedCourse.getString("Host Course Number");
      if (hostCourseNumber.equals(savedHostCourseNumber)) {
        throw new IllegalStateException("Course already exists in user's favorites: " + hostCourseNumber);
      }
    }

    // 4. Add the course to savedCourses
    users.updateOne(
        eq("email", userEmail),
        Updates.push("savedCourses", courseDoc)
    );

    System.out.println("Course \"" + hostCourseNumber + "\" added to favorites for user: " + userEmail);
  }

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

  private String castIntToString(Document doc) {
    String result;
    try  {
      result = doc.getString("Host Course Number");
    } catch (ClassCastException e) {
      result = doc.getInteger("Host Course Number").toString();
    }
    return result;
  }

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

}

