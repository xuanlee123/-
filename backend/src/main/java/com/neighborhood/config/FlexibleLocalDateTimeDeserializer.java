package com.neighborhood.config;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.regex.Pattern;

/**
 * 支持多种日期格式的 LocalDateTime 反序列化器
 * 支持格式:
 * - yyyy-MM-dd HH:mm:ss
 * - yyyy-MM-ddTHH:mm:ss (ISO 8601)
 * - yyyy-MM-ddTHH:mm:ss+HH:mm (带时区)
 */
public class FlexibleLocalDateTimeDeserializer extends JsonDeserializer<LocalDateTime> {

    private static final Pattern ISO_PATTERN = Pattern.compile("\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}");

    @Override
    public LocalDateTime deserialize(JsonParser parser, DeserializationContext context) throws IOException {
        String value = parser.getValueAsString();
        if (value == null || value.trim().isEmpty()) {
            return null;
        }

        value = value.trim();

        // ISO 8601 格式 (带 T)
        if (value.contains("T")) {
            // 如果包含时区信息，先移除
            if (value.contains("+")) {
                value = value.substring(0, value.indexOf("+"));
            }
            return LocalDateTime.parse(value, DateTimeFormatter.ISO_LOCAL_DATE_TIME);
        }

        // 标准格式 (带空格) yyyy-MM-dd HH:mm:ss
        return LocalDateTime.parse(value, DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss"));
    }
}
