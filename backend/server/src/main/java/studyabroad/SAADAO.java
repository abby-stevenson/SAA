package studyabroad;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoCursor;
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
    this.saCourses = database.getCollection("host_courses", Document.class);
    this.neuCourses = database.getCollection("neu_courses", Document.class);
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

    long uniCount = universities.countDocuments();
    System.out.println("Universities collection loaded with " + uniCount + " documents.");

/*
    try(MongoCursor<org.bson.Document> cursor = universities.find().iterator();) {
      int count = 0;
      System.out.println("Universities collection reference: " + database.getCollection("universities", Document.class));
      long uniCount = universities.countDocuments();
      System.out.println("Universities collection loaded with " + uniCount + " documents.");
      if(!cursor.hasNext()) { System.out.println("Cursor has no next!"); }
      else { System.out.println("Cursor has a next!"); }
      while (cursor.hasNext()) {
        Document doc = cursor.next();
        System.out.println(doc.toJson()); // ✅ Print raw doc
        count++;
      }
      System.out.println("Raw documents found: " + count);
    }
    catch(Exception e) {
      throw new IllegalStateException("universities.find().iterator() doesnt work");
    }
*/
    for (Document doc : first20) {
      results.add(documentToUniversity(doc));
    }

    return results;
  }


  private University documentToUniversity(Document doc) {
    String id = doc.getObjectId("_id").toHexString(); // Correct handling for ObjectId
    String name = doc.getString("Name");
    String city = doc.getString("City");
    String country = doc.getString("Country");
    String continent = doc.getString("Continent");
    String description = doc.getString("Description");

    return new University(id, name, city, country, continent, description);
  }

}
