package studyabroad;

import java.util.List;

import io.javalin.http.Context;
import model.University;
import model.NEUCourse;

/**
 * Blah
 */
public class SAController {

  private SAADAO studyAbroad;

  public SAController(SAADAO studyAbroad) { this.studyAbroad = studyAbroad; }

  public void getUniByContinent(Context ctx, String continent) {
    List<University> universities = studyAbroad.getUniByContinent(continent);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByCountry(Context ctx, String country) {
    List<University> universities = studyAbroad.getUniByCountry(country);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByCity(Context ctx, String city) {
    List<University> universities = studyAbroad.getUniByCity(city);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByNEUCourse(Context ctx, String course) {
    List<University> universities = studyAbroad.getUniByNEUCourse(course);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniBySACourse(Context ctx, String course) {
    List<University> universities = studyAbroad.getUniByNEUCourse(course);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getUniByName(Context ctx, String university) {
    List<University> universities = studyAbroad.getUniByName(university);
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }

  public void getAllUni(Context ctx) {
    List<University> universities = studyAbroad.getAllUni();
    if (universities.isEmpty()) {
      ctx.result("No Universities Found");
      ctx.status(404);
    } else {
      ctx.json(universities);
      ctx.status(200);
    }
  }
}