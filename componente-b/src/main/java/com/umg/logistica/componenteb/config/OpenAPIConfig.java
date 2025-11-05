package com.umg.logistica.componenteb.config;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.*;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import java.util.List;

@Configuration
public class OpenAPIConfig {
    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Componente B - API de Proveedores y Facturas")
                        .version("1.0.0")
                        .description("API REST para gestión de proveedores y facturas con PostgreSQL")
                        .contact(new Contact().name("Carlos Sánchez").email("csanchez@umg.edu.gt")))
                .servers(List.of(new Server().url("http://localhost:8082").description("Servidor de desarrollo")));
    }
}
