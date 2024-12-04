package auction.back.config;

import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class AuctionWebSocketHandler extends TextWebSocketHandler {
    private static final Logger logger = LoggerFactory.getLogger(AuctionWebSocketHandler.class);
    private final Map<Long, Set<WebSocketSession>> auctionSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        Long auctionId = extractAuctionId(session);
        if (auctionId != null) {
            auctionSessions.computeIfAbsent(auctionId, k -> ConcurrentHashMap.newKeySet()).add(session);
            logger.info("New WebSocket connection established for auction: {}", auctionId);
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        Long auctionId = extractAuctionId(session);
        if (auctionId != null) {
            Set<WebSocketSession> sessions = auctionSessions.get(auctionId);
            if (sessions != null) {
                sessions.remove(session);
                if (sessions.isEmpty()) {
                    auctionSessions.remove(auctionId);
                }
            }
            logger.info("WebSocket connection closed for auction: {}", auctionId);
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        Long auctionId = extractAuctionId(session);
        if (auctionId != null) {
            broadcastAuctionUpdate(auctionId, message.getPayload());
        }
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) {
        logger.error("Transport error: {}", exception.getMessage(), exception);
        try {
            if (session.isOpen()) {
                session.close();
            }
        } catch (IOException e) {
            logger.error("Error closing WebSocket session", e);
        }
    }

    private Long extractAuctionId(WebSocketSession session) {
        String path = session.getUri().getPath();
        String[] pathParts = path.split("/");
        if (pathParts.length > 2 && pathParts[1].equals("auction")) {
            try {
                return Long.parseLong(pathParts[2]);
            } catch (NumberFormatException e) {
                logger.warn("Invalid auction ID in WebSocket URL: {}", pathParts[2]);
            }
        }
        return null;
    }

    public void broadcastAuctionUpdate(Long auctionId, String message) {
        Set<WebSocketSession> sessions = auctionSessions.get(auctionId);
        if (sessions != null) {
            sessions.forEach(session -> {
                try {
                    if (session.isOpen()) {
                        session.sendMessage(new TextMessage(message));
                    }
                } catch (IOException e) {
                    logger.error("Error sending WebSocket message", e);
                }
            });
        }
    }
}