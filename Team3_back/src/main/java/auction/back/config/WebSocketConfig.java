package auction.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");  // 클라이언트가 구독할 prefix
        config.setApplicationDestinationPrefixes("/app");  // 메시지 처리 요청 prefix
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/app")
                .setAllowedOriginPatterns("http://localhost:3000", "https://web-auction-m3egx220d3e063ff.sel4.cloudtype.app/")
                .withSockJS();
    }
}