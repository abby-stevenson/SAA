package studyabroad;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Filters;

import model.SACourse;
import model.University;

import java.util.List;
import java.util.ArrayList;
import org.bson.Document;

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
  }


  /**
   * Returns a university by name.
   * @param name represents the university name.
   * @return
   */
  public List<University> getUniByName(String name) {
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities.find(Filters.eq("Name", name));

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
        .find(Filters.eq("Continent", continent)); // Assumes 'location' is the city field

    System.out.println("Tried to find docs");
    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }



  public List<University> getUniByCountry(String country) {

    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities
        .find(Filters.eq("Country", country)); // Assumes 'location' is the city field

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;

  }

  public List<University> getUniByCity(String city) {
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities
        .find(Filters.eq("City", city)); // Assumes 'location' is the city field

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
        .find(Filters.eq("NU Course Number", course));

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }

  public List<University> getUniBySACourse(String course) {
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = saCourses
        .find(Filters.eq("neuCourse", course));

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
        .find()
        .limit(50);
    for (Document doc : docs) {
      results.add(documentToSACourse(doc));
    }

    return results;
  }

  public List<SACourse> findSACoursesByNEUCourse(String neuCourseNumber) {
    List<SACourse> results = new ArrayList<>();
    FindIterable<Document> docs = saCourses.find(Filters.eq("NU Course Number", neuCourseNumber));

    for (Document doc : docs) {
      results.add(documentToSACourse(doc));
    }

    return results;
  }

  private University documentToUniversity(Document doc) {
    String id = doc.getObjectId("_id").toString(); // Correct handling for ObjectId
    String name = doc.getString("Name");
    String city = doc.getString("City");
    String country = doc.getString("Country");
    String continent = doc.getString("Continent");
    String description = doc.getString("Description");

    return new University(id, name, city, country, continent, description);
  }

  private SACourse documentToSACourse(Document doc) {
    return new SACourse(
        doc.getObjectId("_id").toString(),
        castIntToString(doc),
        doc.getString("Host Course Name"),
        doc.getString("Host Course Description"),
        doc.getString("NU Course Number"),
        doc.getString("Term"),
        doc.getInteger("Credits", 0),
        doc.getInteger("Taken", 0));
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

}

