package auction.back.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    private final AuctionWebSocketHandler auctionWebSocketHandler;

    public WebSocketConfig(AuctionWebSocketHandler auctionWebSocketHandler) {
        this.auctionWebSocketHandler = auctionWebSocketHandler;
    }

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(auctionWebSocketHandler, "/auction/{auctionId}")
                // 특정 도메인만 허용하도록 수정 (보안 강화)
                .setAllowedOrigins("http://localhost:3000", "https://web-auction-m3egx220d3e063ff.sel4.cloudtype.app/")
                .withSockJS();
    }
}