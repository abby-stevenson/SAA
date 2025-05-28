package studyabroad;

import model.University;

import java.util.List;
import java.util.ArrayList;

/**
 * SAADAO is a Data Access Object (DAO)
 * for managing study abroad resources in a MongoDB database.
 *
 */
public class SAADAO {
  // Note: NEEDS TO BE CHANGED
  private static final String DB_URL = "jdbc:sqlite:../REDataLoader-master/sales.db";

  /**
   * Initializes the SAADAO and loads the MongoDB.
   */
  public SAADAO() {
    try {
      Class.forName("org.sqlite.JDBC");
    } catch (ClassNotFoundException e) {
      throw new IllegalStateException("MongoDB not found.", e);
    }
  }

  /**
   *
   * @param continent represents the continent a student is searching through.
   * @return a list of univerities on that continent.
   */
  public List<University> getUniByContinent(String continent) {
    List<University> results = new ArrayList<>;

    // db.collection('Universities').find({ continent : 'continent' });

    String mongoDB = "";

    return results;
  }

  /**
   * Returns a university by name.
   * @param name represents the university name.
   * @return
   */
  public University getUniByName(String name) {
    return null;
  }

}
