package com.mycompany.app;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import java.io.FileReader;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Map;

public class QuizLoader {
    private Map<String, Object> quizStructure;

    public void loadQuizStructure() {
        Gson gson = new Gson();
        Type type = new TypeToken<Map<String, Object>>(){}.getType();

        try (FileReader reader = new FileReader("./structure.json")) {
            // Parse JSON file into the Map to mimic dictionary behavio
            quizStructure = gson.fromJson(reader, type);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    public Map<String, Object> getQuizStructure() {
        return quizStructure;
    }


}
