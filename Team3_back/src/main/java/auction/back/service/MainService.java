package auction.back.service;

import auction.back.domain.Auction;
import auction.back.domain.Picture;
import auction.back.dto.response.IngAuctionResponseDto;
import auction.back.dto.response.AuthorFollowResponseDto;
import auction.back.dto.response.TopPictureResponseDto;
import auction.back.repository.AuctionRepository;
import auction.back.repository.AuthorRepository;
import auction.back.repository.PictureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MainService {
    private final PictureRepository pictureRepository;
    private final AuctionRepository auctionRepository;
    private final AuthorRepository authorRepository;

    private List<TopPictureResponseDto> getTopLikedPictures(int limit) {
        List<Object[]> results = pictureRepository.findTopLikedPictures(limit);

        return results.stream()
                .map(result -> TopPictureResponseDto.of((Picture) result[0], (Long) result[1]))
                .limit(limit)
                .collect(Collectors.toList());
    }

    private List<IngAuctionResponseDto> getOngoingAuctions() {
        List<Auction> auctions = auctionRepository.findOngoingAuctionsOrderByStartAtAsc();
        return auctions.stream()
                .limit(9)
                .map(IngAuctionResponseDto::of)
                .collect(Collectors.toList());
    }

    private List<AuthorFollowResponseDto> getPopularAuthors() {
        List<Object[]> authors = authorRepository.findTopAuthorsWithFollowerCount();
        return authors.stream()
                .limit(9)
                .map(AuthorFollowResponseDto::of)
                .collect(Collectors.toList());
    }

    public Map<String, Object> mainView() {
        List<TopPictureResponseDto> popularPictures = getTopLikedPictures(9);
        List<IngAuctionResponseDto> ongoingAuctions = getOngoingAuctions();
        List<AuthorFollowResponseDto> popularAuthors = getPopularAuthors();

        Map<String, Object> result = new HashMap<>();
        result.put("popularPictures", popularPictures);
        result.put("ongoingAuctions", ongoingAuctions);
        result.put("popularAuthors", popularAuthors);

        return result;
    }
}
