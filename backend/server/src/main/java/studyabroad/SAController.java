package studyabroad;

import com.mongodb.client.FindIterable;

import java.util.List;

import javax.swing.text.Document;

import io.javalin.http.Context;
import model.University;
import model.NEUCourse;

/**
 * Blah
 */
public class SAController {

  private SAADAO StudyAbroadDB;

  public SAController(SAADAO StudyAbroadDB) { this.StudyAbroadDB = StudyAbroadDB; }

  public void getUniByContinent(Context ctx, String continent) {
    List<University> universities = StudyAbroadDB.getUniByContinent(continent);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByCountry(Context ctx, String country) {
    List<University> universities = StudyAbroadDB.getUniByCountry(country);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByCity(Context ctx, String city) {
    List<University> universities = StudyAbroadDB.getUniByCity(city);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByNEUCourse(Context ctx, String course) {
    List<University> universities = StudyAbroadDB.getUniByNEUCourse(course);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniBySACourse(Context ctx, String course) {
    List<University> universities = StudyAbroadDB.getUniByNEUCourse(course);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByName(Context ctx, String university) {
    List<University> universities = StudyAbroadDB.getUniByName(university);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getAllUni(Context ctx) {
    List<University> universities = StudyAbroadDB.getAllUni();
    System.out.println("Universities found: " + universities.size());
    for (University u : universities) {
      System.out.println(u);
    }
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }
}