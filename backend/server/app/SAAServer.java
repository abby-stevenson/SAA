/**
 * Server for Study Abroad.
 * This class should set up the Javalin server and configures the API endpoints.
 */
public class SAAServer {

  public static void main(String[] args) {
    // in memory test data store
    var studyAbroad = new SAADAO();

    // API implementation
    SAAController studyAbroadHandler = new StudyAbroadController(studyAbroad);

    // start Javalin on port 7070
    var app = Javalin.create()
            .get("/", ctx -> ctx.result("Study Abroad Advisor server is running"))
            .start(8080);

    JavalinConfig config = new JavalinConfig();

  }
}