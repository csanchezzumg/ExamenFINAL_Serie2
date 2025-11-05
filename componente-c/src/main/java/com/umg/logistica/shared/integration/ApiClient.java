package com.umg.logistica.shared.integration;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * Cliente HTTP para integración entre componentes
 * Permite invocar APIs REST de otros componentes (flujo circular)
 */
public class ApiClient {
    
    private static final Logger logger = LoggerFactory.getLogger(ApiClient.class);
    private static final MediaType JSON = MediaType.get("application/json; charset=utf-8");
    
    private final OkHttpClient httpClient;
    private final Gson gson;
    
    public ApiClient() {
        this.httpClient = new OkHttpClient.Builder()
                .connectTimeout(10, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .build();
        
        this.gson = new GsonBuilder()
                .setPrettyPrinting()
                .create();
    }
    
    /**
     * Realiza una petición GET a un endpoint
     * @param url URL completa del endpoint
     * @return Respuesta como String JSON
     * @throws IOException Si hay error en la conexión
     */
    public String get(String url) throws IOException {
        logger.info("GET Request to: {}", url);
        
        Request request = new Request.Builder()
                .url(url)
                .get()
                .addHeader("Accept", "application/json")
                .build();
        
        try (Response response = httpClient.newCall(request).execute()) {
            String responseBody = response.body() != null ? response.body().string() : "";
            
            logger.info("Response Status: {}", response.code());
            logger.debug("Response Body: {}", responseBody);
            
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected response code: " + response.code());
            }
            
            return responseBody;
        }
    }
    
    /**
     * Realiza una petición POST a un endpoint
     * @param url URL completa del endpoint
     * @param jsonBody Cuerpo de la petición en formato JSON
     * @return Respuesta como String JSON
     * @throws IOException Si hay error en la conexión
     */
    public String post(String url, String jsonBody) throws IOException {
        logger.info("POST Request to: {}", url);
        logger.debug("Request Body: {}", jsonBody);
        
        RequestBody body = RequestBody.create(jsonBody, JSON);
        
        Request request = new Request.Builder()
                .url(url)
                .post(body)
                .addHeader("Content-Type", "application/json")
                .addHeader("Accept", "application/json")
                .build();
        
        try (Response response = httpClient.newCall(request).execute()) {
            String responseBody = response.body() != null ? response.body().string() : "";
            
            logger.info("Response Status: {}", response.code());
            logger.debug("Response Body: {}", responseBody);
            
            if (!response.isSuccessful()) {
                throw new IOException("Unexpected response code: " + response.code());
            }
            
            return responseBody;
        }
    }
    
    /**
     * Convierte un objeto Java a JSON
     * @param object Objeto a convertir
     * @return String JSON
     */
    public String toJson(Object object) {
        return gson.toJson(object);
    }
    
    /**
     * Convierte un JSON a objeto Java
     * @param json String JSON
     * @param classOfT Clase del objeto destino
     * @return Objeto deserializado
     */
    public <T> T fromJson(String json, Class<T> classOfT) {
        return gson.fromJson(json, classOfT);
    }
}
