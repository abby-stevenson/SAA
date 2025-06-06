package studyabroad;

import com.mongodb.client.FindIterable;
import com.mongodb.client.MongoCursor;

import model.SACourse;
import model.User;
import org.mindrot.jbcrypt.BCrypt;

import org.bson.Document;

import java.io.Console;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import io.javalin.http.Context;
import model.University;
import model.NEUCourse;
import java.util.Map;

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
    try {
      Map<String, String> body = ctx.bodyAsClass(Map.class);
      String email = body.get("email");
      String hostCourseNumber = body.get("courseNumber"); 
      dao.addCourseToUserFavorites(email, hostCourseNumber);
      ctx.status(201).json(Map.of("message", "Course added to favorites."));
    } catch (IllegalArgumentException e) {
      ctx.status(400).json(Map.of("message", "Bad request: " + e.getMessage()));
    } catch (IllegalStateException e) {
      ctx.status(409).json(Map.of("message", "Conflict: " + e.getMessage()));
    } catch (Exception e) {
      ctx.status(500).json(Map.of("message", "Internal server error."));
    }
  }

  public void addCourseToUserUnfavorites(Context ctx) {
    try {
      Map<String, String> body = ctx.bodyAsClass(Map.class);
      String email = body.get("email");
      String hostCourseNumber = body.get("courseNumber"); 
      dao.addCourseToUserUnfavorites(email, hostCourseNumber);
      ctx.status(201).json(Map.of("message", "Course unfavorites."));
    } catch (IllegalArgumentException e) {
      ctx.status(400).json(Map.of("message", "Bad request: " + e.getMessage()));
    } catch (IllegalStateException e) {
      ctx.status(409).json(Map.of("message", "Conflict: " + e.getMessage()));
    } catch (Exception e) {
      ctx.status(500).json(Map.of("message", "Internal server error."));
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

  public static class LoginRequest {
    public String email;
    public String password;
}

  public void login(Context ctx) {
    LoginRequest loginReq = ctx.bodyAsClass(LoginRequest.class);
    String email = loginReq.email;
    String password = loginReq.password;

    try {
      User user = dao.findUserByEmail(email);
      if (user == null || !BCrypt.checkpw(password, user.getPassword())) {
        ctx.status(401).result("Invalid email or password.");
        return;
      }

      // ✅ Store user email (or ID) in session
      ctx.sessionAttribute("userEmail", user.getEmail());
      ctx.cookie("userEmail", user.getEmail(), 3600); // expires in 1 hour
      ctx.result("Login successful");
      System.out.println("Logged in " + ctx.sessionAttribute("userEmail"));


      ctx.status(200).json(Map.of(
        "message", "Login successful",
        "email", user.getEmail()
      ));
    } catch (Exception e) {
      ctx.status(500).result("Internal server error.");
    }
  }

  public void getCurrentUser(Context ctx) {
    String email = ctx.cookie("userEmail");
    if (email != null) {
      ctx.result("Logged in as: " + email);
    } else {
      ctx.status(401).result("No user logged in.");
    }
  }

  public void logout(Context ctx) {
    ctx.removeCookie("userEmail");
    ctx.result("Logged out");
  }

  public void getLoggedInUser(Context ctx) {
    String userEmail = ctx.sessionAttribute("userEmail");
    System.out.println(userEmail);

    if (userEmail != null) {
      System.out.println("Session contains user: " + userEmail); 
      ctx.status(200).result("Logged in user: " + userEmail);
    } else {
      System.out.println("No user found in session.");
      ctx.status(401).result("No user is currently logged in.");
    }
  }

  public void getUserByEmail(Context ctx, String email) {
    User user = dao.findUserByEmail(email);
    if (user == null) {
      ctx.status(404).result("User not found");
    } else {
      Map<String, Object> response = new LinkedHashMap<>();
      response.put("email", user.getEmail() != null ? user.getEmail() : "");
      response.put("name", user.getName() != null ? user.getName() : "");
      response.put("major", user.getMajor() != null ? user.getMajor() : "");

      ctx.json(response);
    }
  }


  public void isCourseFavorited(Context ctx) {
  try {
      String email = ctx.queryParam("email");
      String hostCourseNumber = ctx.queryParam("hostCourseNumber");


    if (email == null || hostCourseNumber == null) {
      ctx.status(400).json(Map.of("message", "Missing email or hostCourseNumber"));
      return;
    }

    boolean isFavorited = dao.isCourseFavorited(email, hostCourseNumber);
    ctx.status(200).json(Map.of("isFavorited", isFavorited));
  } catch (IllegalArgumentException e) {
    ctx.status(400).json(Map.of("message", "Bad request: " + e.getMessage()));
  } catch (Exception e) {
    e.printStackTrace();
    ctx.status(500).json(Map.of("message", "Internal server error." + e.getMessage()));
  }
}

  public void getUserFavoritesByUniversity(Context ctx) {
    String email = ctx.queryParam("email");
    if (email == null) {
      ctx.status(401).result("User not logged in.");
      return;
    }

    try {
      Map<University, List<SACourse>> groupedCourses = dao.getFavoriteCoursesGroupedByUniversity(email);
      ctx.status(200).json(groupedCourses);
    } catch (Exception e) {
      e.printStackTrace(); // helpful for debugging
      ctx.status(500).result("Failed to fetch favorites.");
    }
  }

}
