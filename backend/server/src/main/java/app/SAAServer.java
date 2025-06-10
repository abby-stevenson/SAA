package app;

import io.javalin.Javalin;
import studyabroad.SAADAO;
import studyabroad.SAController;

/**
 * Server for Study Abroad.
 * This class should set up the Javalin server and configures the API endpoints.
 */
public class SAAServer {

  public static void main(String[] args) {
    // Create a new instance of the data access object (DAO) for database interactions
    var dao = new SAADAO();


    // Create a controller that handles API logic using the DAO
    SAController studyAbroadHandler = new SAController(dao);

    // Create and configure the Javalin app, and respond to root ("/") with a basic message
    var app = Javalin.create()
            .get("/", ctx -> ctx.result("Study Abroad Advisor server is running"))
            .start(8080);

    // Set up CORS headers and content type for all requests before they are handled
    app.before(ctx -> {
                ctx.header("Access-Control-Allow-Origin", "http://localhost:3000");
                ctx.header("Access-Control-Allow-Credentials", "true");
                ctx.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                ctx.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
                ctx.contentType("application/json; charset=UTF-16");

       });
    // Respond to all OPTIONS preflight requests (used in CORS)
    app.options("/*", ctx -> {
          ctx.status(200);
        });


    // Get universities by continent
    app.get("/location/continent/{continent}", ctx -> {
            studyAbroadHandler.getUniByContinent(ctx, ctx.pathParam("continent"));}
    );

    // Get universities by country
    app.get("/location/country/{country}", ctx ->
            studyAbroadHandler.getUniByCountry(ctx, ctx.pathParam("country"))
    );

    // Get universities by city
    app.get("/location/city/{city}", ctx ->
            studyAbroadHandler.getUniByCity(ctx, ctx.pathParam("city"))
    );

    // Get universities that offer a given NEU course
    app.get("/course/neu/{course}", ctx ->
            studyAbroadHandler.getUniByNEUCourse(ctx, ctx.pathParam("course"))
    );

    // Get universities that offer a given host course
    app.get("/course/host/{course}", ctx ->
            studyAbroadHandler.getUniBySACourse(ctx, ctx.pathParam("course"))
    );

    // Get universities by their name
    app.get("/university/{university}", ctx ->
            studyAbroadHandler.getUniByName(ctx, ctx.pathParam("university"))
    );

    // Get all universities
    app.get("/university", ctx -> {
              studyAbroadHandler.getAllUni(ctx);
    }
    );

    // Get university by ID
    app.get("/university/id/{id}", ctx ->
            studyAbroadHandler.getUniByID(ctx, ctx.pathParam("id"))
    );

    // Get all study abroad courses
    app.get("/course/sa/all", ctx -> {
      studyAbroadHandler.getAllSACourses(ctx);
    });

    // Get all host courses equivalent to a NEU course
    app.get("/course/equivalent/{neuCourseNumber}", ctx -> {
      studyAbroadHandler.getNEUEquivalent(ctx, ctx.pathParam("neuCourseNumber"));
    });

    // Get all users in the system
    app.get("/users", studyAbroadHandler::getAllUsers);

    // Add a new user
    app.post("/users", studyAbroadHandler::addUser);

    // Add a course to a user's favorites
    app.put("/user/favorite", ctx -> {
      studyAbroadHandler.addCourseToUserFavorites(ctx);
    });

    // Remove a course from a user's favorites
    app.put("/user/unfavorite", ctx -> {
      studyAbroadHandler.addCourseToUserUnfavorites(ctx);
    });

    // Get all courses for a specific university ID
    app.get("/university/courses/{universityId}", ctx -> {
      studyAbroadHandler.getCoursesByUniversityId(ctx, ctx.pathParam("universityId"));
    });

    // User login endpoint
    app.post("/login", ctx -> {
      studyAbroadHandler.login(ctx);
    });

    // User logout endpoint
    app.post("/logout", ctx -> studyAbroadHandler.logout(ctx));

    // Get currently logged in user using cookies
    app.get("/current-user", ctx -> {
      studyAbroadHandler.getCurrentUser(ctx);
    });

    // Get logged-in user using session attribute
    app.get("/user/loggedin", ctx -> {
      studyAbroadHandler.getLoggedInUser(ctx);
    });

    // Check if a specific course is in the user's favorites
    app.get("/user/isFavorite", ctx -> {
      studyAbroadHandler.isCourseFavorited(ctx);
    });

    // Get user's favorite courses grouped by university
    app.get("/user/favorites/grouped", ctx -> {
      studyAbroadHandler.getUserFavoritesByUniversity(ctx);
    });

    // Get user by email via query parameter (e.g., /user?email=foo@bar.com)
    app.get("/user", ctx -> {
      String email = ctx.queryParam("email");
      studyAbroadHandler.getUserByEmail(ctx, email);
    });
  }
}
