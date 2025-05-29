package studyabroad;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Filters;

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

  private static final String DB_URI = "mongodb://localhost:27017";
  private static final String DB_NAME = "SADB";


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

    this.universities = database.getCollection("universities");
    this.saCourses = database.getCollection("host_courses");
    this.neuCourses = database.getCollection("neu_courses");
  }

  /**
   * Returns a university by name.
   * @param name represents the university name.
   * @return
   */
  public List<University> getUniByName(String name) {
    List<University> results = new ArrayList<>();

    // db.collection('Universities').find({ name : 'name' });

    String mongoDB = "";

    return results;
  }

  /**
   *
   * @param continent represents the continent a student is searching through.
   * @return a list of univerities on that continent.
   */
  public List<University> getUniByContinent(String continent) {
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities
            .find(Filters.eq("continent", continent)); // Assumes 'location' is the city field

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }



  public List<University> getUniByCountry(String country) {

    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities
            .find(Filters.eq("country", country)); // Assumes 'location' is the city field

    for (Document doc : docs) {
      results.add(documentToUniversity(doc));
    }

    return results;

  }

  public List<University> getUniByCity(String city) {
    List<University> results = new ArrayList<>();

    FindIterable<Document> docs = universities
            .find(Filters.eq("city", city)); // Assumes 'location' is the city field

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
            .find(Filters.eq("neuCourse", course));

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


  private University documentToUniversity(Document doc) {
    String id = doc.getString("id");
    String name = doc.getString("name");
    String city = doc.getString("city");
    String country = doc.getString("country");
    String continent = doc.getString("continent");
    String description = doc.getString("description");
    int courseloadUpperLimit = doc.getInteger("courseloadUpperLimit");


    return new University(id, name, city, country, continent, description, courseloadUpperLimit);
  }
}
