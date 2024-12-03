package auction.back.config;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Collections;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Component
@RequiredArgsConstructor
public class AuctionWebSocketHandler extends TextWebSocketHandler {
    private final Map<Long, Set<WebSocketSession>> auctionSessions = new ConcurrentHashMap<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) {
        try {
            String auctionId = extractAuctionId(session);
            if (auctionId != null) {
                auctionSessions.computeIfAbsent(Long.parseLong(auctionId), k -> ConcurrentHashMap.newKeySet())
                        .add(session);
            }
        } catch (NumberFormatException e) {
            // 일반 auction 연결인 경우 무시
        }
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        try {
            String auctionId = extractAuctionId(session);
            if (auctionId != null) {
                auctionSessions.getOrDefault(Long.parseLong(auctionId), Collections.emptySet())
                        .remove(session);
            }
        } catch (NumberFormatException e) {
            // 일반 auction 연결인 경우 무시
        }
    }

    private String extractAuctionId(WebSocketSession session) {
        String path = session.getUri().getPath();
        String[] pathParts = path.split("/");
        // /auction/123 형식인 경우에만 ID 추출
        if (pathParts.length > 2 && pathParts[1].equals("auction")) {
            return pathParts[2];
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
                    e.printStackTrace();
                }
            });
        }
    }
}