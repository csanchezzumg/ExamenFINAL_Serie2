package com.umg.logistica.componentea.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
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
                        .title("Componente A - API de Clientes y Pedidos")
                        .version("1.0.0")
                        .description("API REST para gestión de clientes y pedidos del sistema de logística. " +
                                "Este componente maneja la información de clientes y sus pedidos asociados, " +
                                "con persistencia en MariaDB.")
                        .contact(new Contact()
                                .name("Carlos Sánchez")
                                .email("csanchez@umg.edu.gt")
                                .url("https://github.com/csanchezzumg"))
                        .license(new License()
                                .name("MIT License")
                                .url("https://opensource.org/licenses/MIT")))
                .servers(List.of(
                        new Server()
                                .url("http://localhost:8081")
                                .description("Servidor de desarrollo"),
                        new Server()
                                .url("http://localhost:8081/api")
                                .description("API Base")));
    }
}
