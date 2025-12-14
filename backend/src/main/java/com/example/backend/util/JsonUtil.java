import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.Optional;

public class JsonUtil {

    private static final ObjectMapper objectMapper = new ObjectMapper(); // Reuse instance

    // Reusable method to convert JSON string to any object type
    public static <T> Optional<T> fromJson(String json, Class<T> clazz) {
        if (json == null || json.trim().isEmpty()) {
            return Optional.empty();
        }
        try {
            T object = objectMapper.readValue(json, clazz);
            return Optional.of(object);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("Error parsing JSON to " + clazz.getSimpleName(), e);
        }
    }
}