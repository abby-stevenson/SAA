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
import org.bson.types.ObjectId;
import org.mindrot.jbcrypt.BCrypt;


import java.util.*;

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
/*
  public boolean verifyUser(String username, String password) {
    if (username == null || password == null || username.trim().isEmpty() || password.trim().isEmpty()) {
      return false;
    }
    // find user
    MongoCollection<Document> usersCollection = database.getCollection("users");
    Document user = usersCollection.find(eq("username", username)).first();
    if (user == null)
      return false;
    else {
      if (user.getString((String) user.get("password")).equals(password))
        return true;
      else
        return false;
    }
  }
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

    // 4. Check if the courses are under the university's courseload limit
    // Get the university name from the course
    System.out.println(courseDoc);
    String universityName = courseDoc.getString("University");
    //if (universityName == null) {
      //throw new IllegalArgumentException("Course does not have an associated university");
    //}

    // Find the university document
    Document universityDoc = universities.find(eq("name", universityName)).first();
    if (universityDoc == null) {
      throw new IllegalArgumentException("No university found with name: " + universityName);
    }

    // Get the course load limit from the university
    //Integer courseLoadLimit = universityDoc.getInteger("CourseLoadLimit");
    //if (courseLoadLimit == null) {
      //throw new IllegalArgumentException("University does not have a CourseLoadLimit defined");
    //}

    // Calculate current total credits for the user
    // int currentTotalCredits = 0;
    // if (savedCourses != null) {
    //   for (Document savedCourse : savedCourses) {
    //     Integer credits = savedCourse.getInteger("Credits");
    //     if (credits != null) {
    //       currentTotalCredits += credits;
    //     }
    //   }
    // }

    // // Get credits for the course being added
    // Integer newCourseCredits = courseDoc.getInteger("Credits");
    // if (newCourseCredits == null) {
    //   throw new IllegalArgumentException("Course does not have credits defined");
    // }

    // // Check if adding this course would exceed the limit
    // if (currentTotalCredits + newCourseCredits > courseLoadLimit) {
    //   throw new IllegalStateException("Adding this course would exceed the university's course load limit. " +
    //           "Current credits: " + currentTotalCredits +
    //           ", Course credits: " + newCourseCredits +
    //           ", University limit: " + courseLoadLimit);
    // }

    // 5. Add the course to savedCourses
    users.updateOne(
        eq("email", userEmail),
        Updates.push("savedCourses", courseDoc)
    );

    System.out.println("Course \"" + hostCourseNumber + "\" added to favorites for user: " + userEmail);
  }


  public void addCourseToUserUnfavorites(String userEmail, String hostCourseNumber) {
    // 1. Find the user
    Document userDoc = users.find(eq("email", userEmail)).first();
    if (userDoc == null) {
        throw new IllegalArgumentException("No user found with email: " + userEmail);
    }

    // 2. Get the savedCourses list
    List<Document> savedCourses = userDoc.getList("savedCourses", Document.class);
    if (savedCourses == null || savedCourses.isEmpty()) {
        throw new IllegalStateException("User has no saved courses.");
    }

    // 3. Check if the course exists in savedCourses
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

    // 4. Remove the course from savedCourses
    users.updateOne(
        eq("email", userEmail),
        Updates.pull("savedCourses", new Document("Host Course Number", hostCourseNumber))
    );

    System.out.println("Course \"" + hostCourseNumber + "\" removed from favorites for user: " + userEmail);
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

  public Map<University, List<SACourse>> getFavoriteCoursesGroupedByUniversity(String email) {
    Document userDoc = users.find(eq("email", email)).first();

    if (userDoc == null) {
      throw new IllegalArgumentException("User not found.");
    }

    List<Document> savedCoursesDocs = userDoc.getList("savedCourses", Document.class);
    Map<University, List<SACourse>> groupedByUniversity = new HashMap<>();

    for (Document doc : savedCoursesDocs) {
      int universityId = doc.getInteger("University ID");
      List<University> uniList = getUniByID(String.valueOf(universityId));
      University uni = uniList.isEmpty() ? null : uniList.get(0);

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

      groupedByUniversity.computeIfAbsent(uni, k -> new ArrayList<>()).add(course);
    }

    return groupedByUniversity;
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

public boolean isCourseFavorited(String email, String hostCourseNumber) {
    System.out.println("EMAIL: " + email);
    System.out.println("Looking for hostCourseNumber: " + hostCourseNumber);

    Document userDoc = users.find(eq("email", email)).first();
    if (userDoc == null) {
        System.out.println("No user found with that email");
        return false;
    }

    List<Document> savedCourses = userDoc.getList("savedCourses", Document.class);
    if (savedCourses == null || savedCourses.isEmpty()) {
        System.out.println("No savedCourses found for user");
        return false;
    }

    for (Document course : savedCourses) {
        System.out.println("Course entry: " + course.toJson());

        String saved = course.getString("NU Course Number"); 

        if (saved == null) {
            System.out.println("Field 'Host Course Number' not found in course");
            continue;
        }

        System.out.println("Comparing: " + hostCourseNumber + " vs " + saved);

        if (hostCourseNumber.equals(saved)) {
            System.out.println("Match found!");
            return true;
        }
    }

    System.out.println("No matching course found.");
    return false;
}



}

