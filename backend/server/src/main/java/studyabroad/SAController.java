package studyabroad;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;

import model.SACourse;
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

}
