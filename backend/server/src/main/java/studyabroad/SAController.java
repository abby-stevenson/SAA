package studyabroad;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;

import model.SACourse;
import model.User;
import org.bson.Document;

import java.io.Console;
import java.util.List;

import io.javalin.http.Context;
import model.University;
import model.NEUCourse;

/**
 * Blah
 */
public class SAController {

  private final SAADAO dao;

  public SAController(SAADAO dao) { this.dao = dao; }

  public void getUniByContinent(Context ctx, String continent) {
    List<University> universities = dao.getUniByContinent(continent);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByCountry(Context ctx, String country) {
    List<University> universities = dao.getUniByCountry(country);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByCity(Context ctx, String city) {
    List<University> universities = dao.getUniByCity(city);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByNEUCourse(Context ctx, String course) {
    List<University> universities = dao.getUniByNEUCourse(course);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniBySACourse(Context ctx, String course) {
    List<University> universities = dao.getUniByNEUCourse(course);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByName(Context ctx, String university) {
    List<University> universities = dao.getUniByName(university);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByID(Context ctx, String id) {
    List<University> universities = dao.getUniByID(id);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getAllUni(Context ctx) {

    List<University> universities = this.dao.getAllUni();
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getAllSACourses(Context ctx) {
    List<SACourse> courses = dao.getAllSACourses();

    if (courses.isEmpty()) {
      ctx.result("No Study Abroad Courses Found");
      ctx.status(404);
    } else {
      ctx.json(courses);
      ctx.status(200);
    }
  }

  public void getNEUEquivalent(Context ctx, String neuCourseNumber) {
    List<SACourse> equivalents = dao.findSACoursesByNEUCourse(neuCourseNumber);
    if (equivalents.isEmpty()) {
      ctx.result("No equivalent study abroad courses found for NEU course: " + neuCourseNumber);
      ctx.status(404);
    } else {
      ctx.json(equivalents);
      ctx.status(200);
    }
  }

  public void getAllUsers(Context ctx) {
    List<User> users = dao.getAllUsers();
    ctx.json(users);
  }

  public void addUser(Context ctx) {
    try {
      User user = ctx.bodyAsClass(User.class);
      dao.insertUser(user);
      ctx.status(201).result("User created successfully");
    } catch (IllegalArgumentException e) {
      System.out.println("User creation failed: " + e.getMessage());
      ctx.status(409).result("Error: " + e.getMessage()); // Conflict or bad input
    } catch (Exception e) {
      e.printStackTrace();
      ctx.status(500).result("Internal server error");
    }
  }

  public void addCourseToUserFavorites(Context ctx) {
    String email = ctx.formParam("email");
    String hostCourseNumber = ctx.formParam("hostCourseNumber");

    try {
      dao.addCourseToUserFavorites(email, hostCourseNumber);
      ctx.status(201).result("Course added to favorites.");
    } catch (IllegalArgumentException e) {
      ctx.status(400).result("Bad request: " + e.getMessage());
    } catch (IllegalStateException e) {
      ctx.status(409).result("Conflict: " + e.getMessage()); // 409 Conflict is semantically correct here
    } catch (Exception e) {
      e.printStackTrace(); // Optional: log for debugging
      ctx.status(500).result("Internal server error.");
    }
  }

  public void getCoursesByUniversityId(Context ctx, String universityId) {
    List<SACourse> courses = dao.getCoursesByUniversityId(universityId);
    if (courses.isEmpty()) {
      ctx.status(404).result("No courses found for University ID: " + universityId);
    } else {
      ctx.status(200).json(courses);
    }
  }

}
