package app;

import io.javalin.Javalin;
import io.javalin.config.JavalinConfig;
import io.javalin.http.Context;

import studyabroad.SAADAO;
import studyabroad.SAController;

/**
 * Server for Study Abroad.
 * This class should set up the Javalin server and configures the API endpoints.
 */
public class SAAServer {

  public static void main(String[] args) {
    // in memory test data store
    var dao = new SAADAO();

    // API implementation
    SAController studyAbroadHandler = new SAController(dao);
    // start Javalin on port 7070
    var app = Javalin.create()
            .get("/", ctx -> ctx.result("Study Abroad Advisor server is running"))
            .start(8080);

        app.before(ctx -> {
                ctx.header("Access-Control-Allow-Origin", "http://localhost:3000");
                ctx.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
                ctx.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
                ctx.contentType("application/json; charset=UTF-16");
        });


    // Define endpoints directly on the app
    app.get("/location/continent/{continent}", ctx -> {
            studyAbroadHandler.getUniByContinent(ctx, ctx.pathParam("continent"));}
    );

    app.get("/location/country/{country}", ctx ->
            studyAbroadHandler.getUniByCountry(ctx, ctx.pathParam("country"))
    );

    app.get("/location/city/{city}", ctx ->
            studyAbroadHandler.getUniByCity(ctx, ctx.pathParam("city"))
    );

    app.get("/course/neu/{course}", ctx ->
            studyAbroadHandler.getUniByNEUCourse(ctx, ctx.pathParam("course"))
    );

    app.get("/course/host/{course}", ctx ->
            studyAbroadHandler.getUniBySACourse(ctx, ctx.pathParam("course"))
    );

    app.get("/university/{university}", ctx ->
            studyAbroadHandler.getUniByName(ctx, ctx.pathParam("university"))
    );

    app.get("/university", ctx -> {
              studyAbroadHandler.getAllUni(ctx);
    }
    );

    app.get("/university/id/{id}", ctx ->
            studyAbroadHandler.getUniByID(ctx, ctx.pathParam("id"))
    );

    app.get("/course/sa/all", ctx -> {
      studyAbroadHandler.getAllSACourses(ctx);
    });

    app.get("/course/equivalent/{neuCourseNumber}", ctx -> {
      studyAbroadHandler.getNEUEquivalent(ctx, ctx.pathParam("neuCourseNumber"));
    });
  }
}