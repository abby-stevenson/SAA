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

    config.router.apiBuilder(() -> {
      /**
       * API endpoints to retrieve data.
       */

      // return universities by continent
      app.get("/location/{continent}", ctx -> {
        studyAbroadHandler.getUniByContinent(ctx, ctx.pathParam("continent"));
      });

      // return universities by country
      app.get("/location/{country}", ctx -> {
        studyAbroadHandler.getUniByCountry(ctx, ctx.pathParam("country"));
      });

      // return universities by city
      app.get("/location/{city}", ctx -> {
        studyAbroadHandler.getUniByCity(ctx, ctx.pathParam("city"));
      });

      // return universities by course
      app.get("/course/{course}", ctx -> {
        studyAbroadHandler.getUniByCourse(ctx, ctx.pathParam("course"));
      });

      // return a university by name
      app.get("/university/{university}", ctx -> {
        studyAbroadHandler.getUniByName(ctx, ctx.pathParam("university"));
      });
    }

  }
}