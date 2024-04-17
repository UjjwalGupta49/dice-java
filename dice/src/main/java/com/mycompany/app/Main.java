package com.mycompany.app;

// replace from here
import static spark.Spark.*;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.google.gson.reflect.TypeToken;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.net.URI;
import java.net.URLDecoder;
import java.net.URLDecoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.*;
import java.util.Set;

public class Main {

  public static void main(String[] args) {
    port(8080); // Spark will run on port 8080
    enableCORS(); // Enable CORS for all routes
    System.out.println("Working Directory = " + System.getProperty("user.dir"));

    get("/", (req, res) -> "Hello World");

    // Load the quiz structure at startup
    GlobalResources.loadQuizStructure();
    System.out.println(GlobalResources.quizStructure);

    get(
      "/quiz",
      (req, res) -> {
        res.type("application/json"); // Set response type to JSON

        String quizParam = req.queryParams("quiz");
        if (quizParam == null) {
          return "{\"error\": \"No quiz provided\"}";
        }

        try {
          String decodedJson = URLDecoder.decode(quizParam, "UTF-8");
          Type type = new TypeToken<Map<String, String>>() {}.getType();
          Map<String, String> quizMap = new Gson().fromJson(decodedJson, type);

          // Calculate user's interested genres based on responses
          Set<Integer> userGenres = new HashSet<>();
          quizMap.forEach(
            (questionId, userResponse) -> {
              Question question = GlobalResources.quizStructure.get(questionId);
              Option selectedOption = question.getOptions().get(userResponse);
              if (selectedOption != null) {
                selectedOption
                  .getGenres()
                  .forEach(genre -> userGenres.add(genre.getId()));
              }
            }
          );

          String movieResultsJson = getMovies(userGenres); // Fetch movies
          JsonObject movieResults = JsonParser
            .parseString(movieResultsJson)
            .getAsJsonObject();
          JsonArray userMoviesList = movieResults.getAsJsonArray("results");

          Set<Integer> chosenMovieIds = new HashSet<>();
          JsonArray userMovies = new JsonArray();
          Random random = new Random();
          while (
            userMovies.size() < 3 && userMoviesList.size() > userMovies.size()
          ) {
            JsonObject movie = userMoviesList
              .get(random.nextInt(userMoviesList.size()))
              .getAsJsonObject();
            int movieId = movie.get("id").getAsInt();
            if (!chosenMovieIds.contains(movieId)) {
              chosenMovieIds.add(movieId);
              userMovies.add(movie);
            }
          }

          JsonObject response = new JsonObject();
          response.add("user_movies", userMovies);
          return new Gson().toJson(response);
        } catch (Exception e) {
          return (
            "{\"error\": \"Failed to process the quiz data: " +
            e.getMessage() +
            "\"}"
          );
        }
      }
    );
  }

  // Method to enable CORS on all routes
  public static void enableCORS() {
    options(
      "/*",
      (request, response) -> {
        String accessControlRequestHeaders = request.headers(
          "Access-Control-Request-Headers"
        );
        if (accessControlRequestHeaders != null) {
          response.header(
            "Access-Control-Allow-Headers",
            accessControlRequestHeaders
          );
        }

        String accessControlRequestMethod = request.headers(
          "Access-Control-Request-Method"
        );
        if (accessControlRequestMethod != null) {
          response.header(
            "Access-Control-Allow-Methods",
            accessControlRequestMethod
          );
        }

        return "OK";
      }
    );

    before(
      (request, response) -> {
        response.header("Access-Control-Allow-Origin", "*");
        response.header("Access-Control-Request-Method", "*");
        response.header("Access-Control-Allow-Headers", "*");
        response.type("application/json");
      }
    );
  }

  public static String getMovies(Set<Integer> userGenres) {
    String apiKey =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJlOGViODVkNDExYjI0Yzg4MjdiYjdlOTY4ZTRkYmY5MSIsInN1YiI6IjY1NDRjODViZmQ0ZjgwMDBlNDdlOTU1NSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k_qMdzhZwBgmncIZjP70uvM89A3Wc_n_zXZxSH8uVXY";
    String baseUrl =
      "https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_original_language=en&with_genres=";

    String genreQuery = String.join(
      "%7C",
      userGenres.stream().map(String::valueOf).toArray(String[]::new)
    );
    String finalUrl = baseUrl + genreQuery;

    HttpClient client = HttpClient.newHttpClient();
    HttpRequest request = HttpRequest
      .newBuilder()
      .uri(URI.create(finalUrl))
      .header("accept", "application/json")
      .header("Authorization", apiKey)
      .build();

    try {
      HttpResponse<String> response = client.send(
        request,
        HttpResponse.BodyHandlers.ofString()
      );
      return response.body();
    } catch (Exception e) {
      e.printStackTrace();
      return "{\"error\": \"Failed to fetch movies: " + e.getMessage() + "\"}";
    }
  }

  public static class GlobalResources {
    public static Map<String, Question> quizStructure;

    public static void loadQuizStructure() {
      QuizLoader loader = new QuizLoader();
      loader.loadQuizStructure();
      quizStructure = loader.getQuizStructure();
    }
  }

  public static class QuizLoader {
    private Map<String, Question> quizStructure;

    public void loadQuizStructure() {
      Gson gson = new Gson();
      try (FileReader reader = new FileReader("structure.json")) {
        Type type = new TypeToken<Map<String, Question>>() {}.getType();
        quizStructure = gson.fromJson(reader, type);
      } catch (IOException e) {
        e.printStackTrace();
      }
    }

    public Map<String, Question> getQuizStructure() {
      return quizStructure;
    }
  }

  public static class Question {
    private String question;
    private Map<String, Option> options;

    public Map<String, Option> getOptions() {
      return options;
    }
  }

  public static class Option {
    private String short_text;
    private String description;
    private String image;
    private List<Genre> genres;

    public List<Genre> getGenres() {
      return genres;
    }
  }

  public static class Genre {
    private int id;
    private String name;

    public int getId() {
      return id;
    }
  }
}
